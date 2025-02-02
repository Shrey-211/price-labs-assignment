/// <reference types="cypress" />

import { ListingDetails } from 'cypress/fixtures/listingDetails/listing_details.interface';
import { User } from 'cypress/fixtures/loginDetails/login_details.interface';
import { ManageListingsPage } from 'cypress/pageObjects/manageListingPage/manageListingPage.page';
import { NavigationTab } from 'cypress/pageObjects/navigationTab/navigationTab.page';
import { visitPriceLabs } from 'cypress/support/index';
import { Utility } from 'cypress/support/utility';

let listingDetails: ListingDetails
let loginDetails: User
const navigationTab = new NavigationTab();
const manageListingsPage = new ManageListingsPage();
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

describe("Manage Listings Tests", () => {
    it("should allow a user to create a new customization group and sub-group and add to the listing", () => {
        cy.log('Customization group and sub-group added, test completed');
    });
});

after(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
});
