import Todolist from "./Todolist";

export default class Storage {
  static getTodoList() {
    const storageTodo = JSON.parse(localStorage.getItem("todo"));
    const todo =
      storageTodo === null
        ? new Todolist("Inbox")
        : new Todolist(
            storageTodo.current_page,
            storageTodo.basics,
            storageTodo.common,
          );
    todo.UpdateTodo();
    return todo;
  }
}
