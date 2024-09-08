import type { Metadata } from "next";
import localFont from "next/font/local";
import "../app/globals.css";
import * as React from 'react';
import { AppProps } from 'next/app';

const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "GameRecommend AI",
  description: "Find game recommendations using the power of AI",
};

export default function RootLayout({ Component, pageProps}: AppProps) {
  return <Component {...pageProps} />
}

