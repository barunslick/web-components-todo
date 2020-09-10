import { html, render } from './node_modules/lit-html/lit-html.js';

/**
 * Class for TodoInput which creates input field and button that inturn allows to add new todo.
 *
 * @class TodoInput
 * @extends {HTMLElement}
 */
class TodoInput extends HTMLElement {
  /**
   *Creates an instance of TodoInput.
   * @memberof TodoInput
   */
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    const template = html`
      <style>
        .todoInputContainer {
          display: flex;
          margin: 40px 0px;
        }
        #todoInput {
          width: calc(100% - 52px);
          box-shadow: 0 0 15px 0px rgba(0, 0, 0, 0.06);
          border: none;
          border-bottom: 1px solid grey;
        }

        #createTodoBtn {
          margin: 4px;
        }
      </style>

      <div class="todoInputContainer">
        <input id="todoInput" placeholder="New Task" />
        <custom-button id="createTodoBtn">Add </custom-button>
      </div>
    `;

    render(template, this.shadowRoot);

    this.todoInput = this.shadowRoot.querySelector('#todoInput');
    this.addButton = this.shadowRoot.querySelector('#createTodoBtn');
  }

  /**
   * Creates event listeners after attached to Dom.
   *
   * @memberof TodoInput
   */
  connectedCallback() {
    this.addButton.addEventListener('click', this.dispatchCreateTodoEvent);
  }

  /**
   * Clears all event listeners upon unmounting from Dom.
   *
   * @memberof TodoInput
   */
  disconnectedCallback() {
    this.addButton.removeEventListener('click', this.dispatchCreateTodoEvent);
  }

  /**
   * Dispatches a custom event for creating Todo.
   *
   * @memberof TodoInput
   */
  dispatchCreateTodoEvent = (e) => {
    if (!this.todoInput.value) {
      return;
    }
    this.dispatchEvent(new CustomEvent('createTodo', { bubbles: true }));
  };

  /**
   * Getter for input value.
   *
   * @memberof TodoInput
   * @returns {String}
   */
  get value() {
    return this.todoInput.value;
  }

  /**
   * Setter for input value.
   *
   * @memberof TodoInput
   */
  set value(text) {
    this.todoInput.value = text;
  }
}

window.customElements.define('todo-input', TodoInput);
