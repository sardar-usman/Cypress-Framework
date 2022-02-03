import Common from '../Common/CommonPO';

const faker = require('faker');
const commonPage = new Common();

let companyName = faker.company.companyName();
let companyWebsite = faker.internet.email();
let firstName = faker.name.firstName();
let lastName = faker.name.lastName();
let phoneNumber = faker.phone.phoneNumber();
let password = 'Test@12345';
let emailAddress;
let inboxId;

class SignUp {
	getCompanyNameSelector() {
		return '[name="company"]';
	}

	getCompanyWebsiteSelector() {
		return '[name="website"]';
	}

	getFirstNameSelector() {
		return '[name="given_name"]';
	}

	getLastNameSelector() {
		return '[name="family_name"]';
	}

	getConfirmPasswordSelector() {
		return '[name="cpassword"]';
	}

	getPhoneNumberSelector() {
		return '[name="phone_number"]';
	}

	getCodeTypeSelector() {
		return '[name="code"]';
	}

	signUpUserWithNewCompany(data) {
		cy.createInbox().then(inbox => {
			// verify a new inbox was created
			assert.isDefined(inbox);

			// save the inboxId for later checking the emails
			inboxId = inbox.id;
			emailAddress = inbox.emailAddress;

			// sign up with inbox email address and the password
			expect(emailAddress).to.contain('@mailslurp');
			cy.get(commonPage.getAllButtonsSelectors()).contains('Sign Up!').click();
			cy.get(this.getCompanyNameSelector()).type(companyName);
			cy.get(this.getCompanyWebsiteSelector()).type(companyWebsite);
			cy.get(this.getFirstNameSelector()).type(firstName);
			cy.get(this.getLastNameSelector()).type(lastName);
			cy.get(commonPage.getUserNameSelector()).type(emailAddress);

			cy.get(this.getPhoneNumberSelector()).type(phoneNumber);
			cy.get(commonPage.getPasswordSelector()).type(password);
			cy.get(this.getConfirmPasswordSelector()).type(password);
			cy.get(commonPage.getAllButtonsSelectors()).contains('Register').click().wait(30000);
		});
	}

	extractCodeFromEmail() {
		// wait for an email in the inbox
		cy.waitForLatestEmail(inboxId).then(email => {
			// verify we received an email
			assert.isDefined(email);
			console.log(email.body);

			var domParser = new DOMParser();
			var doc = domParser.parseFromString(email.body, 'text/html');
			console.log(doc);
			cy.get(doc)
				.find('[valign="middle"]')
				.invoke('text')
				.then(text => {
					var code = text.trim();
					console.log(code);
					cy.get(this.getCodeTypeSelector()).type(code);
					cy.get('[type="button"]').contains('Confirm').click().wait(3000);
				});
		});
	}

	loginUserAfterSignUp() {
		cy.get(commonPage.getUserNameSelector()).type(emailAddress);
		cy.get(commonPage.getPasswordSelector()).type(password);

		cy.get(commonPage.getAllButtonsSelectors()).contains('Login').click().wait(10000);
	}

	verifyWelcomePage(data) {
		//Verify Welcome Tab
		cy.get(commonPage.getAllButtonsSelectors()).contains('Welcome').should('be.visible');
		cy.get(commonPage.getAllButtonsSelectors()).contains('Data').should('be.visible');
		cy.get(commonPage.getAllButtonsSelectors()).contains('SSP Library').should('be.visible');
		cy.get(commonPage.getAllButtonsSelectors()).contains('Ledger').should('be.visible');
		cy.get(commonPage.getAllButtonsSelectors())
			.contains('Navigation Overview')
			.should('be.visible');
		cy.get('h6').contains(data.signUpUser.welcomeText1);
		cy.get('h6').contains(data.signUpUser.welcomeText2);
		cy.get(commonPage.getCloseButtonSelector()).click();
	}

	verifyDefaultTenants() {
		cy.get('[title="' + companyName + '"]').should('have.text', companyName);
		cy.get(commonPage.getAllButtonsSelectors())
			.eq(0)
			.find('p')
			.eq(1)
			.should('have.text', 'Test')
			.click();
		cy.get('ul').find('li').should('have.length', 2);
		cy.get('ul').find('li').eq(0).find('p').eq(0).should('have.text', companyName);
		cy.get('ul').find('li').eq(0).find('p').eq(1).should('have.text', 'Test');
		cy.get('ul').find('li').eq(1).find('p').eq(0).should('have.text', companyName);
		cy.get('ul').find('li').eq(1).find('p').eq(1).should('have.text', 'Production');
	}
}
export default SignUp;
