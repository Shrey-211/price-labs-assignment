const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const mochawesome = require('cypress-mochawesome-reporter/plugin');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      mochawesome(on);
      return config;
    },
    fixturesFolder: './cypress/fixtures',
    supportFile: './cypress/support/e2e.ts',
    specPattern: './cypress/e2e/**/*.{js,jsx,ts,tsx}',
    viewportWidth: 1920,
    viewportHeight: 1080,
    execTimeout: 50000,
    defaultCommandTimeout: 50000,
    pageLoadTimeout: 50000,
    requestTimeout: 50000,
    chromeWebSecurity: false,
    watchForFileChanges: false,
    experimentalSessionAndOrigin: false,
    reporter: 'cypress-mochawesome-reporter',
    env: {
      allure: true,
    },
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: false,
      json: true,
    },
  },
});
