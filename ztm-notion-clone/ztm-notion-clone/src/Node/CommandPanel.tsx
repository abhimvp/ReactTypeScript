// this commandPanel component will need to know the text of the node we're editing

import { useEffect, useState } from "react";
import { NodeType } from "../utils/types";
import { useOverflowsScreenBottom } from "./useOverflowsScreenBottom";
import styles from "./CommandPanel.module.css";
import cx from "classnames"; //  npm install classnames --save
// this way we will be able to filter elements with matching text
type CommandPanelProps = {
  nodeText: string;
  //   we also need to react on selection , to tell that this element is slected , therefore the type of node we;re editing ..
  selectItem: (nodeType: NodeType) => void;
};
type SupportedNodeType = {
  value: NodeType;
  name: string;
};

const SupportedNodeTypes: SupportedNodeType[] = [
  { value: "text", name: "Text" },
  { value: "list", name: "List" },
  { value: "heading1", name: "Heading 1" },
  { value: "heading2", name: "Heading 2" },
  { value: "heading3", name: "Heading 3" },
];

export const CommandPanel = ({ nodeText, selectItem }: CommandPanelProps) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { overflows, ref } = useOverflowsScreenBottom();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // to react on enter key press
      if (event.key === "Enter") {
        selectItem(SupportedNodeTypes[selectedItemIndex].value);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItemIndex, selectItem]);

  useEffect(() => {
    const normalizedValue = nodeText.toLowerCase().replace(/\//, "");
    setSelectedItemIndex(
      SupportedNodeTypes.findIndex((item) => item.value.match(normalizedValue))
    );
  }, [nodeText]);

  return (
    <div
      ref={ref}
      className={cx(styles.panel, {
        [styles.reverse]: overflows,
      })}
    >
      <div className={styles.title}>Blocks</div>
      <ul>
        {SupportedNodeTypes.map((type, index) => {
          const selected = selectedItemIndex === index;
          return (
            <li
              key={type.value}
              onClick={() => selectItem(type.value)}
              className={cx({
                [styles.selected]: selected,
              })}
            >
              {type.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
