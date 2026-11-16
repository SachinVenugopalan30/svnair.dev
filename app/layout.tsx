import type { Metadata } from "next";
import { Work_Sans, Young_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-work-sans",
  display: "swap",
});

const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-young-serif",
  display: "swap",
});

const description =
  "Sachin Nair: data scientist, learner, gamer, Leetcode hater and hobby photographer. Projects, experience and photographs.";

export const metadata: Metadata = {
  metadataBase: new URL("https://svnair.dev"),
  title: "Sachin Nair",
  description,
  openGraph: {
    title: "Sachin Nair",
    description,
    url: "https://svnair.dev",
    siteName: "Sachin Nair",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sachin Nair",
    description,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

// Runs before first paint so a saved dark theme never flashes light.
// Light is the default whatever the system says; only a saved "dark" changes it.
const themeScript = `try{if(localStorage.getItem("theme")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${youngSerif.variable}`}
      // Tells Next our CSS sets smooth scrolling, so it can turn it off for route changes.
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      {/* Reading extensions (bionic-reading style) add attributes to <body>
          before React hydrates. This silences only <body>'s own attributes. */}
      <body suppressHydrationWarning>
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
