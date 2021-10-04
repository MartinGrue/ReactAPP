import { ActivitiesByDate, ActivityFromDB } from "./context";

export const checkActivityGroup = (group: ActivitiesByDate) => {
  cy.contains(group!.date)
    .next()
    .find("[data-cy=activity-listitem]")
    .should("have.length", group!.items.length)
    .each((item) => {
      cy.wrap(item).find("[data-cy=activity-header]").should("be.visible");
    });
};
export const fetchSelection = async (selection: ActivityFromDB[]) => {
  const offsetFetch = 2;
  for (
    let index = 1; //because pageLoad was fetch nr. 0
    index <= Math.round(selection.length / offsetFetch) - 1;
    index++
  ) {
    cy.scrollTo("bottom");
    await cy.wait("@fetchmore").promisify();
    await cy.wait(500).promisify(); //give react sometime to render
  }
};
