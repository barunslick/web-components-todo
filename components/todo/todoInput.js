const todoInputTemplate = document.createElement('template');
todoInputTemplate.innerHTML = `
  <style>
    .todoInputContainer {
      display: flex;
      margin:40px 0px;
    }
    #todoInput{
      width: calc(100% - 72px);
      box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
    }

    #createTodoBtn{
      margin: 4px;
    }

  </style>
  <div class="todoInputContainer">
    <input id="todoInput" placeHolder="New Task">
    <custom-button id= "createTodoBtn">Add </custom-button>
  </div>
 `;

class TodoInput extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(
      document.importNode(todoInputTemplate.content, true)
    );
    this.todoInput = this.shadowRoot.querySelector('#todoInput');
    this.addButton = this.shadowRoot.querySelector('#createTodoBtn');

    this.addButtonEventListener();
  }

  addButtonEventListener = () => {
    this.addButton.addEventListener('click', (e) => {
      if (!this.todoInput.value) {
        return;
      }
      this.dispatchEvent(new CustomEvent('createTodo', { bubbles: true }));
    });
  };

  get value() {
    return this.todoInput.value;
  }

  set value(text) {
    this.todoInput.value = text;
  }
}

window.customElements.define('todo-input', TodoInput);
