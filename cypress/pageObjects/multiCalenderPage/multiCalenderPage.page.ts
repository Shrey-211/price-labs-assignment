/* global JQuery */
export class MultiCalendarPage {

    // Return search bar
    getSearchBar() {
        return cy.get('[qa-id="mc-search-listings-input"]');
    }

    // Return date on calender
    getCalendarDate() {
        return cy.get('.css-1urksmm > .css-17crack > .css-1o6y018');
    }

    // Return DSO modal title
    getDsoModalTitle() {
        return cy.get('[qa-id="dso-modal-title"]');
    }

    // Return DSO final price input field
    getDsoFinalPrice() {
        return cy.get('#dso-modal-dso-price-mc > .css-f3cbvq > .chakra-input__group > .chakra-input');
    }

    // Return DSO min price input field
    getDsoMinPrice() {
        return cy.get('#dso-modal-dso-min-price-mc > .css-f3cbvq > .chakra-input__group > .chakra-input');
    }

    // Return DSO max price input field
    getDsoMaxPrice() {
        return cy.get('#dso-modal-dso-max-price-mc > .css-f3cbvq > .chakra-input__group > .chakra-input');
    }

    // Return DSO base price input field
    getDsoBasePrice() {
        return cy.get('#dso-base-price > .css-f3cbvq > .chakra-input__group > .chakra-input');
    }

    // Return custom price reason input field
    getCustomPriceReason() {
        return cy.get('#custom-price-reason--mc');
    }

    //  Return add DSO button
    getAddDsoButton() {
        return cy.get('#add-dso');
    }

    // Return update DSo button
    getUpdateDsoButton() {
        return cy.get('#update-dso');
    }

    // Return delete DSO button
    getDeleteDsoButton() {
        return cy.get('#remove-dso-btn');
    }

    // Return Filtered property
    getFilteredProperty() {
        return cy.get('.css-1kh6bo9');
    }

    // vertical more icon
    getMoreVertIcon() {
        return cy.get('[data-testid="MoreVertIcon"]');
    }

    // Return add override button
    getAddOverrideButton() {
        return cy.get('[qa-id="dso-add-VRMREALTY___144"]');
    }

    // Return Oerride Confirm pop up
    getOverrideConfirmPopup() {
        return cy.get('.css-bxak8j');
    }

    // Return DSO override confirmation update button
    getOverrideUpdateButton() {
        return cy.get('#dso-override-confirmation-update-button');
    }

    // Return Date range icon
    getDateRangeIcon() {
        return cy.get('[data-testid="DateRangeIcon"]');
    }

    // Return date picker
    getDatePicker(date: number) {
        const val = date.toString().padStart(3, '0');
        return cy.get(`.react-datepicker__day--${val}`);
    }

    // Return dso price details in calender view
    getDsoPriceDetails() {
        return cy.get('[qa-id="dso-band-text-VRMREALTY___144"]');
    }

    // Return Stay Restrictions header
    getStayRestrictionsHeader() {
        return cy.get('.css-1dxpwlh');
    }

    // Return toaster 
    getErrorToaster() {
        return cy.get('div[data-status="error"].chakra-alert__desc');
    }

    // Return sync button
    getSyncButton() {
        return cy.get('#mc-sync-now-VRMREALTY___144');
    }

    //  Return sync toggle
    getSyncToggle() {
        return cy.get('.chakra-switch__track');
    }
}
