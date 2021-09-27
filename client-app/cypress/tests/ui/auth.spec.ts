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

  // it("should redirect unauthenticated user to home page", function () {
  //   cy.visit("/activities");
  //   cy.location("pathname").should("equal", "/");

  //   cy.visit("/activities/08d98198-c818-f63d-9261-cf95fa0a5bd1");
  //   cy.location("pathname").should("equal", "/");

  //   cy.visit("/profiles/bob");
  //   cy.location("pathname").should("equal", "/");

  //   cy.visit("/ewrewrewrwerwerw");
  //   cy.location("pathname").should("equal", "/");
  // });
  it("login via command", function () {
    cy.login("bob@test.com", "Pa$$w0rd");
  });
  // it("should allow a visitor to login, and logout", function () {
  //   // Login User
  //   // cy.login(userInfo.username, userInfo.password);
  //   cy.visit("/");
  //   cy.get("[data-cy=login]").click();
  //   cy.get("[name=email]").clear().type("Bob@test.com");
  //   cy.get("[name=password]").clear().type("Pa$$w0rd");
  //   cy.get("[data-cy=login-submit]").click();
  // });
  // it("should allow a visitor to sign-up and logout", function () {
  //   // Login Use
  //   // cy.login(userInfo.username, userInfo.password);
  //   cy.visit("/");
  //   cy.get("[data-cy=register]").click();
  //   cy.get("[name=username]").clear().type("Johna");
  //   cy.get("[name=displayname]").clear().type("Johna");
  //   cy.get("[name=email]").clear().type("Johna@test.com");
  //   cy.get("[name=password]").clear().type("Pa$$w0rd");
  //   cy.get("[data-cy=register-submit]").click();
  // });

  // it("should redirect unauthenticated user to signin page", function () {
  //   cy.visit("/profiles/Bob");
  //   cy.location("pathname").should("equal", "/");

  //   cy.visit("/activities");
  //   cy.location("pathname").should("equal", "/");

  //   cy.visit("/createActivity/manage/Bob");
  //   cy.location("pathname").should("equal", "/");

  //   // {
  //   //   ["/createActivity", "/manage/:id"];
  //   // }
  //   // ("/activities/:id");
  //   // login;
  // });
});
