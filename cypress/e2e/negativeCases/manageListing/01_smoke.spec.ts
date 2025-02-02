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

describe("Manage Listings Negative Tests", () => {
    it("should not allow user to add same group and subgroup for a listing", () => {
        navigationTab.dynamicPricingButton().should('be.visible').click();
        navigationTab.manageListingButton().should('be.visible').click();
        manageListingsPage.getManageListingsFilterHeader().should('be.visible');
        manageListingsPage.getFilterCloseButton().should('be.visible').click();
        manageListingsPage.getManageListingPageHeader().should('be.visible');
        manageListingsPage.getShowAllListingsButton().should('be.visible').click();
        manageListingsPage.getSearchBar().should('be.visible').type(listingDetails.childListingName);
        cy.wait(2000);
        manageListingsPage.getListingCheckbox().should('be.visible').click();
        manageListingsPage.getAssignGroupSubGroupButton().should('be.visible').click();
        manageListingsPage.getAssignGroupSubGroupContainerHeader().should('be.visible').and('have.text', 'Assign Group/Subgroup');
        manageListingsPage.getAssignGroupDropdown().should('be.visible').click();
        manageListingsPage.getGroupSearchBox().should('be.visible').type('abc');
        manageListingsPage.getGroupDropdownOptions('abc').should('be.visible').click();
        manageListingsPage.getAssignSubGroupDropdown().should('be.visible').click();
        manageListingsPage.getSubGroupSearchBox().should('be.visible').type('abc');
        manageListingsPage.getSubGroupDropdownOptions().should('be.visible').click();
        manageListingsPage.getUpdateButton().should('be.visible').click();
        manageListingsPage.getToastMessage().should('be.visible');
        manageListingsPage.getCustomizationGroupValue().should('be.visible');
        cy.log('User was not able to add same group and sub group, test completed');
    });

    it("should not allow a user to hide a listing unless sync is switched off", () => {
        navigationTab.dynamicPricingButton().should('be.visible').click();
        navigationTab.manageListingButton().should('be.visible').click();
        manageListingsPage.getManageListingsFilterHeader().should('be.visible');
        manageListingsPage.getFilterCloseButton().should('be.visible').click();
        manageListingsPage.getManageListingPageHeader().should('be.visible');
        manageListingsPage.getShowAllListingsButton().should('be.visible').click();
        manageListingsPage.getMappedListingHeader().should('be.visible').click();
        manageListingsPage.getMappedListingSearchBar().should('be.visible').type('121 Select Views');
        cy.wait(2000);
        manageListingsPage.getMappedListingCheckbox().should('be.visible').click();
        manageListingsPage.getHideListingButton().should('be.visible').click();
        manageListingsPage.getToastMessage().should('be.visible');
        cy.log('Tag added successfully, test completed');
    });
});

after(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
});
