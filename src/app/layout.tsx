import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppChrome from "@/components/AppChrome";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eventify - Discover & Book Events",
  description: "Find the best events happening around you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-white text-gray-900`}>
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
