import { Head, Html, Main, NextScript } from "next/document"
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core"

export default function Document() {
  return (
    <Html lang="en" {...mantineHtmlProps}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
        <ColorSchemeScript defaultColorScheme="auto" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
