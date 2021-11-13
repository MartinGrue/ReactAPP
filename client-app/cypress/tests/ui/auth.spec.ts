import jwt_decode from "jwt-decode";

// describe("User Sign-up and Login"
// it("should redirect unauthenticated user to signin page"
// it("should redirect to the activity dashboard page after login"
// it("should remember a user for 30 days after login", function () {
// it("should allow a visitor to successfully sign-up, login, and logout", function () {
// it("should display login form errors", function () {
// it("should display signup form errors", function () {
// it("should error in login for an invalid user", function () {
// it("should error in login for an invalid password for existing user", function () {
// display toast (error, success)
describe("User Sign-up and Login", function () {
  beforeEach(() => {
    cy.task("db:seed");
  });

  it("should redirect unauthenticated user to home page", function () {
    cy.visit("/activities");
    cy.location("pathname").should("equal", "/");

    cy.visit("/activities/08d98198-c818-f63d-9261-cf95fa0a5bd1");
    cy.location("pathname").should("equal", "/");

    cy.visit("/manage/08d98198-c818-f63d-9261-cf95fa0a5bd1");
    cy.location("pathname").should("equal", "/");

    cy.visit("/createActivity");
    cy.location("pathname").should("equal", "/");

    cy.visit("/profiles/bob");
    cy.location("pathname").should("equal", "/");

    cy.visit("/randomstringhere");
    cy.get("[data-cy=NotFound]").should("be.visible");
  });
  it("should redirect to the activitydashboard page after login", function () {
    cy.login("bob@test.com", "Pa$$w0rd");
    cy.location("pathname").should("equal", "/activities");
  });

  it("should set the jwt token in local storage", function () {
    cy.login("bob@test.com", "Pa$$w0rd");
    // Verify Jwt token
    cy.contains("Future Activity 9")
      .should("be.visible")
      .then(() => {
        const token = window.localStorage.getItem("jwt");
        var decoded = jwt_decode(token!);
        expect(decoded).to.be.an("object");
        expect(decoded).to.have.keys(["nameid", "nbf", "exp", "iat"]);
      });
    cy.get("[data-cy=profile-dropdown]").click();
    cy.get("[data-cy=logout]").click();

    cy.location("pathname").should("equal", "/");
  });

  it("should allow a visitor to login, and logout", function () {
    cy.login("bob@test.com", "Pa$$w0rd");
    cy.get("[data-cy=profile-dropdown]").click();
    cy.get("[data-cy=logout]").click();
    cy.location("pathname").should("equal", "/");
  });
  it("should allow a visitor to sign-up and logout", function () {
    cy.visit("/");
    cy.get("[data-cy=register]").click();
    cy.get("[name=username]").clear().type("Johna");
    cy.get("[name=displayname]").clear().type("Johna");
    cy.get("[name=email]").clear().type("Johna@test.com");
    cy.get("[name=password]").clear().type("Pa$$w0rd");
    cy.get("[data-cy=register-submit]").click();
    cy.location("pathname").should("equal", "/activities");
    cy.get("[data-cy=profile-dropdown]").click();
    cy.get("[data-cy=logout]").click();
    cy.location("pathname").should("equal", "/");
  });

  it("should display login errors", function () {
    cy.visit("/");
    cy.get("[data-cy=login]").click();
    cy.get("[name=email]").clear().type("notvalidemail").clear().blur();
    cy.get("[data-cy=error-label]")
      .should("be.visible")
      .and("contain", "email is required");

    cy.visit("/");
    cy.get("[data-cy=login]").click();
    cy.get("[name=password]").clear().type("notvalidemail").clear().blur();
    cy.get("[data-cy=error-label]")
      .should("be.visible")
      .and("contain", "password is required");

    cy.visit("/");
    cy.get("[data-cy=login]").click();
    cy.get("[name=email]").clear().type("bob@test.com").blur();
    cy.get("[name=password]").clear().type("notValidPassword").blur();
    cy.get("[data-cy=login-submit]").click();
    cy.get("[data-cy=submitError]")
      .should("be.visible")
      .and("contain", "Invalid email or password");

    cy.visit("/");
    cy.get("[data-cy=login]").click();
    cy.get("[name=email]").clear().type("invalidemail").blur();
    cy.get("[name=password]").clear().type("Pa$$w0rd").blur();
    cy.get("[data-cy=login-submit]").click();
    cy.get("[data-cy=submitError]")
      .should("be.visible")
      .and("contain", "Invalid email or password");
  });
  it("should display signup errors", function () {
    const newUser = {
      username: "Johna",
      displayname: "Johna",
      email: "Johna@test.com",
      password: "Pa$$w0rd",
    };
    cy.visit("/");
    cy.get("[data-cy=register]").click();
    cy.get("[name=username]").clear().type(newUser.username);
    cy.get("[name=displayname]").clear().type(newUser.displayname);
    cy.get("[name=email]").clear().type(newUser.email);
    cy.get("[name=password]").clear().type(newUser.password);
    cy.get("[data-cy=register-submit]").click();
    cy.location("pathname").should("equal", "/activities");
    cy.get("[data-cy=profile-dropdown]").click();
    cy.get("[data-cy=logout]").click();
    cy.location("pathname").should("equal", "/");

    //check if newUser is persisted
    cy.login(newUser.email, newUser.password);
    cy.location("pathname").should("equal", "/activities");
    cy.get("[data-cy=profile-dropdown]").click();
    cy.get("[data-cy=logout]").click();
    cy.location("pathname").should("equal", "/");
  });
  it("should display signup errors", function () {
    const validData = {
      username: "Johna",
      displayname: "Johna",
      email: "Johna@test.com",
      password: "Pa$$w0rd",
    };

    cy.visit("/");
    cy.get("[data-cy=register]").click();

    cy.get("[name=username]").clear().type(validData.username).clear().blur();
    cy.get("[data-cy=error-label]")
      .should("be.visible")
      .and("contain", "Name is required");
    cy.get("[name=username]").clear().type(validData.username).blur();

    cy.get("[name=displayname]")
      .clear()
      .type(validData.displayname)
      .clear()
      .blur();
    cy.get("[data-cy=error-label]")
      .should("be.visible")
      .and("contain", "Displayname is required");
    cy.get("[name=displayname]").clear().type(validData.displayname).blur();

    const invalidEmails = [
      "noat",
      "@test.com",
      "#@test.com",
      "1234@test",
      "123@$$$.com",
      "1234@test.c",
      "1234@test.1",
      "1234@test.$",
      "1234@test.%",
      "1234@test.ccccc",
    ];
    invalidEmails.forEach((email) => {
      cy.get("[name=email]").clear().type(email).blur();
      cy.get("[data-cy=error-label]")
        .should("be.visible")
        .and("contain", "Invalid email address");
      cy.get("[name=email]").clear();
    });
    cy.get("[name=email]").clear().type(validData.email).clear().blur();
    cy.get("[data-cy=error-label]")
      .should("be.visible")
      .and("contain", "email is required");
    cy.get("[name=email]").clear().type(validData.email).blur();

    const invalidPasswords = [
      "a",
      "aa",
      "NOLOWERCASE0$",
      "nouppercase0$",
      "NospecialChar0",
      "NoNumber$",
    ];
    invalidPasswords.forEach((password) => {
      cy.get("[name=password]").clear().type(password).blur();
      cy.get("[data-cy=error-label]")
        .should("be.visible")
        .contains(
          /^(Password must be between 3 and 20 character|Password must contain at least one uppercase letter, one lowercase letter and one number)/
        );
      cy.get("[name=password]").clear();
    });
    cy.get("[name=password]").clear().type(validData.password).clear().blur();
    cy.get("[data-cy=error-label]")
      .should("be.visible")
      .and("contain", "password is required");

    cy.get("[name=password]").clear().type(validData.password).clear().blur();
    cy.get("[data-cy=error-label]")
      .should("be.visible")
      .and("contain", "password is required");
    cy.get("[name=password]").clear().type(validData.password).blur();
  });
});
