const btnTemplate = document.createElement('template');
btnTemplate.innerHTML = `
  <style>
    button {
      background: none;
      width: 40px;
      height: 40px;
      border: none;
      cursor: pointer;
      background: #6396ba;
      color: white;
      border-radius: 20px;
    }
  </style>
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
