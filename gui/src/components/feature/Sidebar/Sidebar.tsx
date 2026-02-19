import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/useAppStore";
import { SnippetLibrary } from "@/components/feature/SnippetLibrary/SnippetLibrary";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useAppStore();

  return (
    <aside
      className={cn(
        "flex flex-col shrink-0 border-r border-border bg-sidebar overflow-hidden transition-all duration-300 ease-in-out",
        isSidebarOpen ? "w-72" : "w-10"
      )}
    >
      <div className="flex justify-end p-1 shrink-0">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className={cn("flex-1 overflow-y-auto", !isSidebarOpen && "hidden")}>
        <SnippetLibrary />
      </div>
    </aside>
  );
}
