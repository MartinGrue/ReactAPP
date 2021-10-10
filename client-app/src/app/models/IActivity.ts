export interface IUserActivity {
  id: string;
  title: string;
  category: string;
  date: Date;
}
export interface IActivityEnvelope {
  activities: IActivity[];
  activityCount: number;
}
export interface IActivity {
  // Id: number;
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date;
  // date: string
  city: string;
  longitute: number;
  latitute: number;
  venue: string;
  userActivities: IAttendee[];
  comments: IComment[];
  //Props from user
  isGoing: boolean;
  isHost: boolean;
}
export interface IAttendee {
  userName: string;
  displayName: string;
  image: string | null;
  isHost: boolean;
  following?: boolean;
}
export interface IComment {
  activityId: string;
  body: string;
  userName: string;
  displayName: string;
  image: string;
  createdAt: string;
}
export interface ICommentSend {
  activityId?: string;
  body: string;
}
export interface IActivityFormValues extends Partial<IActivity> {
  time?: Date;
}
export class ActivityFormValues implements IActivityFormValues {
  id: string = "";
  title: string = "";
  description: string = "";
  category: string = "";
  date?: Date = undefined;
  // date: string
  time?: Date = undefined;
  city: string = "";
  venue: string = "";
  constructor(init?: IActivityFormValues) {
    if (init && init.date) {
      this.time = init.date;
    }
    Object.assign(this, init);
  }
}
export interface PhotoUploadResult {
  PublicId: string;
  Url: string;
}
