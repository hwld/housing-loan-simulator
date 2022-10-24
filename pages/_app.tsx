import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactNode } from "react";
import "../styles/globals.css";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => JSX.Element;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component?.getLayout || ((page) => <>{page}</>);
  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
