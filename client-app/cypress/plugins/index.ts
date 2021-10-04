import axios, { AxiosResponse } from "axios";
import { resolve } from "cypress/types/bluebird";
import data from "/run/media/data/ReactApp/data/Database.json";
interface PhotoFromDB {
  id: string;
  url: string;
  ismain: boolean;
  appuserid: string;
}
export interface UserFromDB {
  id: string;
  displayname: string;
  username: string;
  email: string;
  photos: PhotoFromDB[];
}
export interface UserActivityDB {
  appuserid: string;
  activityid: string;
  datejoined: string;
  ishost: boolean;
}
export interface ActivityFromDB {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  city: string;
  longitute: number;
  latitute: number;
  venue: string;
  useractivities: UserActivityDB[];
}
export interface SeedData {
  activities: ActivityFromDB[];
  users: UserFromDB[];
  followerfollowings: FollowerFollowingsDB[];
}
export interface FollowerFollowingsDB {
  useraid: string;
  userbid: string;
}
export interface ActivitiesByDate {
  date: string;
  items: ActivityFromDB[];
}
export type ActivitiesContext = {
  seedData?: SeedData;
  activitiesByDate?: ActivitiesByDate[];
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

export const getData = async (ctx: ActivitiesContext) => {
  ctx.seedData = await cy.task<SeedData>("get:data").promisify();
  ctx.activitiesByDate = groupActivitiesByDate(ctx.seedData!.activities);
};

const plugins = (on: any, config: any) => {
  const testDataApiEndpoint = `${config.env.apiUrl}/seed`;

  on("task", {
    "get:data"() {
      var lowercase = JSON.stringify(data).replace(
        /"([\w]+)":/g,
        function ($0, $1) {
          return '"' + $1.toLowerCase() + '":';
        }
      );
      const { activities, users, followerfollowings } = JSON.parse(lowercase);
      return { activities, users, followerfollowings };
    },
    "db:seed"() {
      axios
        .get(`${testDataApiEndpoint}/reseed`)
        .then((response: AxiosResponse) => {
          response.status !== 200 &&
            console.log("Error from api reseed: ", response.status);
        });
      return null;
    },
  });
  return config;
};
export default plugins;
