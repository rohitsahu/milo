
import { html, LitElement, state } from "../../deps/lit-all.min.js";
//import * as button from "../../features/spectrum-web-components/dist/button.js"

export class ButtonWrapper extends LitElement {
  
  isEditing = false;
  originalText = '';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  _clicked() {
    let merchCard = this.parentElement;
    while (merchCard?.tagName !== 'MERCH-CARD') {
      merchCard = merchCard.parentElement;
    }
    console.log('Inside clicked', merchCard);

    const editableElements = merchCard.querySelectorAll('.editable');
    editableElements.forEach(element => {
      const button = document.createElement('sp-button');
      button.variant = 'secondary';
      button.innerHTML = 'Edit';
      button.addEventListener('click', () => this._edit(element));
      element.appendChild(button);
    });
  }

  _edit(element) {
    this.isEditing = true;
    this.originalText = element.textContent.trim();
    element.innerHTML = `<input type="text" value="${this.originalText}">
                         <button class="save-btn">Save</button>
                         <button class="cancel-btn">Cancel</button>`;
    element.querySelector('.save-btn').addEventListener('click', () => this._save(element));
    element.querySelector('.cancel-btn').addEventListener('click', () => this._cancel(element));
  }

  _save(element) {
    this.isEditing = false;
    element.textContent = element.querySelector('input').value;
    this._clicked(); // Add the edit button again
  }

  _cancel(element) {
    this.isEditing = false;
    element.textContent = this.originalText;
    this._clicked(); // Add the edit button again
  }

  render() {
    const edit = "Edit";
    return html`
    <sp-button treatment="outline" variant="primary" style="position: absolute; right: 16px; top: 16px;"  @click=${this._clicked}>${edit}</sp-button>`;
  }

}

customElements.define('custom-button', ButtonWrapper);