import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coupld — Your last first date starts here.",
  description:
    "Coupld is an AI-powered ethical dating app with deep psychological matching, an in-app Cupid, and a business model that stops billing when you find someone. Launching in the UK, Australia and the US.",
  openGraph: {
    title: "Coupld — Your last first date starts here.",
    description: "The app built for after. Deep matching, AI coaching, and billing that stops when you find someone.",
    url: "https://coupld.com",
    siteName: "Coupld",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
