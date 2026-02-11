import type { Metadata } from "next";
import { IBM_Plex_Serif, Outfit, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const ibmPlexSerif = IBM_Plex_Serif({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://svnair.dev"),
  title: "Sachin Nair — Developer & Photographer",
  description:
    "Personal portfolio of Sachin Nair — developer, data scientist, and photographer.",
  openGraph: {
    title: "Sachin Nair",
    description:
      "Developer · Data Scientist · Photographer — Building beautiful, functional experiences.",
    url: "https://svnair.dev",
    siteName: "Sachin Nair",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sachin Nair",
    description:
      "Developer · Data Scientist · Photographer — Building beautiful, functional experiences.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSerif.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head />
      <body>
        {children}
        {process.env.NEXT_PUBLIC_UMAMI_API_URL &&
        process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ? (
          <Script
            src={`${process.env.NEXT_PUBLIC_UMAMI_API_URL}/script.js`}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
