//0.
//show FOLLOWERS/FOLLOWING correctly (in tabs and in header)--> make api calls to validate changes

import {
  checkPane,
  dbSeed,
  getFollowers,
  getFollowing,
  getPanes,
} from "../../support/helper";
import { getIntercepts } from "../../support/intercepts";
import { SeedData, userToLogin } from "../../support/types";

//1.
//enable photo upload --> and validate new photo persistance
//delete photo from cloudinary to keep storage clean
//cropper should work

//2.
//show other users profile
//disable photo upload
//image should not have setMain option
//should have follow/unfollow functionality  --> check with database records from

const user1: userToLogin = {
  email: "bob@test.com",
  password: "Pa$$w0rd",
  displayname: "bob",
};
const user2: userToLogin = {
  email: "jane@test.com",
  password: "Pa$$w0rd",
  displayname: "jane",
};
const panes = getPanes(user1);

describe("Check the Profile functionality", () => {
  beforeEach(function () {
    getIntercepts([
      "userProfile",
      "updateProfile",
      "getSignature",
      "directCloudUpload",
      "postUploadResults",
      "loadUserActivities",
    ]);

    cy.wrap(dbSeed());
    cy.login(user1.email, user1.password);
    cy.get("[data-cy=profile-dropdown]").click();
    cy.get("[data-cy=profile]").click();
    // cy.wait("@userProfile");
    // cy.changeLogin(user2.email, user2.password);
  });
  it("should be able to upload an image directly to cloudinary", () => {
    cy.request<SeedData>(
      "GET",
      `${Cypress.env("apiUrl")}/seed/getSeedData/`
    ).then((response) => {
      const { users } = response.body;
      const user = users.find((user) => user.userName === user1.displayname);
      checkPane(user!, panes.find((pane) => pane.tabname === "Photos")!);
      cy.get("[data-cy=addphoto-btn]").click();

      const filepath = "cypress/fixtures/hqdefault.jpg";
      //force because <input> is hidden
      cy.get("[data-cy=photo-dropzone] input[type=file]").selectFile(filepath, {
        force: true,
      });
      cy.wait(500);
      cy.get("[data-cy=upload-imagebtn]").click();

      cy.wait("@directCloudUpload", { timeout: 10000 });
      cy.wait("@postUploadResults", { timeout: 10000 });
      cy.wait("@getSignature", { timeout: 10000 });
      cy.location("pathname").should("equal", `/profiles/${user!.userName}`); //This Profiles should be uppercase, fix in client

      cy.get("[data-cy=imagecard]")
        .should("have.length", user!.photos.length + 1)
        .should("be.visible");
    });
  });
  it("should display the default route correctly", () => {
    //HEADER
    cy.request<SeedData>(
      "GET",
      `${Cypress.env("apiUrl")}/seed/getSeedData/`
    ).then((response) => {
      const { users, followerFollowings } = response.body;
      const user = users.find((user) => user.userName === user1.displayname);
      const followers = getFollowers(followerFollowings, users, user!);
      const followings = getFollowing(followerFollowings, users, user!);
      cy.wait(500);
      cy.get("[data-cy=profileHeader-avatar]")
        .should("be.visible")
        .find("img")
        .should("have.attr", "src"); //to test if the image is displayed; make percy snapshot
      cy.get("[data-cy=profileHeader-name]").should(
        "have.text",
        user!.displayName
      ); //call to datastore here
      followers &&
        cy
          .get("[data-cy=profileHeader-followers]")
          .should("be.visible")
          .find("div.value")
          .should("have.text", followers.length);
      followings &&
        cy
          .get("[data-cy=profileHeader-following]")
          .should("be.visible")
          .find("div.value")
          .should("have.text", followings!.length);

      //PANES
      cy.get("[data-cy=panes] a.item")
        .contains("About")
        .should("have.class", "active");
    });
  });
  //CONTENT -- ABOUT
  it("should display the About Tab correctly", () => {
    cy.request<SeedData>(
      "GET",
      `${Cypress.env("apiUrl")}/seed/getSeedData/`
    ).then((response) => {
      const { users } = response.body;

      const user = users.find((user) => user.userName === user1.displayname);
      checkPane(user!, panes.find((pane) => pane.tabname === "About")!);
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
        .type(user1.displayname);
      cy.get("[data-cy=submitEditProfile]").should("not.have.class").click();
      cy.wait("@updateProfile");
    });
  });
  //CONTENT -- PHOTOS
  it("should display the Photos Tab correctly", () => {
    cy.request<SeedData>(
      "GET",
      `${Cypress.env("apiUrl")}/seed/getSeedData/`
    ).then((response) => {
      const { users } = response.body;
      const user = users.find((user) => user.userName === user1.displayname);

      checkPane(user!, panes.find((pane) => pane.tabname === "Photos")!);

      cy.get("[data-cy=imagecard]")
        .should("have.length", user!.photos.length)
        .should("be.visible");
      cy.get("[data-cy=PhotoModal]").should("not.exist");
      cy.get("[data-cy=imagecard]").first().find("img").click();
      cy.get("[data-cy=PhotoModal]")
        .should("exist")
        .should("be.visible")
        .click();

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
      // .click();}
    });
  });

  //CONTENT -- ACTIVITIES
  it("should display the Activities Tab correctly", () => {
    cy.request<SeedData>(
      "GET",
      `${Cypress.env("apiUrl")}/seed/getSeedData/`
    ).then((response) => {
      const { users, activities } = response.body;
      const user = users.find((user) => user.userName === user1.displayname);
      const futureEvents = activities.filter(
        (act) =>
          new Date().getTime() - new Date(act.date).getTime() < 0 &&
          act.userActivities.some((ua) => ua.appUserId === user!.id)
      );

      const pastEvents = activities.filter(
        (act) =>
          new Date().getTime() - new Date(act.date).getTime() > 0 &&
          act.userActivities.some((ua) => ua.appUserId === user!.id)
      );
      const isHost = activities.filter((act) =>
        act.userActivities.some((ua) => ua.appUserId === user!.id && ua.isHost)
      );

      checkPane(user!, panes.find((pane) => pane.tabname === "Activities")!);
      cy.wait("@loadUserActivities");
      cy.get("[data-cy=activities-panes]")
        .contains("Future Events")
        .should("have.class", "active");
      cy.get("[data-cy=activities-panes]").contains("Future Events").click();
      cy.get("[data-cy=activities-card]").should(
        "have.length",
        futureEvents.length
      );
      cy.get("[data-cy=activities-panes]").contains("Past Events").click();
      cy.get("[data-cy=activities-card]").should(
        "have.length",
        pastEvents.length
      );
      cy.get("[data-cy=activities-panes]").contains("Hosting").click();
      cy.get("[data-cy=activities-card]").should("have.length", isHost.length);

      //Test click on activity and routing here})})
    });
  });

  //CONTENT -- Followers
  it("should display the Followers Tab correctly", () => {
    cy.request<SeedData>(
      "GET",
      `${Cypress.env("apiUrl")}/seed/getSeedData/`
    ).then((response) => {
      const { users, followerFollowings } = response.body;
      const user = users.find((user) => user.userName === user1.displayname);
      const followers = getFollowers(followerFollowings, users, user!);

      checkPane(user!, panes.find((pane) => pane.tabname === "Followers")!);

      followers &&
        cy.get("[data-cy=profilecard]").should("have.length", followers.length);
      //check click and route to profile here})
    });
  });
  //CONTENT -- Following
  it("should display the Following Tab correctly", () => {
    // cy.changeLogin(user2.email, user2.password);
    // cy.get("[data-cy=profile-dropdown]").click();
    // cy.get("[data-cy=profile]").click();
    // cy.wait("@userProfile");
    cy.request<SeedData>(
      "GET",
      `${Cypress.env("apiUrl")}/seed/getSeedData/`
    ).then((response) => {
      const { users, followerFollowings } = response.body;
      const user = users.find((user) => user.userName === user1.displayname);
      const following = getFollowing(followerFollowings, users, user!);

      checkPane(user!, panes.find((pane) => pane.tabname === "Following")!);
      following &&
        cy.get("[data-cy=profilecard]").should("have.length", following.length);

      //test unfollow

      //test follow
      // const user = users.find((user) => user.username === "bob");})
    });
  });

  it("should display another users Profile: Followers/Following", () => {
    cy.request<SeedData>(
      "GET",
      `${Cypress.env("apiUrl")}/seed/getSeedData/`
    ).then((response) => {
      const { users, followerFollowings } = response.body;
      const user = users.find((user) => user.userName === user1.displayname);

      // Followers
      const followers = getFollowers(followerFollowings, users, user!);
      const following = getFollowing(followerFollowings, users, user!);
      if (followers) {
        let newProfile = followers[0];
        let newProfilefollowers = getFollowers(
          followerFollowings,
          users,
          user!
        );
        let newProfilefollowing = getFollowing(
          followerFollowings,
          users,
          user!
        );

        checkPane(user!, panes.find((pane) => pane.tabname === "Followers")!);

        cy.get("[data-cy=profilecard]")
          .should("have.length", followers.length)
          .contains(newProfile!.displayName)
          .click()
          .wait("@userProfile");

        if (newProfilefollowers) {
          //Followers --> Followers
          checkPane(
            newProfile!,
            panes.find((pane) => pane.tabname === "Followers")!
          );
          cy.get("[data-cy=profilecard]").should(
            "have.length",
            newProfilefollowers.length
          );
        }
        if (newProfilefollowing) {
          //Followers --> Following
          checkPane(
            newProfile!,
            panes.find((pane) => pane.tabname === "Following")!
          );
          cy.get("[data-cy=profilecard]").should(
            "have.length",
            newProfilefollowing.length
          );
        }
      }

      //Following
      cy.get("[data-cy=profile-dropdown]").click();
      cy.get("[data-cy=profile]").click();
      cy.wait("@userProfile");
      if (following) {
        let newProfile = following[0];
        let newProfilefollowing = getFollowing(
          followerFollowings,
          users,
          user!
        );
        let newProfilefollowers = getFollowers(
          followerFollowings,
          users,
          user!
        );

        checkPane(user!, panes.find((pane) => pane.tabname === "Following")!);

        cy.get("[data-cy=profilecard]")
          .should("have.length", following.length)
          .contains(newProfile!.displayName)
          .click()
          .wait("@userProfile");

        if (newProfilefollowers) {
          //Following --> Followers
          checkPane(
            newProfile!,
            panes.find((pane) => pane.tabname === "Followers")!
          );
          cy.get("[data-cy=profilecard]").should(
            "have.length",
            newProfilefollowers.length
          );
        }
        if (newProfilefollowing) {
          //Following --> Following
          checkPane(
            newProfile!,
            panes.find((pane) => pane.tabname === "Following")!
          );
          cy.get("[data-cy=profilecard]").should(
            "have.length",
            newProfilefollowing.length
          );
        }
      }
    });
  });
  it("should display another users Profile: About", () => {
    cy.request<SeedData>(
      "GET",
      `${Cypress.env("apiUrl")}/seed/getSeedData/`
    ).then((response) => {
      const { users } = response.body;
      const user = users!.find((user) => user.userName === user2.displayname); //this should respect upper/lowercase

      cy.visit(`/profiles/${user!.userName}`).wait("@userProfile");
      checkPane(user!, panes.find((pane) => pane.tabname === "About")!);
      cy.get("[data-cy=profileEditForm] div").each((el) => {
        cy.wrap(el).should("have.class", "disabled");
      });
      cy.get("[data-cy=editProfileBtn]").should("not.exist");
    });
  });
  it("should display another users Profile: Photos", () => {
    cy.request<SeedData>(
      "GET",
      `${Cypress.env("apiUrl")}/seed/getSeedData/`
    ).then((response) => {
      const { users } = response.body;
      const user = users!.find((user) => user.userName === user2.displayname); //this should respect upper/lowercase

      cy.visit(`/profiles/${user!.userName}`).wait("@userProfile");
      checkPane(user!, panes.find((pane) => pane.tabname === "Photos")!);
      cy.get("[data-cy=imagecard]")
        .should("have.length", user!.photos.length)
        .should("be.visible");
      cy.get("[data-cy=PhotoModal]").should("not.exist");
      cy.get("[data-cy=imagecard]").first().find("img").click();
      cy.get("[data-cy=PhotoModal]")
        .should("exist")
        .should("be.visible")
        .click();

      cy.get("[data-cy=addphoto-btn]").should("not.exist");
      cy.get("[data-cy=imagecard]").each((el) => {
        cy.wrap(el).find("button").should("not.exist");
      });
    });
  });
  it("should display another users Profile: Activities", () => {
    cy.request<SeedData>(
      "GET",
      `${Cypress.env("apiUrl")}/seed/getSeedData/`
    ).then((response) => {
      //all of this should be in in function because its the same code as for main user
      const { users, activities } = response.body;
      const user = users!.find((user) => user.userName === user2.displayname); //this should respect upper/lowercase

      cy.visit(`/profiles/${user!.userName}`).wait("@userProfile");

      const futureEvents = activities.filter(
        (act) =>
          new Date().getTime() - new Date(act.date).getTime() < 0 &&
          act.userActivities.some((ua) => ua.appUserId === user!.id)
      );

      const pastEvents = activities.filter(
        (act) =>
          new Date().getTime() - new Date(act.date).getTime() > 0 &&
          act.userActivities.some((ua) => ua.appUserId === user!.id)
      );
      const isHost = activities.filter((act) =>
        act.userActivities.some((ua) => ua.appUserId === user!.id && ua.isHost)
      );

      checkPane(user!, panes.find((pane) => pane.tabname === "Activities")!);
      cy.wait("@loadUserActivities");
      cy.get("[data-cy=activities-panes]")
        .contains("Future Events")
        .should("have.class", "active");

      cy.get("[data-cy=activities-panes]")
        .contains("Future Events")
        .click()
        .wait("@loadUserActivities");
      cy.get("[data-cy=activities-card]").should(
        "have.length",
        futureEvents.length
      );
      cy.get("[data-cy=activities-panes]")
        .contains("Past Events")
        .click()
        .wait("@loadUserActivities");
      cy.get("[data-cy=activities-card]").should(
        "have.length",
        pastEvents.length
      );
      cy.get("[data-cy=activities-panes]")
        .contains("Hosting")
        .click()
        .wait("@loadUserActivities");
      cy.get("[data-cy=activities-card]").should("have.length", isHost.length);
    });
  });
});
