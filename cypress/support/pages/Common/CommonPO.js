class Common {
	getUserNameSelector() {
		return '[name="username"]';
	}

	getPasswordSelector() {
		return '[name="password"]';
	}

	getAllButtonsSelectors() {
		return '[type="button"]';
	}

	getCloseButtonSelector() {
		return '[aria-label="close"]';
	}

	getConfirmButtonSelector() {
		return '.swal-button--confirm';
	}

	getAllCheckBoxSelector() {
		return '.MuiCheckbox-root';
	}

	getAllTextFieldsSelector() {
		return '[type="text"]';
	}

	clearAllData() {
		cy.get(this.getAllButtonsSelectors()).eq(0).find('p').eq(1).should('have.text', 'Test').click();
		cy.get('ul').find('li').eq(0).find(this.getAllButtonsSelectors()).eq(0).click();
		cy.get('ul').find('li').eq(2).click();
		cy.get(this.getConfirmButtonSelector()).click();
	}
}
export default Common;
