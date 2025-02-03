/// <reference types="cypress" />

import { GroupDetails } from 'cypress/fixtures/groupDetails/group_details.interface';
import { ListingDetails } from 'cypress/fixtures/listingDetails/listing_details.interface';
import { EnglishTexts } from 'cypress/fixtures/text/en.interface';
import { CustomizationPage } from 'cypress/pageObjects/customizationsPage/customizationsPage.page';
import { ManageListingsPage } from 'cypress/pageObjects/manageListingPage/manageListingPage.page';
import { NavigationTab } from 'cypress/pageObjects/navigationTab/navigationTab.page';
import { visitPriceLabs } from 'cypress/support/index';
import { Urls } from 'cypress/support/utility';

let listingDetails: ListingDetails;
let groupDetails: GroupDetails;
let enText: EnglishTexts;
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
    cy.fixture('groupDetails/group_details').then((groupDetail) => {
        groupDetails = groupDetail;
    });
    cy.fixture('text/en').then((engText) => {
        enText = engText;
    });
    });

beforeEach(() => {
    visitPriceLabs();
    cy.login(loginUrl, username, password);
});

describe("Manage Listings Tests", () => {
    it("should allow a user to create a new customization group and add to the listing", () => {
        cy.url().should('include', Urls.PRICING);
        navigationTab.dynamicPricingButton().should('be.visible').click();
        navigationTab.customizationsButton().should('be.visible').click();
        cy.url().should('include', Urls.CUSTOMIZATIONS);
        cy.log('Customizations page loaded');

        // add a new group
        customizationsPage.groupTabButton().should('be.visible').click();
        customizationsPage.createGroupButton().should('be.visible').click();
        customizationsPage.createGroupHeader().should('be.visible');
        customizationsPage.groupNameInputField().type(groupDetails.groupName);
        customizationsPage.createGroupPopUpButton().should('be.visible').click();
        cy.wait(5000);
        customizationsPage.tableViewButton().should('be.visible').click();
        customizationsPage.searchBar().should('be.visible').type(groupDetails.groupName);
        customizationsPage.searchedContent().should('be.visible').and('have.text', groupDetails.groupName);
        cy.log('New group added')

        // navigate to manage listing
        cy.get('[qa-id="nav-item-title"]').should('be.visible').click();
        cy.get('[qa-id="dropdown-value-mlp"]').should('be.visible').click();
        cy.url().should('include', Urls.MANAGE_LISTINGS);
        cy.log('Manage listings page loaded');

        // search and add group tp listing
        manageListingsPage.getManageListingsFilterHeader().should('be.visible');
        manageListingsPage.getFilterCloseButton().should('be.visible').click();
        manageListingsPage.getManageListingPageHeader().should('be.visible');
        manageListingsPage.getShowAllListingsButton().should('be.visible').click({force: true});
        manageListingsPage.getSearchBar().should('be.visible').type(listingDetails.listingName);
        cy.wait(2000);
        manageListingsPage.getListingCheckbox().should('be.visible').click();
        manageListingsPage.getAssignGroupSubGroupButton().should('be.visible').click();
        manageListingsPage.getAssignGroupSubGroupContainerHeader().should('be.visible').and('have.text', enText.assignGroupSubGroupContainerHeader);
        manageListingsPage.getAssignGroupDropdown().should('be.visible').click();
        manageListingsPage.getGroupSearchBox().should('be.visible').type(groupDetails.groupName);
        manageListingsPage.getGroupDropdownOptions(groupDetails.groupName).should('be.visible').click();
        manageListingsPage.getUpdateButton().should('be.visible').click();
        manageListingsPage.getToastMessage().should('be.visible');
        manageListingsPage.getCustomizationGroupValue('Nothing Selected').should('be.visible');
        cy.log('New group created and added yo a listing, test completed');
    });

    it("should allow a user to edit the group name and the edited value should reflect in listings page", () => {
        cy.url().should('include', Urls.PRICING);
        navigationTab.dynamicPricingButton().should('be.visible').click();
        navigationTab.customizationsButton().should('be.visible').click();
        cy.url().should('include', Urls.CUSTOMIZATIONS);
        cy.log('Customizations page loaded');

        // searching and editing the group name
        customizationsPage.groupTabButton().should('be.visible').click();
        customizationsPage.tableViewButton().should('be.visible').click();
        customizationsPage.searchBar().should('be.visible').type(listingDetails.listingName);
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
                .type(groupDetails.groupNameEdited);
        customizationsPage.editGroupIframe()
            .its('0.contentDocument.body')
            .should('not.be.empty')
            .then(cy.wrap)
                .find('.css-79wky')
                .should('be.visible')
                .contains('Save Changes')
                .click();
        customizationsPage.successToaster().should('be.visible');
        cy.log('Group name edited successfully')

        // navigating to manage listing to verify the change
        cy.get('[qa-id="nav-item-title"]').should('be.visible').click();
        cy.get('[qa-id="dropdown-value-mlp"]').should('be.visible').click();
        cy.url().should('include', Urls.MANAGE_LISTINGS);
        manageListingsPage.getManageListingsFilterHeader().should('be.visible');
        manageListingsPage.getFilterCloseButton().should('be.visible').click();
        manageListingsPage.getManageListingPageHeader().should('be.visible');
        manageListingsPage.getShowAllListingsButton().should('be.visible').click({force: true});
        manageListingsPage.getSearchBar().should('be.visible').type(listingDetails.listingName);
        cy.wait(2000);
        manageListingsPage.getCustomizationGroupValue(groupDetails.groupNameEdited).should('be.visible');
        cy.log('Edit group was successful, test completed');
    });
});

after(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
});
