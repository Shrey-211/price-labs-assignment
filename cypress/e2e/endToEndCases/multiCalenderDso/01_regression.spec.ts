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

describe("MultiCalendar DSO e2e Tests", () => {
    it("should allow a user to apply a Date-Specific Override (DSO) and sync data", () => {
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
        cy.wait('@syncPrices').its('response.statusCode').should('eq', HttpStatus.OK);;
    });
});
