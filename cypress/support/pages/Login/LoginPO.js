import Common from '../Common/CommonPO';

const commonPage = new Common();

class Login {
	loginUser(data) {
		cy.get(commonPage.getUserNameSelector()).type(data.superAdmin[0].username);
		cy.get(commonPage.getPasswordSelector()).type(data.superAdmin[0].password);

		cy.get(commonPage.getAllButtonsSelectors()).contains('Login').click().wait(10000);
	}

	logoutUser() {
		cy.get('#my-account').click({ force: true });
		cy.get('ul').find('li').eq(1).click().wait(3000);
	}
}
export default Login;
