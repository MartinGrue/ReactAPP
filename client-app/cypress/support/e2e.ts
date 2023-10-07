// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands_auth";
import "./commands_activities"
import "./commands_form"
import "./commands_helpers"
import "./commands_profile"
// import "./index";
import "./intercepts";

// beforeEach(() => {
//   cy.intercept({ url: "/api", hostname:"localhost", port:5000, method:"POST" });
// });
// Alternatively you can use CommonJS syntax: