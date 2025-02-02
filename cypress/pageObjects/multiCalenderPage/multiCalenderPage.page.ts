/* global JQuery */
export class MultiCalendarPage {

    // Return search bar
    getSearchBar() {
        return cy.get('[qa-id="mc-search-listings-input"]');
    }

    // Return search bar clear button
    getSearchBarClearButton() {
        return cy.get('.chakra-input__right-element');
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

    // Return Filtered property name
    getFilteredPropertyName() {
        return cy.get('.css-1jivscp');
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
    getDsoPriceDetails(text: string) {
        return cy.contains('.css-jgf8tb', `${text}`);
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

     // Return map listing button
    getMapListingButton() {
        return cy.get('#mc-map-listings');
    }

    // Return map listing header
    getMapListingHeader() {
        return cy.get('.css-hzg3i6');
    }

    // get parent listing dropdown button
    public parentListingDropdown() {
        return cy.get('.css-18euh9p');
    }

    // return parent listing dropdown options
    public listingDropdownOption() {
        return cy.get('.css-ns3y9m');
    }

    // get child listing dropdown button
    public childListingDropdown() {
        return cy.get('.css-1pqv9th > .css-1vixs0m');
    }

    // Return Map listing button
    getMapListingConfirmButton() {
        return cy.get('#map-listings-btn');
    }

    // Return Map listing confirm dialog message
    getMapListingConfirmDialogMessage() {
        return cy.get('.css-abwrv');
    }

    // Return Map listing done mapping button
    getMapListingDoneMappingButton() {
        return cy.get('#cancel-map-modal');
    }
}
