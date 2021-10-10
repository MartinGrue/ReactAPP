//should be displayed different if user is logged in
//login btn should open modal
//register btn should open modal
//if logged in redirection should work

import { userToLogin } from "../../plugins";
import { getIntercepts } from "../../support/intercepts";

const user1: userToLogin = {
  email: "bob@test.com",
  password: "Pa$$w0rd",
  displayname: "bob",
};

//google login should work
describe("Should have a working home page", () => {
  beforeEach(() => {
    cy.task("db:seed");
    getIntercepts(["loginUser", "initLoad", "userLoad"]);
  });

  it("should open the register modal", () => {
    cy.visit("/");
    cy.location("pathname").should("equal", "/");
    cy.get("[data-cy=register]").should("be.visible").click();
    cy.get("body").click(0, 0);
    cy.get("form.ui").should("not.exist");
  });
  it("should open the login modal and allow to login with prefilled values", () => {
    cy.visit("/");
    cy.location("pathname").should("equal", "/");
    cy.get("[data-cy=login]").should("be.visible").click();
    cy.get("[name=email]")
      .should("be.visible")
      .should("have.value", "bob@test.com");
    cy.get("body").click(0, 0);
    cy.get("form.ui").should("not.exist");
    cy.get("[data-cy=login]").should("be.visible").click();
    cy.get("[data-cy=login-submit]").should("be.visible").click();
    cy.wait("@loginUser").its("response.statusCode").should("eq", 200);
    cy.wait("@userLoad").its("response.statusCode").should("eq", 200);
  });
  it("should be displayed different for users already logged in", () => {
    cy.login(user1.email, user1.password);
    cy.visit("/"); //tomutch userLoad xhr after this one
    cy.get("[data-cy=login]").should("not.exist");
    cy.get("[data-cy=register]").should("not.exist");
    cy.get("[data-cy=gotoactivities]").should("be.visible").click();

    cy.location("pathname").should("equal", "/activities");
  });
});
