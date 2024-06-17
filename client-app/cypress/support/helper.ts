import axios from "axios";
import {
  ActivityFromDB,
  ActivitiesByDate,
  userToLogin,
  UserFromDB,
  FollowerFollowingsDB,
} from "./types";

export const groupActivitiesByDate = (activities: ActivityFromDB[]) => {
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
  }, [] as unknown as [ActivitiesByDate]);
};

export const formatDate = (date: string): string => {
  const year = new Date(date).getFullYear();
  const montdate = new Date(date);
  const month =
    montdate.getMonth() + 1 < 10
      ? "" + 0 + (montdate.getMonth() + 1)
      : montdate.getMonth() + 1;

  const day = new Date(date).getDate();
  return `${day}.${month}.${year}`;
};

export const getPanes = (user: userToLogin) => {
  return [
    { tabname: "About", header: "About" },
    { tabname: "Photos", header: "Photos" },
    { tabname: "Activities", header: "Activities" },
    {
      tabname: "Followers",
      header: `People following ${user.displayname.toUpperCase()}`,
    },
    {
      tabname: "Following",
      header: `People ${user.displayname.toUpperCase()} is following`,
    }, // template from datastore here
  ];
};
export const checkPane = (
  user: UserFromDB,
  pane: { tabname: string; header: string }
) => {
  cy.get("[data-cy=panes] a.item")
    .contains(pane.tabname)
    .should("be.visible")
    .click();
  const header =
    pane.tabname === "Followers"
      ? `People following ${user.displayName}`
      : pane.tabname === "Following"
      ? `People ${user.displayName} is following`
      : pane.header;
  cy.get("[data-cy=PaneContentHeader]").contains(header);
};

export const getFollowing = (
  followerfollowings: FollowerFollowingsDB[],
  users: UserFromDB[],
  user: UserFromDB
) => {
  if (!followerfollowings.find((ff) => ff.useraid === user!.id))
    return undefined;
  const following = followerfollowings.filter(
    (item) => item.useraid === user!.id
  );
  return users.filter((user) =>
    following.map((ff) => ff.userbid).some((id) => id === user.id)
  );
};
export const getFollowers = (
  followerfollowings: FollowerFollowingsDB[],
  users: UserFromDB[],
  user: UserFromDB
) => {
  if (!followerfollowings.find((ff) => ff.userbid === user!.id))
    return undefined;
  const followers = followerfollowings.filter(
    (item) => item.userbid === user!.id
  );
  return users.filter((user) =>
    followers.map((ff) => ff.useraid).some((id) => id === user.id)
  );
};

export const dbSeed = () => {
  return axios
    .get(`${Cypress.env("apiUrl")}/seed/reseed/`)
    .then((response) => {
      response.status !== 200 &&
        console.log("Error from api reseed: ", response.status);
      return response;
    });
};
