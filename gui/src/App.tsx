import { ThemePreview } from "./components/ThemePreview";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <Button>Default</Button>
      <Button variant="destructive">Delete</Button>
      <Button size="lg">Large Button</Button>
      <div className="yo bg-primary">hello</div>
      <ThemePreview />
    </>
  );
}

export default App;
