import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-gray-200 text-gray-700">
        <Main></Main>
        <NextScript></NextScript>
      </body>
    </Html>
  );
}
