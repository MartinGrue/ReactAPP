//0.
//image zoom should work
//show FOLLOWERS/FOLLOWING correctly (in tabs and in header)--> make api calls to validate changes
//should display correct UserActivities

import { SeedData } from "../../plugins";

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

type ProfilesContext = {
  seedData?: SeedData;
}; //this should come from a global thingy

const user1 = {
  email: "bob@test.com",
  password: "Pa$$w0rd",
};
const user2 = {
  email: "jane@test.com",
  password: "Pa$$w0rd",
};
const panes = [
  { tabname: "About", header: "About" },
  { tabname: "Photos", header: "Photos" },
  { tabname: "Activities", header: "Activities" },
  { tabname: "Followers", header: `People following Bob` },
  { tabname: "Following", header: `People Bob is following` }, // template from datastore here
];

const checkPane = (pane: { tabname: string; header: string }) => {
  cy.get("[data-cy=panes] a.item")
    .contains(pane.tabname)
    .should("be.visible")
    .click();

  cy.get("[data-cy=PaneContentHeader]").contains(pane.header);
};

describe("Check the Profile functionality", () => {
  let ctx: ProfilesContext = {};
  const getData = async () => {
    ctx.seedData = await cy.task<SeedData>("get:data").promisify();
  }; //this should come from global thingy

  beforeEach(function () {
    cy.task("db:seed");
    getData();
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
  it("should display the default route correctly", () => {
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
  });
  //CONTENT
  it("should display the About Tab correctly", () => {
    checkPane(panes.find((pane) => pane.tabname === "About")!);
    cy.get("[data-cy=profileEditForm] div").each((el) => {
      cy.wrap(el).should("have.class", "disabled");
    });
    //Check if displayname and bio are indeed display and not empty
    cy.get("[data-cy=editProfileBtn]")
      .should("have.text", "Edit Profile")
      .click()
      .should("have.text", "Cancel");
    //Check if disabled on other user

    cy.get("[data-cy=profileEditForm] div").each((el) => {
      cy.wrap(el).should("not.have.class", "disabled");
    });
    const newUser = {
      displayName: "Bob_mod",
      bio: "sometexthere",
    }; //get this from datastore
    cy.get("[data-cy=submitEditProfile]").should("have.class", "disabled");
    cy.get("[data-cy=profileEditForm] div")
      .find("[name=displayName]")
      .clear()
      .type(newUser.displayName);
    cy.get("[data-cy=profileEditForm] div")
      .find("[name=bio]")
      .clear()
      .type(newUser.bio);
    cy.get("[data-cy=submitEditProfile]").should("not.have.class").click();
    cy.wait("@updateProfile");

    cy.get("[data-cy=profile-dropdown] div.text").should(
      "have.text",
      newUser.displayName
    );
    cy.get("[data-cy=profileHeader-name]").should(
      "have.text",
      newUser.displayName
    ); //call to datastore here
    cy.get("[data-cy=profileEditForm] div")
      .find("[name=displayName]")
      .should("have.value", newUser.displayName);

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
  });
  it.only("should display the Photos Tab correctly", () => {
    const { users } = ctx.seedData!;
    const user = users.find((user) => user.username === "bob");

    checkPane(panes.find((pane) => pane.tabname === "Photos")!);

    cy.get("[data-cy=imagecard]")
      .should("have.length", user!.photos.length)
      .should("be.visible");
    cy.get("[data-cy=PhotoModal]").should("not.exist");
    cy.get("[data-cy=imagecard]").first().find("img").click();
    cy.get("[data-cy=PhotoModal]").should("exist").should("be.visible").click();

    cy.get("[data-cy=imagecard]")
      .first()
      .find("img")
      .invoke("attr", "src")
      .then((src) => {
        cy.get("[data-cy=imagecard]")
          .first()
          .find("button")
          .contains("Main")
          .click()
          .should("have.class", "isMainButton");
        cy.get("[data-cy=NavMenuRightItems] img")
          .invoke("attr", "src")
          .should("eq", src);

        cy.get("[data-cy=profileHeader-avatar]")
          .should("be.visible")
          .find("img")
          .invoke("attr", "src")
          .should("eq", src); //to test if the image is displayed; make percy snapshot
      });

    cy.get("[data-cy=imagecard] button.isNotMainButton")
      .first()
      .siblings("button")
      .click();
    //check for toast massage here
    cy.get("[data-cy=imagecard]").should(
      "have.length",
      user!.photos.length - 1
    );

    //make sure one can not delete the main and an error is displayed
    // .find("button")
    // .contains("Trash")
    // .click();
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
      cy.location("pathname").should("equal", `/profiles/bob`); //This Profiles should be uppercase, fix in client
    });
  });
});
