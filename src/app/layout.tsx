import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
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
        className={`${playfair.variable} ${lato.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
