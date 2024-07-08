
import { html, LitElement } from "../../deps/lit-all.min.js";
import doc from "./testData.js";
import { updateDoc } from "./network_util/doc_api_caller.js";

export class ButtonWrapper extends LitElement {
  
  isEditing = false;
  originalText = '';

  originalMerchCard = null;
  merchCard = null;
  originalElementHtml = '';

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
    const editButtons = merchCard.querySelectorAll('.edit-segment-button');
    editButtons.forEach(button => button.parentElement.removeChild(button));

    // Remove the Add buttons from the individual card elements
    const addButtons = merchCard.querySelectorAll('.add-button');
    addButtons.forEach(button => button.parentElement.removeChild(button));

    // Remove the Remove buttons from the individual card elements
    const removeButtons = merchCard.querySelectorAll('.remove-button');
    removeButtons.forEach(button => button.parentElement.removeChild(button));

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
      // Create a Blob from the docx data
      const blob = new Blob([out.docx], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

      // Create a URL representing the Blob
      const url = URL.createObjectURL(blob);

      // Create a download link and click it
      const link = document.createElement('a');
      link.href = url;
      link.download = 'plan.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log('Downloaded url is,', url);
      
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
      const button = this._createEditButton(); // Pencil icon
      button.addEventListener('click', () => this._edit(element));
      element.appendChild(button);
    });

    const addableElements = merchCard.querySelectorAll('.addable');
    addableElements.forEach(element => {
        const addButton = this._createAddButton(); // Plus icon
        addButton.addEventListener('click', () => this._add(element));
        element.appendChild(addButton);
    });

    const removableElements = merchCard.querySelectorAll('.removable');
    removableElements.forEach(element => {
        const removeButton = this._createRemoveButton(); // Minus icon
        removeButton.addEventListener('click', () => this._remove(element));
        element.appendChild(removeButton);
    });

    // Remove the edit button from the merch card footer
    const editButton = merchCard.querySelectorAll('.edit-card-button')[0];
    editButton.parentNode.removeChild(editButton);
  }

  _createAddButton() {
    const button = document.createElement('button');
    button.classList.add('add-button');
    button.style.backgroundColor = 'transparent'; // Remove background color
    button.style.border = 'none'; // Remove border
    button.innerHTML = '&#8853;'; // Plus icon
    button.style.scale = '1.4'; // Scale the icon
    button.style.color = 'green'; // Change the color to green
    button.style.paddingLeft = '2px'; // Add padding to the left
    return button;
  }

  _createRemoveButton() {
      const button = document.createElement('button');
      button.classList.add('remove-button');
      button.style.backgroundColor = 'transparent'; // Remove background color
      button.style.border = 'none'; // Remove border
      button.innerHTML = '&#8854;'; // Minus icon
      button.style.scale = '1.4'; // Scale the icon
      button.style.color = 'red'; // Change the color to green
      button.style.padding = '0px';
      return button;
  }

  _add(element) {
    const newElement = element.cloneNode(true);
    newElement.contentEditable = 'true';

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.className = 'text-content';
    inputField.style.width = '200px';

    const saveButton = document.createElement('button');
    saveButton.className = 'add-save-btn';
    saveButton.style.color = 'green';
    saveButton.style.padding = '0px';
    saveButton.style.backgroundColor = 'transparent';
    saveButton.style.border = 'none';
    saveButton.textContent = '✓';

    const cancelButton = document.createElement('button');
    cancelButton.className = 'add-cancel-btn';
    cancelButton.style.color = 'red';
    cancelButton.style.padding = '0px';
    cancelButton.style.backgroundColor = 'transparent';
    cancelButton.style.border = 'none';
    cancelButton.textContent = '✕';

    newElement.textContent = '';
    newElement.appendChild(inputField);
    newElement.appendChild(saveButton);
    newElement.appendChild(cancelButton);

    saveButton.addEventListener('click', () => this._confirmAdd(newElement, element));
    cancelButton.addEventListener('click', () => this._cancelAdd(newElement));

    element.parentElement.insertBefore(newElement, element.nextSibling);
}

  _confirmAdd(newElement, element) {
    const textContent = newElement.querySelector('.text-content').value;
    newElement.textContent = textContent;
    this._addEditButton(newElement);
    this._addAddButton(newElement);
    this._addRemoveButton(newElement);
    element.parentElement.insertBefore(newElement, element.nextSibling);
  }

  _cancelAdd(newElement) {
      newElement.remove();
  }

  _remove(element) {
      element.parentElement.removeChild(element);
  }

  _createEditButton() {
    const button = document.createElement('button');
    button.classList.add('edit-segment-button');
    button.style.backgroundColor = 'transparent'; // Remove background color
    button.style.border = 'none'; // Remove border
    button.innerHTML = '&#9998;'; // Pencil icon
    button.style.transform = 'rotate(90deg)'; // Rotate the icon
    button.style.scale = '1.4'; // Scale the icon
    return button;
  }

  _edit(element) {
    const buttons = Array.from(element.querySelectorAll('button'));
    buttons.forEach(button => element.removeChild(button));
    this.originalElementHtml = element.innerHTML;
    
    this.isEditing = true;
    this.originalText = element.textContent;
    
    const links = Array.from(element.querySelectorAll('a'));
    this.originalClasses = links.map(link => link.className); // Store the original classes

    if (links.length > 0) {
        // Remove flex display while editing
        const parentDiv = element.parentElement;
        if (parentDiv.style.display === 'flex') {
            this.originalDisplay = 'flex';
            parentDiv.style.display = 'block';
        }
        // If the element contains links, replace each link with two textboxes
        links.forEach(link => {
            const originalText = link.textContent.trim();
            const originalHref = link.href;
            link.outerHTML = `<input type="text" class="text-content" value="${originalText}" style="width:200px;">
                                <input type="text" class="link-url" value="${originalHref}" style="width:200px;">`;
        });
        element.innerHTML += `<button class="save-btn" style="color: green; padding: 0px; background-color: transparent; border: none;">&#10003;</button>
                                <button class="cancel-btn" style="color: red; padding: 0px; background-color: transparent; border: none;">&#10005;</button>`;
        element.querySelector('.save-btn').addEventListener('click', () => this._saveLinks(element));
        element.querySelector('.cancel-btn').addEventListener('click', () => this._cancel(element));
    } else {
        // If the element does not contain links, show one textbox
        element.innerHTML = `<input type="text" value="${this.originalText}" style="width:200px;">
                              <button class="save-btn" style="color: green; padding: 0px; background-color: transparent; border: none;">&#10003;</button>
                              <button class="cancel-btn" style="color: red; padding: 0px; background-color: transparent; border: none;">&#10005;</button>`;
        element.querySelector('.save-btn').addEventListener('click', () => this._save(element));
        element.querySelector('.cancel-btn').addEventListener('click', () => this._cancel(element));
    }
  }

  _saveLinks(element) {
    this.isEditing = false;
    const textInputs = Array.from(element.querySelectorAll('.text-content'));
    const urlInputs = Array.from(element.querySelectorAll('.link-url'));

    // Handle multiple links
    const newHtml = textInputs.map((textInput, index) => {
      const text = textInput.value;
      const url = urlInputs[index].value;
      const originalClass = this.originalClasses[index]; // Use the stored original classes
      return `<a href="${url}" class="${originalClass}">${text}</a>`;
    }).join(' ');

    element.innerHTML = newHtml;
    // Add back the original display style when done editing
    const parentDiv = element.parentElement;
    if (this.originalDisplay) {
        parentDiv.style.display = this.originalDisplay;
        this.originalDisplay = null;
    }

    this._addEditButton(element); // Add the edit button to the element
  }
  
  _save(element) {
    this.isEditing = false;
    element.textContent = element.querySelector('input').value;
    this._addEditButton(element); // Add the edit button to the element
    this._addAddButton(element);
    this._addRemoveButton(element);
  }
  
  _cancel(element) {
    this.isEditing = false;
    //element.textContent = this.originalText;
    element.innerHTML = this.originalElementHtml;
    this._addEditButton(element); // Add the edit button to the element
    this._addAddButton(element);
    this._addRemoveButton(element);
  }
  
  _addEditButton(element) {

    // Add a new edit button
    const nodeEditButton = this._createEditButton();
    nodeEditButton.addEventListener('click', () => this._edit(element));
    element.appendChild(nodeEditButton);
  }

  _addAddButton(element) {
    const addButton = this._createAddButton();
    addButton.addEventListener('click', () => this._add(element));
    element.appendChild(addButton);
  }

  _addRemoveButton(element) {
    const removeButton = this._createRemoveButton();
    removeButton.addEventListener('click', () => this._remove(element));
    element.appendChild(removeButton);
  }

  render() {
    const edit = "Edit Card";
    return html`
    <sp-button treatment="outline" variant="primary"  @click=${this._clicked}>${edit}</sp-button>`;
  }

}

customElements.define('custom-button', ButtonWrapper);