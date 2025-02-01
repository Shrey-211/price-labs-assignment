/// <reference types="cypress" />

import { MultiCalendarPage } from 'cypress/pageObjects/multiCalenderPage/multiCalenderPage.page';
import { PricingDashboardPage } from 'cypress/pageObjects/pricingDashboard/pricingDashboardPage.page';

const multiCalendarPage = new MultiCalendarPage();
const pricingPage = new PricingDashboardPage();

beforeEach(() => {
  cy.login('https://pricelabs.co/signin', 'qa.pricelabs@gmail.com', 'qg33N$yxJP'); // Assuming a login helper exists
});

describe("MultiCalendar DSO Tests", () => {
    it.only("should allow a user to apply a Date-Specific Override (DSO)", () => {
      pricingPage.dynamicPricingButton().should('be.visible').click();
      pricingPage.calenderViewButton().should('be.visible').click();
      multiCalendarPage.getSearchBar().should('be.visible').type('Christian Seasonal 2');
      cy.contains('.chakra-text', '.Christian Seasonal 2').should('be.visible');
      cy.wait(2000);
      cy.get('.css-1urksmm > .css-17crack > .css-1o6y018').realClick();
      cy.get('[qa-id="dso-modal-title"]').should('be.visible');
      cy.get('#dso-modal-dso-price-mc').should('be.visible').type('100');
      cy.get('#dso-modal-dso-min-price-mc').should('be.visible').type('50');
      cy.get('#dso-modal-dso-max-price-mc').should('be.visible').type('150');
      cy.get('#dso-base-price').should('be.visible').type('200');
      cy.get('#custom-price-reason--mc').type('Test DSO');
      cy.get('#add-dso').click();
    });

    it("should allow a user to modify an existing DSO", () => {

    });

    it("should allow a user to remove an existing DSO", () => {

    });

    it("should allow a user to disable sync", () => {

    })

    it("should allow a user to enable sync", () => {

    })
});
