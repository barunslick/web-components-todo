import { LitElement, html, css } from 'lit-element';

/**
 * Class for custom button element.
 *
 * @class CustomButton
 * @extends {HTMLElement}
 */
class CustomButton extends LitElement {
  /**
   * Returns the style for the component.
   *
   * @readonly
   * @static
   * @memberof CustomButton
   */
  static get styles() {
    return css`
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
    `;
  }

  /**
   * Renders the component.
   *
   * @returns
   * @memberof TodoInput
   */
  render() {
    return html`
      <button>
        <slot></slot>
      </button>
    `;
  }
}

window.customElements.define('custom-button', CustomButton);
