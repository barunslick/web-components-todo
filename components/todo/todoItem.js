import { LitElement, html, css } from 'lit-element';

/**
 * Class for each item in Todo.
 *
 * @class TodoItem
 * @extends {HTMLElement}
 */
class TodoItem extends LitElement {
  static get styles() {
    return css`
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
    `;
  }
  /**
   * Monitor complete attribute for changes.
   *
   * @readonly
   * @static
   * @memberof TodoItem
   */
  static get properties() {
    return {
      complete: { type: String },
    };
  }

  /**
   * Creates an instance of TodoItem.
   * @memberof TodoItem
   */
  constructor() {
    super();

    this.complete = 'false';
  }

  render() {
    return html`
      <div class="todoItem ${this.complete === 'true' ? 'done' : ''}">
        <p class="todoName" @click="${this.toggleComplete}">
          ${this.getAttribute('name')}
        </p>
        <custom-button id="deleteTodo" @click="${this.deleteTodo}">
          -
        </custom-button>
      </div>
    `;
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
