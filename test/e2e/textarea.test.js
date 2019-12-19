
const { assert, driver } = require('vl-ui-core').Test;
const VlTextareaPage = require('./pages/vl-textarea.page');

describe('vl-textarea', async () => {
    const vlTextareaPage = new VlTextareaPage(driver);

    before(() => {
        return vlTextareaPage.load();
    });

   
});
