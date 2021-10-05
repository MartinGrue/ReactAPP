//TODO:
// //maps should work
// //avatas loaded
// //information should be correct
import { ActivitiesContext, getData } from "../../plugins";
import {
  checkActivityGroup,
  fetchSelection,
} from "../../support/activitiesSupport";

describe("Have a working activity dashboard", () => {
  let ctx: ActivitiesContext = {};
  const user = {
    email: "bob@test.com",
    password: "Pa$$w0rd",
  };

  beforeEach(() => {
    getData(ctx);
    // cy.viewport(1920, 5000);
    cy.task("db:seed");
    cy.login(user.email, user.password);
    cy.intercept("GET", "http://localhost:5000/api/activities**").as(
      "fetchmore"
    );
    cy.intercept("GET", "http://localhost:5000/api/activities/").as("initLoad");
  });
  it("should display the correct amount of activities for all filter", () => {
    const { activities } = ctx.seedData!;
    //this can take up to 30s
    // cy.visit("/activities");


    cy.scrollTo(0, 500);
    // cy.wait("@fetchmore");
    cy.wait(500);
    cy.get("[data-cy=activities-filter-all]").click();
    fetchSelection(activities);
    cy.window().scrollTo(0, 1000);
    cy.get("[data-cy=activity-listitem]").should(
      "have.length",
      activities.length
    );
  });
  it("should display the activity grouping correctly", () => {
    const { activitiesByDate } = ctx!;
    const { activities } = ctx.seedData!;
    cy.scrollTo(0, 500);
    cy.wait(500);

    cy.get("[data-cy=activities-filter-all]").click();
    fetchSelection(activities);
    cy.window().scrollTo(0, 1000);

    activitiesByDate!.forEach((group) => {
      checkActivityGroup(group);
    });
  });

  it("should display the correct amount of activities for imgoing filter", () => {
    const { activities, users } = ctx.seedData!;

    const user = users.find((user) => user.displayname === "Bob");
    const selection = activities.filter((act) =>
      act.useractivities.some((ua) => ua.appuserid === user!.id)
    );
    cy.scrollTo(0, 500);
    // cy.wait("@fetchmore");

    cy.get("[data-cy=activities-filter-imgoing]").click();    
    cy.wait(500);
    cy.get("[data-cy=activities-filter-imgoing]").click();    
    cy.wait(500);
    fetchSelection(selection);
    cy.get("[data-cy=activity-listitem]").should(
      "have.length",
      selection.length
    );
  });
  it("should display the correct amount of activities for imhosting filter", () => {
    const { activities, users } = ctx.seedData!;

    const user = users.find((user) => user.displayname === "Bob");
    const selection = activities.filter((act) =>
      act.useractivities.some((ua) => ua.appuserid === user!.id && ua.ishost)
    );
    // cy.scrollTo(0, 500);
    // cy.wait("@fetchmore");
    cy.get("[data-cy=activities-filter-ishost]").click();
    cy.wait(500);
    cy.get("[data-cy=activities-filter-ishost]").click();
    cy.wait(500);
    fetchSelection(selection);
    cy.get("[data-cy=activity-listitem]").should(
      "have.length",
      selection.length
    );
  });

  //   //TODO
  //   // it("should display the correct amount of activities for date filter", async () => {
  //   //make fresh seedData everyday
  //   //pick the date from the datepicker
  //   //check for activities
  //   // });
});
