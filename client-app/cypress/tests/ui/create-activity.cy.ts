//test functionality after redirection from manage activity

import { dbSeed } from "../../support/helper";
import { getIntercepts } from "../../support/intercepts";

describe("Create New Activity", function () {
  const user = {
    email: "bob@test.com",
    password: "Pa$$w0rd",
  };
  const categories = ["Drinks", "Culture", "Film", "Food", "Music", "Travel"];

  const validActivity = {
    title: "testTitle",
    description: "testDescription",
    category: "Film",
    date: "Today",
    timeHours: { firstDigit: "01", secondDigit: "2" },
    timeMinutes: { firstDigit: "01", secondDigit: "2" },
    city: {
      searchString: "Berlin",
      suggestions: [
        "Berlin, Germany",
        "Berlin, MD, USA",
        "Berlin, OH, USA",
        "Berlin, NJ, USA",
        "Berlin, CT, USA",
      ],
    },
    venue: {
      searchString: "Berlin",
      suggestions: [
        "Berliner Tor, Hamburg, Germany",
        "Berliner Allee, Düsseldorf, Germany",
        "Berliner Straße, Berlin, Germany",
        "Berliner Mauerweg, Berlin, Germany",
        "Berlin Turnpike, Newington, CT, USA",
      ],
    },
    venueDescription: "Berliner Tor, Hamburg, Germany",
  };

  beforeEach(() => {
    getIntercepts([ "createNewActivity"]);
    cy.wrap(dbSeed());
    cy.login(user.email, user.password);
    cy.get("[data-cy=createActivity]").click(); //this is not visible on mobile
  });

  it("should submit a valid new Activity", () => {
    cy.fillTitle(validActivity.title);
    cy.fillDesctiption(validActivity.description);
    cy.fillCategory(categories, categories[0]);
    cy.fillDate();
    cy.fillTime(validActivity.timeHours, validActivity.timeMinutes);
    cy.fillCity(validActivity.city);
    cy.fillVenue(validActivity.venue);

    cy.wait(1000);
    cy.visualSnapshot("MapsTest");
    cy.get("[data-cy=submit]").click();
    cy.wait("@createNewActivity");
    cy.location("pathname").should(
      "match",
      /activities\/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/
    );

    //should check if values are persisted right (do a manage slim down activity.spec test here)
  });
  it("should display create mew activity form errors", function () {
    cy.get("[name=title]").focus().clear().blur();
    cy.get("[data-cy=error-label]")
      .should("be.visible")
      .and("contain", "The title is required");
    cy.fillTitle(validActivity.title);

    cy.get("[name=description]").get("textarea").focus().clear().blur();
    cy.get("[data-cy=error-label]")
      .should("be.visible")
      .and("contain", "Description is required");

    cy.fillDesctiption("abc");
    cy.get("[data-cy=error-label]")
      .should("be.visible")
      .and("contain", "Description needs to be at least 5 characters");
    cy.fillDesctiption(validActivity.description);

    cy.get(
      "[data-cy=datepicker] button.rw-input-addon.rw-picker-btn.rw-btn"
    ).click();
    cy.get("[name=title]").focus().blur();

    cy.get("[data-cy=error-label]")
      .should("be.visible")
      .and("contain", "Date is required");
    cy.fillDate();

    cy.get("[data-cy=timepicker] input:last").click();
    cy.get("[name=title]").focus().blur();

    cy.get("[data-cy=error-label]")
      .should("be.visible")
      .and("contain", "Time is required");
    cy.fillTime(validActivity.timeHours, validActivity.timeMinutes);

    cy.get("[name=city]").focus().click().blur();
    cy.get("[data-cy=error-label]")
      .should("be.visible")
      .and("contain", "City is required");
    cy.fillCity(validActivity.city);

    cy.get("[name=venue]").focus().click().blur();
    cy.get("[data-cy=error-label]")
      .should("be.visible")
      .and("contain", "Street is required");
    cy.fillVenue(validActivity.venue);

    cy.get("[data-cy=cancel]").click();
    cy.location("pathname").should("equal", "/activities");
  });
  it("should display the form correctly if redirected from manage Activity Route", () => {
    cy.visit("/manage/08d98198-c819-0bfa-2b7f-783337b71419");
    cy.wait(2000);
    cy.get("[data-cy=createActivity]").click(); //this is not visible on mobile
    cy.get("[name=title]").focus().should("have.value", "");
    cy.get("[name=description]").get("textarea").should("have.value", "");
    cy.get("[name=category]").and("contain", "");
    cy.get("[data-cy=datepicker] input[id=id_input").should("have.value", "");
    cy.get("[data-cy=timepicker] input:first").should("have.value", "--");
    cy.get("[data-cy=timepicker] input:last").should("have.value", "--");
    cy.get("[name=city]").should("have.value", "");
    cy.get("[name=venue]").should("have.value", "");
  });
});
