import Head from "next/head";
import { Metadata } from "next";
import "./globals.css";

export const metadata = {
  title: "Dino",
  description: "Dino ist ein Bestellsystem für Speisen und Getränke",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <Head>
        <title>Dino</title>
        <meta property="og:title" content="Dino" key="title" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
