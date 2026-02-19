import { Header } from "@/components/feature/Header/Header";
import { Sidebar } from "@/components/feature/Sidebar/Sidebar";
import { Canvas } from "@/components/feature/Canvas/Canvas";

export function AppLayout() {
  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden">
          <Canvas />
        </main>
      </div>
    </div>
  );
}
