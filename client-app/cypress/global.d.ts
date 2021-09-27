/// <reference types="cypress" />
/**
 * Logs-in user by using UI
 */
declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): void;
  }
}
