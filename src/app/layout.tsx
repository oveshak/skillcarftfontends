// ./src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Script from "next/script";


import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";

// ⛳️ Client component: ensure this file has "use client" at top
// of ../visual-edits/VisualEditsMessenger.tsx


export const metadata: Metadata = {
  title: "Skill Ctaft ",
  description: "A Next.js 15 app with optimized layout and route messenger.",
  applicationName: "YourApp",
  metadataBase: new URL("https://your-domain.example"),
  openGraph: {
    title: "YourApp — Fast & Modern",
    description: "A Next.js 15 app with optimized layout and route messenger.",
    url: "https://your-domain.example",
    siteName: "YourApp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YourApp — Fast & Modern",
    description: "A Next.js 15 app with optimized layout and route messenger.",
  },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href=""
          crossOrigin=""
        />
      </head>
      <body className="antialiased min-h-dvh flex flex-col">
        <Navigation />

        <main className="flex-1">{children}</main>

        <Footer />

        {/* Route messenger script */}
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug={process.env.NODE_ENV !== "production" ? "true" : "false"}
          data-custom-data={JSON.stringify({
            appName: "YourApp",
            version: "1.0.0",
            greeting: "hi",
          })}
        />

        {/* Client component safely rendered inside Suspense */}
      
      </body>
    </html>
  );
}
