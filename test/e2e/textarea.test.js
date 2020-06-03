
const {assert, driver} = require('vl-ui-core').Test.Setup;
const VlTextareaPage = require('./pages/vl-textarea.page');

describe('vl-textarea', async () => {
  const vlTextareaPage = new VlTextareaPage(driver);

  before(() => {
    return vlTextareaPage.load();
  });

  it('Als gebruiker kan ik de tekst van een textarea invullen en lezen en leegmaken', async () => {
    const textarea = await vlTextareaPage.getTextarea();
    await textarea.setValue('Dit is de tekst in de textarea');
    await assert.eventually.equal(textarea.getValue(), 'Dit is de tekst in de textarea');
    await textarea.clear();
    await assert.eventually.equal(textarea.getValue(), '');
  });

  it('Als gebruiker kan ik het onderscheid zien tussen een inline textarea en een block textarea', async () => {
    const textarea = await vlTextareaPage.getTextarea();
    await assert.eventually.isFalse(textarea.isBlock());
    const textareaBlock = await vlTextareaPage.getTextareaBlock();
    await assert.eventually.isTrue(textareaBlock.isBlock());
  });

  it('Als gebruiker kan ik het onderscheid zien tussen een gewone textarea en een error textarea', async () => {
    const textarea = await vlTextareaPage.getTextarea();
    await assert.eventually.isFalse(textarea.isError());
    const textareaError = await vlTextareaPage.getTextareaError();
    await assert.eventually.isTrue(textareaError.isError());
  });

  it('Als gebruiker kan ik het onderscheid zien tussen een gewone textarea en een success textarea', async () => {
    const textarea = await vlTextareaPage.getTextarea();
    await assert.eventually.isFalse(textarea.isSuccess());
    const textareaSuccess = await vlTextareaPage.getTextareaSuccess();
    await assert.eventually.isTrue(textareaSuccess.isSuccess());
  });

  it('Als gebruiker kan ik het onderscheid zien tussen een gewone textarea en een focus textarea', async () => {
    const textarea = await vlTextareaPage.getTextarea();
    await assert.eventually.isFalse(textarea.isFocus());
    const textareaFocus = await vlTextareaPage.getTextareaFocus();
    await assert.eventually.isTrue(textareaFocus.isFocus());
  });

  it('Als gebruiker kan ik het onderscheid zien tussen een gewone textarea en een disabled textarea', async () => {
    const textarea = await vlTextareaPage.getTextarea();
    await assert.eventually.isFalse(textarea.isDisabled());
    const textareaDisabled = await vlTextareaPage.getTextareaDisabled();
    await assert.eventually.isTrue(textareaDisabled.isDisabled());
  });

  it('Als gebruiker kan ik enkel een waarde zetten in een niet-disabled textarea', async () => {
    const textarea = await vlTextareaPage.getTextarea();
    await assert.eventually.isTrue(textarea.isEnabled());
    const textareaDisabled = await vlTextareaPage.getTextareaDisabled();
    await assert.eventually.isFalse(textareaDisabled.isEnabled());
    try {
      await textareaDisabled.setValue('tekst');
      assert.isTrue(false);
    } catch (error) {
      return Promise.resolve();
    }
  });
});
