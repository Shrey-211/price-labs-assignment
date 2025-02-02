/// <reference types="cypress" />

import { ListingDetails } from 'cypress/fixtures/listingDetails/listing_details.interface';
import { User } from 'cypress/fixtures/loginDetails/login_details.interface';
import { MultiCalendarPage } from 'cypress/pageObjects/multiCalenderPage/multiCalenderPage.page';
import { PricingDashboardPage } from 'cypress/pageObjects/pricingDashboard/pricingDashboardPage.page';
import { visitPriceLabs } from 'cypress/support/index';
import { HttpStatus, Utility, ApiEndpoints} from 'cypress/support/utility';

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
    cy.login(loginUrl, loginDetails.username, loginDetails.password);
});

// Unmap the listings after the test
after(() => {
    pricingPage.dynamicPricingButton().should('be.visible').click();
    cy.contains('.css-23zmd7', 'Manage Listings').should('be.visible').click();
    cy.get('[qa-id="apply-filter"]').click();
    cy.get('[data-name="mapped_listings"]').click();
    cy.get('#mapped_listings > .table-responsive > .bootstrap-table > .fixed-table-toolbar > .float-left > .form-control').type(listingDetails.parentListingName);
    cy.wait(5000);
    cy.get('#mapped-table > thead > tr > .bs-checkbox > .th-inner > label > input').click();
    cy.get('#unmap_listing_bulk').click();
    cy.get('#unmap-listing-button').click();
    cy.get('.no-records-found > td').should('be.visible');
    cy.clearLocalStorage();
    cy.clearCookies();
});

describe("MultiCalendar DSO e2e Tests", () => {
    it("should allow a user to apply a Date-Specific Override (DSO) and sync data", () => {
        pricingPage.dynamicPricingButton().should('be.visible').click();
        // cy.intercept('POST', ApiEndpoints.MULTI_CALENDER_DSO).as('multiCalenderPage');
        multiCalendarPage.getMapListingButton().should('be.visible').click();
        // cy.wait('@multiCalenderPage').its('response.statusCode').should('eq', HttpStatus.CREATED);
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
        cy.wait(2000)
        cy.get('body').then(($body) => {
            if ($body.find('.css-bxak8j').length > 0) {
                multiCalendarPage.getOverrideUpdateButton().click();
                cy.log('Overriding confirmation');
            }
            });
        multiCalendarPage.getDsoPriceDetails().first()
            .should('be.visible')
            .and('have.text', `Price: ${listingDetails.listingFinalPrice} $, Base Price: ${listingDetails.listingBasePrice} $, Min Price: ${listingDetails.listingMinPrice} $, Max Price: ${listingDetails.listingMaxPrice} $, Reason: ${listingDetails.dsoReason}`);
        
        cy.log('DSO applied successfully');
        cy.intercept('POST', ApiEndpoints.SYNC_PRICES).as('syncPrices'); // Intercepts API call to verify sync
        multiCalendarPage.getSyncButton().should('be.visible').click();
        cy.wait('@syncPrices').its('response.statusCode').should('eq', HttpStatus.OK);
    });

    it.only("should allow a user to map listings", () => {
        pricingPage.dynamicPricingButton().should('be.visible').click();
        // cy.intercept('POST', ApiEndpoints.MULTI_CALENDER_DSO).as('multiCalenderPage');
        pricingPage.calenderViewButton().should('be.visible').click();
        cy.wait(5000);
        // cy.wait('@multiCalenderPage').its('response.statusCode').should('eq', HttpStatus.CREATED);
        multiCalendarPage.getMapListingButton().should('be.visible').click();
        multiCalendarPage.getMapListingHeader().should('be.visible');
        multiCalendarPage.parentListingDropdown().should('be.visible').click();
        multiCalendarPage.parentListingDropdown().type(listingDetails.parentListingName);
        multiCalendarPage.listingDropdownOption().should('be.visible').click();
        multiCalendarPage.childListingDropdown().type(listingDetails.childListingName);
        multiCalendarPage.listingDropdownOption().should('be.visible').click();
        multiCalendarPage.getMapListingHeader().should('be.visible').click();
        multiCalendarPage.getMapListingConfirmButton().should('be.visible').click();
        multiCalendarPage.getMapListingConfirmDialogMessage().should('be.visible').and('have.text', 'Mapped Successfully');
        multiCalendarPage.getMapListingDoneMappingButton().should('be.visible').click();
        multiCalendarPage.getSearchBar().should('be.visible').type(listingDetails.parentListingName);
        cy.wait(5000);
        cy.get('.css-1kh6bo9').should('be.visible').and('have.text', listingDetails.parentListingName);
        cy.get('body').then(($body) => {
            if ($body.find('.css-zob6z2').length > 0) {
                cy.log('Parent Mapping Successful');
            } else {
                cy.log('Parent Mapping Failed');
                throw new Error('Parent Mapping Failed');
            }
        });
        multiCalendarPage.getSearchBarClearButton().should('be.visible').click();
        multiCalendarPage.getSearchBar().should('be.visible').type(listingDetails.childListingName);
        cy.wait(5000);
        cy.get('.css-1jivscp').should('be.visible').and('have.text', listingDetails.childListingName);
        cy.get('body').then(($body) => {
            if ($body.find('.css-1hrb2ew').length > 0) {
                cy.log('Child Mapping Successful');
            } else {
                cy.log('Child Mapping Failed');
                throw new Error('Child Mapping Failed');
            }
        });
    });
});
