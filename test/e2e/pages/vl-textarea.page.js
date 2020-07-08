const VlTextarea = require('../components/vl-textarea');
const {Page, Config} = require('vl-ui-core').Test;

class VlTextareaPage extends Page {
  async getTextarea() {
    return this._getTextarea('#textarea');
  }

  async getTextareaBlock() {
    return this._getTextarea('#textarea-block');
  }

  async getTextareaError() {
    return this._getTextarea('#textarea-error');
  }

  async getTextareaSuccess() {
    return this._getTextarea('#textarea-success');
  }

  async getTextareaDisabled() {
    return this._getTextarea('#textarea-disabled');
  }

  async getTextareaFocus() {
    return this._getTextarea('#textarea-focus');
  }

  async getTextareaRich() {
    return this._getTextarea('#textarea-rich');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-textarea.html');
  }

  async _getTextarea(selector) {
    return new VlTextarea(this.driver, selector);
  }
}

module.exports = VlTextareaPage;
