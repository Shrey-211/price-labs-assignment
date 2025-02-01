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
  
  // Handle uncaught exceptions globally
  Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes('Minified React error #419')) {
      return false;
    }
    return true;
  });

  cy.visit(url);
  loginPage.userNameInputField().should('be.visible').type(username);
  loginPage.passwordInputField().should('be.visible').type(password);
  loginPage.loginButton().should('be.visible').click();
  cy.log('Logged in');
  
  // Wait for dashboard to be visible instead of using fixed wait
  pricingDashboardPage.pageHeader().should('be.visible', { timeout: 10000 });
});
