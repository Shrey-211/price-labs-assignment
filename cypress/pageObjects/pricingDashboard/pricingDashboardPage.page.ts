export class PricingDashboardPage {
    // Return page header
    public pageHeader() {
        return cy.get('[qa-id="sub-title"]');
    }

    // Return dynamic pricing button drop down
    public dynamicPricingButton() {
        return cy.get('.css-1ai65wj'); 
    }

    // Return calender view button
    public calenderViewButton() {
        return cy.contains('.css-23zmd7', 'Multi Calendar');
    }
}