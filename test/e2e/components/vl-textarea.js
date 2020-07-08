const {VlElement} = require('vl-ui-core').Test;
const {By, Key} = require('vl-ui-core').Test.Setup;
const {VlModal} = require('vl-ui-modal').Test;

class VlTextarea extends VlElement {
  async setValue(text) {
    await this.clear();
    await this.sendKeys(text);
  }

  async getValue() {
    const rich = await this.isRich();
    if (rich) {
      await this._switchToWysiwygiframe();
      const body = await this._wysiwygBodyElement();
      const text = await body.getText();
      await this._switchToDefault();
      return text;
    } else {
      return this.getAttribute('value');
    }
  }

  async isBlock() {
    return this.hasAttribute('data-vl-block');
  }

  async isError() {
    return this.hasAttribute('data-vl-error');
  }

  async isSuccess() {
    return this.hasAttribute('data-vl-success');
  }

  async isDisabled() {
    return this.hasAttribute('disabled');
  }

  async isFocus() {
    return this.hasAttribute('data-vl-focus');
  }

  async isRich() {
    return this.hasAttribute('data-vl-rich');
  }

  async clear() {
    const rich = await this.isRich();
    if (rich) {
      await this._switchToWysiwygiframe();
      const body = await this._wysiwygBodyElement();
      await body.click();
      await body.sendKeys(Key.CONTROL + 'a');
      await body.sendKeys(Key.COMMAND + 'a');
      await body.sendKeys(Key.DELETE);
      await this._switchToDefault();
    } else {
      await super.clear();
    }
  }

  async sendKeys(text) {
    const rich = await this.isRich();
    if (rich) {
      await this._switchToWysiwygiframe();
      const body = await this._wysiwygBodyElement();
      await body.click();
      await body.sendKeys(text);
      await this._switchToDefault();
    } else {
      await super.sendKeys(text);
    }
  }

  async activateBold() {
    await this._activateToolbar('Bold');
  }

  async activateItalic() {
    await this._activateToolbar('Italic');
  }

  async activateUnderline() {
    await this._activateToolbar('Underline');
  }

  async activateH1() {
    await this._activateH(1);
  }

  async activateH2() {
    await this._activateH(2);
  }

  async activateH3() {
    await this._activateH(3);
  }

  async activateH4() {
    await this._activateH(4);
  }

  async activateH5() {
    await this._activateH(5);
  }

  async activateH6() {
    await this._activateH(6);
  }

  async activateStrikethrough() {
    await this._activateToolbar('Strikethrough');
  }

  async activateBlockquote() {
    await this._activateToolbar('Blockquote');
  }

  async addLink() {
    await this._clickToolbar('Link');
  }

  async addHorizontalLine() {
    await this._clickToolbar('Horizontal line');
  }

  async addNumberedList() {
    await this._clickToolbarList('Numbered list');
  }

  async addList() {
    await this._clickToolbarList('Bullet list');
  }

  async deactivateBold() {
    await this._deactivateToolbar('Bold');
  }

  async deactivateItalic() {
    await this._deactivateToolbar('Italic');
  }

  async deactivateUnderline() {
    await this._deactivateToolbar('Underline');
  }

  async deactivateStrikethrough() {
    await this._deactivateToolbar('Strikethrough');
  }

  async deactivateBlockquote() {
    await this._deactivateToolbar('Blockquote');
  }

  async getInnerHTML() {
    const rich = await this.isRich();
    if (rich) {
      await this._switchToWysiwygiframe();
      const body = await this._wysiwygBodyElement();
      const html = await body.getAttribute('innerHTML');
      await this._switchToDefault();
      return html;
    } else {
      return super.getInnerHTML();
    }
  }

  async getLinkToolbarModal() {
    const parent = await this._parentElement();
    const element = await parent.findElement(By.css('vl-textarea-modal'));
    return new VlModal(this.driver, element.shadowRoot);
  }

  async _parentElement() {
    return this.findElement(By.xpath('..'));
  }

  async _wysiwygElement() {
    const parent = await this._parentElement();
    return parent.findElement(By.css('.tox-tinymce'));
  }

  async _wysiwygToolbarButton(type) {
    const wysiwyg = await this._wysiwygElement();
    return wysiwyg.findElement(By.css(`button.tox-tbtn[aria-label="${type}"]`));
  }

  async _wysiwygToolbarListButton(type) {
    const wysiwyg = await this._wysiwygElement();
    return wysiwyg.findElement(By.css(`div.tox-split-button[aria-label="${type}"]`));
  }

  async _wysiwygBodyElement() {
    return this.driver.findElement(By.css('#tinymce'));
  }

  async _activateToolbar(type) {
    const button = await this._wysiwygToolbarButton(type);
    const active = await button.getAttribute('aria-pressed');
    if (active == 'false') {
      await button.click();
    }
  }

  async _activateH(number) {
    await this._activateToolbar(`Heading ${number}`);
  }

  async _clickToolbar(type) {
    const button = await this._wysiwygToolbarButton(type);
    await button.click();
  }

  async _clickToolbarList(type) {
    const button = await this._wysiwygToolbarListButton(type);
    await button.click();
  }

  async _deactivateToolbar(type) {
    const button = await this._wysiwygToolbarButton(type);
    const active = await button.getAttribute('aria-pressed');
    if (active == 'true') {
      await button.click();
    }
  }

  async _switchToWysiwygiframe() {
    const wysiwyg = await this._wysiwygElement();
    const iframe = await wysiwyg.findElement(By.css('iframe'));
    await this.driver.switchTo().frame(iframe);
  }

  async _switchToDefault() {
    await this.driver.switchTo().defaultContent();
  }
}

module.exports = VlTextarea;
