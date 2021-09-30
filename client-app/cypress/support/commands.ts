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
    //         loginUser.response.statusCode !=,401 &&
    //         loginUser.response.body.displayName,
    //      token:
    //         loginUser.response.statusCode !=,401 &&
    //         loginUser.response.body.token
    //     };
    //   },
    // });
    log.end();
  });
});

Cypress.Commands.add("fillTitle", (title: string) => {
  cy.get("[name=title]").clear().type(title);
});

Cypress.Commands.add("fillDesctiption", (description: string) => {
  cy.get("[name=description]").get("textarea").type(description);
});

Cypress.Commands.add(
  "fillCategory",
  (categories: string[], category: string) => {
    cy.get("[name=category] i").click();
    categories.forEach((c) => {
      cy.get("[name=category] .menu").contains(c);
    });
    cy.get("[name=category] .menu").contains(category).click();
  }
);

Cypress.Commands.add("fillDate", () => {
  cy.get(
    "[data-cy=datepicker] button.rw-input-addon.rw-picker-btn.rw-btn"
  ).click();
  cy.get("[data-cy=datepicker] [id=id_date] button").contains("Today").click();
});

Cypress.Commands.add(
  "fillTime",
  (
    timeHours: { firstDigit: string; secondDigit: string },
    timeMinutes: { firstDigit: string; secondDigit: string }
  ) => {
    cy.get("[data-cy=timepicker] input:first")
      .click()
      .focus()
      .type(timeHours.firstDigit, { force: true })
      .type(timeHours.secondDigit, { force: true });

    cy.get("[data-cy=timepicker] input:last")
      .click()
      .focus()
      .type(timeMinutes.firstDigit, { force: true })
      .type(timeMinutes.secondDigit, { force: true });
  }
);
Cypress.Commands.add(
  "fillCity",
  (city: { searchString: string; suggestions: string[] }) => {
    cy.get("[name=city]").click().type(city.searchString);
    cy.get("[data-cy=suggestion-item]")
      // .each((el, index) => {
      //   cy.wrap(el).should("have.text", city.suggestions[index]);
      // })
      .first()
      .click();
  }
);
Cypress.Commands.add(
  "fillVenue",
  (venue: { searchString: string; suggestions: string[] }) => {
    cy.get("[name=venue]").click().type(venue.searchString);
    cy.get("[data-cy=suggestion-item]")
      // .each((el, index) => {
      //   cy.wrap(el).should("have.text", venue.suggestions[index]);
      // })
      .first()
      .click();
  }
);
