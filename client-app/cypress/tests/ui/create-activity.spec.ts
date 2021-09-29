//test functionality after redirection from manage activity

describe("New Transaction", function () {
  const user = {
    email: "bob@test.com",
    password: "Pa$$w0rd",
  };
  beforeEach(function () {
    cy.task("db:seed");
    cy.login(user.email, user.password);

    cy.intercept("POST", "http://localhost:5000/api/Activities").as(
      "createNewActivity"
    );
    cy.get("[data-cy=createActivity]").click(); //this is not visible on mobile
  });
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

  const fillTitle = (title: string) => {
    cy.get("[name=title]").clear().type(title);
  };

  const fillDesctiption = (description: string) => {
    cy.get("[name=description]").get("textarea").type(description);
  };

  const fillCategory = (category: string) => {
    cy.get("[name=category] i").click();
    categories.forEach((c) => {
      cy.get("[name=category] .menu").contains(c);
    });
    cy.get("[name=category] .menu").contains(category).click();
  };

  const fillDate = () => {
    cy.get(
      "[data-cy=datepicker] button.rw-input-addon.rw-picker-btn.rw-btn"
    ).click();
    cy.get("[data-cy=datepicker] [id=id_date] button")
      .contains("Today")
      .click();
  };

  const fillTime = () => {
    cy.get("[data-cy=timepicker] input:first")
      .click()
      .focus()
      .type(validActivity.timeHours.firstDigit, { force: true })
      .type(validActivity.timeHours.secondDigit, { force: true });

    cy.get("[data-cy=timepicker] input:last")
      .click()
      .focus()
      .type(validActivity.timeMinutes.firstDigit, { force: true })
      .type(validActivity.timeMinutes.secondDigit, { force: true });
  };
  const fillCity = () => {
    cy.get("[name=city]").click().type(validActivity.city.searchString);
    cy.get("[data-cy=suggestion-item]")
      .each((el, index) => {
        cy.wrap(el).should("have.text", validActivity.city.suggestions[index]);
      })
      .first()
      .click();
  };
  const fillVenue = () => {
    cy.get("[name=venue]").click().type(validActivity.venue.searchString);
    cy.get("[data-cy=suggestion-item]")
      .each((el, index) => {
        cy.wrap(el).should("have.text", validActivity.venue.suggestions[index]);
      })
      .first()
      .click();
  };

  it("should submit a valid new Activity", () => {
    fillTitle(validActivity.title);
    fillDesctiption(validActivity.description);
    fillCategory(categories[0]);
    fillDate();
    fillTime();
    fillCity();
    fillVenue();

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
    fillTitle(validActivity.title);

    cy.get("[name=description]").get("textarea").focus().clear().blur();
    cy.get("[data-cy=error-label]")
      .should("be.visible")
      .and("contain", "Description is required");

    fillDesctiption("abc");
    cy.get("[data-cy=error-label]")
      .should("be.visible")
      .and("contain", "Description needs to be at least 5 characters");
    fillDesctiption(validActivity.description);

    cy.get(
      "[data-cy=datepicker] button.rw-input-addon.rw-picker-btn.rw-btn"
    ).click();
    cy.get("[name=title]").focus().blur();

    cy.get("[data-cy=error-label]")
      .should("be.visible")
      .and("contain", "Date is required");
    fillDate();

    cy.get("[data-cy=timepicker] input:last").click();
    cy.get("[name=title]").focus().blur();

    cy.get("[data-cy=error-label]")
      .should("be.visible")
      .and("contain", "Time is required");
    fillTime();

    cy.get("[name=city]").focus().click().blur();
    cy.get("[data-cy=error-label]")
      .should("be.visible")
      .and("contain", "City is required");
    fillCity();

    cy.get("[name=venue]").focus().click().blur();
    cy.get("[data-cy=error-label]")
      .should("be.visible")
      .and("contain", "Venue is required");
    fillVenue();

    cy.get("[data-cy=cancel]").click();
    cy.location("pathname").should("equal", "/activities");
  });
});
