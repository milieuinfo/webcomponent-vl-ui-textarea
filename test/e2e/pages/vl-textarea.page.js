const VlTextarea = require('../components/vl-textarea');
const { Page, Config } = require('vl-ui-core');

class VlTextareaPage extends Page {
    async _getTextarea(selector) {
        return new VlTextarea(this.driver, selector);
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-textarea.html');
    }
}

module.exports = VlTextareaPage;
