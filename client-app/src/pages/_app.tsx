import "../app/layout/styles.css";
import { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};
export default MyApp;
