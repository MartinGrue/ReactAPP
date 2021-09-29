/// <reference types="cypress" />
/**
 * Logs-in user by using UI
 */
declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): void;
    visualSnapshot(maybeName?): Chainable<any>;
    fillTitle(title: string): Chainable<any>;
    fillDesctiption(description: string): Chainable<any>;
    fillCategory(categories: string[], category: string): Chainable<any>;
    fillDate(): Chainable<any>;
    fillTime(
      timeHours: { firstDigit: string; secondDigit: string },
      timeMinutes: { firstDigit: string; secondDigit: string }
    ): Chainable<any>;
    fillCity(city: {
      searchString: string;
      suggestions: string[];
    }): Chainable<any>;
    fillVenue(venue: {
      searchString: string;
      suggestions: string[];
    }): Chainable<any>;
  }
}
