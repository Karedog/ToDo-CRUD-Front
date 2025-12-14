import styles from "./page.module.css";
import TodoList from "./services/components/TodoList/TodoList";

export default async function Home() {

  return (
    <div className={styles.page}>
      <TodoList/>
    </div>
  );
}
