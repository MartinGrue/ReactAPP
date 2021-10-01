//maps should work
//avatas loaded
//information should be correct
import promisify from "cypress-promise";
import { ActivityFromDB, SeedData } from "../../plugins";

type ActivitiesContext = {
  seedData?: SeedData;
  activitiesByDate?: [{ date: string; items: ActivityFromDB[] }];
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

describe("Have a working activity dashboard", () => {
  let ctx: ActivitiesContext = {};
  const getData = async () => {
    ctx.seedData = await cy.task<SeedData>("get:data").promisify();
    ctx.activitiesByDate = groupActivitiesByDate(ctx.seedData!.activities);
  };

  const user = {
    email: "bob@test.com",
    password: "Pa$$w0rd",
  };

  const groupActivitiesByDate = (activities: ActivityFromDB[]) => {
    const sorted = activities.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return sorted.reduce((acc, item) => {
      const key = formatDate(item.date);
      const found = acc.findIndex((el) => el.date === key);
      found !== -1
        ? acc[found].items.push(item)
        : acc.push({ date: key, items: [item] });
      return acc;
    }, [] as unknown as [{ date: string; items: ActivityFromDB[] }]);
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

  it("should display the correct amount of activities for all filter on page load", async () => {
    cy.get("[data-cy=activities-filter-all]").click();
    const { activities } = ctx.seedData!;
    for (
      let index = 1;
      index <= Math.round(activities.length / 2) - 1;
      index++
    ) {
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
  const checkActivityGroup = (activity: {
    date: string;
    items: ActivityFromDB[];
  }) => {
    const { activitiesByDate } = ctx!;
    const group = activitiesByDate!.find((el) => el.date === activity.date);
    cy.get("[data-cy=groupByDateLabel]")
      .should("have.text", group?.date)
      .get("[data-cy=activity-listitem]")
      .should("have.length", group?.items.length)
      .each((item) => {
        cy.wrap(item).find("[data-cy=activity-header]").should("be.visible");
      });
  };

  it.only("The latest activity should be displayed on top", () => {
    const { activitiesByDate } = ctx!;
    const sample = activitiesByDate![0];
    checkActivityGroup(sample);
  });

  it("should display the correct amount of activities for imgoing filter", async () => {
    const { activities, users } = ctx.seedData!;
    const user = users.find((user) => user.displayname === "Bob");
    const selection = activities.filter((act) =>
      act.useractivities.some((ua) => ua.appuserid === user!.id)
    );
    cy.get("[data-cy=activities-filter-imgoing]").click();

    for (let index = 1; index <= Math.round(selection.length / 2); index++) {
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
    cy.get("[data-cy=activities-filter-ishost]").click();

    for (let index = 1; index <= Math.round(selection.length / 2); index++) {
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

  //TODO
  // it("should display the correct amount of activities for date filter", async () => {
  //make fresh seedData everyday
  //pick the date from the datepicker
  //check for activities
  // });
});
