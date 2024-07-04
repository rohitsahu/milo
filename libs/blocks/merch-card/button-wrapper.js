
import { html, LitElement, state } from "../../deps/lit-all.min.js";
//import * as button from "../../features/spectrum-web-components/dist/button.js"

export class ButtonWrapper extends LitElement {
  
  isEditing = false;
  originalText = '';

  originalMerchCard = null;
  merchCard = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  _submitChange() {
    console.log('Inside submit');
    // Persist the modified merch card and send to the server

    //const merchCard = this.originalMerchCard;
    let merchCard = this;
    while (merchCard?.tagName !== 'MERCH-CARD') {
      merchCard = merchCard.parentElement;
    }
    // Remove the Submit and Cancel buttons
    const submitButton = merchCard.querySelector('.submit-merch-card');
    const cancelButton = merchCard.querySelector('.cancel-merch-card');
    submitButton.parentNode.removeChild(submitButton);
    cancelButton.parentNode.removeChild(cancelButton);

    // Remove the Edit buttons from the individual card elements
    const editButtons = merchCard.querySelectorAll('sp-button[variant="secondary"]');
    editButtons.forEach(button => button.parentElement.removeChild(button));

    const editButton = document.createElement('custom-button');
    editButton.classList.add('edit-button');
    const heading = merchCard.querySelector('.card-heading');
    heading.appendChild(editButton);
  }

  _cancelChange(originalMerchCard, merchCard) {
    merchCard.parentElement.replaceChild(originalMerchCard, merchCard);
    // Get the heading of the merchCard
    const heading = originalMerchCard.querySelector('.card-heading');

    // Get the Submit and Cancel buttons from the heading
    const submitButton = heading.querySelector('.submit-merch-card');
    const cancelButton = heading.querySelector('.cancel-merch-card');

    // Remove the Submit and Cancel buttons from the heading
    if (submitButton) heading.removeChild(submitButton);
    if (cancelButton) heading.removeChild(cancelButton);
  }
  
  _clicked() {
      // Create and append the Submit button
    const submitButton = document.createElement('sp-button');
    submitButton.variant = 'primary';
    submitButton.innerHTML = 'Submit';
    submitButton.classList.add('submit-merch-card');
    submitButton.addEventListener('click', this._submitChange.bind(this.parentElement.parentElement));
    this.parentElement.appendChild(submitButton);

    // Create and append the Cancel button
    const cancelButton = document.createElement('sp-button');
    cancelButton.variant = 'secondary';
    cancelButton.innerHTML = 'Cancel';
    cancelButton.classList.add('cancel-merch-card');
    const that = this;
    cancelButton.addEventListener('click', () => this._cancelChange(this.originalMerchCard, this.merchCard));
    // cancelButton.addEventListener('click', function() {
    //   that._cancelChange();
    // });
    this.parentElement.appendChild(cancelButton);

    let merchCard = this.parentElement;
    while (merchCard?.tagName !== 'MERCH-CARD') {
      merchCard = merchCard.parentElement;
    }
    this.originalMerchCard = merchCard.cloneNode(true);
    this.merchCard = merchCard;
    console.log('Inside clicked', merchCard);

    const editableElements = merchCard.querySelectorAll('.editable');
    editableElements.forEach(element => {
      // Remove any existing edit buttons
      const existingButton = element.querySelector('.edit-button');
      if (existingButton) {
        element.removeChild(existingButton);
      }
      const button = document.createElement('sp-button');
      button.variant = 'secondary';
      button.innerHTML = 'Edit';
      button.size = 's';
      button.addEventListener('click', () => this._edit(element));
      element.appendChild(button);
    });
  }

  _edit(element) {
    this.isEditing = true;
    this.originalText = element.textContent.replace(/Edit\s*$/, '').trim();
    element.innerHTML = `<input type="text" value="${this.originalText}">
                         <button class="save-btn">Save</button>
                         <button class="cancel-btn">Cancel</button>`;
    element.querySelector('.save-btn').addEventListener('click', () => this._save(element));
    element.querySelector('.cancel-btn').addEventListener('click', () => this._cancel(element));
  }

  _save(element) {
    this.isEditing = false;
    element.textContent = element.querySelector('input').value;
    this._addEditButton(element); // Add the edit button to the element
  }
  
  _cancel(element) {
    this.isEditing = false;
    element.textContent = this.originalText;
    this._addEditButton(element); // Add the edit button to the element
  }
  
  _addEditButton(element) {
    // Remove any existing edit buttons
    const existingButton = element.querySelector('.edit-button');
    if (existingButton) {
      element.removeChild(existingButton);
    }

    // Add a new edit button
    const button = document.createElement('sp-button');
    button.variant = 'secondary';
    button.innerHTML = 'Edit';
    button.size = 's';
    button.addEventListener('click', () => this._edit(element));
    // const nodeEditButton = document.createElement('sp-icon-edit-in-light');
    // nodeEditButton.addEventListener('click', () => this._edit(element));
    element.appendChild(nodeEditButton);
  }

  _removeEditButton(element) {
    const editButton = element.querySelector('.edit-button');
    if (editButton) {
      element.removeChild(editButton);
    }
  }

  render() {
    const edit = "Edit";
    return html`
    <sp-button treatment="outline" variant="primary" style="position: absolute; right: 16px; top: 16px;"  @click=${this._clicked}>${edit}</sp-button>`;
  }

}

customElements.define('custom-button', ButtonWrapper);