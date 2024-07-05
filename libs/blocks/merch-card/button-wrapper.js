
import { html, LitElement } from "../../deps/lit-all.min.js";
import doc from "./testData.js";
import { updateDoc } from "./network_util/doc_api_caller.js";

export class ButtonWrapper extends LitElement {
  
  isEditing = false;
  originalText = '';

  originalMerchCard = null;
  merchCard = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // console.log("helix", WebImporter.html2md);
  }

  async _submitChange() {
    console.log('Inside submit');
    // Persist the modified merch card and send to the server

    //const merchCard = this.originalMerchCard;
    let merchCard = this;
    while (merchCard?.tagName !== 'MERCH-CARD') {
      merchCard = merchCard.parentElement;
    }
    // Remove the Submit and Cancel buttons
    const submitButton = merchCard.querySelectorAll('.submit-merch-card')[0];
    const cancelButton = merchCard.querySelectorAll('.cancel-merch-card')[0];
    submitButton.parentNode.removeChild(submitButton);
    cancelButton.parentNode.removeChild(cancelButton);

    // Remove the Edit buttons from the individual card elements
    const editButtons = merchCard.querySelectorAll('sp-button[variant="secondary"]');
    editButtons.forEach(button => button.parentElement.removeChild(button));

    const editButton = document.createElement('custom-button');
    editButton.classList.add('edit-card-button');
    const editCardDiv = merchCard.querySelectorAll('.edit-card-div')[0];
    editCardDiv.appendChild(editButton);
    console.log('Inside clicked');

    const docHtml = document.documentElement.outerHTML;
    try {
      const out = await WebImporter.html2docx(window.location.href, docHtml, null, {
        createDocumentFromString: this.createDocumentFromString,
      });
      console.log(out.md);
      updateDoc(out.docx);
    } catch (error) {
      console.error(error);
    }
  }

  _cancelChange(originalMerchCard, merchCard) {
    merchCard.parentElement.replaceChild(originalMerchCard, merchCard);

    // Get the Submit and Cancel buttons from the heading
    const submitButton = originalMerchCard.querySelectorAll('.submit-merch-card')[0];
    const cancelButton = originalMerchCard.querySelectorAll('.cancel-merch-card')[0];

    // Remove the Submit and Cancel buttons from the heading
    if (submitButton) submitButton.parentNode.removeChild(submitButton);
    if (cancelButton) cancelButton.parentNode.removeChild(cancelButton);
  }
  
  createDocumentFromString(html) {
    const { document } = new JSDOM(html, { runScripts: undefined }).window;
    return document;
  }

  async _clicked() {
      // Create and append the Submit button
    const submitButton = document.createElement('sp-button');
    submitButton.variant = 'accent';
    submitButton.innerHTML = 'Submit';
    submitButton.classList.add('submit-merch-card');
    submitButton.addEventListener('click', this._submitChange.bind(this.parentElement.parentElement));
    this.parentElement.appendChild(submitButton);

    // Create and append the Cancel button
    const cancelButton = document.createElement('sp-button');
    cancelButton.variant = 'secondary';
    cancelButton.innerHTML = 'Cancel';
    cancelButton.classList.add('cancel-merch-card');
    cancelButton.addEventListener('click', () => this._cancelChange(this.originalMerchCard, this.merchCard));
    this.parentElement.appendChild(cancelButton);

    let merchCard = this.parentElement;
    while (merchCard?.tagName !== 'MERCH-CARD') {
      merchCard = merchCard.parentElement;
    }
    this.originalMerchCard = merchCard.cloneNode(true);
    this.merchCard = merchCard;

    const editableElements = merchCard.querySelectorAll('.editable');
    editableElements.forEach(element => {
      const button = document.createElement('sp-button', { classList: 'edit-segment-button' });
      button.variant = 'secondary';
      button.innerHTML = 'Edit';
      button.size = 's';
      button.addEventListener('click', () => this._edit(element));
      element.appendChild(button);
    });

    // Remove the edit button from the merch card footer
    const editButton = merchCard.querySelectorAll('.edit-card-button')[0];
    editButton.parentNode.removeChild(editButton);
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
    // const existingButton = element.querySelector('.edit-segment-button');
    // if (existingButton) {
    //   element.removeChild(existingButton);
    // }

    // Add a new edit button
    const nodeEditButton = document.createElement('sp-button',  { classList: 'edit-segment-button' });
    nodeEditButton.variant = 'secondary';
    nodeEditButton.innerHTML = 'Edit';
    nodeEditButton.size = 's';
    nodeEditButton.addEventListener('click', () => this._edit(element));
    // const nodeEditButton = document.createElement('sp-icon-edit-in-light');
    // nodeEditButton.addEventListener('click', () => this._edit(element));
    element.appendChild(nodeEditButton);
  }

  render() {
    const edit = "Edit Card";
    return html`
    <sp-button treatment="outline" variant="primary"  @click=${this._clicked}>${edit}</sp-button>`;
  }

}

customElements.define('custom-button', ButtonWrapper);