import createEmotionServer from "@emotion/server/create-instance";
import createEmotionCache from "configs/create-emotion-chache";
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import * as React from "react";

interface MyDocumentProps extends DocumentInitialProps {
  locale: string;
}

export default class MyDocument extends Document<MyDocumentProps> {
  render() {
    const locale = this.props.locale || "en";

    return (
      <Html lang={locale}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="author" content="Renan Garcia" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/images/icons/icon-192x192.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..600&family=Inter:wght@400;500;600&display=swap"
            rel="stylesheet"
          />
          <noscript>
            {/* Ensure reveal-on-scroll content is visible without JavaScript */}
            <style>{`.reveal{opacity:1 !important;transform:none !important;}`}</style>
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (
  ctx: DocumentContext
): Promise<MyDocumentProps> => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);

  // Prevents emotion from rendering invalid HTML.
  // https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    locale: ctx.locale || "en",
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...emotionStyleTags,
    ],
  };
};
