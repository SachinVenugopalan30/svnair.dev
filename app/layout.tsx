import type { Metadata } from "next";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
