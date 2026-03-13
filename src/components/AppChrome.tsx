"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showChrome = pathname !== "/login" && pathname !== "/dashboard" && pathname !== "/create" && pathname !== "/settings";

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
