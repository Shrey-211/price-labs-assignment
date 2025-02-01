/// <reference types="cypress" />


import { MultiCalendarPage } from 'cypress/pageObjects/multiCalenderPage/multiCalenderPage.page';
// import ChannelManagerPage from '../pages/channelManagerPage';

const multiCalendar = new MultiCalendarPage();
// const channelManager = new ChannelManagerPage();

beforeEach(() => {
    cy.login('https://pricelabs.co/signin', 'qa.pricelabs@gmail.com', 'qg33N$yxJP');
});

describe("DSO Sync with Channel Manager", () => {

    it("should apply DSO and verify sync with Channel Manager", () => {
        
    });

    it("should ensure DSO takes precedence over general override", () => {

    });
});
