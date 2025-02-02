/// <reference types="cypress" />

import { ListingDetails } from 'cypress/fixtures/listingDetails/listing_details.interface';
import { CustomizationPage } from 'cypress/pageObjects/customizationsPage/customizationsPage.page';
import { ManageListingsPage } from 'cypress/pageObjects/manageListingPage/manageListingPage.page';
import { NavigationTab } from 'cypress/pageObjects/navigationTab/navigationTab.page';
import { visitPriceLabs } from 'cypress/support/index';

let listingDetails: ListingDetails
const navigationTab = new NavigationTab();
const manageListingsPage = new ManageListingsPage();
const customizationsPage = new CustomizationPage();
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
    it("should allow a user to create a new customization group and add to the listing", () => {
        navigationTab.dynamicPricingButton().should('be.visible').click();
        navigationTab.customizationsButton().should('be.visible').click();
        customizationsPage.groupTabButton().should('be.visible').click();
        customizationsPage.createGroupButton().should('be.visible').click();
        customizationsPage.createGroupHeader().should('be.visible');
        customizationsPage.groupNameInputField().type('Test Group Shreyas');
        customizationsPage.createGroupPopUpButton().should('be.visible').click();
        cy.wait(5000);
        customizationsPage.tableViewButton().should('be.visible').click();
        customizationsPage.searchBar().should('be.visible').type('Test Group Shreyas');
        customizationsPage.searchedContent().should('be.visible').and('have.text', 'Test Group Shreyas');

        cy.get('[qa-id="nav-item-title"]').should('be.visible').click();
        cy.get('[qa-id="dropdown-value-mlp"]').should('be.visible').click();
        manageListingsPage.getManageListingsFilterHeader().should('be.visible');
        manageListingsPage.getFilterCloseButton().should('be.visible').click();
        manageListingsPage.getManageListingPageHeader().should('be.visible');
        manageListingsPage.getShowAllListingsButton().should('be.visible').click();
        manageListingsPage.getSearchBar().should('be.visible').type(listingDetails.listingName);
        cy.wait(2000);
        manageListingsPage.getListingCheckbox().should('be.visible').click();
        manageListingsPage.getAssignGroupSubGroupButton().should('be.visible').click();
        manageListingsPage.getAssignGroupSubGroupContainerHeader().should('be.visible').and('have.text', 'Assign Group/Subgroup');
        manageListingsPage.getAssignGroupDropdown().should('be.visible').click();
        manageListingsPage.getGroupSearchBox().should('be.visible').type('Test Group Shreyas');
        manageListingsPage.getGroupDropdownOptions('Test Group Shreyas').should('be.visible').click();
        manageListingsPage.getUpdateButton().should('be.visible').click();
        manageListingsPage.getToastMessage().should('be.visible');
        manageListingsPage.getCustomizationGroupValue('Nothing Selected').should('be.visible');
        cy.log('Customization group and sub-group added, test completed');
    });

    it("should allow a user to edit the group name and the edited value should reflect in listings page", () => {
        navigationTab.dynamicPricingButton().should('be.visible').click();
        navigationTab.customizationsButton().should('be.visible').click();
        customizationsPage.groupTabButton().should('be.visible').click();
        customizationsPage.tableViewButton().should('be.visible').click();
        customizationsPage.searchBar().should('be.visible').type('Test Group Shreyas');
        cy.wait(2000);
        cy.get('body').then(($body) => {
            if ($body.find('tbody > tr > .column_group_name').length > 0) {
                cy.log('Group found, proceeding...');
            } else {
                cy.log('Group not found, test failed');
                throw new Error('Group not found');
            }
        });
        customizationsPage.editGroupButton().should('be.visible').click();
        customizationsPage.editGroupIframe()
            .its('0.contentDocument.body')
            .should('not.be.empty')
            .then(cy.wrap)
                .find('.css-hzg3i6')
                .contains('Customizations')
                .should('be.visible');
        customizationsPage.editGroupIframe()
            .its('0.contentDocument.body')
            .should('not.be.empty')
            .then(cy.wrap)
                .find('.css-1vqcnxu')
                .should('be.visible')
                .clear()
                .type('Test Group Shreyas Edited');
        customizationsPage.editGroupIframe()
            .its('0.contentDocument.body')
            .should('not.be.empty')
            .then(cy.wrap)
                .find('.css-79wky')
                .should('be.visible')
                .contains('Save Changes')
                .click();
        customizationsPage.successToaster().should('be.visible');

        cy.get('[qa-id="nav-item-title"]').should('be.visible').click();
        cy.get('[qa-id="dropdown-value-mlp"]').should('be.visible').click();
        manageListingsPage.getManageListingsFilterHeader().should('be.visible');
        manageListingsPage.getFilterCloseButton().should('be.visible').click();
        manageListingsPage.getManageListingPageHeader().should('be.visible');
        manageListingsPage.getShowAllListingsButton().should('be.visible').click();
        manageListingsPage.getSearchBar().should('be.visible').type(listingDetails.listingName);
        cy.wait(2000);
        manageListingsPage.getCustomizationGroupValue('Test Group Shreyas Edited').should('be.visible');
        cy.log('Edit listing was successful, test completed');
    });
});

after(() => {
    // delete the group  TODO
    // cy.get('.navbar-brand > img').click();
    // navigationTab.dynamicPricingButton().should('be.visible').click();
    // navigationTab.customizationsButton().should('be.visible').click();
    // customizationsPage.groupTabButton().should('be.visible').click();
    // customizationsPage.tableViewButton().should('be.visible').click();
    // customizationsPage.searchBar().should('be.visible').type('Test Group Shreyas');
    // cy.wait(2000);
    // cy.get('body').then(($body) => {
    //     if ($body.find('tbody > tr > .column_group_name').length > 0) {
    //         cy.log('Group found, proceeding to deletion');
    //     } else {
    //         cy.log('Group not found noting to delete');
    //         throw new Error('Group not found');
    //     }
    // });
    // customizationsPage.moreOptionsInTableButton().should('be.visible').click();
    // customizationsPage.deleteGroupOption().should('be.visible').click();
    cy.clearLocalStorage();
    cy.clearCookies();
});
