export class ManageListingsPage {

    // Return page header
    getManageListingsFilterHeader() {
        return cy.get('[qa-id="filter-modal-title"]');
    }

    // Return filter close button
    getFilterCloseButton() {
        return cy.get('[qa-id="filter-modal-close-button"]');
    }

    // Return manage listing page header
    getManageListingPageHeader() {
        return cy.contains('.mb-4', 'Manage Listings');
    }

    // Return Show all listings button
    getShowAllListingsButton() {
        return cy.get('#fetch-filtered-listings');
    }

    // Return unmapped listing header
    getUnmappedListingHeader() {
        return cy.get('[data-bs-target="#unmapped_listings"]');
    }

    // Return mapped listing header
    getMappedListingHeader() {
        return cy.get('[data-bs-target="#mapped_listings"]');
    }

    // Return combined listing header
    getCombinedListingHeader() {
        return cy.get('[data-bs-target="#combined_listings"]');
    }

    // Return tabs Header
    getTabsHeader() {
        return cy.get('#tab_mappings');
    }

    // Return listing table
    getListingTable() {
        return cy.get('[id="unmapped_listings"]');
    }

    // Return search bar on manage listing page
    getSearchBar() {
        return cy.get('#unmapped_listings > .table-responsive > .bootstrap-table > .fixed-table-toolbar > .float-left > .form-control');
    }

    // Return Add tag button
    getAddTagButton() {
        return cy.get('[id="tags-toggle-collapse_VRMREALTY___144"]');
    }

    // Return add tag container header
    getAddTagContainerHeader() {
        return cy.contains('.mb-2', 'Create Tag');
    }

    // Return add tag container input field
    getAddTagContainerInput() {
        return cy.get('#collapsetags_VRMREALTY___144 > .card > .tags_form > .form-control');
    } 

    // return add tag container create button
    getAddTagContainerCreateButton() {
        return cy.get('#collapsetags_VRMREALTY___144 > .card > .tags_form > .btn-primary');
    }

    // return tag added toast message
    getTagToastMessage() {
        return cy.get('.toast-message');
    }

    // Return added tag
    getAddedTag(tagName: string) {
        return cy.get(`[data-tag-name="${tagName}"]`);
    }

}