class ToDoApp {
  constructor() {
    this.todos = [];
    this.todoInput = document.querySelector('#todoInput');
    this.todoList = document.querySelector('#todoList');

    this.createTodoEventHandler();
    this.toggleCompletedEventHandler();
    this.deleteTodoEventHandler();
  }

  createTodoEventHandler() {
    this.todoInput.addEventListener('createTodo', (e) => {
      const todo = {
        id: +new Date(),
        name: this.todoInput.value,
        complete: false,
      };

      this.todos = [...this.todos, todo];
      this.todoList.innerHTML =
        this.getTodoElement(todo) + this.todoList.innerHTML;
      this.todoInput.value = '';
    });
  }

  toggleCompletedEventHandler() {
    this.todoList.addEventListener('toggleComplete', (e) => {
      const todoElement = e.target;
      const todoItemInArray = this.todos.find(
        (todo) => todo.id === +todoElement.id
      );
      todoItemInArray.complete = !todoItemInArray.complete;
      todoElement.setAttribute('complete', todoItemInArray.complete);
    });
  }

  deleteTodoEventHandler() {
    this.todoList.addEventListener('deleteTodo', (e) => {
      const todoElement = e.target;
      const todos = this.todos.filter((todo) => todo.id !== +todoElement.id);
      this.todos = todos;
      this.todoList.removeChild(todoElement);
    });
  }

  getTodoElement(todo) {
    return `<todo-item id="${todo.id}" 
            name="${todo.name}" 
            complete="${todo.completed}">
          </todo-item>`;
  }
}

new ToDoApp();
