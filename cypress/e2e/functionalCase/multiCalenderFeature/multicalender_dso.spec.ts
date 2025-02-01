/// <reference types="cypress" />

import { MultiCalendarPage } from 'cypress/pageObjects/multiCalenderPage/multiCalenderPage.page';

const multiCalendar = new MultiCalendarPage();

beforeEach(() => {
  cy.login('https://pricelabs.co/signin', 'qa.pricelabs@gmail.com', 'qg33N$yxJP'); // Assuming a login helper exists
});

describe("MultiCalendar DSO Tests", () => {
    it.only("should allow a user to apply a Date-Specific Override (DSO)", () => {
      cy.log('Testing Login');
    });

    it("should allow a user to modify an existing DSO", () => {

    });

    it("should allow a user to remove an existing DSO", () => {

    });

    it("should allow a user to disable sync", () => {

    })

    it("should allow a user to enable sync", () => {

    })
});
