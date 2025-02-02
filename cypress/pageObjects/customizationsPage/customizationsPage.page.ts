export class CustomizationPage 
{
    // Return group tab button
    public groupTabButton() {
        return cy.get('#groups-tab');
    }

    // Return create group button
    public createGroupButton() {
        return cy.get('#create-new-group-cust');
    }

    // Return create group pop up header
    public createGroupHeader() {
        return cy.get('#modal_create_group > .modal-dialog > .modal-content > .modal-header > .m-0');
    }

    // Return group name input field
    public groupNameInputField() {
        return cy.get('#customization-group-name-value');
    }

    // Return create group button
    public createGroupPopUpButton() {
        return cy.get('#create-new-cst-btn');
    }

    // Return table view button
    public tableViewButton() {
        return cy.get('#table-view');
    }

    // Return search bar
    public searchBar() {
        return cy.get('#groups > .row_account_column > .table-tab-view > .table-responsive > .bootstrap-table > .fixed-table-toolbar > .float-left > .form-control');
    }

    // Return table searched content
    public searchedContent() {
        return cy.get('tbody > tr > .column_group_name');
    }

    // Return edit group button
    public editGroupButton() {
        return cy.get('.cust-action > [data-pms-display-name=""]');
    }

    // Return edit group pop up header
    public editGroupPopUpHeader() {
        return cy.contains('.css-hzg3i6', 'Customizations');
    }

    // Return edit group name input field
    public editGroupNameInputField() {
        return cy.get('.css-1vqcnxu');
    }

    // Return edit group iframe
    public editGroupIframe() {
        return cy.get('#edit-customizations-iframe');
    }

    // Return success toaster
    public successToaster() {
        return cy.get('.toast-success');
    }

    // Return more options in table button 
    public moreOptionsInTableButton() {
        return cy.get('#group-cust-table > tbody > tr > .column_action > .cust-action > .cust-context-button');
    }

    // Return delete group option
    public deleteGroupOption() {
        return cy.get('.context-menu-cust-container > [qa-id="delete-group-73840"]');
    }


}