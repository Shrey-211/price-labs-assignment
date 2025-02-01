export class PricingDashboardPage {
    // Return page header
    public pageHeader() {
        return cy.get('[qa-id="sub-title"]');
    }

    // Return dynamic pricing button drop down
    public dynamicPricingButton() {
        return cy.get('#menu-button-\\:R6t2nldaH1\\:'); 
    }

    // Return calender view button
    public calenderViewButton() {
        return cy.get('a[href="/multicalendar"]');
    }

}