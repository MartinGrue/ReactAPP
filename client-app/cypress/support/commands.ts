/// <reference types="cypress" />
// Import Cypress Percy plugin command (https://docs.percy.io/docs/cypress)
import "@percy/cypress";
import cypress from "cypress";
import jwt_decode from "jwt-decode";

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
  cy.intercept("GET", "http://localhost:5000/api/activities**").as("initLoad");
  cy.intercept("GET", "http://localhost:5000/api/User").as("userLoad");

  cy.visit("/");
  cy.get("[data-cy=login]").click();
  cy.get("[name=email]").clear().type(email);
  cy.get("[name=password]").clear().type(password);
  cy.get("[data-cy=login-submit]").click();
  cy.wait("@loginUser");
  cy.wait("@initLoad");
  cy.wait("@userLoad");
  log.end();
});
Cypress.Commands.add("logout", () => {
  cy.location("pathname").should("equal", "/activities");
  cy.get("[data-cy=profile-dropdown]").click();
  cy.get("[data-cy=logout]").click();
  cy.wait(500);
});
Cypress.Commands.add("changeLogin", (email, password) => {
  const token = window.localStorage.getItem("jwt");
  var decoded = jwt_decode(token!);
  expect(decoded).to.be.an("object");
  expect(decoded).to.have.keys(["nameid", "nbf", "exp", "iat"]);
  const { nameid } = decoded as any;

  Cypress.log({
    name: "logout",
    displayName: "LOGOUT",
    message: [`🔐 DEauthenticating | ${nameid}`],
    // @ts-ignore
    autoEnd: false,
  });

  cy.visit("/activities");
  cy.get("[data-cy=profile-dropdown]").click();
  cy.get("[data-cy=logout]").click();
  cy.location("pathname").should("equal", "/");
  cy.wait(500).then(() => {
    const token = window.localStorage.getItem("jwt");
    expect(token).to.eq(null);
  });

  cy.login(email, password);
});
