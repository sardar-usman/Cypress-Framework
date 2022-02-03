import SignUp from '../../support/pages/SignUP/SignUpPO';
import Product from '../../support/pages/';

const signUpPage = new SignUp();

describe('Test Suites Of Products', function () {
	before(function () {
		cy.visit(Cypress.env('signUpUrl'));
		return cy.mailslurp();
	});

	beforeEach(function () {
		cy.fixture(Cypress.env('fixtureFile')).then(data => {
			this.data = data;
		});
	});

	it('Should SignUp User With New Company', function () {
		signUpPage.signUpUserWithNewCompany();
	});

	it('Should Verify User Should Receive The Confirmation Email And Extract The Code', function () {
		signUpPage.extractCodeFromEmail();
	});

	it('Should Login Newly Created User Verify', function () {
		signUpPage.loginUserAfterSignUp();
	});

	it('Should Verify Welcome To Chargebee Page', function () {
		signUpPage.verifyWelcomePage(this.data);
	});

	it('Should Verify Default Tenants', function () {
		signUpPage.verifyDefaultTenants(this.data);
	});

	it('Verify all fields available on Products page | PR-01', function () {
		productsPage.verifyAllProductsFields();
	});

	it('Verify adding new product by clicking on Add New Product button (pop up window fields) | PR-02', function () {
		productsPage.verifyAddNewProductsFields();
	});

	it('Should create new product | PR-03', function () {
		productsPage.createNewProduct(this.data);
	});
});
