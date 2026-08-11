import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Carbinox Support — Find Your Fix",
  description: "Interactive troubleshooting guide for Carbinox smartwatches.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body style={{ margin: 0, height: "100%", overflow: "hidden", background: "#0a0a0a" }}>{children}</body>
    </html>
  );
}
