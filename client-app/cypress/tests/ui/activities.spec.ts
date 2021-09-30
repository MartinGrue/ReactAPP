//maps should work
//avatas loaded
//information should be correct
import promisify from "cypress-promise";
import { ActivityFromDB, SeedData } from "../../plugins";

type ActivitiesContext = {
  seedData?: SeedData;
  activitiesByDate?: [string, ActivityFromDB[]][];
};

describe("Have a working activity dashboard", () => {
  let ctx: ActivitiesContext = {};
  const user = {
    email: "bob@test.com",
    password: "Pa$$w0rd",
  };
  const getData = async () => {
    ctx.seedData = await cy.task<SeedData>("get:data").promisify();
    ctx.activitiesByDate = groupActivitiesByDate(ctx.seedData!.activities);
  };

  const formatDate = (date: string): string => {
    const year = new Date(date).getFullYear();
    const montdate = new Date(date);
    const month =
      montdate.getMonth() + 1 < 10
        ? "" + 0 + (montdate.getMonth() + 1)
        : montdate.getMonth() + 1;

    const day = new Date(date).getDate();
    return `${day}.${month}.${year}`;
  };
  const groupActivitiesByDate = (activities: ActivityFromDB[]) => {
    console.log(activities);
    const sorted = activities.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return Object.entries(
      sorted.reduce((acc, item) => {
        const key = formatDate(item.date);

        console.log(key);
        key in acc ? (acc[key] = [...acc[key], item]) : (acc[key] = [item]);
        return acc;
      }, {} as { [key: string]: ActivityFromDB[] })
    );
  };
  beforeEach(() => {
    cy.task("db:seed");
    getData();
    cy.login(user.email, user.password);

    cy.intercept("GET", "http://localhost:5000/api/activities**").as(
      "fetchmore"
    );
    cy.intercept("GET", "http://localhost:5000/api/activities/").as("initLoad");
  });
  it.only("should display the information correctly", () => {
    // const { activities, users } = ctx.seedData!;
    const { activitiesByDate } = ctx!;

    const text = activitiesByDate!.filter((group) => group[0] === "30.09.2021");
    console.log("text", text[0][0]);

    cy.get("[data-cy=groupByDateLabel]")
      .should("have.text", text[0][0])
      .get("[data-cy=activity-listitem]")
      .should("have.length", text[0][1].length)
      .each((item) => {
        cy.wrap(item).find("[data-cy=activity-header]").should("be.visible");
      });
  });
  it("should display the correct amount of activities for all filter", async () => {
    cy.get("[data-cy=activities-filter-all]").click();
    const { activities } = ctx.seedData!;
    for (
      let index = 1;
      index <= Math.round(activities.length / 2) - 1;
      index++
    ) {
      console.log(index);
      cy.scrollTo("bottom");
      await cy.wait("@fetchmore").promisify();
      cy.wait(500); //give react sometime to render
    }
    cy.scrollTo("bottom");
    cy.get("[data-cy=activity-listitem]").should(
      "have.length",
      activities.length
    );
  });
  it("should display the correct amount of activities for imgoing filter", async () => {
    const { activities, users } = ctx.seedData!;
    const user = users.find((user) => user.displayname === "Bob");
    const selection = activities.filter((act) =>
      act.useractivities.some((ua) => ua.appuserid === user!.id)
    );
    console.log("selection: ", selection);
    cy.get("[data-cy=activities-filter-imgoing]").click();

    for (let index = 1; index <= Math.round(selection.length / 2); index++) {
      console.log(index);
      cy.scrollTo("bottom");
      await cy.wait("@fetchmore").promisify();
      cy.wait(500); //give react sometime to render
    }
    cy.scrollTo("bottom");
    cy.get("[data-cy=activity-listitem]").should(
      "have.length",
      selection.length
    );
  });
  it("should display the correct amount of activities for imhosting filter", async () => {
    const { activities, users } = ctx.seedData!;
    const user = users.find((user) => user.displayname === "Bob");
    const selection = activities.filter((act) =>
      act.useractivities.some((ua) => ua.appuserid === user!.id && ua.ishost)
    );
    console.log("selection: ", selection);
    cy.get("[data-cy=activities-filter-ishost]").click();

    for (let index = 1; index <= Math.round(selection.length / 2); index++) {
      console.log(index);
      cy.scrollTo("bottom");
      await cy.wait("@fetchmore").promisify();
      cy.wait(500); //give react sometime to render
    }
    cy.scrollTo("bottom");
    cy.get("[data-cy=activity-listitem]").should(
      "have.length",
      selection.length
    );
  });
  it.only("should display the correct amount of activities for date filter", async () => {
    //make fresh seedData everyday
    //pick the date from the datepicker
    //check for activities
    const { activitiesByDate } = ctx!;
    const { activities } = ctx.seedData!;
    const date = formatDate(activities[3].date);

    const dateString = activitiesByDate!.filter((group) => group[0] === date);
    console.log("text", dateString[0][0]);

    // console.log("selection: ", selection);
    // cy.get("[data-cy=activities-filter-ishost]").click();

    // for (let index = 1; index <= Math.round(selection.length / 2); index++) {
    //   console.log(index);
    //   cy.scrollTo("bottom");
    //   await cy.wait("@fetchmore").promisify();
    //   cy.wait(500); //give react sometime to render
    // }
    // cy.scrollTo("bottom");
    // cy.get("[data-cy=activity-listitem]").should(
    //   "have.length",
    //   selection.length
    // );
  });
});
