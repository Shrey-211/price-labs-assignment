/// <reference types="cypress" />

import { ListingDetails } from 'cypress/fixtures/listingDetails/listing_details.interface';
import { MultiCalendarPage } from 'cypress/pageObjects/multiCalenderPage/multiCalenderPage.page';
import { ManageListingsPage } from 'cypress/pageObjects/manageListingPage/manageListingPage.page';
import { NavigationTab } from 'cypress/pageObjects/navigationTab/navigationTab.page';
import { visitPriceLabs } from 'cypress/support/index';
import { HttpStatus, ApiEndpoints, Urls} from 'cypress/support/utility';
import { EnglishTexts } from 'cypress/fixtures/text/en.interface';

let listingDetails: ListingDetails
let enText: EnglishTexts;
const multiCalendarPage = new MultiCalendarPage();
const navigationTab = new NavigationTab();
const manageListingsPage = new ManageListingsPage();
const loginUrl = Cypress.env('baseUrl') as string;
const username = Cypress.env('username') as string;
const password = Cypress.env('password') as string;

before(() => {
    cy.fixture('listingDetails/listing_details').then((listingDetail) => {
        listingDetails = listingDetail;
    });
    cy.fixture('text/en').then((engText) => {
        enText = engText;
    });
});

beforeEach(() => {
    visitPriceLabs();
    cy.login(loginUrl, username, password);
});

describe("MultiCalendar DSO e2e Tests", () => {
    it("should allow a user to apply a Date-Specific Override (DSO) and sync data", () => {
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
        cy.wait(2000)
        cy.get('body').then(($body) => {
            if ($body.find('.css-bxak8j').length > 0) {
                multiCalendarPage.getOverrideUpdateButton().click();
                cy.log('Overriding confirmation');
            }
            });
        multiCalendarPage.getDsoPriceDetails(`Price: ${listingDetails.listingFinalPrice} $, Base Price: ${listingDetails.listingBasePrice} $, Min Price: ${listingDetails.listingMinPrice} $, Max Price: ${listingDetails.listingMaxPrice} $, Reason: ${listingDetails.dsoReason}`).first()
            .should('be.visible');
        
        cy.log('DSO applied successfully');
        cy.intercept('POST', ApiEndpoints.SYNC_PRICES).as('syncPrices'); // Intercepts API call to verify sync
        multiCalendarPage.getSyncButton().should('be.visible').click();
        cy.wait('@syncPrices').its('response.statusCode').should('eq', HttpStatus.OK);
    });

    it("should allow a user to map listings", () => {
        cy.url().should('include', Urls.PRICING);
        navigationTab.dynamicPricingButton().should('be.visible').click();
        navigationTab.calenderViewButton().should('be.visible').click();
        cy.url().should('include', Urls.MULTI_CALENDAR);
        cy.log('Multi-Calendar page open');

        // mapping the listing
        multiCalendarPage.getMapListingButton().should('be.visible').click({force : true});
        multiCalendarPage.getMapListingHeader().should('be.visible');
        multiCalendarPage.parentListingDropdown().should('be.visible').click();
        multiCalendarPage.parentListingDropdown().type(listingDetails.parentListingName);
        multiCalendarPage.listingDropdownOption().should('be.visible').click();
        cy.log('parent mapping successful');

        multiCalendarPage.childListingDropdown().type(listingDetails.childListingName);
        multiCalendarPage.listingDropdownOption().should('be.visible').click();
        cy.log('child mapping successful');

        multiCalendarPage.getMapListingHeader().should('be.visible').click();
        multiCalendarPage.getMapListingConfirmButton().should('be.visible').click();
        multiCalendarPage.getMapListingConfirmDialogMessage().should('be.visible').and('have.text', enText.mappedSuccessfully);
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

// Unmap the listings after the test
after(() => {
    navigationTab.dynamicPricingButton().should('be.visible').click();
    navigationTab.manageListingButton().should('be.visible').click();
    cy.get('[qa-id="apply-filter"]').click();
    cy.get('[data-name="mapped_listings"]').click();
    manageListingsPage.getMappedListingSearchBar().type("Lifes A Beach"); // not used fixture as in mapped listing, "Life's A Beach" fails due to use of " ' "
    cy.wait(5000);
    manageListingsPage.getMappedListingCheckbox().click();
    cy.get('#unmap_listing_bulk').click();
    cy.get('#unmap-listing-button').click();
    cy.get('.no-records-found > td').should('be.visible');
    cy.clearLocalStorage();
    cy.clearCookies();
});
