//  Implementing cover image component as part of page component
import styles from "./Cover.module.css";
import { ChangeEventHandler, useRef } from "react";
export const Cover = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onChangeCoverImage = () => {
    // In react we have refs , it's  a special entity that allows to store references to actual elements
    fileInputRef.current?.click(); // we added optional chaining because this element can be null & click not gonna be called if fileInputRef does not contain an element
  };
  const onCoverImageUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    const target = event.target;
    console.log(target?.files?.[0]);
  };
  return (
    <div className={styles.cover}>
      {/* <h1>cover Image will be loaded here</h1> */}
      <img src="/ztm-notes.png" alt="Cover" className={styles.image} />
      <button className={styles.button} onClick={onChangeCoverImage}>
        {/* when we click on button it will call this function & we will be able to trigger onclick event on the fileInputRef */}
        Change Cover
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={onCoverImageUpload}
      />
      {/* To make input invisible , we pass an inline style display none */}
      {/** when we select a file it will trigger this function */}
    </div>
  );
};
