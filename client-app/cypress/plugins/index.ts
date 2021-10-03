import axios from "axios";
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
      // const lowercaseData = JSON.parse(lowercase);
      // const activities = lowercaseData.activities;
      // const users = lowercaseData.users;
      // const followerFollowings = lowercaseData.followerfollowings;

      return { activities, users, followerfollowings };
    },
  });
  on("task", {
    async "db:seed"() {
      // seed database with test data
      try {
        const { data } = await axios.get(`${testDataApiEndpoint}/reseed`);
        console.log(data)
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  });
};
export default plugins;
