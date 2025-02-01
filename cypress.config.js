const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
        fixturesFolder: './cypress/fixtures',
    supportFile: './cypress/support/e2e.ts',
    specPattern: './cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
