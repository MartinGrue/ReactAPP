export interface IActivity {
  // Id: number;
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date;
  // date: string
  city: string;
  venue: string;
}
export interface IActivityFormValues extends Partial<IActivity>{
time?:Date
}
