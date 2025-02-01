/* global JQuery */
export class MultiCalendarPage {

    // Return search bar
    getSearchBar() {
        return cy.get('[qa-id="mc-search-listings-input"]');
    }

}
