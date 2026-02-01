import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "THE DERF BOYS | Content Creators",
  description: "The Derf Boys - We Do Everything Really Fun. Follow our journey across TikTok, YouTube, and Instagram.",
  keywords: ["Derf Boys", "content creators", "TikTok", "YouTube", "Instagram", "comedy", "entertainment"],
  openGraph: {
    title: "THE DERF BOYS",
    description: "We Do Everything Really Fun",
    type: "website",
    url: "https://derfboys.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "THE DERF BOYS",
    description: "We Do Everything Really Fun",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Quantico:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
