import Common from '../Common/CommonPO';

const commonPage = new Common();

class Products {
	getAllButtonsSelectors() {
		return '[type=button]';
	}

	getIdSelector() {
		return '#externalId';
	}

	getAllLabelsSelector() {
		return 'label';
	}

	getAllNavbarListsSelector() {
		return 'nav a';
	}

	getProductIDSelector() {
		return '[name="externalId"]';
	}

	getProductIDSelector() {
		return '[name="externalId"]';
	}

	getProductNameSelector() {
		return '[role="dialog"] [name="name"]';
	}

	getProductCodeSelector() {
		return '[role="dialog"] [name="code"]';
	}

	getProductPriceSelector() {
		return '[role="dialog"] [name="listPriceAmount"]';
	}

	getProductOffsetSelector() {
		return '[role="dialog"] [name="serviceStartOffset"]';
	}

	getProductTermSelector() {
		return '[role="dialog"] [name="term"]';
	}

	getAddProductAutoCompleteSelector() {
		return '[role="dialog"]  [aria-autocomplete="list"]';
	}

	getSuccessToastSelector() {
		return '.swal-modal';
	}

	getReloadProductButtonSelector() {
		return '[title="Reload Product"]';
	}

	getEditButtonSelector() {
		return '[name="Enable Edit"]';
	}

	getDeleteButtonSelector() {
		return '[title="Delete Product"]';
	}

	getEditProductIDSelector() {
		return '[name="externalId"]';
	}

	getEditProductNameSelector() {
		return '[name="name"]';
	}

	getEditProductCodeSelector() {
		return '[name="code"]';
	}

	getEditProductPriceSelector() {
		return '[name="listPriceAmount"]';
	}

	getEditProductCurrencySelector() {
		return '[name="currency"]';
	}

	getEditProductStartDateSelector() {
		return '[name="serviceStartDate"]';
	}

	getEditProductStartOffsetSelector() {
		return '[name="serviceStartOffset"]';
	}

	getEditProductUnitSelector() {
		return '[name="serviceStartOffsetPeriodUnit"]';
	}

	getEditProductTermSelector() {
		return '[name="term"]';
	}

	getEditProductEndDateSelector() {
		return '[name="serviceEndDate"]';
	}

	verifyAllProductsFields() {
		cy.get(this.getAllNavbarListsSelector()).contains('Products').click();
		cy.get(this.getAllButtonsSelectors()).contains('New Product').should('be.visible');
		cy.get(this.getAllButtonsSelectors()).contains('Clear All').should('be.visible');
		cy.get(this.getIdSelector()).should('be.visible');
		cy.get(this.getAllLabelsSelector()).contains('Product Name').should('be.visible');
		cy.get(this.getAllLabelsSelector()).contains('Product Code').should('be.visible');
		cy.get(this.getAllLabelsSelector()).contains('Product Family').should('be.visible');
		cy.get(this.getAllLabelsSelector()).contains('Product Type').should('be.visible');
	}

	verifyAddNewProductsFields() {
		this.clearAllAddedProducts();
		cy.get(this.getAllButtonsSelectors()).contains('New Product').click().wait(3000);

		cy.get(this.getProductIDSelector()).should('be.visible');
		cy.get(this.getProductNameSelector()).should('be.visible');
		cy.get(this.getProductCodeSelector()).should('be.visible');
		cy.get(this.getProductNameSelector()).should('have.attr', 'required');
		cy.get(this.getProductCodeSelector()).should('have.attr', 'required');
		cy.get(this.getAllLabelsSelector()).contains('Product Family').should('be.visible');
		cy.get(this.getAllLabelsSelector()).contains('Product Type').should('be.visible');
		cy.get(commonPage.getAllCheckBoxSelector()).should('be.visible');
		cy.get('span').contains('Is Recurring').should('be.visible');
		cy.get(this.getProductPriceSelector()).should('be.visible');
		cy.get(this.getProductPriceSelector()).should('have.attr', 'required');
		cy.get(this.getAllLabelsSelector()).contains('Currency').should('exist');
		cy.get(this.getAllLabelsSelector()).contains('Start Date').should('exist');
		cy.get(this.getAllLabelsSelector()).contains('Start Offset').should('exist');
		cy.get(this.getAllLabelsSelector()).contains('Unit').should('exist');
		cy.get(this.getAllLabelsSelector()).contains('Term').should('exist');
		cy.get(this.getAllLabelsSelector()).contains('End Date').should('exist');
	}

	createNewProduct(data) {
		for (var i = 0; i < data.products.length; i++) {
			var obj = data.products[i];
			cy.get(this.getProductIDSelector()).type(obj.id);
			cy.get(this.getProductNameSelector()).type(obj.name);
			cy.get(this.getProductCodeSelector()).type(obj.code);
			cy.get(this.getProductPriceSelector()).type(obj.price);

			cy.get(this.getAddProductAutoCompleteSelector())
				.eq(2)
				.type(obj.currency + '{downarrow}{enter}', { force: true });

			cy.get(this.getAddProductAutoCompleteSelector())
				.eq(3)
				.type(obj.startDate + '{downarrow}{enter}', { force: true });

			cy.get(this.getProductOffsetSelector()).type(obj.startOffset);

			cy.get(this.getAddProductAutoCompleteSelector())
				.eq(4)
				.type(obj.unit + '{downarrow}{enter}', { force: true });

			cy.get(this.getProductTermSelector()).type(obj.term);

			cy.get(this.getAddProductAutoCompleteSelector())
				.eq(5)
				.type(obj.endDate + '{downarrow}{enter}')
				.wait(3000);

			cy.get('[role="dialog"] [type="button"].MuiButton-contained .MuiButton-label').click();
			cy.get('.swal-modal .swal-text').should(
				'have.text',
				'Product ' + obj.name + ' saved successfully!'
			);
			cy.get('.swal-button--confirm').click().wait(1000);
		}
	}

	clearAllAddedProducts() {
		cy.get('table')
			.find('tbody')
			.each($el => {
				if ($el.find('tr td:contains("No results found")').length != 1) {
					cy.get('[name="Clear All"]').click();
					cy.get('.swal-button--confirm').contains('OK').click().wait(1000);
					cy.get('.swal-modal .swal-text').should('have.text', 'Successfully cleared all products');
					cy.get('.swal-button--confirm').click().wait(1000);
				}
			});
	}

	verifyAddedProductFields(data) {
		var obj = data.products[0];
		cy.get('tbody tr td').eq(0).should('have.text', obj.name).should('be.visible');
	}

	accessEditProductPage(data) {
		var obj = data.products[0];
		cy.get('tbody tr td').contains(obj.name).click();
		cy.get(this.getEditButtonSelector()).should('be.visible');
		cy.get(this.getDeleteButtonSelector()).should('be.visible');
		cy.get(this.getReloadProductButtonSelector()).should('be.visible');

		cy.get(this.getEditProductIDSelector())
			.should('have.value', obj.id)
			.should('have.class', 'Mui-disabled');
		cy.get(this.getEditProductNameSelector())
			.should('have.value', obj.name)
			.should('have.class', 'Mui-disabled');
		cy.get(this.getEditProductCodeSelector())
			.should('have.value', obj.code)
			.should('have.class', 'Mui-disabled');
		cy.get(this.getEditProductPriceSelector())
			.should('have.value', obj.price)
			.should('have.class', 'Mui-disabled');
		cy.get(this.getEditProductCurrencySelector())
			.should('have.value', obj.currency)
			.should('have.class', 'Mui-disabled');
		cy.get(this.getEditProductStartDateSelector())
			.should('have.value', obj.startDate)
			.should('have.class', 'Mui-disabled');
		cy.get(this.getEditProductStartOffsetSelector())
			.should('have.value', obj.startOffset)
			.should('have.class', 'Mui-disabled');
		cy.get(this.getEditProductUnitSelector())
			.should('have.value', obj.unit)
			.should('have.class', 'Mui-disabled');

		cy.get(this.getEditProductTermSelector())
			.should('have.value', obj.term)
			.should('have.class', 'Mui-disabled');

		// cy.get(this.getEditProductEndDateSelector())
		// 	.should('have.value', obj.endDate)
		// 	.should('have.class', 'Mui-disabled');

		cy.get('#panel1d-content [type="button"]')
			.eq(0)
			.should('have.text', 'Discard Changes')
			.should('have.class', 'Mui-disabled');

		cy.get('#panel1d-content [type="button"]')
			.eq(1)
			.should('have.text', 'Saves Changes')
			.should('have.class', 'Mui-disabled');
	}

	editProduct(data) {
		cy.get(this.getAllNavbarListsSelector()).contains('Products').should('be.visible');
		cy.get(this.getAllNavbarListsSelector()).contains('Products').click().wait(1000);

		var obj = data.updateProducts[0];
		cy.get('tbody tr td').contains(obj.name).click();

		cy.get(this.getEditButtonSelector()).should('be.visible').click();
		cy.get(this.getEditProductIDSelector()).clear().type(obj.id);
		cy.get(this.getEditProductNameSelector()).clear().type(obj.updatedName);
		cy.get(this.getEditProductCodeSelector())
			.should('have.value', obj.code)
			.should('have.class', 'Mui-disabled');
		cy.get(this.getEditProductPriceSelector()).clear().type(obj.price);
		cy.get(this.getEditProductCurrencySelector())
			.should('have.value', obj.currency)
			.should('have.class', 'Mui-disabled');
		cy.get(this.getEditProductStartOffsetSelector()).clear().type(obj.startOffset);
		cy.get(this.getEditProductTermSelector()).clear().type(obj.term);

		cy.get(commonPage.getAllButtonsSelectors()).contains('Saves Changes').click();

		cy.get(this.getSuccessToastSelector())
			.find('div')
			.contains('Product ' + obj.updatedName + ' saved successfully!')
			.invoke('text')
			.then(text => {
				const toastText = text;
				expect(toastText).to.equal('Product ' + obj.updatedName + ' saved successfully!');
			});
		cy.get(commonPage.getConfirmButtonSelector()).contains('OK').click();
	}

	verifyUpdatedProductFields(data) {
		var obj = data.updateProducts[0];
		// cy.get('tbody tr td').contains(obj.name).click();
		cy.get(this.getEditButtonSelector()).should('be.visible');
		cy.get(this.getDeleteButtonSelector()).should('be.visible');
		cy.get(this.getReloadProductButtonSelector()).should('be.visible');

		cy.get(this.getEditProductIDSelector())
			.should('have.value', obj.id)
			.should('have.class', 'Mui-disabled');
		cy.get(this.getEditProductNameSelector())
			.should('have.value', obj.updatedName)
			.should('have.class', 'Mui-disabled');
		cy.get(this.getEditProductCodeSelector())
			.should('have.value', obj.code)
			.should('have.class', 'Mui-disabled');
		cy.get(this.getEditProductPriceSelector())
			.should('have.value', obj.price)
			.should('have.class', 'Mui-disabled');
		cy.get(this.getEditProductCurrencySelector())
			.should('have.value', obj.currency)
			.should('have.class', 'Mui-disabled');
		cy.get(this.getEditProductStartDateSelector())
			.should('have.value', obj.startDate)
			.should('have.class', 'Mui-disabled');
		cy.get(this.getEditProductStartOffsetSelector())
			.should('have.value', obj.startOffset)
			.should('have.class', 'Mui-disabled');
		cy.get(this.getEditProductUnitSelector())
			.should('have.value', obj.unit)
			.should('have.class', 'Mui-disabled');

		cy.get(this.getEditProductTermSelector())
			.should('have.value', obj.term)
			.should('have.class', 'Mui-disabled');

		// cy.get(this.getEditProductEndDateSelector())
		// 	.should('have.value', obj.endDate)
		// 	.should('have.class', 'Mui-disabled');

		cy.get('#panel1d-content [type="button"]')
			.eq(0)
			.should('have.text', 'Discard Changes')
			.should('have.class', 'Mui-disabled');

		cy.get('#panel1d-content [type="button"]')
			.eq(1)
			.should('have.text', 'Saves Changes')
			.should('have.class', 'Mui-disabled');
	}

	deleteProduct(data) {
		cy.get(this.getAllNavbarListsSelector()).contains('Products').should('be.visible');
		cy.get(this.getAllNavbarListsSelector()).contains('Products').click().wait(1000);

		var obj = data.updateProducts[0];
		cy.get('tbody tr td').contains(obj.updatedName).click();
		cy.get(this.getDeleteButtonSelector()).should('be.visible');
		cy.get(this.getDeleteButtonSelector()).click();

		cy.get('.swal-text').should('have.text', 'This will delete this product');
		cy.get('.swal-button--danger').click();
		cy.get(commonPage.getConfirmButtonSelector()).should('have.text', 'OK').click({ force: true });
	}
}
export default Products;
