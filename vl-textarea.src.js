import { NativeVlElement } from '/node_modules/vl-ui-core/vl-core.js';

/**
 * vl-ui-textarea
 *
 * De vl-ui-textarea definieert een rechthoekig invoervak in een formulier, waarin de gebruiker over meerdere regels tekst kan invoeren.
 *
 * ### Attributen
 * Attribuut | Uitleg | Waarde
 * ----------|--------|--------
 * `block` | Wordt gebruikt om ervoor te zorgen dat de textarea getoond wordt als een block element en bijgevolg de breedte van de parent zal aannemen. | { boolean }
 * `error` | Wordt gebruikt om aan te duiden dat de textarea verplicht is of ongeldige tekst bevat. | { boolean }
 * `success` | Wordt gebruikt om aan te duiden dat de textarea correct werd ingevuld. | { boolean }
 * `disabled` | Wordt gebruikt om te voorkomen dat de gebruiker tekst in de textarea kan ingeven. | { boolean }
 * `focus` | Wordt gebruikt om de textarea . | { boolean }
 *
 * @demo demo/vl-ui-textarea.html
 */
export class VlTextarea extends NativeVlElement(HTMLTextAreaElement) {

  static get _observedClassAttributes() {
    return ['disabled', 'block', 'error', 'success', 'focus'];
  }

  connectedCallback() {
    this.classList.add('vl-textarea');
  }

  get _classPrefix() {
    return 'vl-textarea--';
  }

}

customElements.define('vl-textarea', VlTextarea, {extends: 'textarea'});