//map should work
//avatars loaded

import { getIntercepts } from "../../support/intercepts";
import * as signalR from "@microsoft/signalr";
import { dbSeed } from "../../support/helper";
import { SeedData } from "../../support/types";

const loginUser = {
  email: "bob@test.com",
  password: "Pa$$w0rd",
  displayName: "bob",
};
const indexActivity = 0;

describe("Check the Activity Details Page functionality", () => {
  beforeEach(function () {
    getIntercepts([
      "userLoad",
      "activityDetails",
      "joinActivity",
      "unjoinActivity",
    ]);
    cy.wrap(dbSeed());
    cy.login(loginUser.email, loginUser.password);
  });

  it("Display the Activity details on page visit", () => {
    cy.request<SeedData>(
      "GET",
      `${Cypress.env("apiUrl")}/seed/getSeedData/`
    ).then((response) => {
      const { activities } = response.body;
      const activity = activities[indexActivity];
      cy.visit(`/activities/${activity.id}`).wait("@activityDetails");
      cy.location("pathname").should("equal", `/activities/${activity.id}`);
    });
  });

  it("should display the cancel attendance button when already joined", () => {
    cy.request<SeedData>(
      "GET",
      `${Cypress.env("apiUrl")}/seed/getSeedData/`
    ).then((response) => {
      const { activities } = response.body;
      const activityNotJoined = activities.find((activity) =>
        activity.userActivities.some((ua) => ua.isHost == false)
      );
      console.log(activityNotJoined);
      cy.visit(`/activities/${activityNotJoined!.id}`).wait("@activityDetails");
      cy.get("[cy-data=cancel-attendance]").should("be.visible");
    });
  });

  it("should display the join activity button when not already joined", () => {
    cy.request<SeedData>(
      "GET",
      `${Cypress.env("apiUrl")}/seed/getSeedData/`
    ).then((response) => {
      const { users, activities } = response.body;
      const { id } = users.find(
        (user) => user.userName === loginUser.displayName
      )!;
      const activity = activities.find(
        (activity) =>
          !activity.userActivities.map((ua) => ua.appUserId).includes(id)
      );
      cy.visit(`/activities/${activity!.id}`).wait("@activityDetails");
      console.log(activity);
      cy.get("[cy-data=join-activity]").should("be.visible");
    });
  });

  it("should be able to join the activity", () => {
    cy.request<SeedData>(
      "GET",
      `${Cypress.env("apiUrl")}/seed/getSeedData/`
    ).then((response) => {
      const { activities, users } = response.body;
      const { id } = users.find(
        (user) => user.userName === loginUser.displayName
      )!;
      const activity = activities.find(
        (activity) =>
          !activity.userActivities.map((ua) => ua.appUserId).includes(id)
      );
      cy.visit(`/activities/${activity!.id}`).wait("@activityDetails");

      cy.get("[cy-data=join-activity]").should("be.visible").click();
      cy.get("[cy-data=cancel-attendance]").should("be.visible");
      cy.get("[cy-data=SideBarItem]")
        .filter(`:contains(${loginUser.displayName})`)
        .should("have.length", 1);
    });
  });
  it("should be able to unjoin the activity", () => {
    cy.request<SeedData>(
      "GET",
      `${Cypress.env("apiUrl")}/seed/getSeedData/`
    ).then((response) => {
      const { activities, users } = response.body;
      const { id } = users.find(
        (user) => user.userName === loginUser.displayName
      )!;
      const activity = activities.find(
        (activity) =>
          !activity.userActivities.map((ua) => ua.appUserId).includes(id)
      );
      cy.visit(`/activities/${activity!.id}`).wait("@activityDetails");
      cy.get("[cy-data=join-activity]")
        .should("be.visible")
        .click()
        .wait("@joinActivity");
      cy.get("[cy-data=cancel-attendance]")
        .should("be.visible")
        .click()
        .wait("@unjoinActivity");
      cy.get("[cy-data=SideBarItem]")
        .filter(`:contains(${loginUser.displayName})`)
        .should("have.length", 0);
    });
  });
  it("should have a manage button for hosts", () => {
    cy.request<SeedData>(
      "GET",
      `${Cypress.env("apiUrl")}/seed/getSeedData/`
    ).then((response) => {
      const { activities, users } = response.body;
      const { id } = users.find(
        (user) => user.userName === loginUser.displayName
      )!;

      const activity = activities.find((activity) =>
        activity.userActivities.find((ua) => ua.appUserId === id && ua.isHost)
      );
      cy.visit(`/activities/${activity!.id}`).wait("@activityDetails");
      cy.get("[cy-data=manage-activity]").should("be.visible").click();
      cy.location("pathname").should("equal", `/manage/${activity!.id}`);
    });
  });
  it("should have a working chat", () => {
    cy.request<SeedData>(
      "GET",
      `${Cypress.env("apiUrl")}/seed/getSeedData/`
    ).then((response) => {
      const { activities } = response.body;
      const activity = activities[indexActivity];
      cy.visit(`/activities/${activity.id}`).wait("@activityDetails");

      let hubConnection: signalR.HubConnection | null = null;
      cy.request("POST", `${Cypress.env("apiUrl")}/User/login`, {
        email: "jane@test.com",
        password: "Pa$$w0rd",
      })
        .then((respose) => {
          const token = respose.body.token;
          console.log(token);
          var hubConnectionBuilder = new signalR.HubConnectionBuilder();
          hubConnection = hubConnectionBuilder
            .withUrl(Cypress.env("chatUrl"), {
              accessTokenFactory: (): string => {
                return token;
              },
            })
            .configureLogging(signalR.LogLevel.Information)
            .build();
          return hubConnection.start();
        })
        .then(() => {
          const comment = {
            activityId: activity.id,
            body: "This comment comes from cypress",
          };
          hubConnection!.invoke("SendComment", comment);
        });
      cy.get("[data-cy=comments] div.comment").contains(
        "This comment comes from cypress"
      );
    });
  });
});
