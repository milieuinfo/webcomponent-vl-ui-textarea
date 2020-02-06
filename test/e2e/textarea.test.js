
const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlTextareaPage = require('./pages/vl-textarea.page');

describe('vl-textarea', async () => {
    const vlTextareaPage = new VlTextareaPage(driver);

    before(() => {
        return vlTextareaPage.load();
    });

    after(async () => { 
        return driver.quit();
    });
});
