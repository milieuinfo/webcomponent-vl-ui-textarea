import {nativeVlElement, define} from '/node_modules/vl-ui-core/dist/vl-core.js';

/**
 * VlTextArea
 * @class
 * @classdesc De vl-ui-textarea definieert een rechthoekig invoervak in een formulier, waarin de gebruiker over meerdere regels tekst kan invoeren.
 *
 * @extends HTMLTextAreaElement
 * @mixin nativeVlElement
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
    return ['disabled', 'block', 'error', 'success', 'focus'];
  }

  connectedCallback() {
    this.classList.add('vl-textarea');
  }

  get _classPrefix() {
    return 'vl-textarea--';
  }
}

define('vl-textarea', VlTextarea, {extends: 'textarea'});
