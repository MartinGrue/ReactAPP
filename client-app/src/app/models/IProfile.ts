export interface IProfile {
    displayName: string;
    bio:string;
    userName:string;
    image: string;
    photos: IPhoto[];
}
export interface IPhoto{
    dd:string;
    url:string;
    isMain:boolean;
}