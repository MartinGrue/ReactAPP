import { IActivity } from "../../models/IActivity";
import { IUser } from "../../models/user";

export const combineDateAndTime = (
  date: Date | undefined,
  time: Date | undefined
) => {
  const timeString = time!.getHours() + ":" + time!.getMinutes() + ":00";
  const year = date!.getFullYear();
  const month = date!.getMonth() + 1;
  const day = date!.getDate();
  const DateString = `${year}-${month}-${day}`;
  return new Date(DateString + " " + timeString);
};
export const transformateTimeZone = (activity: IActivity) => {
  const newDate = new Date(activity.date);
  newDate.setHours(activity.date.getHours() + 2);

  return { ...activity, date: newDate };
};
export const FillActivityProps = (activity: IActivity, user: IUser) => {
  activity.date = new Date(activity.date!);
  activity.isGoing = activity.userActivities.some(
    (x) => x.userName === user.userName
  );
  activity.isHost = activity.userActivities.some(
    (x) => x.userName === user.userName && x.isHost
  );
};
