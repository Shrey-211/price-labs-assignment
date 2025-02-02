/// <reference types="cypress" />

import { ListingDetails } from 'cypress/fixtures/listingDetails/listing_details.interface';
import { ListingInvalidDetails } from 'cypress/fixtures/listingDetails/invalid_listing_details.interface';
import { User } from 'cypress/fixtures/loginDetails/login_details.interface';
import { MultiCalendarPage } from 'cypress/pageObjects/multiCalenderPage/multiCalenderPage.page';
import { PricingDashboardPage } from 'cypress/pageObjects/pricingDashboard/pricingDashboardPage.page';
import { visitPriceLabs } from 'cypress/support/index';
import { ApiEndpoints, HttpStatus, Utility } from 'cypress/support/utility';

let listingDetails: ListingDetails
let ListingInvalidDetails: ListingInvalidDetails
let loginDetails: User
const multiCalendarPage = new MultiCalendarPage();
const pricingPage = new PricingDashboardPage();
const loginUrl = new Utility().getBaseLoginUrl();

before(() => {
    cy.fixture('listingDetails/listing_details').then((listingDetail) => {
        listingDetails = listingDetail;
    });
    cy.fixture('listingDetails/invalid_listing_details').then((listingInvalidDetail) => {
        ListingInvalidDetails = listingInvalidDetail;
    });
    cy.fixture('loginDetails/login_details').then((loginDetail) => {
        loginDetails = loginDetail.validUser;
    });
});

beforeEach(() => {
    visitPriceLabs();
    cy.login(loginUrl, loginDetails.username, loginDetails.password);
});

describe("MultiCalendar DSO Negative Test Flows", () => {
    it("should not allow a user to apply a Date-Specific Override (DSO) with negative values", () => {
        pricingPage.dynamicPricingButton().should('be.visible').click();
        cy.intercept('POST', ApiEndpoints.MULTI_CALENDER_DSO).as('multiCalenderPage');
        multiCalendarPage.getMapListingButton().should('be.visible').click();
        cy.wait('@multiCalenderPage').its('response.statusCode').should('eq', HttpStatus.CREATED);
        multiCalendarPage.getSearchBar().should('be.visible').type(listingDetails.listingName);
        cy.wait(5000);
        multiCalendarPage.getFilteredProperty().should('be.visible');
        multiCalendarPage.getMoreVertIcon().should('be.visible').click();
        multiCalendarPage.getAddOverrideButton().should('be.visible').click();
        multiCalendarPage.getDsoModalTitle().should('be.visible');
        multiCalendarPage.getDsoFinalPrice().should('be.visible').type(ListingInvalidDetails.listingFinalPrice); // input the negative value
        multiCalendarPage.getStayRestrictionsHeader().should('be.visible').click(); // click outside the input field
        multiCalendarPage.getDsoFinalPrice().invoke('val').should('be.empty'); // check if the input field is empty
        multiCalendarPage.getErrorToaster().should('be.visible'); // check if the toaster is visible
        multiCalendarPage.getDsoMinPrice().should('be.visible').type(ListingInvalidDetails.listingMinPrice); // input the negative value
        multiCalendarPage.getStayRestrictionsHeader().should('be.visible').click(); // click outside the input field
        multiCalendarPage.getDsoMinPrice().invoke('val').should('be.empty'); // check if the input field is empty
        multiCalendarPage.getErrorToaster().should('be.visible'); // check if the toaster is visible
        multiCalendarPage.getDsoMaxPrice().should('be.visible').type(ListingInvalidDetails.listingMaxPrice); // input the negative value
        multiCalendarPage.getStayRestrictionsHeader().should('be.visible').click(); // click outside the input field
        multiCalendarPage.getDsoMaxPrice().invoke('val').should('be.empty'); // check if the input field is empty
        multiCalendarPage.getErrorToaster().should('be.visible'); // check if the toaster is visible
        multiCalendarPage.getDsoBasePrice().should('be.visible').type(ListingInvalidDetails.listingBasePrice); // input the negative value
        multiCalendarPage.getStayRestrictionsHeader().should('be.visible').click(); // click outside the input field
        multiCalendarPage.getDsoBasePrice().invoke('val').should('be.empty'); // check if the input field is empty
        multiCalendarPage.getErrorToaster().should('be.visible'); // check if the toaster is visible

        // Try to save the empty form
        multiCalendarPage.getAddDsoButton().click();
        multiCalendarPage.getErrorToaster().should('be.visible'); // check if the toaster is visible`
        cy.log('DSO not applied successfully, test completed');
    });

    it("should not allow a user to sync when sync toggle is disable", () => {
        pricingPage.dynamicPricingButton().should('be.visible').click();
        cy.intercept('POST', ApiEndpoints.MULTI_CALENDER_DSO).as('multiCalenderPage');
        multiCalendarPage.getMapListingButton().should('be.visible').click();
        cy.wait('@multiCalenderPage').its('response.statusCode').should('eq', HttpStatus.CREATED);
        multiCalendarPage.getSearchBar().should('be.visible').type(listingDetails.listingName);
        cy.wait(5000);
        multiCalendarPage.getFilteredProperty().should('be.visible');

        // disable sync toggle
        cy.intercept('POST', ApiEndpoints.TOGGLE_STATUS).as('toggleStatus'); // Intercepts API call to verify sync button status
        multiCalendarPage.getSyncToggle().should('be.visible').click();
        cy.wait('@toggleStatus').its('response.statusCode').should('eq', HttpStatus.OK);

        // sync the listing        
        multiCalendarPage.getSyncButton().should('be.visible').click();
        multiCalendarPage.getErrorToaster().should('be.visible'); // check if the toaster is visible
    });
});

after(() => {
    // enable sync toggle
    cy.intercept('POST', ApiEndpoints.TOGGLE_STATUS).as('toggleStatus'); // Intercepts API call to verify sync button status
    multiCalendarPage.getSyncToggle().should('be.visible').click();     
    cy.wait('@toggleStatus').its('response.statusCode').should('eq', HttpStatus.OK);
});