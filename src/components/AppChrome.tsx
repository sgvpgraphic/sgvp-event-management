"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showChrome =
    pathname !== "/login" &&
    pathname !== "/dashboard" &&
    pathname !== "/create" &&
    pathname !== "/settings" &&
    pathname !== "/event-details" &&
    pathname !== "/schedule" &&
    pathname !== "/participants" &&
    pathname !== "/media" &&
    pathname !== "/data" &&
    pathname !== "/notes";

  return (
    <>
      {showChrome && <Navbar />}
      <main className={`flex-grow ${showChrome ? "pt-16" : ""}`}>
        {children}
      </main>
      {showChrome && <Footer />}
    </>
  );
}
