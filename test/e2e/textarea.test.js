const {assert, driver, By, Key} = require('vl-ui-core').Test.Setup;
const VlTextareaPage = require('./pages/vl-textarea.page');
const {VlInputField} = require('vl-ui-input-field').Test;

describe('vl-textarea', async () => {
  const vlTextareaPage = new VlTextareaPage(driver);

  beforeEach(() => {
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
      await textareaDisabled.setValue('text');
      assert.isTrue(false);
    } catch (error) {
      return Promise.resolve();
    }
  });

  it('Als gebruiker kan ik het onderscheid zien tussen een geowne textarea en een rich textarea', async () => {
    const textarea = await vlTextareaPage.getTextarea();
    await assert.eventually.isFalse(textarea.isRich());
    const textareaRich = await vlTextareaPage.getTextareaRich();
    await assert.eventually.isTrue(textareaRich.isRich());
  });

  it('Als gebruiker kan ik tekst toevoegen en zal er automatisch een root paragraaf tag toegevoegd worden', async () => {
    const textarea = await vlTextareaPage.getTextareaRich();
    await textarea.clear();
    const text = 'text';
    await textarea.sendKeys(text);
    await assert.eventually.include(textarea.getValue(), `<p>${text}</p>`);
  });

  it('Als gebruiker kan ik mijn tekst van bold, italic, underline en strikethrough stijl voorzien', async () => {
    const textarea = await vlTextareaPage.getTextareaRich();
    await textarea.clear();
    const text = 'text';
    await textarea.sendKeys(text);
    await assert.eventually.include(textarea.getValue(), `${text}`);
    await textarea.activateBold();
    await textarea.sendKeys(text);
    await assert.eventually.include(textarea.getValue(), `<b>${text}</b>`);
    await textarea.deactivateBold();
    await textarea.activateItalic();
    await textarea.sendKeys(text);
    await assert.eventually.include(textarea.getValue(), `<i>${text}</i>`);
    await textarea.deactivateItalic();
    await textarea.activateUnderline();
    await textarea.sendKeys(text);
    await assert.eventually.include(textarea.getValue(), `<u>${text}</u>`);
    await textarea.deactivateUnderline();
    await textarea.activateStrikethrough();
    await textarea.sendKeys(text);
    await assert.eventually.include(textarea.getValue(), `<s>${text}</s>`);
    await textarea.deactivateStrikethrough();
  });

  it('Als gebruiker kan ik titels toevoegen', async () => {
    const textarea = await vlTextareaPage.getTextareaRich();
    await textarea.clear();
    const text = 'title';
    await textarea.sendKeys(text);
    await assert.eventually.include(textarea.getValue(), `${text}`);
    await textarea.activateH1();
    await assert.eventually.include(textarea.getValue(), `<h1>${text}</h1>`);
    await textarea.activateH2();
    await assert.eventually.include(textarea.getValue(), `<h2>${text}</h2>`);
    await textarea.activateH3();
    await assert.eventually.include(textarea.getValue(), `<h3>${text}</h3>`);
    await textarea.activateH4();
    await assert.eventually.include(textarea.getValue(), `<h4>${text}</h4>`);
    await textarea.activateH5();
    await assert.eventually.include(textarea.getValue(), `<h5>${text}</h5>`);
    await textarea.activateH6();
    await assert.eventually.include(textarea.getValue(), `<h6>${text}</h6>`);
  });

  it('Als gebruiker kan ik een quote tekst toevoegen', async () => {
    const textarea = await vlTextareaPage.getTextareaRich();
    await textarea.clear();
    const text = 'quote';
    await textarea.sendKeys(text);
    await assert.eventually.include(textarea.getValue(), `${text}`);
    await textarea.activateBlockquote();
    await assert.eventually.include(textarea.getValue(), `<blockquote>\n<p>${text}</p>\n</blockquote>`);
    await textarea.deactivateBlockquote();
    await assert.eventually.include(textarea.getValue(), `${text}`);
  });

  it('Als gebruiker kan ik een horizontale lijn tag toevoegen', async () => {
    const textarea = await vlTextareaPage.getTextareaRich();
    await textarea.clear();
    const text = 'text';
    await textarea.sendKeys(text);
    await assert.eventually.include(textarea.getValue(), `${text}`);
    await textarea.addHorizontalLine();
    await assert.eventually.include(textarea.getValue(), `<hr />`);
  });

  it('Als gebruiker kan ik een genummerde lijst toevoegen', async () => {
    const textarea = await vlTextareaPage.getTextareaRich();
    await textarea.clear();
    const text = 'item';
    await textarea.sendKeys(text);
    await assert.eventually.include(textarea.getValue(), `${text}`);
    await textarea.addNumberedList();
    await assert.eventually.include(textarea.getValue(), `<ol>\n<li>${text}</li>\n</ol>`);
  });

  it('Als gebruiker kan ik een lijst toevoegen', async () => {
    const textarea = await vlTextareaPage.getTextareaRich();
    await textarea.clear();
    const text = 'item';
    await textarea.sendKeys(text);
    await assert.eventually.include(textarea.getValue(), `${text}`);
    await textarea.addList();
    await assert.eventually.include(textarea.getValue(), `<ul>\n<li>${text}</li>\n</ul>`);
  });

  it('Als gebruiker kan ik een link toevoegen', async () => {
    const textarea = await vlTextareaPage.getTextareaRich();
    await textarea.clear();
    await textarea.addLink();
    const modal = await textarea.getLinkToolbarModal();
    const contentElements = await modal.getContentSlotElements();
    const textInputField = await new VlInputField(driver, await contentElements[0].findElement(By.css('#text')));
    const linkInputField = await new VlInputField(driver, await contentElements[0].findElement(By.css('#url')));
    const text = 'Google';
    const link = 'https://www.google.be';
    await textInputField.setValue(text);
    await linkInputField.setValue(link);
    await modal.submit();
    await assert.eventually.include(textarea.getValue(), `<a target="_blank" href="${link}" rel="noopener">${text}</a>`);
  });

  it('Als gebruiker krijg ik een foutmelding te zien als ik geen geldige tekst of link opgeef bij het toevoegen van een link', async () => {
    const textarea = await vlTextareaPage.getTextareaRich();
    await textarea.clear();
    await textarea.addLink();
    const modal = await textarea.getLinkToolbarModal();
    const contentElements = await modal.getContentSlotElements();
    const textInputField = await new VlInputField(driver, await contentElements[0].findElement(By.css('#text')));
    const linkInputField = await new VlInputField(driver, await contentElements[0].findElement(By.css('#url')));
    await assert.eventually.isFalse(textInputField.hasError());
    await assert.eventually.isFalse(linkInputField.hasError());
    await modal.submit();
    await assert.eventually.isTrue(textInputField.hasError());
    await assert.eventually.isTrue(linkInputField.hasError());
    await modal.cancel();
  });

  it('Als gebruiker kan ik de link modal annuleren en zullen bij het opnieuw openen van de link modal de input velden leeg zijn', async () => {
    const textarea = await vlTextareaPage.getTextareaRich();
    await textarea.clear();
    await textarea.addLink();
    const modal = await textarea.getLinkToolbarModal();
    const contentElements = await modal.getContentSlotElements();
    const textInputField = await new VlInputField(driver, await contentElements[0].findElement(By.css('#text')));
    await textInputField.setValue('text');
    await modal.cancel();
    await textarea.addLink();
    await assert.eventually.isEmpty(textarea.getValue());
    modal.cancel();
  });

  it('Als gebruiker maak ik een nieuw paragraph element bij elke enter', async () => {
    const textarea = await vlTextareaPage.getTextareaRich();
    await textarea.clear();
    const text = 'text';
    await textarea.sendKeys(text + Key.RETURN + text);
    await assert.eventually.include(textarea.getValue(), `<p>text</p>\n<p>text</p>`);
  });

  it('Als gebruiker kan ik tekst kopiëren zonder stijl', async () => {
    const textarea = await vlTextareaPage.getTextareaRich();
    await textarea.clear();
    const text = 'text';
    await textarea.sendKeys(text);
    await assert.eventually.include(textarea.getValue(), `<p>${text}</p>`);
    await textarea.copyPasteValue();
    await assert.eventually.include(textarea.getValue(), `<p>${text}${text}</p>`);
  });

  it('Als gebruiker kan ik tekst toevoegen aan een rich textarea in een shadow DOM', async () => {
    const textarea = await vlTextareaPage.getTextareaRichShadowDOM();
    const text = 'text';
    await textarea.sendKeys(text);
    await assert.eventually.include(textarea.getValue(), `${text}`);
  });

  it('Als gebruiker kan ik een tekst selecteren en vervolgens een link toevoegen zonder de tekst opnieuw te moeten invullen', async () => {
    const textarea = await vlTextareaPage.getTextareaRich();
    await textarea.clear();
    const text = 'this is a link!';
    const link = 'https://www.google.be';
    await textarea.setValue(text);
    await textarea.selectValue();
    await textarea.addLink();
    const modal = await textarea.getLinkToolbarModal();
    const contentElements = await modal.getContentSlotElements();
    const textInputField = await new VlInputField(driver, await contentElements[0].findElement(By.css('#text')));
    const linkInputField = await new VlInputField(driver, await contentElements[0].findElement(By.css('#url')));
    await assert.eventually.equal(textInputField.getValue(), text);
    await linkInputField.setValue(link);
    await modal.submit();
    await assert.eventually.include(textarea.getValue(), `<a target="_blank" href="${link}" rel="noopener">${text}</a>`);
  });

  it('Als gebruiker kan ik een tekst met speciale characters selecteren en vervolgens een link toevoegen zonder de tekst opnieuw te moeten invullen', async () => {
    const textarea = await vlTextareaPage.getTextareaRich();
    await textarea.clear();
    const text = 'this is a <spécîàl> link!';
    const link = 'https://www.google.be';
    await textarea.setValue(text);
    await textarea.selectValue();
    await textarea.addLink();
    const modal = await textarea.getLinkToolbarModal();
    const contentElements = await modal.getContentSlotElements();
    const textInputField = await new VlInputField(driver, await contentElements[0].findElement(By.css('#text')));
    const linkInputField = await new VlInputField(driver, await contentElements[0].findElement(By.css('#url')));
    await assert.eventually.equal(textInputField.getValue(), text);
    await linkInputField.setValue(link);
    await modal.submit();
    await assert.eventually.include(textarea.getValue(), `<a target="_blank" href="${link}" rel="noopener">this is a &lt;sp&eacute;c&icirc;&agrave;l&gt; link!</a>`);
  });

  it('Als gebruiker kan ik de een link bewerken', async () => {
    const textarea = await vlTextareaPage.getTextareaRich();
    await textarea.clear();
    const text = 'link';
    let link = 'https://www.google.be';
    await textarea.addLink();
    const modal = await textarea.getLinkToolbarModal();
    const contentElements = await modal.getContentSlotElements();
    const textInputField = await new VlInputField(driver, await contentElements[0].findElement(By.css('#text')));
    const linkInputField = await new VlInputField(driver, await contentElements[0].findElement(By.css('#url')));
    await textInputField.setValue(text);
    await linkInputField.setValue(link);
    await modal.submit();
    await assert.eventually.include(textarea.getValue(), `<a target="_blank" href="${link}" rel="noopener">${text}</a>`);
    await textarea.selectValue();
    await textarea.addLink();
    link = 'https://www.vlaanderen.be';
    await linkInputField.setValue(link);
    await modal.submit();
    await assert.eventually.include(textarea.getValue(), `<a target="_blank" href="${link}" rel="noopener">${text}</a>`);
  });
});
