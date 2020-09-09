class TodoApp {
  constructor() {
    this.todos = [];
    this.todoInput = document.getElementById('todoInput');
    this.addButton = document.getElementById('addTodoBtn');
    this.todoList = document.getElementById('todoList');

    this.createEventListeners();
  }

  createEventListeners() {
    this.createTodoEventListener();
    this.toggleCompleteEventListener();
  }

  createTodoEventListener() {
    this.addButton.addEventListener('click', (e) => {
      const todo = {
        id: +new Date(),
        name: this.todoInput.value,
        complete: false,
      };

      this.todos = [...this.todos, todo];
      this.todoList.innerHTML =
        this.todoList.innerHTML + this.createTodoElement(todo);
      console.log(this.todos);
    });
  }

  toggleCompleteEventListener() {
    this.todoList.addEventListener('toggleComplete', (e) => {
      const todoElement = e.target;
      const todoItemInArray = this.todos.find(
        (todo) => todo.id === +todoElement.id
      );
      todoItemInArray.complete = !todoItemInArray.complete;
      todoElement.setAttribute('complete', todoItemInArray.complete);
    });
  }

  createTodoElement(todo) {
    return `<todo-item id="${todo.id}" 
            name="${todo.name}" 
            complete="${todo.complete}">
          </todo-item>`;
  }
}

const todo = new TodoApp();
