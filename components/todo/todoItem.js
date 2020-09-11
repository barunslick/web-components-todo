import { html, render } from '../../node_modules/lit-html/lit-html.js';

/**
 * Class for each item in Todo.
 *
 * @class TodoItem
 * @extends {HTMLElement}
 */
class TodoItem extends HTMLElement {
  /**
   * Monitor complete attribute for changes.
   *
   * @readonly
   * @static
   * @memberof TodoItem
   */
  static get observedAttributes() {
    return ['complete'];
  }

  /**
   * Creates an instance of TodoItem.
   * @memberof TodoItem
   */
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    const template = html`
      <style>
        .todoItem {
          display: flex;
          align-items: center;
          margin: 8px 0px;
          padding: 4px 8px;
          border: 1px solid #99b1bc;
          border-radius: 8px;
        }
        p {
          flex: 3;
        }
        .done {
          color: gray;
          text-decoration: line-through;
          background: #ccdae0;
        }
        .todoName {
          cursor: pointer;
        }

        #deleteTodo {
          display: inline-block;
        }
      </style>

      <div class="todoItem">
        <p class="todoName"></p>
        <custom-button id="deleteTodo"> - </custom-button>
      </div>
    `;

    render(template, this.shadowRoot);

    this.todoName = this.shadowRoot.querySelector('.todoName');

    this.deleteTodoBtn = this.shadowRoot.querySelector('#deleteTodo');
  }

  /**
   * Changes class name when complete is toggled to represent if a todo is done/complete or not.
   *
   * @param {String} attrName
   * @param {*} oldVal
   * @param {*} newVal
   * @memberof TodoItem
   */
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'complete') {
      if (newVal === 'true') {
        this.shadowRoot.querySelector('.todoItem').classList.add('done');
      } else {
        this.shadowRoot.querySelector('.todoItem').classList.remove('done');
      }
    }
  }

  /**
   * Creates event listeners and sets todoName value after attached to Dom.
   *
   * @memberof TodoItem
   */
  connectedCallback() {
    this.todoName.innerText = this.getAttribute('name');
    this.todoName.addEventListener('click', this.toggleComplete);
    this.deleteTodoBtn.addEventListener('click', this.deleteTodo);
  }

  /**
   * Clears all event listeners upon unmounting from Dom.
   *
   * @memberof TodoItem
   */
  disconnectedCallback() {
    this.todoName.addEventListener('click', this.toggleComplete);
    this.deleteTodoBtn.removeEventListener('click', this.deleteTodo);
  }

  /**
   * Toggles a todo as complete or not complete.
   *
   * @memberof TodoItem
   */
  toggleComplete = () => this.actions.toggleComplete(this);

  /**
   * Deletes a todo.
   *
   * @memberof TodoItem
   */
  deleteTodo = () => this.actions.deleteTodo(this);
}

window.customElements.define('todo-item', TodoItem);
