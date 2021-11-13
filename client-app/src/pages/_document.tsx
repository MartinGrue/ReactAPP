// third-party
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return { ...(await Document.getInitialProps(ctx)) };
  }

  render() {
    // noinspection HtmlRequiredTitleElement
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHYvacLxG7odfjovNDb1GpTHon3BMIXlw&libraries=places"></script> */}
          {/* fonts */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700,700i"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
