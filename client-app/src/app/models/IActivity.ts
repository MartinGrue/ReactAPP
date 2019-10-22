export interface IActivity {
  // Id: number;
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date | null;
  // date: string
  city: string;
  venue: string;
}
