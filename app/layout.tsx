import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Carbinox Support — Find Your Fix",
  description: "Pick your watch model and issue for guided repair steps, or get connected to support.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body className="support-shell min-h-screen">
        <div className="bg-[var(--support-red)] px-3 py-2 text-center text-xs font-bold tracking-wide text-white">
          LIFETIME WARRANTY · BREAK IT, WE REPLACE IT — NO B.S.
        </div>
        {children}
      </body>
    </html>
  );
}
