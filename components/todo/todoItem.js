const todoItemTemplate = document.createElement('template');
todoItemTemplate.innerHTML = `
  <style>
    .done{
      color: gray;
      text-decoration: line-through;
    }
    .todoName {
      cursor: pointer;
    }
    
    .deleteTodo{
      display: in
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
    this.shadowRoot.querySelector('.todoName').innerText = this.getAttribute(
      'name'
    );

    this.deleteTodoBtn = this.shadowRoot.querySelector('#deleteTodo');

    this.deleteTodoEventListener();
    this.addToggleCompleteEventListener();
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    console.log('hey');
    if (attrName === 'complete') {
      if (newVal === 'true') {
        this.shadowRoot.querySelector('.todoName').classList.add('done');
      } else {
        this.shadowRoot.querySelector('.todoName').classList.remove('done');
      }
    }
  }

  addToggleCompleteEventListener = () => {
    this.shadowRoot
      .querySelector('.todoName')
      .addEventListener('click', (e) => {
        this.dispatchEvent(
          new CustomEvent('toggleComplete', { bubbles: true })
        );
      });
  };

  deleteTodoEventListener = () => {
    this.deleteTodoBtn.addEventListener('click', (e) => {
      this.dispatchEvent(new CustomEvent('deleteTodo', { bubbles: true }));
    });
  };
}

window.customElements.define('todo-item', TodoItem);
