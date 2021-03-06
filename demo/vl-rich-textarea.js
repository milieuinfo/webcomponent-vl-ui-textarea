import {vlElement, define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/src/vl-textarea.js';

class VlRichTextarea extends vlElement(HTMLElement) {
  constructor() {
    super(`
      <style>
        @import '/src/style.css';
      </style>
      <div>
        <textarea is="vl-textarea" cols="40" rows="4" data-vl-rich></textarea>
      </div>
    `);
  }
}

define('vl-rich-textarea', VlRichTextarea);
