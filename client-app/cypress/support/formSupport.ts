Cypress.Commands.add("fillTitle", (title: string) => {
  cy.get("[name=title]").clear().type(title);
});

Cypress.Commands.add("fillDesctiption", (description: string) => {
  cy.get("[name=description]").get("textarea").type(description);
});

Cypress.Commands.add(
  "fillCategory",
  (categories: string[], category: string) => {
    cy.get("[name=category] i").click();
    categories.forEach((c) => {
      cy.get("[name=category] .menu").contains(c);
    });
    cy.get("[name=category] .menu").contains(category).click();
  }
);

Cypress.Commands.add("fillDate", () => {
  cy.get(
    "[data-cy=datepicker] button.rw-input-addon.rw-picker-btn.rw-btn"
  ).click();
  cy.get("[data-cy=datepicker] [id=id_date] button").contains("Today").click();
});

Cypress.Commands.add(
  "fillTime",
  (
    timeHours: { firstDigit: string; secondDigit: string },
    timeMinutes: { firstDigit: string; secondDigit: string }
  ) => {
    cy.get("[data-cy=timepicker] input:first")
      .click()
      .focus()
      .type(timeHours.firstDigit, { force: true })
      .type(timeHours.secondDigit, { force: true });

    cy.get("[data-cy=timepicker] input:last")
      .click()
      .focus()
      .type(timeMinutes.firstDigit, { force: true })
      .type(timeMinutes.secondDigit, { force: true });
  }
);
Cypress.Commands.add(
  "fillCity",
  (city: { searchString: string; suggestions: string[] }) => {
    cy.get("[name=city]").click().type(city.searchString);
    cy.get("[data-cy=suggestion-item]")
      // .each((el, index) => {
      //   cy.wrap(el).should("have.text", city.suggestions[index]);
      // })
      .first()
      .click();
  }
);
Cypress.Commands.add(
  "fillVenue",
  (venue: { searchString: string; suggestions: string[] }) => {
    cy.get("[name=venue]").click().type(venue.searchString);
    cy.get("[data-cy=suggestion-item]")
      // .each((el, index) => {
      //   cy.wrap(el).should("have.text", venue.suggestions[index]);
      // })
      .first()
      .click();
  }
);
export {};
