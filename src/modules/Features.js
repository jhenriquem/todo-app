import Storage from "./Storage";
import UI from "./UI";

export default class Feactures {
  // ======== Page ===================
  static changePage() {
    const links = document.querySelectorAll(".links-page");

    links.forEach((link) => {
      link.addEventListener("click", () => {
        Storage.getTodoList().setCurrentPage(link.id);
        UI.loadDataPage();
        if (window.innerWidth < 600) {
          document.querySelector(".Menu").style.display = "none";
          document.getElementById("btn-menu").classList.remove("fa-close");
          document.getElementById("btn-menu").classList.add("fa-bars");
        }
      });
    });
  }

  static pageActions(btn) {
    btn.addEventListener("click", () => {
      const decision = confirm(
        `Tem certeza que quer apagar a página ${btn.id} ?`,
      );
      if (decision) {
        Storage.getTodoList().deletePage(btn.id);
        UI.Load();
      }
    });
  }

  static CreateNewPage() {
    const btnOpen = document.getElementById("btn-open-create-page-modal");
    const btnCreate = document.getElementById("btn-create-new-page");
    const inputName = document.getElementById("input-name-new-page");
    const modal = document.querySelector(".create-page-modal");
    const btnClose = document.getElementById("close-modal");

    btnOpen.addEventListener("click", () => {
      modal.style.display = "grid";
    });

    btnClose.addEventListener("click", () => {
      modal.style.display = "none";
    });

    btnCreate.addEventListener("click", () => {
      UI.CreateNewButtonForPage(inputName.value);
      Storage.getTodoList().setCommonPage(inputName.value);
      modal.style.display = "none";
    });
  }

  // ======== Tasks ===================
  static AddTasks() {
    const btnAdd = document.querySelector("#btn-add-task");

    btnAdd.addEventListener("click", () => {
      UI.addTasks();
      Storage.getTodoList().getPage().setTask();
    });
  }

  static tasksStatus(element) {
    element.addEventListener("click", () => {
      const task = Storage.getTodoList().getPage().getTask(element.id);

      const status = task.status ? false : true;
      Storage.getTodoList()
        .getPage()
        .UpdateTask(Number(element.id), "status", status);
      UI.loadTasksList();
    });
  }

  static tasksName(element) {
    element.addEventListener("input", () => {
      Storage.getTodoList()
        .getPage()
        .UpdateTask(Number(element.id), "name", element.textContent);
    });
  }

  static deleteTask(element) {
    element.addEventListener("click", () => {
      Storage.getTodoList().getPage().deleteTask(Number(element.id));
      UI.loadTasksList();
    });
  }

  // ======== Menu ===================
  static Menu() {
    const btnMenu = document.getElementById("btn-menu");
    const menu = document.querySelector(".Menu");

    btnMenu.addEventListener("click", () => {
      menu.style.display = menu.style.display === "none" ? "grid" : "none";

      if (window.innerWidth < 600) {
        btnMenu.classList.remove(
          menu.style.display === "grid" ? "fa-bars" : "fa-close",
        );
        btnMenu.classList.add(
          menu.style.display === "grid" ? "fa-close" : "fa-bars",
        );
      }
    });

    btnMenu.addEventListener("mouseover", () => {
      if (window.innerWidth > 600) {
        btnMenu.classList.remove("fa-bars");
        menu.style.display === "grid"
          ? btnMenu.classList.add("fa-angles-left")
          : btnMenu.classList.add("fa-angles-right");
      }
    });

    btnMenu.addEventListener("mouseout", () => {
      if (window.innerWidth > 600) {
        btnMenu.className = "";
        btnMenu.className = "buttons fa-solid fa-bars";
      }
    });
  }

  // ===========================
  static activateButton() {
    Feactures.Menu();
    Feactures.AddTasks();
    Feactures.CreateNewPage();
    Feactures.changePage();
  }
}
