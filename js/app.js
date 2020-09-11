import { html, render } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';

/**
 * Main app class.
 *
 * @class ToDoApp
 */
class ToDoApp {
  /**
   * Creates an instance of ToDoApp and renders all the pre-exisitng todos.
   * @memberof ToDoApp
   */
  constructor() {
    this.todos = this.getTodosFromLocalStorage();
    this.todoInput = document.querySelector('#todoInput');
    this.todoList = document.querySelector('#todoList');

    this.todoInput.actions = {
      createTodo: this.createTodo,
    };

    this.renderTodos(this.todos);
  }

  /**
   * Creates a new todo.
   *
   * @memberof ToDoApp
   */
  createTodo = (todoName) => {
    const todo = {
      id: +new Date(),
      name: todoName,
      complete: false,
    };

    this.todos = [todo, ...this.todos];
    this.renderTodos(this.todos);

    this.saveTodosToLocalStorage();
    this.todoInput.value = '';
  };

  /**
   * Toggles a todo as complete or not complete.
   *
   * @memberof ToDoApp
   */
  toggleComplete = (element) => {
    const todoItemInArray = this.todos.find((todo) => todo.id === +element.id);
    todoItemInArray.complete = !todoItemInArray.complete;
    element.setAttribute('complete', todoItemInArray.complete);

    this.saveTodosToLocalStorage();
  };

  /**
   * Deletes a given todo.
   *
   * @memberof ToDoApp
   */
  deleteTodo = (element) => {
    const todos = this.todos.filter((todo) => todo.id !== +element.id);
    this.todos = todos;
    this.todoList.removeChild(element);

    this.saveTodosToLocalStorage();
  };

  /**
   * Save the todos to localStorage.
   *
   * @memberof ToDoApp
   */
  saveTodosToLocalStorage = () => {
    const todos = JSON.stringify(this.todos);

    localStorage.setItem('todos', todos);
  };

  /**
   * Gets todo from localStorage.
   *
   * @memberof ToDoApp
   * @returns {Array} todos
   */
  getTodosFromLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    return todos;
  };

  /**
   * Renders all the todo items.
   *
   * @memberof ToDoApp
   */
  renderTodos = (todos) => {
    const todosTemplate = html`
      ${repeat(
        todos,
        (todos) => todos.id,
        (todo) => this.getTodoElement(todo)
      )}
    `;

    render(todosTemplate, this.todoList);
  };

  /**
   * Creates a lit-html template for given todo item.
   *
   * @param {Object} todo
   * @returns {Template}
   * @memberof ToDoApp
   */
  getTodoElement(todo) {
    return html`<todo-item
      id="${todo.id}"
      name="${todo.name}"
      complete="${todo.complete}"
      .actions=${{
        deleteTodo: this.deleteTodo,
        toggleComplete: this.toggleComplete,
      }}
    >
    </todo-item>`;
  }
}

new ToDoApp();
