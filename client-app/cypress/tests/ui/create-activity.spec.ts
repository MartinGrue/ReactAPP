// it("successfully creates a new activity", function () {
// it("should display create mew activity form errors", function () {
//maybe autocomplete
//maybe googlemaps
//maybe datepicker
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
  const validActivity = {
    title: "testTitle",
    description: "testDescription",
    category: "Film",
    date: "Today",
    timeHours: { firstDigit: "01", secondDigit: "2" },
    timeMinutes: { firstDigit: "01", secondDigit: "2" },
    city: "Berlin",
    cityDescription: "Berlin, Germany",
    venue: "Berlin",
    venueDescription: "Berliner Tor, Hamburg, Germany",
  };

  it("submits a valid new Activity", () => {
    cy.get("[name=title]").clear().type(validActivity.title);
    cy.get("[name=description]")
      .get("textarea")
      .type(validActivity.description);

    cy.get("[name=category] i").click();
    const categories = ["Drinks", "Culture", "Film", "Food", "Music", "Travel"];
    categories.forEach((c) => {
      cy.get("[name=category] .menu").contains(c);
    });
    cy.get("[name=category] .menu").contains(categories[0]).click();

    cy.get("[data-cy=datepicker] button").click();
    cy.get("[data-cy=datepicker] [id=id_date] button")
      .contains("Today")
      .click();

    cy.get("[data-cy=timepicker] input:first")
      .click()
      .focus()
      .type(validActivity.timeHours.firstDigit, { force: true })
      .blur();
    cy.get("[data-cy=timepicker] input:first")
      .click()
      .focus()
      .type(validActivity.timeHours.secondDigit, { force: true });

    cy.get("[data-cy=timepicker] input:last")
      .click()
      .focus()
      .type(validActivity.timeMinutes.firstDigit, { force: true })
      .type(validActivity.timeMinutes.secondDigit, { force: true })
      .blur();

    cy.get("[name=city]").click().type(validActivity.city);
    cy.get("[data-cy=suggestion-item]")
      .first()
      .contains(validActivity.cityDescription)
      .click();

    cy.get("[name=venue]").click().type(validActivity.venue);
    cy.get("[data-cy=suggestion-item]")
      .first()
      .contains(validActivity.venueDescription)
      .click();
    cy.wait(1000);
    cy.visualSnapshot("MapsTest");

    // cy.get("[data-cy=cancel]").click();

    cy.get("[data-cy=submit]").click();
    cy.wait("@createNewActivity");
  });
  // it("should be able remove the input values from the form", () => {
  //   cy.get("[data-cy=timepicker] button").click();
  // });
});
