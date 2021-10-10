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
    getIntercepts([
      "userLoad",
      "activityDetails",
      "joinActivity",
      "unjoinActivity",
    ]);
    getData(ctx).then(() => {
      const { activities } = ctx.seedData!;
      const activity = activities[indexActivity];
      cy.visit(`/activities/${activity.id}`).wait("@activityDetails");
    });
  });
  it("Display the Activity details on page visit", () => {
    const { activities } = ctx.seedData!;
    const activity = activities[indexActivity];
    cy.location("pathname").should("equal", `/activities/${activity.id}`);
  });
  it("should display the cancel attendance button when already joined", () => {
    cy.get("[cy-data=cancel-attendance]").should("be.visible");
  });
  it("should display the join activity button when not already joined", () => {
    const { activities, users } = ctx.seedData!;
    const { id } = users.find((user) => user.username === user1.displayname)!;
    const activity = activities.find(
      (activity) =>
        !activity.useractivities.map((ua) => ua.appuserid).includes(id)
    );
    cy.visit(`/activities/${activity!.id}`);

    cy.get("[cy-data=join-activity]").should("be.visible");
  });
  it("should be able to join the activity", () => {
    const { activities, users } = ctx.seedData!;
    const { id } = users.find((user) => user.username === user1.displayname)!;
    const activity = activities.find(
      (activity) =>
        !activity.useractivities.map((ua) => ua.appuserid).includes(id)
    );
    cy.visit(`/activities/${activity!.id}`).wait("@activityDetails");

    cy.get("[cy-data=join-activity]").should("be.visible").click();
    cy.get("[cy-data=cancel-attendance]").should("be.visible");
    cy.get("[cy-data=SideBarItem]")
      .filter(`:contains(${user1.displayname})`)
      .should("have.length", 1);
  });
  it("should be able to unjoin the activity", () => {
    const { activities, users } = ctx.seedData!;
    const { id } = users.find((user) => user.username === user1.displayname)!;
    const activity = activities.find(
      (activity) =>
        !activity.useractivities.map((ua) => ua.appuserid).includes(id)
    );
    cy.visit(`/activities/${activity!.id}`);
    cy.get("[cy-data=join-activity]")
      .should("be.visible")
      .click()
      .wait("@joinActivity");
    cy.get("[cy-data=cancel-attendance]")
      .should("be.visible")
      .click()
      .wait("@unjoinActivity");
    cy.get("[cy-data=SideBarItem]")
      .filter(`:contains(${user1.displayname})`)
      .should("have.length", 0);
  });
  it.only("should have a working chat", () => {});
});
