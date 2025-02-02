export class NavigationTab {
    // Return dynamic pricing button drop down
    public dynamicPricingButton() {
        return cy.get('.css-1ai65wj'); 
    }

    // Return calender view button
    public calenderViewButton() {
        return cy.contains('.css-23zmd7', 'Multi Calendar');
    }

    // Return Manage listing button
    public manageListingButton() {
        return cy.contains('.css-23zmd7', 'Manage Listings');
    }

    // Return customizations button
    public customizationsButton() {
        return cy.contains('.css-23zmd7', 'Customizations');
    }
}