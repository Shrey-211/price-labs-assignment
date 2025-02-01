/// <reference types="cypress" />

import { ListingDetails } from 'cypress/fixtures/listingDetails/listing_details.interface';
import { User } from 'cypress/fixtures/loginDetails/login_details.interface';
import { MultiCalendarPage } from 'cypress/pageObjects/multiCalenderPage/multiCalenderPage.page';
import { PricingDashboardPage } from 'cypress/pageObjects/pricingDashboard/pricingDashboardPage.page';
import { visitPriceLabs } from 'cypress/support/index';
import { Utility } from 'cypress/support/utility';

let listingDetails: ListingDetails
let loginDetails: User
const multiCalendarPage = new MultiCalendarPage();
const pricingPage = new PricingDashboardPage();
const loginUrl = new Utility().getBaseLoginUrl();

before(() => {
  cy.fixture('listingDetails/listing_details').then((listingDetail) => {
    listingDetails = listingDetail;
  });
  cy.fixture('loginDetails/login_details').then((loginDetail) => {
    loginDetails = loginDetail.validUser;
  });
});

beforeEach(() => {
  visitPriceLabs();
  cy.login(loginUrl, loginDetails.username, loginDetails.password); // Assuming a login helper exists
});

describe("MultiCalendar DSO Tests", () => {
    it("should allow a user to apply a Date-Specific Override (DSO)", () => {
      pricingPage.dynamicPricingButton().should('be.visible').click();
      pricingPage.calenderViewButton().should('be.visible').click();
      multiCalendarPage.getSearchBar().should('be.visible').type(listingDetails.listingName);
      cy.wait(5000);
      multiCalendarPage.getFilteredProperty().should('be.visible');
      multiCalendarPage.getMoreVertIcon().should('be.visible').click();
      multiCalendarPage.getAddOverrideButton().should('be.visible').click();
      multiCalendarPage.getDsoModalTitle().should('be.visible');
      multiCalendarPage.getDsoFinalPrice().should('be.visible').type(listingDetails.listingFinalPrice);
      multiCalendarPage.getDsoMinPrice().should('be.visible').type(listingDetails.listingMinPrice);
      multiCalendarPage.getDsoMaxPrice().should('be.visible').type(listingDetails.listingMaxPrice);
      multiCalendarPage.getDsoBasePrice().should('be.visible').type(listingDetails.listingBasePrice);
      multiCalendarPage.getCustomPriceReason().type(listingDetails.dsoReason);
      multiCalendarPage.getAddDsoButton().click();
      multiCalendarPage.getDsoPriceDetails()
        .should('be.visible')
        .and('have.text', `Price: ${listingDetails.listingFinalPrice} $, Base Price: ${listingDetails.listingBasePrice} $, Min Price: ${listingDetails.listingMinPrice} $, Max Price: ${listingDetails.listingMaxPrice} $, Reason: ${listingDetails.dsoReason}`);
    
      cy.log('DSO applied successfully, test completed');
      });

    it("should allow a user to modify an existing DSO", () => {
      pricingPage.dynamicPricingButton().should('be.visible').click();
      pricingPage.calenderViewButton().should('be.visible').click();
      multiCalendarPage.getSearchBar().should('be.visible').type(listingDetails.listingName);
      cy.wait(5000);
      multiCalendarPage.getDsoPriceDetails().should('be.visible').click();
      multiCalendarPage.getDsoModalTitle().should('be.visible');
      multiCalendarPage.getDsoFinalPrice().should('be.visible').clear().type(listingDetails.updatedListingFinalPrice);
      multiCalendarPage.getDsoMinPrice().should('be.visible').clear().type(listingDetails.updatedListingMinPrice);
      multiCalendarPage.getDsoMaxPrice().should('be.visible').clear().type(listingDetails.updatedListingMaxPrice);
      multiCalendarPage.getDsoBasePrice().should('be.visible').clear().type(listingDetails.updatedListingBasePrice);
      multiCalendarPage.getCustomPriceReason().clear().type(listingDetails.updatedDsoReason);
      multiCalendarPage.getUpdateDsoButton().click();
      multiCalendarPage.getDsoPriceDetails()
        .should('be.visible')
        .and('have.text', `Price: ${listingDetails.updatedListingFinalPrice} $, Base Price: ${listingDetails.updatedListingBasePrice} $, Min Price: ${listingDetails.updatedListingMinPrice} $, Max Price: ${listingDetails.updatedListingMaxPrice} $, Reason: ${listingDetails.updatedDsoReason}`);
    });

    it("should allow a user to remove an existing DSO", () => {
      pricingPage.dynamicPricingButton().should('be.visible').click();
      pricingPage.calenderViewButton().should('be.visible').click();
      multiCalendarPage.getSearchBar().should('be.visible').type(listingDetails.listingName);
      cy.wait(5000);
      multiCalendarPage.getDsoPriceDetails().should('be.visible').click();
      multiCalendarPage.getDsoModalTitle().should('be.visible');
      multiCalendarPage.getDeleteDsoButton().click();
      multiCalendarPage.getDsoPriceDetails().should('not.exist');
    });
});
