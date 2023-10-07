import { ActivitiesByDate, ActivityFromDB } from "./types";

Cypress.Commands.add("checkActivityGroup", (group: ActivitiesByDate) => {
  cy.contains(group!.date)
    .next()
    .find("[data-cy=activity-listitem]")
    .should("have.length", group!.items.length)
    .each((item) => {
      cy.wrap(item)
        .find("[data-cy=activity-header]")
        .should("be.visible")
        .invoke("attr", "text");
    });
});
Cypress.Commands.add("fetchSelection", (selection: ActivityFromDB[]) => {
  for (let index = 0; index < selection.length; index++) {
    cy.scrollTo("bottom", { duration: 300 });
  }
  cy.get("[data-cy=ThisistheEnd]").should("be.visible");
});
