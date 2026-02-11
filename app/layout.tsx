import type { Metadata } from "next";
import { IBM_Plex_Serif, Outfit, JetBrains_Mono } from "next/font/google";
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
  title: "Sachin — Developer & Photographer",
  description:
    "Personal portfolio of Sachin Nair — developer, data scientist, and photographer.",
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
    >
      <head>
        {process.env.NEXT_PUBLIC_UMAMI_API_URL &&
          process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
            <script
              defer
              src={`${process.env.NEXT_PUBLIC_UMAMI_API_URL}/script.js`}
              data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            />
          )}
      </head>
      <body>{children}</body>
    </html>
  );
}
