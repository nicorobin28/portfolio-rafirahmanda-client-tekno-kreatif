import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Plus_Jakarta_Sans,
  Roboto_Mono,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const PlustJakarta = Plus_Jakarta_Sans({
  variable: "--plus-jakarta",
  subsets: ["latin"],
});

const RobotoMono = Roboto_Mono({
  variable: "--roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Rafi Rahmanda | Senior UI/UX Designer & Fullstack Developer",
    template: "%s | Rafi Rahmanda"
  },
  description: "Portfolio of Rafi Rahmanda, a Senior UI/UX Designer and Fullstack Web Developer based in Phnom Penh, Cambodia. Specializing in scalable digital products and design systems.",
  keywords: ["UI/UX Designer", "Fullstack Developer", "Rafi Rahmanda", "Portfolio", "Web Development", "Design Systems"],
  authors: [{ name: "Rafi Rahmanda" }],
  creator: "Rafi Rahmanda",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rafirahmanda.com",
    siteName: "Rafi Rahmanda Portfolio",
    title: "Rafi Rahmanda | Senior UI/UX Designer & Fullstack Developer",
    description: "I design complex digital products, from scalable design systems to end-to-end user journeys.",
    images: [
      {
        url: "/assets/profil.png",
        width: 800,
        height: 800,
        alt: "Rafi Rahmanda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rafi Rahmanda | Senior UI/UX Designer & Fullstack Developer",
    description: "I design complex digital products, from scalable design systems to end-to-end user journeys.",
    images: ["/assets/profil.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${PlustJakarta.variable} ${RobotoMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* <NavbarProductDetail /> */}
        {/* <Card /> */}
        {children}
      </body>
    </html>
  );
}
