import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html>
      <Head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <script
          id='gtag-init'
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
          page_path: window.location.pathname,
        });
      `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
