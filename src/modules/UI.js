import Feactures from "./Features";
import Storage from "./Storage";

export default class UI {
  static loadDataPage() {
    UI.loadTitlePage();
    UI.loadTasksList();
  }

  static loadTitlePage() {
    const titlePage = document.querySelector("#title");

    titlePage.textContent = "";
    titlePage.textContent =
      Storage.getTodoList().getPage().getName() === "Hoje"
        ? new Date().toDateString()
        : Storage.getTodoList().getPage().getName();
  }

  static loadTasksList() {
    const tasksList = document.querySelector(".tasks-list");

    tasksList.innerHTML = "";
    let i = 0;
    Storage.getTodoList()
      .getPage()
      .getTasks()
      .forEach((task) => {
        tasksList.appendChild(UI.Tasks(task.name, task.status, i));
        i++;
      });
  }

  static addTasks() {
    const tasksList = document.querySelector(".tasks-list");
    tasksList.appendChild(
      UI.Tasks("", false, Storage.getTodoList().getPage().getTasks().length),
    );
  }

  static Tasks(name, status, index) {
    const task = document.createElement("div");
    task.classList.add("tasks");
    task.id = `${index}`;

    const button = document.createElement("button");
    const iDelete = document.createElement("i");
    button.classList.add("delete-task");
    button.id = `${index}`;
    iDelete.classList.add("fa-solid", "fa-close");
    Feactures.deleteTask(button);
    button.appendChild(iDelete);

    task.appendChild(UI.structureTask(name, status, index));
    task.appendChild(button);

    return task;
  }

  static structureTask(name, status, index) {
    const div = document.createElement("div");
    const i = document.createElement("i");
    const p = document.createElement("p");

    i.classList.add(
      "status-tasks",
      status ? "fa-solid" : "fa-regular",
      status ? "fa-circle-check" : "fa-circle",
    );
    i.id = `${index}`;
    Feactures.tasksStatus(i);

    p.classList.add("tasks-name");
    p.id = `${index}`;
    p.contentEditable = true;
    Feactures.tasksName(p);

    p.textContent = name;

    div.appendChild(i);
    div.appendChild(p);
    return div;
  }

  static CreateNewButtonForPage(namePage) {
    const menuOfPages = document.getElementById("common-pages");

    menuOfPages.appendChild(UI.NewButton(namePage));

    Feactures.changePage();
  }

  static NewButton(value) {
    const div = document.createElement("div");
    div.classList.add("div-links-page");

    const btn = document.createElement("button");
    btn.classList.add("delete-page");
    btn.classList.add("fa-solid");
    btn.classList.add("fa-close");

    btn.id = value;

    Feactures.pageActions(btn);

    const span = document.createElement("span");
    span.classList.add("links-page");
    span.id = value;

    span.innerHTML += `<i class="fa-regular fa-bookmark" aria-hidden="true"></i> ${value}`;

    div.appendChild(span);
    div.appendChild(btn);
    return div;
  }

  static loadBtnsOfPages() {
    document.querySelector("#common-pages").innerHTML = "";
    const listKeys = Object.keys(Storage.getTodoList().getCommonsPages());

    listKeys.forEach((page) => {
      UI.CreateNewButtonForPage(page);
    });
  }

  static Load() {
    UI.loadDataPage();
    UI.loadBtnsOfPages();
  }
}
