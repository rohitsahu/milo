
import { html, LitElement, state } from "../../deps/lit-all.min.js";
//import * as button from "../../features/spectrum-web-components/dist/button.js"

export class ButtonWrapper extends LitElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  _clicked() {
    let originalDomElemt = this.parentElement;
    while (originalDomElemt?.tagName !== 'MERCH-CARD') {
      originalDomElemt = originalDomElemt.parentElement;
    }
    console.log('clicked, originalDomElemt', originalDomElemt);
  }

  render() {
    const edit = "Edit";
    return html`<sp-button treatment="outline" variant="primary" style="position: absolute; right: 16px; top: 16px;"  @click=${this._clicked}>${edit}</sp-button>`;
  }

}

customElements.define('custom-button', ButtonWrapper);