import axios from "axios";
import data from "/run/media/data/ReactApp/data/database.json";

interface PhotoFromDB {
  id: string;
  url: string;
  ismain: boolean;
  appuserid: string;
}
interface UserFromDB {
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
}
const seedData = JSON.stringify(data);
var lowercase = seedData.replace(/"([\w]+)":/g, function ($0, $1) {
  return '"' + $1.toLowerCase() + '":';
});
const lowercaseData = JSON.parse(lowercase);

const plugins = (on: any, config: any) => {
  const testDataApiEndpoint = `${config.env.apiUrl}/seed`;

  on("task", {
    "get:data"() {
      const activities = lowercaseData.activities;
      const users = lowercaseData.users;
      return { activities, users };
    },
  });
  on("task", {
    async "db:seed"() {
      // seed database with test data
      try {
        const { data } = await axios.get(`${testDataApiEndpoint}/reseed`);
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  });
};
export default plugins;
