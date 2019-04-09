import { NativeVlElement } from '/node_modules/vl-ui-core/vl-core.js';

/**
 * vl-ui-textarea
 *
 * @demo demo/vl-ui-textarea.html
 */
export class VlTextarea extends NativeVlElement(HTMLTextAreaElement) {

  static get _observedClassAttributes() {
    return ['disabled', 'block', 'error', 'success'];
  }

  connectedCallback() {
    this.classList.add('vl-textarea');
  }

  get _classPrefix() {
    return 'vl-textarea--';
  }

}

customElements.define('vl-textarea', VlTextarea, {extends: 'textarea'});