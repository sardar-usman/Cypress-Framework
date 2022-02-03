import Login from '../support/pages/Login/LoginPO';
import Common from '../support/pages/Common/CommonPO';

const { MailSlurp } = require('mailslurp-client');
const loginPage = new Login();
const commonPage = new Common();

Cypress.Commands.add('createInbox', () => {
	const mailslurp = new MailSlurp({ apiKey: Cypress.env('MAILSLURP_API_KEY') });
	return mailslurp.createInbox();
});

Cypress.Commands.add('waitForLatestEmail', inboxId => {
	const mailslurp = new MailSlurp({ apiKey: Cypress.env('MAILSLURP_API_KEY') });
	return mailslurp.waitForLatestEmail(inboxId);
});

Cypress.Commands.add('Login', data => {
	loginPage.loginUser(data);
});

Cypress.Commands.add('Logout', data => {
	loginPage.logoutUser(data);
});

Cypress.Commands.add('ClearData', data => {
	commonPage.clearAllData(data);
});
