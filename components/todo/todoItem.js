import { LitElement, html, css } from 'lit-element';

/**
 * Class for each item in Todo.
 *
 * @class TodoItem
 * @extends {LitElement}
 */
class TodoItem extends LitElement {
  /**
   * Returns the style for the component.
   *
   * @readonly
   * @static
   * @memberof TodoItem
   */
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
   * Declares properties for component.
   *
   * @readonly
   * @static
   * @memberof TodoItem
   */
  static get properties() {
    return {
      id: { type: String },
      name: { type: String },
      complete: { type: String },
      actions: { type: Object },
    };
  }

  /**
   * Creates an instance of TodoItem.
   * @memberof TodoItem
   */
  constructor() {
    super();

    this.id = `${+new Date()}`;
    this.name = 'Untitiled';
    this.complete = 'false';
  }

  /**
   *
   *
   * @returns
   * @memberof TodoItem
   */
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
   * Calls parent to toggle a todo as complete or not complete.
   *
   * @memberof TodoItem
   */
  toggleComplete = () => this.actions.toggleComplete(this);

  /**
   * Calls parent deleteTodo function.
   *
   * @memberof TodoItem
   */
  deleteTodo = () => this.actions.deleteTodo(this);
}

window.customElements.define('todo-item', TodoItem);
