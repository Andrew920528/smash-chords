import re
import polars as pl


# =========================
# 1) Parse sections -> List[Struct(section, chords_raw)]
# =========================
SECTION_RE = re.compile(r"<([^>]+)>")

def parse_sections_struct(chords_text: str):
    """
    Input:
        "<intro_1> C <verse_1> F C G"
    Output (list of dicts):
        [
          {"section": "intro_1", "chords_raw": ["C"]},
          {"section": "verse_1", "chords_raw": ["F","C","G"]},
        ]
    Always returns a Python list (never None).
    """
    if not chords_text:
        return []

    matches = list(SECTION_RE.finditer(chords_text))
    if not matches:
        return []

    out = []
    n = len(matches)

    for i, m in enumerate(matches):
        section = m.group(1)
        start = m.end()
        end = matches[i + 1].start() if i + 1 < n else len(chords_text)
        content = chords_text[start:end].strip()
        if not content:
            continue

        chords = content.split()
        out.append({"section": section, "chords_raw": chords})

    return out


# =========================
# 2) Romanization (toy-compatible)
# =========================
NOTE_TO_SEMITONE = {
    "C": 0, "B#": 0,
    "C#": 1, "Db": 1,
    "D": 2,
    "D#": 3, "Eb": 3,
    "E": 4, "Fb": 4,
    "F": 5, "E#": 5,
    "F#": 6, "Gb": 6,
    "G": 7,
    "G#": 8, "Ab": 8,
    "A": 9,
    "A#": 10, "Bb": 10,
    "B": 11, "Cb": 11,
}

INTERVAL_TO_DEGREE = {
    0: "I",
    2: "II",
    4: "III",
    5: "IV",
    7: "V",
    9: "VI",
    10: "VII",
}

CHORD_ROOT_RE = re.compile(r"^([A-G](?:#|b)?)(.*)$", re.IGNORECASE)

def normalize_chord(chord: str):
    """
    Keep only root + (minor/major).
    Drop NC and unparseable tokens.
    Ignore extensions (7/sus/add9/...)
    Return (root, is_minor) or None
    """
    if chord is None:
        return None

    chord = chord.strip()
    if chord == "" or chord.upper() == "NC":
        return None

    m = CHORD_ROOT_RE.match(chord)
    if not m:
        return None

    root = m.group(1)
    quality = (m.group(2) or "").lower()

    # minor if contains 'm' but not startswith 'maj' (Cmaj7 is major)
    is_minor = ("m" in quality) and (not quality.startswith("maj"))

    root = root[0].upper() + root[1:]
    return (root, is_minor)

def romanize(chords):
    """
    Input: list-like (Python list / tuple / Polars Series / None)
    Output: dict(key, key_mode, roman:list[str]) or None
    """

    # 1) normalize input to a plain Python list[str]
    if chords is None:
        return None

    # Polars may pass a Series here in some versions
    try:
        # Polars Series has .to_list()
        if hasattr(chords, "to_list"):
            chords = chords.to_list()
    except Exception:
        pass

    # If it's still not a list/tuple, try to coerce
    if not isinstance(chords, (list, tuple)):
        try:
            chords = list(chords)
        except Exception:
            return None

    if len(chords) == 0:
        return None

    # 2) normalize chords (drop NC, keep root + minor flag)
    norm = []
    for c in chords:
        nc = normalize_chord(c)
        if nc is not None:
            norm.append(nc)

    if len(norm) == 0:
        return None

    # 3) key = first chord
    key_root, key_is_minor = norm[0]
    key_semi = NOTE_TO_SEMITONE.get(key_root)
    if key_semi is None:
        return None

    key_mode = "minor" if key_is_minor else "major"

    # 4) roman mapping
    roman = []
    for root, is_minor in norm:
        semi = NOTE_TO_SEMITONE.get(root)
        if semi is None:
            continue

        interval = (semi - key_semi) % 12
        degree = INTERVAL_TO_DEGREE.get(interval)
        if degree is None:
            continue

        roman.append(degree.lower() if is_minor else degree)

    if len(roman) == 0:
        return None

    return {"key": key_root, "key_mode": key_mode, "roman": roman}

# =========================
# 3) Main pipeline (20000 rows)
# =========================
def main():
    sections_dtype = pl.List(
        pl.Struct([
            pl.Field("section", pl.Utf8),
            pl.Field("chords_raw", pl.List(pl.Utf8)),
        ])
    )

    roman_dtype = pl.Struct([
        pl.Field("key", pl.Utf8),
        pl.Field("key_mode", pl.Utf8),
        pl.Field("roman", pl.List(pl.Utf8)),
    ])

    lf = (
        pl.scan_csv("hf://datasets/ailsntua/Chordonomicon/chordonomicon_v2.csv")
        #.limit(20000)
        .select(["id", "artist_id", "chords"])
        .with_columns(
            pl.col("chords").map_elements(
                parse_sections_struct,
                return_dtype=sections_dtype,   # ✅ List[Struct] (NO Object)
            ).alias("sections")
        )
        .with_columns(pl.col("sections").fill_null([]))
        .explode("sections")
        .with_columns([
            pl.col("sections").struct.field("section").alias("section"),
            pl.col("sections").struct.field("chords_raw").alias("chords_raw"),
        ])
        .drop("sections")
        .with_columns(
            pl.col("chords_raw").map_elements(
                romanize,
                return_dtype=roman_dtype,
            ).alias("roman_info")
        )
        .filter(pl.col("roman_info").is_not_null())
        .with_columns([
            pl.col("roman_info").struct.field("key"),
            pl.col("roman_info").struct.field("key_mode"),
            pl.col("roman_info").struct.field("roman"),
        ])
        .drop("roman_info")
    )

    df_out = lf.collect()
    #df_out = df_out.drop("chords")

    print("Preprocessed shape:", df_out.shape)
    print(df_out.head(10))

    #df_out.write_parquet("preprocessed_20000.parquet")
    df_out.write_parquet("preprocessed_all.parquet")

    # Optional: also save a CSV version
    #df_out_csv = df_out.with_columns([
    #pl.col("chords_raw").list.join("|").alias("chords_raw_str"),
    #pl.col("roman").list.join("|").alias("roman_str"),
    #]).drop(["chords_raw", "roman"])
    #df_out_csv.write_csv("preprocessed_20000.csv")


if __name__ == "__main__":
    main()