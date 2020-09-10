const todoInputTemplate = document.createElement('template');
todoInputTemplate.innerHTML = `
  <style>
    .todoInputContainer {
      display: flex;
      max-width: 400px;
      margin:40px 0px;
    }
    #todoInput{
      width: 80%;
    }

    #createTodoBtn{
      margin: 4px;
    }

  </style>
  <div class="todoInputContainer">
    <input id="todoInput">
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
