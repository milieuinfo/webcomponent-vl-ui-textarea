import {vlElement, define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/node_modules/vl-ui-modal/dist/vl-modal.js';
import '/node_modules/vl-ui-form-grid/dist/vl-form-grid.js';
import '/node_modules/vl-ui-form-message/dist/vl-form-message.js';
import '/node_modules/vl-ui-input-field/dist/vl-input-field.js';
import '/node_modules/vl-ui-button/dist/vl-button.js';

export class VlLinkToolbarFactory {
  create(editor) {
    return {
      icon: 'link',
      title: 'Link',
      tooltip: 'Link',
      onSetup: () => {
        const target = editor.targetElm;
        const parent = target.parentElement || target.getRootNode();
        if (!parent.querySelector('vl-textarea-modal')) {
          const modal = document.createElement('vl-textarea-modal');
          parent.append(modal);
        }
      },
      onAction: () => {
        const target = editor.targetElm;
        const parent = target.parentElement || target.getRootNode();
        const modal = parent.querySelector('vl-textarea-modal');
        customElements.whenDefined('vl-textarea-modal').then(() => {
          modal.onSubmit(() => {
            editor.insertContent(`<a target="_blank" href="${modal.url}">${modal.text}</a>`);
            modal.clear();
          });
          modal.open();
        });
      },
    };
  };
};

class VlTextareaModal extends vlElement(HTMLElement) {
  constructor() {
    super(`
      <style>
        @import '/node_modules/vl-ui-core/dist/style.css';
        @import '/node_modules/vl-ui-form-grid/dist/style.css';
        @import '/node_modules/vl-ui-form-message/dist/style.css';
        @import '/node_modules/vl-ui-input-field/dist/style.css';
        @import '/node_modules/vl-ui-button/dist/style.css';

        iframe {
          display: none;
        }
      </style>
      <vl-modal id="modal-cl" data-title="Link toevoegen" closable>
        <form id="link-form" slot="content" data-validate-form target="hidden">
          <div is="vl-form-grid" is-stacked>
            <div is="vl-form-column" size="12">
              <label is="vl-form-label" for="text" data-vl-block>Tekst</label>
              <input id="text" is="vl-input-field" placeholder="Link" data-vl-block data-required="true" data-vl-error-message="Gelieve een tekst in te vullen" data-vl-error-placeholder="text-error">
              <p is="vl-form-validation-message" error data-vl-error-id="text-error"></p>
            </div>
            <div is="vl-form-column" size="12">
              <label is="vl-form-label" for="url" data-vl-block>URL</label>
              <input id="url" is="vl-input-field" placeholder="https://vlaanderen.be" data-vl-block data-required="true" data-vl-error-message="Gelieve een URL in te vullen" data-vl-error-placeholder="url-error">
              <p is="vl-form-validation-message" error data-vl-error-id="url-error"></p>
            </div>
          </div>
        </form>
        <button is="vl-button" slot="button" type="submit" form="link-form">Toevoegen</button>
        <iframe name="hidden" width="0" height="0" border="0"></iframe>
      </vl-modal>
    `);
  }

  get text() {
    return this._textInputField.value;
  }

  get url() {
    return this._urlInputField.value;
  }

  get _textInputField() {
    return this.shadowRoot.querySelector(`input#text`);
  }

  get _urlInputField() {
    return this.shadowRoot.querySelector(`input#url`);
  }

  get _form() {
    return this.shadowRoot.querySelector('form');
  }

  get _submitButton() {
    return this.shadowRoot.querySelector('button');
  }

  get _modal() {
    return this.shadowRoot.querySelector('vl-modal');
  }

  open() {
    this._modal.open();
  }

  close() {
    this._modal.close();
  }

  clear() {
    this._textInputField.value = '';
    this._urlInputField.value = '';
  }

  onSubmit(callback) {
    this._submitButton.addEventListener('click', (event) => event.stopPropagation());
    this._form.addEventListener('submit', (event) => {
      if (event.target.checkValidity()) {
        this.close();
        callback(event);
      }
    });
  }
}

customElements.whenDefined('vl-modal').then(() => define('vl-textarea-modal', VlTextareaModal));
