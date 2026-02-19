import "@xyflow/react/dist/style.css";
import { ReactFlow, Background, Controls, MiniMap } from "@xyflow/react";

export function Canvas() {
  return (
    <div className="w-full h-full">
      <ReactFlow nodes={[]} edges={[]}>
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
