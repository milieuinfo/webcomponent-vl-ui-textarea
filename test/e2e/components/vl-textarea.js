const { VlElement } = require('vl-ui-core').Test;

class VlTextarea extends VlElement {  

    async setValue(text) {
        await this.clear();
        return this.sendKeys(text);
    }

    async getValue() {
    	return this.getAttribute("value");
    }
    
    async isBlock() {
    	return this.hasAttribute("block");
    }

    async isError() {
    	return this.hasAttribute("error");
    }

    async isSuccess() {
    	return this.hasAttribute("success");
    }
    
    async isDisabled() {
    	return this.hasAttribute("disabled");
    }

    async isFocus() {
    	return this.hasAttribute("focus");
    }
}

module.exports = VlTextarea;
