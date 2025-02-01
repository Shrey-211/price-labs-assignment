/// <reference types="cypress" />

import { ListingDetails } from 'cypress/fixtures/listingDetails/listing_details.interface';
import { MultiCalendarPage } from 'cypress/pageObjects/multiCalenderPage/multiCalenderPage.page';
import { PricingDashboardPage } from 'cypress/pageObjects/pricingDashboard/pricingDashboardPage.page';
import { visitPriceLabs } from 'cypress/support/index';

let listingDetails: ListingDetails
const multiCalendarPage = new MultiCalendarPage();
const pricingPage = new PricingDashboardPage();

before(() => {
  cy.fixture('listingDetails/listing_details').then((listingDetail) => {
    listingDetails = listingDetail;
  });
});

beforeEach(() => {
  visitPriceLabs();
  cy.login('https://pricelabs.co/signin', 'qa.pricelabs@gmail.com', 'qg33N$yxJP'); // Assuming a login helper exists
});

describe("MultiCalendar DSO Tests", () => {
    it.only("should allow a user to apply a Date-Specific Override (DSO)", () => {
      pricingPage.dynamicPricingButton().should('be.visible').click();
      pricingPage.calenderViewButton().should('be.visible').click();
      multiCalendarPage.getSearchBar().should('be.visible').type(listingDetails.listingName);
      cy.wait(5000);
      multiCalendarPage.getFilteredProperty().should('be.visible');
      multiCalendarPage.getMoreVertIcon().should('be.visible').click();
      multiCalendarPage.getAddOverrideButton().should('be.visible').click();
      multiCalendarPage.getDsoModalTitle().should('be.visible');
      multiCalendarPage.getDsoFinalPrice().should('be.visible').type(listingDetails.listingFinalPrice);
      multiCalendarPage.getDsoMinPrice().should('be.visible').type(listingDetails.ListingMinimumPrice);
      multiCalendarPage.getDsoMaxPrice().should('be.visible').type(listingDetails.ListingMaxPrice);
      multiCalendarPage.getDsoBasePrice().should('be.visible').type(listingDetails.listingBasePrice);
      multiCalendarPage.getCustomPriceReason().type(listingDetails.dsoReason);
      multiCalendarPage.getAddDsoButton().click();
      multiCalendarPage.getDsoPriceDetails()
        .should('be.visible')
        .and('have.text', `Price: ${listingDetails.listingFinalPrice} $, Base Price: ${listingDetails.listingBasePrice} $, Min Price: ${listingDetails.ListingMinimumPrice} $, Max Price: ${listingDetails.ListingMaxPrice} $, Reason: ${listingDetails.dsoReason}`);
    
      cy.log('DSO applied successfully, test completed');
      });

    it("should allow a user to modify an existing DSO", () => {

    });

    it("should allow a user to remove an existing DSO", () => {

    });
});
