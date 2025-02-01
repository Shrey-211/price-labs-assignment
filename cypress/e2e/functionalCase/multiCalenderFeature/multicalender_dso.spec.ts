/// <reference types="cypress" />

import MulticalendarPage from '../pages/multicalendarPage';

const multicalendar = new MulticalendarPage();

beforeEach(() => {
  cy.login(); // Assuming a login helper exists
  cy.visit("/multicalendar");
});

describe("Multicalendar DSO Tests", () => {
    it("should allow a user to apply a Date-Specific Override (DSO)", () => {

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
