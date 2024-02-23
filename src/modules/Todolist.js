import Page from "./Page";

export default class Todolist {
  constructor(pageName, basicsPages, commonPages) {
    this.current_page = pageName;
    this.basics = basicsPages || {
      Inbox: { name: "Inbox", tasks: [] },
      Today: { name: "Hoje", tasks: [] },
      Upcoming: { name: "Essa Semana", tasks: [] },
    };
    this.common = commonPages || {};
  }

  setCommonPage(value) {
    this.common[value] = { name: value, tasks: [] };
    this.UpdateTodo();
  }

  getCommonsPages() {
    return this.common;
  }

  setCurrentPage = (newpage) => {
    this.current_page = newpage;
    this.UpdateTodo();
  };

  deletePage(page) {
    delete this.common[page];

    if (page === this.current_page) {
      this.setCurrentPage("Inbox");
    }
    this.UpdateTodo();
  }

  getPage() {
    const page =
      this.current_page in this.basics
        ? this.basics[this.current_page]
        : this.common[this.current_page];
    return new Page(page.name, page.tasks);
  }

  UpdatePage(object) {
    if (this.current_page in this.basics) {
      this.basics[this.current_page] = object;
    } else {
      this.common[this.current_page] = object;
    }

    this.UpdateTodo();
  }

  UpdateTodo() {
    localStorage.setItem("todo", JSON.stringify(this));
  }
}
