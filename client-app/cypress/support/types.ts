export interface userToLogin {
  email: string;
  password: string;
  displayname: string;
}
export interface PhotoFromDB {
  id: string;
  url: string;
  isMain: boolean;
  appUserId: string;
}
export interface UserFromDB {
  id: string;
  displayName: string;
  userName: string;
  email: string;
  photos: PhotoFromDB[];
}
export interface UserActivityDB {
  appUserId: string;
  activityId: string;
  dateJoined: string;
  isHost: boolean;
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
  userActivities: UserActivityDB[];
}
export interface SeedData {
  activities: ActivityFromDB[];
  users: UserFromDB[];
  followerFollowings: FollowerFollowingsDB[];
}
export interface FollowerFollowingsDB {
  useraid: string;
  userbid: string;
}
export interface ActivitiesByDate {
  date: string;
  items: ActivityFromDB[];
}
