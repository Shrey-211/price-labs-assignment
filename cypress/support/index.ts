import 'cypress-real-events/support';

Cypress.on('uncaught:exception', (err) => {
    // Suppress specific errors
    if (err.message.includes("Cannot read properties of null (reading 'postMessage')")) {
      // We expect this error, so let's ignore it and let the test continue
      return false;
    }

    if (err.message.includes('postMessage')) {
      return false
  }
  
    // Let Cypress fail the test for other errors
    return true;
  });

// Handle cross-origin specific errors
export const visitPriceLabs = () => {
  cy.origin('https://app.pricelabs.co', () => {
    cy.on('uncaught:exception', (err) => {
      // Handle both errors in cross-origin context
      if (err.message.includes('postMessage') || 
          err.message.includes('Minified React error #419')) {
        return false;
      }
      return true;
    });
  });
};