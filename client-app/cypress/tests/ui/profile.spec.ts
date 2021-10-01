//0.
//image zoom should work
//show FOLLOWERS/FOLLOWING correctly (in tabs and in header)--> make api calls to validate changes
//should display correct UserActivities

//1.
//show own profile
//enable photo upload --> make api call, and validate new photo persistance
//delete photo from cloudinary to keep storage clean
//cropper should work
//enable photo delete --> make api call, and validate deleted photo persistance

//image should have setMain option
//should not have follow/unfollow functionality

//2.
//show other users profile
//disable photo upload
//image should not have setMain option
//should have follow/unfollow functionality  --> check with database records from api
describe("Check the Profile functionality", () => {
  const user1 = {
    email: "bob@test.com",
    password: "Pa$$w0rd",
  };
  const user2 = {
    email: "jane@test.com",
    password: "Pa$$w0rd",
  };

  beforeEach(function () {
    cy.task("db:seed");
    cy.login(user1.email, user1.password);
    // cy.changeLogin(user2.email, user2.password);

    cy.intercept("PUT", "http://localhost:5000/api/User").as("updateProfile");
    cy.intercept("GET", `http://localhost:5000/api/Profiles/**`).as(
      "userProfile"
    );
    cy.intercept("POST", "http://localhost:5000/api/Photos/getSignature").as(
      "getSignature"
    );
    cy.intercept(
      "POST",
      "http://api.cloudinary.com/v1_1/dvzlb9xco/image/upload"
    ).as("directCloudUpload");
    cy.intercept(
      "POST",
      "http://localhost:5000/api/Photos/postUploadResults"
    ).as("postUploadResults");

    cy.get("[data-cy=profile-dropdown]").click();
    cy.get("[data-cy=profile]").click();
    cy.wait("@userProfile");
  });
  it.only("should display the default route correctly", () => {
    //HEADER
    cy.get("[data-cy=profileHeader-avatar]")
      .should("be.visible")
      .find("img")
      .should("have.attr", "src"); //to test if the image is displayed; make percy snapshot
    cy.get("[data-cy=profileHeader-name]").should("have.text", "Bob"); //call to datastore here
    cy.get("[data-cy=profileHeader-followers]")
      .should("be.visible")
      .find("div.value")
      .should("have.text", "1"); //call to datastore here
    cy.get("[data-cy=profileHeader-following]")
      .should("be.visible")
      .find("div.value")
      .should("have.text", "2"); //call to datastore here

    //PANES
    cy.get("[data-cy=panes] a.item")
      .contains("About")
      .should("have.class", "active");

    const panes = ["About", "Photos", "Activities", "Followers", "Following"];
    const paneHeader = [
      "About",
      "Photos",
      "Activities",
      `People following Bob`,
      `People Bob is following`,
    ]; // template from datastore here
    panes.forEach((pane, i) => {
      cy.get("[data-cy=panes] a.item")
        .contains(pane)
        .should("be.visible")
        .click();

      //CONTENT
      cy.get("[data-cy=PaneContentHeader]").contains(paneHeader[i]);

      if (pane === "About") {
        cy.get("[data-cy=profileEditForm] div").each((el) => {
          cy.wrap(el).should("have.class", "disabled");
        });
        cy.get("[data-cy=editProfileBtn]")
          .should("have.text", "Edit Profile")
          .click()
          .should("have.text", "Cancel");

        cy.get("[data-cy=profileEditForm] div").each((el) => {
          cy.wrap(el).should("not.have.class", "disabled");
        });
        cy.get("[data-cy=submitEditProfile]").should("have.class", "disabled");
        cy.get("[data-cy=profileEditForm] div")
          .find("[name=displayName]")
          .type("Bob_mod");
        cy.get("[data-cy=profileEditForm] div")
          .find("[name=bio]")
          .type("Bio_mod");
        cy.get("[data-cy=submitEditProfile]").should("not.have.class").click();
        cy.wait("@updateProfile");

        //This is needed to restore original displayName
        cy.get("[data-cy=editProfileBtn]")
          .should("have.text", "Edit Profile")
          .click();
        cy.get("[data-cy=profileEditForm] div")
          .find("[name=displayName]")
          .clear()
          .type("Bob");
        cy.get("[data-cy=submitEditProfile]").should("not.have.class").click();
        cy.wait("@updateProfile");
      }
    });
  });
  it("should be able to upload an image directly to cloudinary", () => {
    cy.get("[data-cy=panes] a.item").contains("Photos").click();
    cy.get("[data-cy=addphoto-btn]").click();

    const filepath = "hqdefault.jpg";
    cy.get("[data-cy=photo-dropzone] input[type=file]").attachFile(filepath);
    cy.wait(500).then(() => {
      cy.get("[data-cy=upload-imagebtn]").click();
      cy.wait("@getSignature");
      cy.wait("@directCloudUpload");
      cy.wait("@postUploadResults");
      cy.location("pathname").should("equal", `/Profiles/bob`);
    });
  });
});
