import Products from '../../support/pages/Products/ProductsPO';

const productsPage = new Products();

describe('Test Suites Of Products', function () {
	beforeEach(function () {
		cy.fixture(Cypress.env('fixtureFile')).then(data => {
			this.data = data;
			cy.visit(Cypress.env('loginUrl'));
			cy.Login(this.data);
		});
	});

	it('Should Verify Products Fields And Create New Product', function () {
		productsPage.verifyAllProductsFields();
		productsPage.verifyAddNewProductsFields();
		productsPage.createNewProduct(this.data);
		productsPage.verifyAddedProductFields(this.data);
		productsPage.accessEditProductPage(this.data);
	});

	it('Should Edit Added Product And Verify Values', function () {
		productsPage.editProduct(this.data);
		productsPage.verifyUpdatedProductFields(this.data);
	});

	it('Should Delete Added Product', function () {
		productsPage.deleteProduct(this.data);
	});
});
