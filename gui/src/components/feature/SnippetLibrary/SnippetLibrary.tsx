import type { Snippet } from "@/types/snippet";

const PLACEHOLDER_SNIPPETS: Snippet[] = [
  {
    id: "1",
    songTitle: "Let It Be",
    section: "chorus",
    artist: "The Beatles",
    chordProgression: ["I", "V", "vi", "IV"],
    key: "C",
  },
  {
    id: "2",
    songTitle: "No Woman No Cry",
    section: "verse",
    artist: "Bob Marley",
    chordProgression: ["I", "IV", "vi", "IV"],
    key: "C",
  },
  {
    id: "3",
    songTitle: "4 Chords",
    section: "chorus",
    artist: "Axis of Awesome",
    chordProgression: ["I", "V", "vi", "IV"],
    key: "G",
  },
  {
    id: "4",
    songTitle: "Someone Like You",
    section: "bridge",
    artist: "Adele",
    chordProgression: ["I", "iii", "IV", "I"],
    key: "A",
  },
  {
    id: "5",
    songTitle: "Despacito",
    section: "verse",
    artist: "Luis Fonsi",
    chordProgression: ["vi", "III", "VII", "IV"],
    key: "B",
  },
];

function SnippetCard({ snippet }: { snippet: Snippet }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3 space-y-2 cursor-pointer hover:bg-accent transition-colors">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-card-foreground leading-tight">
          {snippet.songTitle}
        </p>
        <span className="text-xs bg-primary/10 text-primary rounded px-1.5 py-0.5 shrink-0">
          {snippet.section}
        </span>
      </div>
      <p className="text-xs text-muted-foreground">{snippet.artist}</p>
      <div className="flex items-center gap-1 flex-wrap">
        <span className="text-xs text-muted-foreground font-medium">
          {snippet.key}:
        </span>
        {snippet.chordProgression.map((chord, i) => (
          <span
            key={i}
            className="text-xs bg-secondary text-secondary-foreground rounded px-1 py-0.5 font-mono"
          >
            {chord}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SnippetLibrary() {
  return (
    <div className="p-3 space-y-3">
      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
        Snippet Library
      </h2>
      <div className="space-y-2">
        {PLACEHOLDER_SNIPPETS.map((s) => (
          <SnippetCard key={s.id} snippet={s} />
        ))}
      </div>
    </div>
  );
}
