
const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlTextareaPage = require('./pages/vl-textarea.page');

describe('vl-textarea', async () => {
    const vlTextareaPage = new VlTextareaPage(driver);

    before(() => {
        return vlTextareaPage.load();
    });

    it("Dummy test om de browsers te sluiten", () => {
    	assert.isTrue(true);
    });
});
