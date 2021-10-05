import { ActivitiesContext, UserFromDB, userToLogin } from "../plugins";
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
      ? `People following ${user.displayname}`
      : pane.tabname === "Following"
      ? `People ${user.displayname} is following`
      : pane.header;
  cy.get("[data-cy=PaneContentHeader]").contains(header);
};
export const getFollowing = (ctx: ActivitiesContext, user: UserFromDB) => {
  const { followerfollowings, users } = ctx.seedData!;
  if (!followerfollowings.find((ff) => ff.useraid === user!.id))
    return undefined;
  const following = followerfollowings.filter(
    (item) => item.useraid === user!.id
  );
  return users.filter((user) =>
    following.map((ff) => ff.userbid).some((id) => id === user.id)
  );
};
export const getFollowers = (ctx: ActivitiesContext, user: UserFromDB) => {
  const { followerfollowings, users } = ctx.seedData!;
  if (!followerfollowings.find((ff) => ff.userbid === user!.id))
    return undefined;
  const followers = followerfollowings.filter(
    (item) => item.userbid === user!.id
  );
  return users.filter((user) =>
    followers.map((ff) => ff.useraid).some((id) => id === user.id)
  );
};
