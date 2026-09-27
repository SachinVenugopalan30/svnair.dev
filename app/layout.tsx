import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const description =
  "Portfolio of Sachin Nair, a data scientist and developer. Projects, work experience, and photography.";

export const metadata: Metadata = {
  metadataBase: new URL("https://svnair.dev"),
  title: "Sachin Nair | Developer & Photographer",
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
};

// Runs before first paint so a saved theme never flashes the wrong palette.
// No saved choice leaves data-theme unset, and the CSS follows the system setting.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={jetbrainsMono.variable}
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
