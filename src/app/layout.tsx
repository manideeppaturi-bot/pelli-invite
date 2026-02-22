import type { Metadata } from "next";
import { Cormorant_Upright, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Upright({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  title: "Manideep & Supriya's Wedding Invitation",
  description: "Join us in celebrating the wedding of Manideep and Supriya on May 3rd, 2026.",
  openGraph: {
    title: "Manideep & Supriya's Wedding Invitation",
    description: "Join us in celebrating our big day! Click to view the invitation and RSVP.",
    url: "/",
    siteName: "Manideep & Supriya's Wedding",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${manrope.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

