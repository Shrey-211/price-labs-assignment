/// <reference types="cypress" />

import { MultiCalendarPage } from 'cypress/pageObjects/multiCalenderPage/multiCalenderPage.page';
import { PricingDashboardPage } from 'cypress/pageObjects/pricingDashboard/pricingDashboardPage.page';
import { visitPriceLabs } from 'cypress/support/index';

const multiCalendarPage = new MultiCalendarPage();
const pricingPage = new PricingDashboardPage();

beforeEach(() => {
  visitPriceLabs();
  cy.login('https://pricelabs.co/signin', 'qa.pricelabs@gmail.com', 'qg33N$yxJP'); // Assuming a login helper exists
});

describe("MultiCalendar DSO Tests", () => {
    it.only("should allow a user to apply a Date-Specific Override (DSO)", () => {
      pricingPage.dynamicPricingButton().should('be.visible').click();
      pricingPage.calenderViewButton().should('be.visible').click();
      multiCalendarPage.getSearchBar().should('be.visible').type('Christian Seasonal 2');
      cy.wait(5000);
      multiCalendarPage.getFilteredProperty().should('be.visible');
      multiCalendarPage.getMoreVertIcon().should('be.visible').click();
      multiCalendarPage.getAddOverrideButton().should('be.visible').click();
      multiCalendarPage.getDsoModalTitle().should('be.visible');
      // multiCalendarPage.getDateRangeIcon().first().should('be.visible').click();
      // multiCalendarPage.getDatePicker(9).first().should('be.visible').click();
      multiCalendarPage.getDsoFinalPrice().should('be.visible').type('1000');
      multiCalendarPage.getDsoMinPrice().should('be.visible').type('500');
      multiCalendarPage.getDsoMaxPrice().should('be.visible').type('1500');
      multiCalendarPage.getDsoBasePrice().should('be.visible').type('2000');
      multiCalendarPage.getCustomPriceReason().type('Test DSO');
      multiCalendarPage.getAddDsoButton().click();
      // multiCalendarPage.getOverrideConfirmPopup().should('be.visible');
      // multiCalendarPage.getOverrideUpdateButton().click();
      cy.get('.css-1rh1rrp > .css-cft5qr > .css-12xei1n > .chakra-text').should('be.visible').and('have.text', 'Price: 1000 $, Base Price: 2000 $, Min Price: 500 $, Max Price: 1500 $, Reason: Test DSO');

    });

    it("should allow a user to modify an existing DSO", () => {

    });

    it("should allow a user to remove an existing DSO", () => {

    });
});
