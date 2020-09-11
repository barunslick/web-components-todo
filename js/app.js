import { html, render } from '../node_modules/lit-html/lit-html.js';
import { repeat } from '../node_modules/lit-html/directives/repeat.js';

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
    this.todos = this.getTodos();
    this.todoInput = document.querySelector('#todoInput');
    this.todoList = document.querySelector('#todoList');

    this.todoInput.actions = {
      createTodo: this.createTodo,
    };

    this.renderTodos(this.todos);
  }

  /**
   * Creates a event listener for createTodo custom event, which adds a new todo.
   *
   * @memberof ToDoApp
   */
  createTodo = () => {
    const todo = {
      id: +new Date(),
      name: this.todoInput.value,
      complete: false,
    };

    this.todos = [todo, ...this.todos];
    this.renderTodos(this.todos);

    this.saveTodos();
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

    this.saveTodos();
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

    this.saveTodos();
  };

  /**
   * Save the todos to localStorage.
   *
   * @memberof ToDoApp
   */
  saveTodos = () => {
    const todos = JSON.stringify(this.todos);

    localStorage.setItem('todos', todos);
  };

  /**
   * Gets todo from localStorage.
   *
   * @memberof ToDoApp
   * @returns {Array} todos
   */
  getTodos = () => {
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
