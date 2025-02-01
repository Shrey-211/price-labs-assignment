/// <reference types="cypress" />

import MulticalendarPage from '../pages/multicalendarPage';

describe("Negative Test Cases for Multicalendar DSO", () => {
    const multicalendar = new MulticalendarPage();

    beforeEach(() => {
        cy.login(); // Assuming a login helper exists
        cy.visit("/multicalendar");
    });

    it("should prevent applying DSO without selecting dates", () => {
        multicalendar.selectListing("Test Listing");
        multicalendar.applyDSO(200); // Trying to set price without selecting dates
        multicalendar.verifyErrorMessage("Please select dates before applying a DSO");
    });

    it("should prevent applying DSO with an invalid price value", () => {
        multicalendar.selectListing("Test Listing");
        multicalendar.selectDates("2025-02-15", "2025-02-20");
        
        // Enter invalid price values
        multicalendar.applyDSO("-100"); // Negative price
        multicalendar.verifyErrorMessage("Invalid price value");

        multicalendar.applyDSO("abc"); // Non-numeric price
        multicalendar.verifyErrorMessage("Invalid price value");
    });
});
