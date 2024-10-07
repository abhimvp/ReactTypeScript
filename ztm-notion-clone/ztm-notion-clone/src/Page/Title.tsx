import { NodeData } from "../utils/types";
import styles from "./Title.module.css";
import { useRef, useEffect } from "react";
import { nanoid } from "nanoid";
// Compoennt that renders the title of a page
type TitleProps = {
  title: string;
  changePageTitle(title: string): void;
  addNode(node: NodeData, index: number): void; // we will call this function only if the user presses enter while editing the title. This means the user wants to create a new node or start a new paragragh & index as every node can be created at any part of the page
};

export const Title = ({ title, changePageTitle, addNode }: TitleProps) => {
  const headerRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const isFocused = document.activeElement == headerRef.current;
    if (!isFocused && headerRef.current) {
      headerRef.current.textContent = title;
    }
  }, [title]);

  return (
    <div className={styles.container}>
      <h1
        className={styles.title}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => {
          changePageTitle(e.currentTarget.textContent || "");
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            addNode({ type: "text", id: nanoid(), value: "" }, 0);
          }
        }}
      />
    </div>
  );
};
