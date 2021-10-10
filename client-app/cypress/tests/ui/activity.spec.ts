//join should work
//cancel should work
//dont show manage option to non-host user
//dont show join/unjoin option to host user
//map should work
//avatars loaded

import { ActivitiesContext, getData, userToLogin } from "../../plugins";
import { getIntercepts } from "../../support/intercepts";
//information should be correct
const user1: userToLogin = {
  email: "bob@test.com",
  password: "Pa$$w0rd",
  displayname: "bob",
};
const indexActivity = 0;

describe("Check the Activity Details Page functionality", () => {
  let ctx: ActivitiesContext = {};

  beforeEach(function () {
    cy.task("db:seed");
    cy.login(user1.email, user1.password);
    getIntercepts(["userLoad", "activityDetails"]);
    getData(ctx).then(() => {
      const { activities } = ctx.seedData!;
      const activity = activities[indexActivity];
      cy.visit(`/activities/${activity.id}`);
      //   cy.wait("@userLoad");
      cy.wait("@activityDetails");
    });
  });
  it.only("", () => {});
  it("Display the Activity details on page visit", () => {
    const { activities } = ctx.seedData!;
    const activity = activities[indexActivity];
    cy.location("pathname").should("equal", `/activities/${activity.id}`);
  });
});
