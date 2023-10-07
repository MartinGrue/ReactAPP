import { defineConfig } from "cypress";
export default defineConfig({
  viewportHeight: 800,
  viewportWidth: 1920,
  retries: {
    runMode: 2,
    openMode: 1,
  },
  video: false,
  env: {
    apiUrl: "http://127.0.0.1:5000/api",
    chatUrl: "http://127.0.0.1:5000/chat",
    mobileViewportWidthBreakpoint: 414,
    coverage: false,
  },
  e2e: {
    setupNodeEvents(on, config) {},

    baseUrl: "http://localhost:3000/",
    specPattern: "cypress/tests/**/**.cy.{js,jsx,ts,tsx}",
  },
});
