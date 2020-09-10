import { html, render } from './node_modules/lit-html/lit-html.js';

/**
 * Class for custom button element.
 *
 * @class CustomButton
 * @extends {HTMLElement}
 */
class CustomButton extends HTMLElement {
  /**
   *Creates an instance of CustomButton.
   * @memberof CustomButton
   */
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const template = html`
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
        <slot></slot>
      </button>
    `;

    render(template, this.shadowRoot);
  }
}

window.customElements.define('custom-button', CustomButton);
