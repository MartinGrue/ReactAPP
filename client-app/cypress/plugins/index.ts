import axios from "axios";

export default (on: any, config: any) => {
  const testDataApiEndpoint = `${config.env.apiUrl}/seed`;

  on("task", {
    async "db:seed"() {
      // seed database with test data
      const purgeResults = await axios.get(`${testDataApiEndpoint}/reseed`);
      console.log(purgeResults);
      return {};
    },
  });
};
