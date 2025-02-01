export {}; // This makes the file a module

import { LoginPage } from 'cypress/pageObjects/loginPage/loginPage.page';
import { PricingDashboardPage } from 'cypress/pageObjects/pricingDashboard/pricingdashboardPage.page';

const pricingDashboardPage = new PricingDashboardPage();
const loginPage = new LoginPage();

declare global {
  namespace Cypress {
    interface Chainable {
      login(url: string, username: string, password: string): Chainable<Element>;
    }
  }
}

Cypress.Commands.add('login', (url: string, username: string, password: string) => {
  cy.log('Logging in');
  cy.visit(url);

  loginPage.userNameInputField().should('be.visible').type(username);
  loginPage.passwordInputField().should('be.visible').type(password);
  loginPage.loginButton().should('be.visible').click();
  cy.log('Logged in');
  cy.wait(5000);
  pricingDashboardPage.pageHeader().should('be.visible');
});
