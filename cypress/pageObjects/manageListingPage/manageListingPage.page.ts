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
    getToastMessage() {
        return cy.get('.toast-message');
    }

    // Return added tag
    getAddedTag(tagName: string) {
        return cy.get(`[data-tag-name="${tagName}"]`);
    }

    // Return checkbox for listing
    getListingCheckbox() {
        return cy.get('#unmapped-table > thead > tr > .bs-checkbox > .th-inner > label > input');
    }

    // Return Assign Group/Sub-group button
    getAssignGroupSubGroupButton() {
        return cy.get('#assign-group-mapping');
    }

    // Return Assign Group/Sub-group container header
    getAssignGroupSubGroupContainerHeader() {
        return cy.get('#add-group-modal > .modal-dialog > .modal-content > .modal-header > .m-0');
    }

    // Return Assign Group dropdown
    getAssignGroupDropdown() {
        return cy.get('#group-cust-select-form-group > .dropdown > .btn');
    }

    // Return Assign Sub-group dropdown
    getAssignSubGroupDropdown() {
        return cy.get('#group-cust-select-form-subgroup > .dropdown > .btn');
    }

    // Return dropdown options
    getGroupDropdownOptions(groupName: string) {
        return cy.contains('.text', groupName);
    }

    // Return sub-group dropdown options
    getSubGroupDropdownOptions() {
        return cy.get('#bs-select-32-5');
    }

    // Return update button
    getUpdateButton() {
        return cy.get('#add-groups-btn');
    }

    // Return search box for group dropdown
    getGroupSearchBox() {
        return cy.get('#group-cust-select-form-group > .dropdown > div.dropdown-menu > .bs-searchbox > .form-control');
    }

    // return search box for sub-group dropdown
    getSubGroupSearchBox() {
        return cy.get('#group-cust-select-form-subgroup > .dropdown > div.dropdown-menu > .bs-searchbox > .form-control');
    }

    // Return Customization group value in table
    getCustomizationGroupValue() {
        return cy.contains('.filter-option-inner-inner', 'Nothing Selected');
    }

    // Return mapped listing search bar
    getMappedListingSearchBar() {
        return cy.get('#mapped_listings > .table-responsive > .bootstrap-table > .fixed-table-toolbar > .float-left > .form-control');
    }

    // Return mapped listings check box
    getMappedListingCheckbox() {
        return cy.get('#mapped-table > thead > tr > .bs-checkbox > .th-inner > label > input');
    }

    // Return hide listing button
    getHideListingButton() {
        return cy.get('#show-group-mapping');
    }


}