import styles from "./page.module.css";
import TodoManager from "./components/TodoManager/TodoManager";
export default function Home() {

  return (
    <div className={styles.page}>
      <TodoManager/>
    </div>
  );
}
