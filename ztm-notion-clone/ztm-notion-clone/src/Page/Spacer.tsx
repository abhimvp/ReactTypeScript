// It is a component that handles clicks for us & also have a Boolen flag that will determine if the component should show a hint
import styles from "./Spacer.module.css";
type SpacerProps = {
  handleClick(): void;
  showHint: boolean;
};

export const Spacer = ({ handleClick, showHint }: SpacerProps) => {
  return (
    <div className={styles.spacer} onClick={handleClick}>
      {showHint && <span>Click to create the first paragraph</span>}
    </div>
  );
};
