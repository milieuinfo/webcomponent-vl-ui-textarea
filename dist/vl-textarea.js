import {nativeVlElement, define, awaitUntil} from '/node_modules/vl-ui-core/dist/vl-core.js';
import {VlLinkToolbarFactory} from '/node_modules/vl-ui-textarea/dist/vl-tinymce-link-toolbar.js';
import '/node_modules/tinymce/tinymce.min.js';

/**
 * VlTextArea
 * @class
 * @classdesc De vl-ui-textarea definieert een rechthoekig invoervak in een formulier, waarin de gebruiker over meerdere regels tekst kan invoeren.
 *
 * @extends HTMLTextAreaElement
 * @mixes nativeVlElement
 *
 * @property {boolean} data-vl-block - Attribuut wordt gebruikt om ervoor te zorgen dat de textarea getoond wordt als een block element en bijgevolg de breedte van de parent zal aannemen.
 * @property {boolean} data-vl-error - Attribuut wordt gebruikt om aan te duiden dat de textarea verplicht is of ongeldige tekst bevat.
 * @property {boolean} data-vl-success - Attribuut wordt gebruikt om aan te duiden dat de textarea correct werd ingevuld.
 * @property {boolean} data-vl-disabled - Attribuut wordt gebruikt om te voorkomen dat de gebruiker tekst in de textarea kan ingeven.
 * @property {boolean} data-vl-focus - Attribuut wordt gebruikt om de textarea focus te geven.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-textarea/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-textarea/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-textarea.html|Demo}
 */
export class VlTextarea extends nativeVlElement(HTMLTextAreaElement) {
  static get _observedAttributes() {
    return ['error', 'success'];
  }

  static get _observedClassAttributes() {
    return ['disabled', 'block', 'error', 'success', 'focus', 'rich'];
  }

  connectedCallback() {
    this.classList.add('vl-textarea');

    if (this.isRich) {
      this._configureWysiwyg();
    }
  }

  disconnectedCallback() {
    if (this.isRich) {
      this._destroyWysiwyg();
    }
  }

  get isRich() {
    return this.hasAttribute('data-vl-rich');
  }

  get editor() {
    return this._editor;
  }

  get _classPrefix() {
    return 'vl-textarea--';
  }

  get _wysiwygConfig() {
    return {
      target: this,
      menubar: false,
      resize: true,
      elementpath: false,
      branding: false,
      paste_as_text: true,
      powerpaste_word_import: 'clean',
      powerpaste_html_import: 'clean',
      content_css: '/node_modules/vl-ui-textarea/dist/style.css',
      verify_html: false,
      forced_root_block: 'p',
      body_class: 'vl-typography',
      plugins: 'hr lists advlist paste',
      formats: {
        bold: {inline: 'b'},
        italic: {inline: 'i'},
        underline: {inline: 'u'},
        strikethrough: {inline: 's'},
      },
      toolbar: 'undo redo | bold italic underline strikethrough | h1 h2 h3 h4 h5 h6 | vlLink blockquote hr | numlist bullist',
      setup: (editor) => {
        this._registerVlLinkToolbar(editor);
        this._initWysiwyg(editor);
        const observer = new MutationObserver(() => editor.setContent(editor.targetElm.value));
        observer.observe(this, {childList: true, characterData: true, subtree: true});
      },
    };
  }

  _addBlockAttribute() {
    this.setAttribute('data-vl-block', '');
  }

  _configureWysiwyg() {
    this._addBlockAttribute();
    tinyMCE.baseURL = '/node_modules/tinymce';
    tinyMCE.init(this._wysiwygConfig);
  }

  _initWysiwyg(editor) {
    this._editor = editor;
    editor.on('focus', () => editor.editorContainer.classList.add('focus'));
    editor.on('blur', () => {
      editor.editorContainer.classList.remove('focus');
      editor.save();
      this.dispatchEvent(new Event('change'));
    });
  }

  _destroyWysiwyg() {
    if (this._editor) {
      this._editor.destroy();
    }
  }

  _registerVlLinkToolbar(editor) {
    editor.ui.registry.addButton('vlLink', new VlLinkToolbarFactory().create(editor));
  }

  _errorChangedCallback(oldValue, newValue) {
    this.__toggleValidationClass(newValue, 'error');
  }

  _successChangedCallback(oldValue, newValue) {
    this.__toggleValidationClass(newValue, 'success');
  }

  _richChangedCallback(oldValue, newValue) {
    if (newValue != undefined) {
      if (this.isConnected) {
        this._configureWysiwyg();
      }
    } else {
      this._destroyWysiwyg();
    }
  }

  __toggleValidationClass(value, clazz) {
    if (this.isRich) {
      awaitUntil(() => this._editor && this._editor.getContainer()).then(() => {
        this._editor.getContainer().classList.toggle(clazz);
        this._editor.getBody().classList.toggle(clazz);
      });
    }
  }
}

define('vl-textarea', VlTextarea, {extends: 'textarea'});
