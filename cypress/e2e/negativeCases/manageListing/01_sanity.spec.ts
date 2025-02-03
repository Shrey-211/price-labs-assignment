/// <reference types="cypress" />
import { ListingDetails } from 'cypress/fixtures/listingDetails/listing_details.interface';
import { EnglishTexts } from 'cypress/fixtures/text/en.interface';
import { ManageListingsPage } from 'cypress/pageObjects/manageListingPage/manageListingPage.page';
import { NavigationTab } from 'cypress/pageObjects/navigationTab/navigationTab.page';
import { visitPriceLabs } from 'cypress/support/index';
import { Urls } from 'cypress/support/utility';

let listingDetails: ListingDetails;
let enText: EnglishTexts;
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

describe("Manage Listings Negative Tests", () => {
    it("should not allow user to add same group and subgroup for a listing", () => {
        cy.url().should('include', Urls.PRICING);
        navigationTab.dynamicPricingButton().should('be.visible').click();
        navigationTab.manageListingButton().should('be.visible').click();
        cy.url().should('include', Urls.MANAGE_LISTINGS);
        cy.log('Manage listing page opened');

        // searching the desired listing
        manageListingsPage.getManageListingsFilterHeader().should('be.visible');
        manageListingsPage.getFilterCloseButton().should('be.visible').click();
        manageListingsPage.getManageListingPageHeader().should('be.visible');
        manageListingsPage.getShowAllListingsButton().should('be.visible').click({force: true});
        manageListingsPage.getSearchBar().should('be.visible').type(listingDetails.childListingName);
        cy.wait(2000);
        cy.log('Listing searched successfully');

        // try to add same group and sub group
        manageListingsPage.getListingCheckbox().should('be.visible').click();
        manageListingsPage.getAssignGroupSubGroupButton().should('be.visible').click();
        manageListingsPage.getAssignGroupSubGroupContainerHeader().should('be.visible').and('have.text', enText.assignGroupSubGroupContainerHeader);
        manageListingsPage.getAssignGroupDropdown().should('be.visible').click();
        manageListingsPage.getGroupSearchBox().should('be.visible').type(listingDetails.groupNameSanityCase);
        manageListingsPage.getGroupDropdownOptions(listingDetails.groupNameSanityCase).should('be.visible').click();
        manageListingsPage.getAssignSubGroupDropdown().should('be.visible').click();
        manageListingsPage.getSubGroupSearchBox().should('be.visible').type(listingDetails.groupNameSanityCase);
        manageListingsPage.getSubGroupDropdownOptions().should('be.visible').click();
        manageListingsPage.getUpdateButton().should('be.visible').click();
        manageListingsPage.getToastMessage().should('be.visible');
        manageListingsPage.getCustomizationGroupValue('Nothing Selected').should('be.visible');
        cy.log('User was not able to add same group and sub group, test completed');
    });

    it("should not allow a user to hide a listing unless sync is switched off", () => {
        cy.url().should('include', Urls.PRICING);
        navigationTab.dynamicPricingButton().should('be.visible').click();
        navigationTab.manageListingButton().should('be.visible').click();
        cy.url().should('include', Urls.MANAGE_LISTINGS);
        cy.log('Manage listing page opened');

        // try to hide listing
        manageListingsPage.getManageListingsFilterHeader().should('be.visible');
        manageListingsPage.getFilterCloseButton().should('be.visible').click();
        manageListingsPage.getManageListingPageHeader().should('be.visible');
        manageListingsPage.getShowAllListingsButton().should('be.visible').click({force: true});
        manageListingsPage.getMappedListingHeader().should('be.visible').click();
        manageListingsPage.getMappedListingSearchBar().should('be.visible').type(listingDetails.listingNameHideAndSync);
        cy.wait(2000);
        manageListingsPage.getMappedListingCheckbox().should('be.visible').click();
        manageListingsPage.getHideListingButton().should('be.visible').click();
        manageListingsPage.getToastMessage().should('be.visible');
        cy.log('User was not able to hide listing, test completed');
    });
});

after(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
});
