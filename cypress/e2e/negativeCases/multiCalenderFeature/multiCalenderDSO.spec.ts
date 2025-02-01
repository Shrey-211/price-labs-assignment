/// <reference types="cypress" />

import { MultiCalendarPage } from 'cypress/pageObjects/multiCalenderPage/multiCalenderPage.page';

const multiCalendar = new MultiCalendarPage();

beforeEach(() => {
    cy.login('https://pricelabs.co/signin', 'qa.pricelabs@gmail.com', 'qg33N$yxJP');
});

describe("Negative Test Cases for MultiCalendar DSO", () => {
    

    it("should prevent applying DSO without selecting dates", () => {

    });

    it("should prevent applying DSO with an invalid price value", () => {

    });
});
