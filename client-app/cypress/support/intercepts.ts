type Unknown = string | string[];
interface Interceptor {
  alias: string;
  url: string | RegExp;
  method: string;
}
const getInterceptors = (): Interceptor[] => {
  return [
    {
      alias: "userLoad",
      url: `${Cypress.env("apiUrl")}/User`,
      method: "GET",
    },
    {
      alias: "activityDetails",
      url: `${Cypress.env("apiUrl")}/activities/**`,
      method: "GET",
    },
  ];
};
const buildRegEx = () => {
  const regex = "~!@#$%^&*()_";
  const base = `${Cypress.env("apiUrl")}`.replace("/", "\\/");
  const pattern = `[^${regex}/gi]$`;
  const result = data.replace(new RegExp(pattern, "g"), "");
};

export function getIntercepts<T>(alias: T): void;
export function getIntercepts(alias: Unknown): void {
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
