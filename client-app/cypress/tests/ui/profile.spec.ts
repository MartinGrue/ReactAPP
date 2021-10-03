//0.
//show FOLLOWERS/FOLLOWING correctly (in tabs and in header)--> make api calls to validate changes

import { should } from "chai";
import { SeedData, UserActivityDB, UserFromDB } from "../../plugins";

//1.
//enable photo upload --> and validate new photo persistance
//delete photo from cloudinary to keep storage clean
//cropper should work

//2.
//show other users profile
//disable photo upload
//image should not have setMain option
//should have follow/unfollow functionality  --> check with database records from 

type ProfilesContext = {
  seedData?: SeedData;
}; //this should come from a global thingy

const user1 = {
  email: "bob@test.com",
  password: "Pa$$w0rd",
  displayname: "bob",
};
const user2 = {
  email: "jane@test.com",
  password: "Pa$$w0rd",
  displayname: "jane",
};
const panes = [
  { tabname: "About", header: "About" },
  { tabname: "Photos", header: "Photos" },
  { tabname: "Activities", header: "Activities" },
  { tabname: "Followers", header: `People following Bob` },
  { tabname: "Following", header: `People Bob is following` }, // template from datastore here
];

const checkPane = (
  user: UserFromDB,
  pane: { tabname: string; header: string }
) => {
  cy.get("[data-cy=panes] a.item")
    .contains(pane.tabname)
    .should("be.visible")
    .click();
  const header =
    pane.tabname === "Followers"
      ? `People following ${user.displayname}`
      : pane.tabname === "Following"
      ? `People ${user.displayname} is following`
      : pane.header;
  cy.get("[data-cy=PaneContentHeader]").contains(header);
};

describe("Check the Profile functionality", () => {
  let ctx: ProfilesContext = {};
  const getFollowing = (user: UserFromDB) => {
    const { followerfollowings, users } = ctx.seedData!;
    const following = followerfollowings.filter(
      (item) => item.useraid === user!.id
    );
    return users.filter((user) =>
      following.map((ff) => ff.userbid).some((id) => id === user.id)
    );
  };
  const getFollowers = (user: UserFromDB) => {
    const { followerfollowings, users } = ctx.seedData!;
    const followers = followerfollowings.filter(
      (item) => item.userbid === user!.id
    );
    return users.filter((user) =>
      followers.map((ff) => ff.useraid).some((id) => id === user.id)
    );
  };
  const getData = async () => {
    ctx.seedData = await cy.task<SeedData>("get:data").promisify();
  }; //this should come from global thingy

  beforeEach(function () {
    cy.task("db:seed").then((res) => {
      console.log(res);
    });
    getData();
    cy.login(user1.email, user1.password);
    // cy.changeLogin(user2.email, user2.password);

    cy.intercept("PUT", "http://localhost:5000/api/User").as("updateProfile");
    // cy.intercept("GET", `http://localhost:5000/api/Profiles/**`).as(
    //   "userProfile"
    // );
    cy.intercept({
      method: "GET",
      url: /^http:\/\/localhost:5000\/api\/Profiles\/[a-z]*$/,
    }).as("userProfile");
    cy.intercept({
      method: "GET",
      url: /^http:\/\/localhost:5000\/api\/Profiles\/[a-zA-Z]+\//,
    }).as("loadUserActivities");

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
    const { users } = ctx.seedData!;
    const user = users.find((user) => user.username === "bob");
    const followers = getFollowers(user!);
    const followings = getFollowing(user!);
    cy.wait(500);
    cy.get("[data-cy=profileHeader-avatar]")
      .should("be.visible")
      .find("img")
      .should("have.attr", "src"); //to test if the image is displayed; make percy snapshot
    cy.get("[data-cy=profileHeader-name]").should("have.text", "Bob"); //call to datastore here
    cy.get("[data-cy=profileHeader-followers]")
      .should("be.visible")
      .find("div.value")
      .should("have.text", followers.length);
    cy.get("[data-cy=profileHeader-following]")
      .should("be.visible")
      .find("div.value")
      .should("have.text", followings!.length);

    //PANES
    cy.get("[data-cy=panes] a.item")
      .contains("About")
      .should("have.class", "active");
  });
  //CONTENT -- ABOUT
  it("should display the About Tab correctly", () => {
    const { users } = ctx.seedData!;
    const user = users.find((user) => user.username === "bob");
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
      .type("Bob");
    cy.get("[data-cy=submitEditProfile]").should("not.have.class").click();
    cy.wait("@updateProfile");
  });
  //CONTENT -- PHOTOS
  it("should display the Photos Tab correctly", () => {
    const { users } = ctx.seedData!;
    const user = users.find((user) => user.username === "bob");

    checkPane(user!, panes.find((pane) => pane.tabname === "Photos")!);

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
  //CONTENT -- ACTIVITIES
  it("should display the Activities Tab correctly", () => {
    const { users, activities } = ctx.seedData!;
    const user = users.find((user) => user.username === "bob");
    const futureEvents = activities.filter(
      (act) =>
        new Date().getTime() - new Date(act.date).getTime() < 0 &&
        act.useractivities.some((ua) => ua.appuserid === user!.id)
    );

    const pastEvents = activities.filter(
      (act) =>
        new Date().getTime() - new Date(act.date).getTime() > 0 &&
        act.useractivities.some((ua) => ua.appuserid === user!.id)
    );
    const isHost = activities.filter((act) =>
      act.useractivities.some((ua) => ua.appuserid === user!.id && ua.ishost)
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

    //Test click on activity and routing here
  });

  //CONTENT -- Followers
  it("should display the Followers Tab correctly", () => {
    const { users } = ctx.seedData!;
    const user = users.find((user) => user.username === "bob");
    const followers = getFollowers(user!);

    checkPane(user!, panes.find((pane) => pane.tabname === "Followers")!);

    cy.get("[data-cy=profilecard]").should("have.length", followers.length);
    //check click and route to profile here
  });
  //CONTENT -- Following
  it("should display the Following Tab correctly", () => {
    // cy.changeLogin(user2.email, user2.password);
    // cy.get("[data-cy=profile-dropdown]").click();
    // cy.get("[data-cy=profile]").click();
    // cy.wait("@userProfile");

    const { users } = ctx.seedData!;
    const user = users.find((user) => user.username === user1.displayname);
    const following = getFollowing(user!);

    checkPane(user!, panes.find((pane) => pane.tabname === "Following")!);

    cy.get("[data-cy=profilecard]").should("have.length", following.length);

    //test unfollow

    //test follow
    // const user = users.find((user) => user.username === "bob");
  });
  it.only("should be able to upload an image directly to cloudinary", () => {
    const { users } = ctx.seedData!;
    const user = users.find((user) => user.username === user1.displayname);
    checkPane(user!, panes.find((pane) => pane.tabname === "Photos")!);

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
  it("should display another users Profile: Followers/Following", () => {
    const { users } = ctx.seedData!;
    const user = users.find((user) => user.username === user1.displayname);

    // Followers
    const followers = getFollowers(user!);
    const following = getFollowing(user!);

    let newProfile = followers[0];
    console.log("newporofle", newProfile);
    let newProfilefollowers = getFollowers(newProfile!);
    let newProfilefollowing = getFollowing(newProfile!);
    checkPane(user!, panes.find((pane) => pane.tabname === "Followers")!);

    cy.get("[data-cy=profilecard]")
      .should("have.length", followers.length)
      .contains(newProfile!.displayname)
      .click()
      .wait("@userProfile");

    //Followers --> Followers
    checkPane(newProfile!, panes.find((pane) => pane.tabname === "Followers")!);
    cy.get("[data-cy=profilecard]").should(
      "have.length",
      newProfilefollowers.length
    );
    //Followers --> Following
    checkPane(newProfile!, panes.find((pane) => pane.tabname === "Following")!);
    cy.get("[data-cy=profilecard]").should(
      "have.length",
      newProfilefollowing.length
    );

    //Following
    cy.get("[data-cy=profile-dropdown]").click();
    cy.get("[data-cy=profile]").click();
    cy.wait("@userProfile");
    newProfile = following[0];
    newProfilefollowing = getFollowing(newProfile!);
    newProfilefollowers = getFollowers(newProfile!);

    checkPane(user!, panes.find((pane) => pane.tabname === "Following")!);

    cy.get("[data-cy=profilecard]")
      .should("have.length", following.length)
      .contains(newProfile!.displayname)
      .click()
      .wait("@userProfile");

    //Following --> Followers
    checkPane(newProfile!, panes.find((pane) => pane.tabname === "Followers")!);
    cy.get("[data-cy=profilecard]").should(
      "have.length",
      newProfilefollowers.length
    );
    //Following --> Following
    checkPane(newProfile!, panes.find((pane) => pane.tabname === "Following")!);
    cy.get("[data-cy=profilecard]").should(
      "have.length",
      newProfilefollowing.length
    );
  });
  it("should display another users Profile: About", () => {
    const { users } = ctx.seedData!;
    const user = users!.find((user) => user.username === user2.displayname); //this should respect upper/lowercase

    cy.visit(`http://localhost:3000/profiles/${user!.username}`).wait(
      "@userProfile"
    );
    checkPane(user!, panes.find((pane) => pane.tabname === "About")!);
    cy.get("[data-cy=profileEditForm] div").each((el) => {
      cy.wrap(el).should("have.class", "disabled");
    });
    cy.get("[data-cy=editProfileBtn]").should("not.exist");
  });
  it("should display another users Profile: About", () => {
    const { users } = ctx.seedData!;
    const user = users!.find((user) => user.username === user2.displayname); //this should respect upper/lowercase

    cy.visit(`http://localhost:3000/profiles/${user!.username}`).wait(
      "@userProfile"
    );
    checkPane(user!, panes.find((pane) => pane.tabname === "Photos")!);
    cy.get("[data-cy=imagecard]")
      .should("have.length", user!.photos.length)
      .should("be.visible");
    cy.get("[data-cy=PhotoModal]").should("not.exist");
    cy.get("[data-cy=imagecard]").first().find("img").click();
    cy.get("[data-cy=PhotoModal]").should("exist").should("be.visible").click();

    cy.get("[data-cy=addphoto-btn]").should("not.exist");
    cy.get("[data-cy=imagecard]").each((el) => {
      cy.wrap(el).find("button").should("not.exist");
    });
  });
  it("should display another users Profile: About", () => {
    //all of this should be in in function because its the same code as for main user
    const { users, activities } = ctx.seedData!;
    const user = users!.find((user) => user.username === user2.displayname); //this should respect upper/lowercase

    cy.visit(`http://localhost:3000/profiles/${user!.username}`).wait(
      "@userProfile"
    );

    const futureEvents = activities.filter(
      (act) =>
        new Date().getTime() - new Date(act.date).getTime() < 0 &&
        act.useractivities.some((ua) => ua.appuserid === user!.id)
    );

    const pastEvents = activities.filter(
      (act) =>
        new Date().getTime() - new Date(act.date).getTime() > 0 &&
        act.useractivities.some((ua) => ua.appuserid === user!.id)
    );
    const isHost = activities.filter((act) =>
      act.useractivities.some((ua) => ua.appuserid === user!.id && ua.ishost)
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
