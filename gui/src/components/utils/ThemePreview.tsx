import { Button } from "../ui/button";

const themeColors = [
  { name: "Primary", variable: "bg-primary", text: "text-primary-foreground" },
  {
    name: "Secondary",
    variable: "bg-secondary",
    text: "text-secondary-foreground",
  },
  { name: "Accent", variable: "bg-accent", text: "text-accent-foreground" },
  {
    name: "Destructive",
    variable: "bg-destructive",
    text: "text-destructive-foreground",
  },
  { name: "Muted", variable: "bg-muted", text: "text-muted-foreground" },
];

export function ThemePreview() {
  return (
    <div className="p-8 space-y-8 bg-background text-foreground min-h-screen">
      <h1 className="text-3xl font-bold font-heading">Theme Preview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themeColors.map((color) => (
          <div
            key={color.name}
            className="space-y-3 p-4 border rounded-lg border-border"
          >
            <h3 className="font-medium">{color.name}</h3>

            {/* Full Opacity */}
            <div
              className={`h-16 w-full rounded ${color.variable} ${color.text} flex items-center justify-center text-xs font-bold`}
            >
              Default (100%)
            </div>

            {/* Testing Tailwind Opacity Modifier */}
            <div className="flex gap-2">
              <div
                className={`h-10 flex-1 rounded ${color.variable}/50 flex items-center justify-center text-[10px]`}
              >
                50% Alpha
              </div>
              <div
                className={`h-10 flex-1 rounded ${color.variable}/20 flex items-center justify-center text-[10px]`}
              >
                20% Alpha
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 pt-8 border-t border-border">
        <h2 className="text-xl font-semibold">Typography & UI Check</h2>
        <div className="flex gap-4">
          <Button>Default Button</Button>
          <Button variant={"outline"}>Outline Button</Button>
        </div>
        <p className="text-muted-foreground italic">
          Note: If boxes above are transparent or white, your SCSS variables are
          not reaching the global scope.
        </p>
      </div>
    </div>
  );
}
