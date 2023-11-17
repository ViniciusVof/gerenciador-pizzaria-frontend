import { FaSpinner } from "react-icons/fa";
import styles from "./styles.module.scss";

export function Loading() {
  return (
    <div className={styles.container}>
      <FaSpinner color="#FFF" size={50} />
    </div>
  );
}
