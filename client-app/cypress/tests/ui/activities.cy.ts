//TODO:
// //maps should work
// //avatas loaded
// //information should be correct

import { dbSeed, groupActivitiesByDate } from "../../support/helper";
import { getIntercepts } from "../../support/intercepts";
import { SeedData } from "../../support/types";

const user = {
  email: "bob@test.com",
  password: "Pa$$w0rd",
};

describe("Have a working activity dashboard", () => {
  beforeEach(() => {
    getIntercepts(["reseed", "loginUser", "fetchMore", "userLoad"]);
    cy.wrap(dbSeed());
    cy.wait("@reseed").its("response.statusCode").should("eq", 200);
    cy.login(user.email, user.password);
    // cy.wait("@loginUser").its("response.statusCode").should("eq", 200);
  });

  it("should display the correct amount of activities for 'all' filter", () => {
    cy.request<SeedData>(
      "GET",
      `${Cypress.env("apiUrl")}/seed/getSeedData/`
    ).then((response) => {
      cy.visit("/activities");
      cy.wait("@fetchMore");
      cy.get("[data-cy=activities-filter-all]").click();
      cy.wait("@fetchMore");
      cy.wait(1000);
      console.log(response.body.activities);
      cy.fetchSelection(response.body.activities);
      cy.get("[data-cy=activity-listitem]").should(
        "have.length",
        response.body.activities.length
      );

      // //This should be a separate Test, but takes to much time to complete
      const activitiesByDate = groupActivitiesByDate(response.body.activities);
      activitiesByDate!.forEach((group) => {
        cy.checkActivityGroup(group);
      });
    });
  });

  it("should display the correct amount of activities for imgoing filter", () => {
    cy.request<SeedData>(
      "GET",
      `${Cypress.env("apiUrl")}/seed/getSeedData/`
    ).then((response) => {
      const { activities, users } = response.body;
      const user = users.find((user) => user.displayName === "Bob");
      const activitiesOfUser = activities.filter((act) =>
        act.userActivities.some((ua) => ua.appUserId === user!.id)
      );
      //Leave this in i don't know why
      cy.get("[data-cy=activities-filter-imgoing]").click();
      cy.wait(500);
      cy.get("[data-cy=activities-filter-imgoing]").click();
      cy.wait(500);
      cy.fetchSelection(activitiesOfUser);
      cy.get("[data-cy=activity-listitem]").should(
        "have.length",
        activitiesOfUser.length
      );
    });
  });
  it("should display the correct amount of activities for 'imhosting' filter", () => {
    cy.request<SeedData>(
      "GET",
      `${Cypress.env("apiUrl")}/seed/getSeedData/`
    ).then((response) => {
      const { activities, users } = response.body;
      const user = users.find((user) => user.displayName === "Bob");
      const activitiesOfUser = activities.filter((act) =>
        act.userActivities.some((ua) => ua.appUserId === user!.id && ua.isHost)
      );
      //Leave this in i don't know why
      cy.get("[data-cy=activities-filter-ishost]").click();
      cy.wait(500);
      cy.get("[data-cy=activities-filter-ishost]").click();
      cy.wait(500);
      cy.fetchSelection(activitiesOfUser);
      cy.get("[data-cy=activity-listitem]").should(
        "have.length",
        activitiesOfUser.length
      );
    });
  });

  //   //   //TODO
  //   //   // it("should display the correct amount of activities for date filter", async () => {
  //   //   //make fresh seedData everyday
  //   //   //pick the date from the datepicker
  //   //   //check for activities
  //   //   // });
});
