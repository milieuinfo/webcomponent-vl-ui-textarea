import {nativeVlElement, define} from 'vl-ui-core';
import {vlLinkToolbar} from 'vl-ui-textarea/dist/vl-tinymce-link-toolbar.src.js';
import 'tinymce/tinymce.min.js';

/**
 * VlTextArea
 * @class
 * @classdesc De vl-ui-textarea definieert een rechthoekig invoervak in een formulier, waarin de gebruiker over meerdere regels tekst kan invoeren.
 *
 * @extends HTMLTextAreaElement
 *
 * @property {boolean} block - Attribuut wordt gebruikt om ervoor te zorgen dat de textarea getoond wordt als een block element en bijgevolg de breedte van de parent zal aannemen.
 * @property {boolean} error - Attribuut wordt gebruikt om aan te duiden dat de textarea verplicht is of ongeldige tekst bevat.
 * @property {boolean} success - Attribuut wordt gebruikt om aan te duiden dat de textarea correct werd ingevuld.
 * @property {boolean} disabled - Attribuut wordt gebruikt om te voorkomen dat de gebruiker tekst in de textarea kan ingeven.
 * @property {boolean} focus - Attribuut wordt gebruikt om de textarea focus te geven.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-textarea/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-textarea/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-textarea.html|Demo}
 */
export class VlTextarea extends nativeVlElement(HTMLTextAreaElement) {
  static get _observedClassAttributes() {
    return ['disabled', 'block', 'error', 'success', 'focus', 'rich'];
  }

  connectedCallback() {
    this.classList.add('vl-textarea');
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
      powerpaste_word_import: 'clean',
      powerpaste_html_import: 'clean',
      content_css: '/node_modules/vl-ui-textarea/dist/style.css',
      verify_html: false,
      forced_root_block: '',
      body_class: 'vl-typography',
      toolbar: 'undo redo | bold italic underline strikethrough | h1 h2 h3 h4 h5 h6 | vlLink blockquote hr | numlist bullist',
      plugins: 'autolink hr lists advlist link',
      formats: {
        bold: {inline: 'b'},
        italic: {inline: 'i'},
        underline: {inline: 'u'},
        strikethrough: {inline: 'strike'},
      },
      setup: (editor) => this._registerVlLinkToolbar(editor),
    };
  }

  _richChangedCallback(oldValue, newValue) {
    if (newValue != undefined) {
      this._addBlockAttribute();
      this._configureWysiwyg();
    }
  }

  _addBlockAttribute() {
    this.setAttribute('data-vl-block', '');
  }

  _configureWysiwyg() {
    tinyMCE.baseURL = '/node_modules/tinymce';
    tinyMCE.init(this._wysiwygConfig);
    tinymce.activeEditor.on('focus', () => tinymce.activeEditor.editorContainer.classList.add('focus')); // TODO test me
    tinymce.activeEditor.on('blur', () => tinymce.activeEditor.editorContainer.classList.remove('focus')); // TODO test me
    tinyMCE.activeEditor.on('change', () => tinymce.activeEditor.save()); // TODO test me
  }

  _registerVlLinkToolbar(editor) {
    editor.ui.registry.addButton('vlLink', vlLinkToolbar);
  }
}

define('vl-textarea', VlTextarea, {extends: 'textarea'});

