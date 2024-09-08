import type { Metadata } from "next";
import "../app/globals.css";
import * as React from 'react';
import { AppProps } from 'next/app';

export const metadata: Metadata = {
  title: "GameRecommend AI",
  description: "Find game recommendations using the power of AI",
};

export default function RootLayout({ Component, pageProps}: AppProps) {
  return <Component {...pageProps} />
}

