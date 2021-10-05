import { ActivitiesByDate, ActivityFromDB } from "../plugins";

export const checkActivityGroup = (group: ActivitiesByDate) => {
  cy.contains(group!.date)
    .next()
    .find("[data-cy=activity-listitem]")
    .should("have.length", group!.items.length)
    .each((item) => {
      cy.wrap(item)
        .find("[data-cy=activity-header]")
        .should("be.visible")
        .invoke("attr", "text")
        .then((text) => {
          console.log(text);
        });
    });
};
export const fetchSelection = async (selection: ActivityFromDB[]) => {
  const offsetFetch = 2;
  for (
    let index = 1; //because pageLoad was fetch nr. 0
    index <= Math.round(selection.length / offsetFetch) - 1;
    index++
  ) {
    cy.wait(500); //give react sometime to render
    // cy.scrollTo("bottom");
    cy.scrollTo("bottom", { duration: 1000 });
    cy.wait("@fetchmore");

  }
  // cy.scrollTo("top");
  cy.scrollTo(0, 0);
};
