import 'cypress-real-events/support';

Cypress.on('uncaught:exception', (err) => {
    // Suppress specific errors
    if (err.message.includes("Cannot read properties of null (reading 'postMessage')")) {
      // We expect this error, so let's ignore it and let the test continue
      return false;
    }
  
    // Let Cypress fail the test for other errors
    return true;
  });