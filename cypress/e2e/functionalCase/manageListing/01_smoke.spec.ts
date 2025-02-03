/// <reference types="cypress" />

import { ListingDetails } from 'cypress/fixtures/listingDetails/listing_details.interface';
import { ManageListingsPage } from 'cypress/pageObjects/manageListingPage/manageListingPage.page';
import { NavigationTab } from 'cypress/pageObjects/navigationTab/navigationTab.page';
import { visitPriceLabs } from 'cypress/support/index';
import { Urls } from 'cypress/support/utility';

let listingDetails: ListingDetails
const navigationTab = new NavigationTab();
const manageListingsPage = new ManageListingsPage();
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

describe("Manage Listings Tests", () => {
    it("should allow a user to see all listings in Manage Listings", () => {
        cy.url().should('include', Urls.PRICING);
        navigationTab.dynamicPricingButton().should('be.visible').click();
        navigationTab.manageListingButton().should('be.visible').click();
        cy.url().should('include', Urls.MANAGE_LISTINGS);
        cy.log('Manage Listings page is visible');

        // click on show all listing button to verify its functionality
        manageListingsPage.getManageListingsFilterHeader().should('be.visible');
        manageListingsPage.getFilterCloseButton().should('be.visible').click();
        manageListingsPage.getManageListingPageHeader().should('be.visible');
        manageListingsPage.getShowAllListingsButton().should('be.visible').click();
        manageListingsPage.getTabsHeader().should('be.visible');
        manageListingsPage.getUnmappedListingHeader().should('be.visible');
        manageListingsPage.getMappedListingHeader().should('be.visible');
        manageListingsPage.getCombinedListingHeader().should('be.visible');
        manageListingsPage.getListingTable().should('be.visible');
        cy.log('All listings are visible, test completed');
    });

    it("should allow a user to add tag to the listing", () => {
        cy.url().should('include', Urls.PRICING);
        navigationTab.dynamicPricingButton().should('be.visible').click();
        navigationTab.manageListingButton().should('be.visible').click();
        cy.url().should('include', Urls.MANAGE_LISTINGS);
        cy.log('Manage Listings page is visible');

        // add tags
        manageListingsPage.getManageListingsFilterHeader().should('be.visible');
        manageListingsPage.getFilterCloseButton().should('be.visible').click();
        manageListingsPage.getManageListingPageHeader().should('be.visible');
        manageListingsPage.getShowAllListingsButton().should('be.visible').click();
        manageListingsPage.getSearchBar().should('be.visible').type(listingDetails.listingName);
        cy.wait(2000);
        manageListingsPage.getAddTagButton().should('be.visible').click();
        manageListingsPage.getAddTagContainerHeader().should('be.visible');
        manageListingsPage.getAddTagContainerInput().should('be.visible').type('Test Tag');
        manageListingsPage.getAddTagContainerCreateButton().should('be.visible').click();
        manageListingsPage.getToastMessage().should('be.visible');
        manageListingsPage.getAddedTag('Test Tag').should('be.visible');
        cy.log('Tag added successfully, test completed');
    });

    it("should allow a remove an existing tag", () => {
        cy.url().should('include', Urls.PRICING);
        navigationTab.dynamicPricingButton().should('be.visible').click();
        navigationTab.manageListingButton().should('be.visible').click();
        cy.url().should('include', Urls.MANAGE_LISTINGS);
        cy.log('Manage Listings page is visible');

        // remove existing tag
        manageListingsPage.getManageListingsFilterHeader().should('be.visible');
        manageListingsPage.getFilterCloseButton().should('be.visible').click();
        manageListingsPage.getManageListingPageHeader().should('be.visible');
        manageListingsPage.getShowAllListingsButton().should('be.visible').click();
        manageListingsPage.getSearchBar().should('be.visible').type(listingDetails.listingName);
        cy.wait(2000);
        manageListingsPage.getAddedTag('Test Tag').should('be.visible').click();
        manageListingsPage.getToastMessage().should('be.visible');
        cy.get('body').then(($body) => {
            if ($body.find(`[data-tag-name="Test Tag"]`).length > 0) {
                cy.log('Failed to removed tag, test failed');
                throw new Error('Failed to remove tag');
            } else {
                cy.log('tag removed successfully, test completed');
            }
        });
    });
});

after(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
});
