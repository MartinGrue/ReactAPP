export interface IProfile {
  displayName: string;
  bio: string;
  userName: string;
  image: string;
  photos: IPhoto[];
}
export interface IPhoto {
  id: string;
  url: string;
  isMain: boolean;
}
export interface IProfileFormValues {
  bio?: string;
  displayName: string;
}
