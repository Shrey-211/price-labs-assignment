
export class LoginPage {
    // Return email input field
    userNameInputField() {
        return cy.get('#user_email');
    }

    // Return password input field
    passwordInputField() {
        return cy.get('#password-field');
    }

    // Return login button
    loginButton() {
        return cy.get('input[name="commit"]');
    }
}