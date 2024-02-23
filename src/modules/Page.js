import Storage from "./Storage";

export default class Page {
  constructor(name, tasks) {
    this.name = name;
    this.tasks = tasks || [];
  }

  getName() {
    return this.name;
  }

  getTasks() {
    return this.tasks;
  }

  getTask(index) {
    return this.tasks[index];
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    Storage.getTodoList().UpdatePage(this);
  }

  UpdateTask(index, property, value) {
    this.tasks[index][property] = value;
    Storage.getTodoList().UpdatePage(this);
  }

  setTask() {
    this.tasks.push({ name: "", status: false });
    Storage.getTodoList().UpdatePage(this);
  }
}
