/// <reference types="cypress" />
// Import Cypress Percy plugin command (https://docs.percy.io/docs/cypress)
import "@percy/cypress";
Cypress.Commands.add("visualSnapshot", (maybeName) => {
  // @ts-ignore
  let snapshotTitle = cy.state("runnable").fullTitle();
  if (maybeName) {
    snapshotTitle = snapshotTitle + " - " + maybeName;
  }
  cy.percySnapshot(snapshotTitle, {
    // @ts-ignore
    widths: [cy.state("viewportWidth")],
    // @ts-ignore
    minHeight: cy.state("viewportHeight"),
  });
});

Cypress.Commands.add("login", (email, password) => {
  const log = Cypress.log({
    name: "login",
    displayName: "LOGIN",
    message: [`🔐 Authenticating | ${email}`],
    // @ts-ignore
    autoEnd: false,
  });
  cy.intercept("POST", "http://localhost:5000/api/User/login").as("loginUser");

  cy.visit("/");
  cy.get("[data-cy=login]").click();
  cy.get("[name=email]").clear().type(email);
  cy.get("[name=password]").clear().type(password);
  cy.get("[data-cy=login-submit]").click();
  cy.wait("@loginUser").then((loginUser: any) => {
    // Cypress.log({
    //   consoleProps: () => {
    //     return {
    //       email,
    //       password,
    //       displayName:
    //         loginUser.response.statusCode !== 401 &&
    //         loginUser.response.body.displayName,
    //      token:
    //         loginUser.response.statusCode !== 401 &&
    //         loginUser.response.body.token
    //     };
    //   },
    // });
    log.end();
  });
});
