//maps should work
//avatas loaded
//information should be correct
import promisify from "cypress-promise";
import { ActivitiesContext, getData } from "../../plugins";
import {
  fetchSelection,
  checkActivityGroup,
} from "../../support/activitiesSupport";

describe("Have a working activity dashboard", () => {
  let ctx: ActivitiesContext = {};
  const user = {
    email: "bob@test.com",
    password: "Pa$$w0rd",
  };

  beforeEach(() => {
    getData(ctx);
    cy.task("db:seed");
    cy.login(user.email, user.password);

    cy.intercept("GET", "http://localhost:5000/api/activities**").as(
      "fetchmore"
    );
    cy.intercept("GET", "http://localhost:5000/api/activities/").as("initLoad");
  });

  it("should display the correct amount of activities for all filter", async () => {
    const { activities } = ctx.seedData!;

    cy.get("[data-cy=activities-filter-all]").click();
    fetchSelection(activities);
    cy.scrollTo("bottom");
    cy.get("[data-cy=activity-listitem]").should(
      "have.length",
      activities.length
    );
  });
  it("should display the activity grouping correctly", () => {
    const { activitiesByDate } = ctx!;
    const { activities } = ctx.seedData!;

    cy.get("[data-cy=activities-filter-all]").click();
    fetchSelection(activities);
    activitiesByDate!.forEach((group) => {
      checkActivityGroup(group);
    });
  });

  it("should display the correct amount of activities for imgoing filter", async () => {
    const { activities, users } = ctx.seedData!;

    const user = users.find((user) => user.displayname === "Bob");
    const selection = activities.filter((act) =>
      act.useractivities.some((ua) => ua.appuserid === user!.id)
    );
    cy.get("[data-cy=activities-filter-imgoing]").click();

    for (let index = 1; index <= Math.round(selection.length / 2); index++) {
      cy.scrollTo("bottom");
      await cy.wait("@fetchmore").promisify();
      await cy.wait(500).promisify(); //give react sometime to render
    }
    cy.scrollTo("bottom");
    cy.get("[data-cy=activity-listitem]").should(
      "have.length",
      selection.length
    );
  });
  it("should display the correct amount of activities for imhosting filter", async () => {
    const { activities, users } = ctx.seedData!;

    const user = users.find((user) => user.displayname === "Bob");
    const selection = activities.filter((act) =>
      act.useractivities.some((ua) => ua.appuserid === user!.id && ua.ishost)
    );
    cy.get("[data-cy=activities-filter-ishost]").click();

    for (let index = 1; index <= Math.round(selection.length / 2); index++) {
      cy.scrollTo("bottom");
      await cy.wait("@fetchmore").promisify();
      await cy.wait(500).promisify(); //give react sometime to render
    }
    cy.scrollTo("bottom");
    cy.get("[data-cy=activity-listitem]").should(
      "have.length",
      selection.length
    );
  });

  //TODO
  // it("should display the correct amount of activities for date filter", async () => {
  //make fresh seedData everyday
  //pick the date from the datepicker
  //check for activities
  // });
});
