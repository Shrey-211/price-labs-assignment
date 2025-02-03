/// <reference types="cypress" />

import { ListingDetails } from 'cypress/fixtures/listingDetails/listing_details.interface';
import { MultiCalendarPage } from 'cypress/pageObjects/multiCalenderPage/multiCalenderPage.page';
import { NavigationTab } from 'cypress/pageObjects/navigationTab/navigationTab.page';
import { visitPriceLabs } from 'cypress/support/index';
import { Urls } from 'cypress/support/utility';

let listingDetails: ListingDetails
const multiCalendarPage = new MultiCalendarPage();
const navigationTab = new NavigationTab();
const loginUrl = Cypress.env('baseUrl') as string;
const username = Cypress.env('username') as string;
const password = Cypress.env('password') as string;

before(() => {
  cy.fixture('listingDetails/listing_details').then((listingDetail) => {
    listingDetails = listingDetail;
  });
});

beforeEach(() => {
  visitPriceLabs();
  cy.login(loginUrl, username, password);
});

describe("MultiCalendar DSO Tests", () => {
    it("should allow a user to apply a Date-Specific Override (DSO)", () => {
      cy.url().should('include', Urls.PRICING);
      navigationTab.dynamicPricingButton().should('be.visible').click();
      navigationTab.calenderViewButton().should('be.visible').click();
      cy.url().should('include', Urls.MULTI_CALENDAR);
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
      cy.get('body').then(($body) => {
        if ($body.find('.css-bxak8j').length > 0) {
            multiCalendarPage.getOverrideUpdateButton().click();
            cy.log('Overriding confirmation');
        }
        });
      multiCalendarPage.getDsoPriceDetails(`Price: ${listingDetails.listingFinalPrice} $, Base Price: ${listingDetails.listingBasePrice} $, Min Price: ${listingDetails.listingMinPrice} $, Max Price: ${listingDetails.listingMaxPrice} $, Reason: ${listingDetails.dsoReason}`)
        .should('be.visible');
    
      cy.log('DSO applied successfully, test completed');
      });

    it("should allow a user to modify an existing DSO", () => {
      cy.url().should('include', Urls.PRICING);
      navigationTab.dynamicPricingButton().should('be.visible').click();
      navigationTab.calenderViewButton().should('be.visible').click();
      cy.url().should('include', Urls.MULTI_CALENDAR);
      multiCalendarPage.getSearchBar().should('be.visible').type(listingDetails.listingName);
      cy.wait(5000);
      multiCalendarPage.getDsoPriceDetails(`Price: ${listingDetails.listingFinalPrice} $, Base Price: ${listingDetails.listingBasePrice} $, Min Price: ${listingDetails.listingMinPrice} $, Max Price: ${listingDetails.listingMaxPrice} $, Reason: ${listingDetails.dsoReason}`).should('be.visible').click();
      multiCalendarPage.getDsoModalTitle().should('be.visible');
      multiCalendarPage.getDsoFinalPrice().should('be.visible').clear().type(listingDetails.updatedListingFinalPrice);
      multiCalendarPage.getDsoMinPrice().should('be.visible').clear().type(listingDetails.updatedListingMinPrice);
      multiCalendarPage.getDsoMaxPrice().should('be.visible').clear().type(listingDetails.updatedListingMaxPrice);
      multiCalendarPage.getDsoBasePrice().should('be.visible').clear().type(listingDetails.updatedListingBasePrice);
      multiCalendarPage.getCustomPriceReason().clear().type(listingDetails.updatedDsoReason);
      multiCalendarPage.getUpdateDsoButton().click();
      cy.get('body').then(($body) => {
        if ($body.find('.css-bxak8j').length > 0) {
            multiCalendarPage.getOverrideUpdateButton().click();
            cy.log('Overriding confirmation');
        }
        });
      multiCalendarPage.getDsoPriceDetails(`Price: ${listingDetails.listingFinalPrice} $, Base Price: ${listingDetails.listingBasePrice} $, Min Price: ${listingDetails.listingMinPrice} $, Max Price: ${listingDetails.listingMaxPrice} $, Reason: ${listingDetails.dsoReason}`)
        .should('be.visible');
      cy.log('DSO updated successfully, test completed');
      });

    it("should allow a user to remove an existing DSO", () => {
      cy.url().should('include', Urls.PRICING);
      navigationTab.dynamicPricingButton().should('be.visible').click();
      navigationTab.calenderViewButton().should('be.visible').click();
      cy.url().should('include', Urls.MULTI_CALENDAR);
      multiCalendarPage.getSearchBar().should('be.visible').type(listingDetails.listingName);
      cy.wait(5000);
      multiCalendarPage.getDsoPriceDetails('Shreyas Jadhav').should('be.visible').click();
      multiCalendarPage.getDsoModalTitle().should('be.visible');
      multiCalendarPage.getDeleteDsoButton().click();
      multiCalendarPage.getDsoPriceDetails('Shreyas Jadhav').should('not.exist');
      cy.log('DSO removed successfully, test completed');
    });
});

after(() => {
  cy.clearLocalStorage();
  cy.clearCookies();
});
