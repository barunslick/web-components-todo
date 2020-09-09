const btnTemplate = document.createElement('template');
btnTemplate.innerHTML = `
  <button>
  <slot>
  </slot>
  </button>
`;

class Button extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(document.importNode(btnTemplate.content, true));
  }
}

window.customElements.define('custom-button', Button);
