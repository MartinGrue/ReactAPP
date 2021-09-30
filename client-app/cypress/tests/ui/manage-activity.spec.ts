//check if refresh work

describe("Manage existing Activity", function () {
  const user = {
    email: "bob@test.com",
    password: "Pa$$w0rd",
  };
  const activity = {
    Id: "08d98198-c819-0bfa-2b7f-783337b71419",
    Title: "Future Activity 4",
    Description: "Activity 4 days in future",
    Category: "Culture",
    Date: "2021-09-26T15:48:36.392Z",
    City: "Paris",
    Venue: "Eiffel Tower",
    Latitute: 52.3758916,
    Longitute: 2.3522219000000177,
    UserActivities: [
      {
        AppUserId: "a",
        ActivityId: "08d98198-c819-0bfa-2b7f-783337b71419",
        DateJoined: "2021-09-26T15:48:36.392Z",
        IsHost: true,
      },
    ],
  };
  const CheckForm = () => {
    const getTime = (dateString: string) => {
      const date = new Date(dateString);
      const hours = date.getHours() + date.getTimezoneOffset() / 60;
      const month =
        date.getMonth() + 1 < 10
          ? "" + 0 + (date.getMonth() + 1)
          : date.getMonth() + 1;
      return {
        year: date.getFullYear(),
        month,
        day: date.getDate(),
        hours,
        minutes: date.getMinutes(),
      };
    };

    cy.get("[name=title]").should("have.value", activity.Title);

    cy.get("[name=description]")
      .get("textarea")
      .should("have.value", activity.Description);

    cy.get("[name=category]").and("contain", activity.Category);

    const date = `${getTime(activity.Date).day}.${
      getTime(activity.Date).month
    }.${getTime(activity.Date).year.toString().slice(-2)}`;

    cy.get("[data-cy=datepicker] input[id=id_input").should("have.value", date);
    cy.get("[data-cy=timepicker] input:first").should(
      "have.value",
      getTime(activity.Date).hours
    );
    cy.get("[data-cy=timepicker] input:last").should(
      "have.value",
      getTime(activity.Date).minutes
    );
    cy.get("[name=city]").should("have.value", activity.City);
    cy.get("[name=venue]").should("have.value", activity.Venue);
  };

  beforeEach(function () {
    cy.task("db:seed");
    cy.login(user.email, user.password);

    cy.intercept(
      "GET",
      `http://localhost:5000/api/activities/${activity.Id}`
    ).as("activityDetails");

    cy.intercept(
      "OPTIONS",
      `http://localhost:5000/api/activities/${activity.Id}`
    ).as("editActivity");

    cy.intercept(
      "DELETE",
      `http://localhost:5000/api/activities/${activity.Id}`
    ).as("deleteActivity");

    cy.visit(`/activities/${activity.Id}`);
    cy.get("[data-cy=manage]").should("be.visible").click();
    cy.location("pathname").should("equal", `/manage/${activity.Id}`);
  });

  it("should display the activity correctly", () => {
    CheckForm();
  });

  it("should display the activity correctly after reload", () => {
    cy.reload();
    CheckForm();
  });

  it.only("should display the activity correctly if redirected from create ActivityRoute", () => {
    cy.visit("/createactivity");
    cy.wait(2000);

    cy.visit(`/activities/${activity.Id}`);
    cy.get("[data-cy=manage]").should("be.visible").click();
    cy.location("pathname").should("equal", `/manage/${activity.Id}`);
    CheckForm();

    cy.visit("/createactivity");
    cy.wait(2000);
    cy.visit(`/manage/${activity.Id}`);
    CheckForm();
  });

  it("should be able to make changes and persist the changes", () => {
    const newTitle = `${activity.Title}_modified`;
    cy.fillTitle(newTitle);
    cy.get("[data-cy=submit]").click();
    cy.wait("@editActivity").its("response.statusCode").should("eq", 204);

    cy.visit("/activities");
    cy.visit(`/activities/${activity.Id}`);
    cy.get("[data-cy=manage]").should("be.visible").click();
    cy.location("pathname").should("equal", `/manage/${activity.Id}`);
    cy.get("[name=title]").should("have.value", newTitle);
  });

  it("should be able to cancel the editing and redirect", () => {
    cy.get("[data-cy=cancel]").click();
    cy.wait("@activityDetails");
    cy.location("pathname").should("equal", `/activities/${activity.Id}`);
  });

  it("should be able to delete the editing and redirect", () => {
    cy.get("[data-cy=delete]").click();
    cy.wait("@deleteActivity");
    cy.location("pathname").should("equal", "/activities");

    cy.visit(`/activities/${activity.Id}`);
    cy.location("pathname").should("equal", "/notfound");
  });
});
