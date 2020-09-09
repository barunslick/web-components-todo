const template = document.createElement('template');
template.innerHTML = `
  <style>
    .done{
      color: red;
    }
  </style>
  <div>
  <p class="todoName">
  </div>
`;

class TodoItem extends HTMLElement {
  static get observedAttributes() {
    return ['complete'];
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(document.importNode(template.content, true));
    this.shadowRoot.querySelector('.todoName').innerText = this.getAttribute(
      'name'
    );

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

  addToggleCompleteEventListener() {
    this.shadowRoot
      .querySelector('.todoName')
      .addEventListener('click', (e) => {
        this.dispatchEvent(
          new CustomEvent('toggleComplete', { bubbles: true })
        );
      });
  }
}

window.customElements.define('todo-item', TodoItem);
