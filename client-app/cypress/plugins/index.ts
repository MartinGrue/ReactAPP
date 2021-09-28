import axios from "axios";

const plugins = (on: any, config: any) => {
  const testDataApiEndpoint = `${config.env.apiUrl}/seed`;

  on("task", {
    async "db:seed"() {
      // seed database with test data
      try {
        const { data } = await axios.get(`${testDataApiEndpoint}/reseed`);
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  });
};
export default plugins;
