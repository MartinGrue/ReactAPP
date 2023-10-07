/// <reference types="cypress" />
/**
 * Logs-in user by using UI
 */
  declare namespace Cypress {
    interface Chainable {
      clickOutside(): void;
      task(
        event: "get:data",
        arg: dbQueryArg,
        options?: Partial<Loggable & Timeoutable>
      ): Chainable<{}>;

      login(email: string, password: string): void;
      logout(): void;

      fetchSelection(selection: ActivityFromDB[]): void;
      checkActivityGroup(group: ActivitiesByDate): void;

      changeLogin(email: string, password: string): void;
      visualSnapshot(maybeName?): void;
      fillTitle(title: string): void;
      fillDesctiption(description: string): void;
      fillCategory(categories: string[], category: string): void;
      fillDate(): void;
      fillTime(
        timeHours: { firstDigit: string; secondDigit: string },
        timeMinutes: { firstDigit: string; secondDigit: string }
      ): void;
      fillCity(city: { searchString: string; suggestions: string[] }): void;
      fillVenue(venue: { searchString: string; suggestions: string[] }): void;
    }
  }
