import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Plus_Jakarta_Sans,
  Roboto_Mono,
} from "next/font/google";
import "./globals.css";
import Navbar from "./component/navbar";

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
  title: "Rafi Rahmanda | Portfolio",
  description: "Senior Fullstack Web Developer Portfolio",
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
