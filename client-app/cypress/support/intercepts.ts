export type Alias =
  | "reseed"
  | "userLoad"
  | "userProfile"
  | "directCloudUpload"
  | "getSignature"
  | "postUploadResults"
  | "updateProfile"
  | "loadUserActivities"
  | "fetchMore"
  | "initLoad"
  | "createNewActivity"
  | "loginUser"
  | "activityDetails"
  | "editActivity"
  | "deleteActivity"
  | "joinActivity"
  | "unjoinActivity";
interface Interceptor {
  alias: Alias;
  url: string | RegExp;
  method: string;
}
const getInterceptors = (): Interceptor[] => {
  return [
    {
      alias: "reseed",
      url: `${Cypress.env("apiUrl")}/seed/reseed`,
      method: "GET",
    },

    {
      alias: "userLoad",
      url: `${Cypress.env("apiUrl")}/User`,
      method: "GET",
    },
    {
      alias: "userProfile",
      url: buildRegEx(/\/Profiles\/[a-z]*$/),
      method: "GET",
    },
    {
      alias: "directCloudUpload",
      url: "http://api.cloudinary.com/v1_1/dvzlb9xco/image/upload",
      method: "POST",
    },
    {
      alias: "getSignature",
      url: `${Cypress.env("apiUrl")}/Photos/getSignature`,
      method: "POST",
    },
    {
      alias: "updateProfile",
      url: `${Cypress.env("apiUrl")}/User`,
      method: "PUT",
    },
    {
      alias: "postUploadResults",
      url: `${Cypress.env("apiUrl")}/Photos/postUploadResults`,
      method: "POST",
    },
    {
      alias: "loadUserActivities",
      url: buildRegEx(/\/Profiles\/[a-zA-Z]+\//),
      method: "GET",
    },
    {
      alias: "fetchMore",
      url: `${Cypress.env("apiUrl")}/activities**`,
      method: "GET",
    },
    {
      alias: "initLoad",
      url: `${Cypress.env("apiUrl")}/activities/`,
      method: "GET",
    },
    {
      alias: "createNewActivity",
      url: `${Cypress.env("apiUrl")}/Activities`,
      method: "POST",
    },
    {
      alias: "loginUser",
      url: `${Cypress.env("apiUrl")}/User/login`,
      method: "POST",
    },
    {
      alias: "activityDetails",
      url: buildRegEx(
        /\/activities\/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/
      ),
      method: "GET",
    },
    {
      alias: "editActivity",
      url: buildRegEx(
        /\/activities\/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/
      ),
      method: "PUT",
    },
    {
      alias: "deleteActivity",
      url: buildRegEx(
        /\/activities\/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/
      ),
      method: "DELETE",
    },
    {
      alias: "joinActivity",
      url: buildRegEx(
        /\/activities\/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b\/attend/
      ),
      method: "POST",
    },
    {
      alias: "unjoinActivity",
      url: buildRegEx(
        /\/activities\/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b\/attend/
      ),
      method: "DELETE",
    },
  ];
};

const buildRegEx = (regex: RegExp) => {
  const base = `${Cypress.env("apiUrl")}`.replace(/\//g, "\\/");
  const pattern = base.concat(regex.source);
  return new RegExp(pattern);
};

export function getIntercepts(alias: Alias | Alias[]): void {
  const interceptors = getInterceptors();
  if (typeof alias === "string") {
    const i = interceptors.find((ic) => ic.alias === alias);
    i && cy.intercept(i.method, i.url).as(i.alias);
  }
  if (Array.isArray(alias)) {
    const iS = interceptors.filter((ic) => alias.some((a) => a === ic.alias));
    iS && iS.forEach((i) => cy.intercept(i.method, i.url).as(i.alias));
  }
}
