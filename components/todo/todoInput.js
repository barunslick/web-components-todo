import { LitElement, html, css } from 'lit-element';

/**
 * Class for TodoInput which creates input field and button that inturn allows to add new todo.
 *
 * @class TodoInput
 * @extends {LitElement}
 */
class TodoInput extends LitElement {
  /**
   * Returns the style for the component.
   *
   * @readonly
   * @static
   * @memberof TodoInput
   */
  static get styles() {
    return css`
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
      actions: { type: Object },
    };
  }

  /**
   * Renders the component.
   *
   * @returns
   * @memberof TodoInput
   */
  render() {
    return html`
      <div class="todoInputContainer">
        <input id="todoInput" placeholder="New Task" />
        <custom-button id="createTodoBtn" @click="${this.createTodo}">
          +
        </custom-button>
      </div>
    `;
  }

  /**
   * Calls createTodo in parent, which creates a new todo.
   *
   * @memberof TodoInput
   */
  createTodo = () => {
    if (!this.value) {
      return;
    }
    this.actions.createTodo(this.value);
  };

  /**
   * Getter for input value.
   *
   * @memberof TodoInput
   * @returns {String}
   */
  get value() {
    return this.shadowRoot.getElementById('todoInput').value;
  }

  /**
   * Setter for input value.
   *
   * @memberof TodoInput
   */
  set value(text) {
    this.shadowRoot.getElementById('todoInput').value = text;
  }
}

window.customElements.define('todo-input', TodoInput);
