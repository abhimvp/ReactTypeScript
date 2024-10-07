// import { useState } from "react";
// import { NodeData } from "../utils/types";
import { useFocusedNodeIndex } from "./useFocusedNodeIndex";
import { Cover } from "./Cover";
import { Spacer } from "./Spacer";
// import { BasicNode } from "../Node/BasicNode";
// import { NodeTypeSwitcher } from "../Node/NodeTypeSwitcher";
import { Title } from "./Title";
import { nanoid } from "nanoid";
import { useAppState } from "../state/AppStateContext";
import { DndContext, DragOverlay, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { NodeContainer } from "../Node/NodeContainer";
export const Page = () => {
  //   const [nodes, setNodes] = useState<NodeData[]>([]);
  //   const [title, setTitle] = useState("Default Title");
  const { nodes, title, addNode, setTitle, reorderNodes } = useAppState();
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes,
  });

  //   const addNode = (node: NodeData, index: number) => {
  //     const newNodes = [...nodes]; // create a new array from nodes state , so that we can mutate it
  //     newNodes.splice(index, 0, node); // splice calls modify the original array , we don't want this when working with state
  //     setNodes(newNodes);
  //   };

  //   const removeNodeByIndex = (index: number) => {
  //     const newNodes = [...nodes];
  //     newNodes.splice(index, 1);
  //     setNodes(newNodes);
  //   };

  //   const changeNodeValue = (index: number, value: string) => {
  //     const newNodes = [...nodes];
  //     newNodes[index].value = value;
  //     setNodes(newNodes);
  //   };
  const handleDragEvent = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over?.id !== over?.id && active?.id) {
      reorderNodes(active.id as string, over.id as string);
    }
  };

  return (
    <>
      <Cover />
      <div>
        <Title addNode={addNode} title={title} changePageTitle={setTitle} />
        <DndContext onDragEnd={handleDragEvent}>
          <SortableContext items={nodes} strategy={verticalListSortingStrategy}>
            {nodes.map((node, index) => (
              <NodeContainer
                key={node.id}
                node={node}
                updateFocusedIndex={setFocusedNodeIndex}
                isFocused={focusedNodeIndex === index}
                index={index}
              />
              //   <BasicNode
              //     key={node.id}
              //     node={node}
              //     updateFocusedIndex={setFocusedNodeIndex}
              //     isFocused={focusedNodeIndex === index}
              //     index={index}
              //     // addNode={addNode}
              //     // removeNodeByIndex={removeNodeByIndex}
              //     // changeNodeValue={changeNodeValue} - we're getting these from APpStateCOntext
              //   />
            ))}
          </SortableContext>
          <DragOverlay />
        </DndContext>

        <Spacer
          handleClick={() => {
            addNode({ type: "text", value: "", id: nanoid() }, nodes.length);
          }}
          showHint={!nodes.length}
        />
      </div>
    </>
  );
};
