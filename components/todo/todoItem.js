const todoItemTemplate = document.createElement('template');
todoItemTemplate.innerHTML = `
  <style>
    .todoItem{
      display:flex;
      align-items:center;
      margin:8px 0px;
      padding: 4px 8px;
      border: 1px solid #99b1bc;
      border-radius: 8px;
    }
    p{
      flex:3;
    }
    .done{
      color: gray;
      text-decoration: line-through;
      background: #CCDAE0;
    }
    .todoName {
      cursor: pointer;
    }
    
    #deleteTodo{
      display: inline-block;
    }

  </style>
  <div class="todoItem">
  <p class="todoName"></p>
  <custom-button id="deleteTodo"> - </custom-button>
  </div>
`;

class TodoItem extends HTMLElement {
  static get observedAttributes() {
    return ['complete'];
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(
      document.importNode(todoItemTemplate.content, true)
    );

    this.todoName = this.shadowRoot.querySelector('.todoName');
    this.todoName.innerText = this.getAttribute('name');

    this.deleteTodoBtn = this.shadowRoot.querySelector('#deleteTodo');
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'complete') {
      if (newVal === 'true') {
        this.shadowRoot.querySelector('.todoItem').classList.add('done');
      } else {
        this.shadowRoot.querySelector('.todoItem').classList.remove('done');
      }
    }
  }

  connectedCallback() {
    this.todoName.addEventListener('click', this.dispatchToggleEvent);
    this.deleteTodoBtn.addEventListener('click', this.dispatchDeleteEvent);
  }

  disconnectedCallback() {
    this.todoName.addEventListener('click', this.dispatchToggleEvent);
    this.deleteTodoBtn.removeEventListener('click', this.dispatchDeleteEvent);
  }

  dispatchToggleEvent = (e) => {
    this.dispatchEvent(new CustomEvent('toggleComplete', { bubbles: true }));
  };

  dispatchDeleteEvent = (e) => {
    this.dispatchEvent(new CustomEvent('deleteTodo', { bubbles: true }));
  };
}

window.customElements.define('todo-item', TodoItem);
