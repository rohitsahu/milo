// branch: MWPW-142267 commit: 426006b12ba6585f2a3ca596bedd47ba5d8f0bc3 Tue, 28 May 2024 22:11:01 GMT

// src/merch-mnemonic-list.js
import { html, css, LitElement } from "/libs/deps/lit-all.min.js";
var MerchMnemonicList = class extends LitElement {
  static styles = css`
        :host {
            display: flex;
            flex-direction: row;
            gap: 10px;
            margin-bottom: 10px;
            align-items: flex-end;
        }

        ::slotted([slot='icon']) {
            display: flex;
            justify-content: center;
            align-items: center;
            height: max-content;
        }

        ::slotted([slot='description']) {
            font-size: 14px;
            line-height: 21px;
            margin: 0;
        }

        :host .hidden {
            display: none;
        }
    `;
  static properties = {
    description: { type: String, attribute: true }
  };
  constructor() {
    super();
  }
  render() {
    return html`
            <slot name="icon"></slot>
            <slot name="description">${this.description}</slot>
        `;
  }
};
customElements.define("merch-mnemonic-list", MerchMnemonicList);
export {
  MerchMnemonicList
};
