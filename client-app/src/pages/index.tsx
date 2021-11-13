import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(() => import("../app/layout/App"), {
  ssr: false,
});
const NextApp = () => {
  return <DynamicComponentWithNoSSR />;
};

export default NextApp;
