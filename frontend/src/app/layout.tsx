import type { Metadata, Viewport } from "next";
import { Eczar } from "next/font/google";
import "./globals.css";
import { MusicProvider } from "@/components/music-context.client";
import { MusicPlayer } from "@/components/player/play.client";
import Script from "next/script";

const ecazar = Eczar({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ahaana Ravishankor",
    template: "%s | Ahaana Ravishankor",
  },
  description:
    "Hey there! I'm a college student on a musical adventure. Pop culture's grown on me but I don't stick to one genre. Its just me and my guitars against the world- unless you're down to join the ride. Welcome to my corner! :)",
  appleWebApp: {
    title: "Ahaana Portfolio",
  },
  openGraph: {
    siteName: "Ahaana Ravishankor",
    url: new URL(
      "/",
      process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",
    ),
  },
  alternates: {
    canonical: "./",
  },
  keywords: [
    "Ahaana",
    "Ravishankor",
    "Ahaana Ravishankor",
    "Ahaana Ravishankor Music",
    "Student Musician",
  ],
  metadataBase: new URL(
    "/",
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",
  ),
};

export const viewport: Viewport = {
  themeColor: "#5e503f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        src="https://analytics.arinji.com/script.js"
        data-website-id={process.env.ANALYTICS_ID}
        strategy="afterInteractive"
      />
      <body
        className={`${ecazar.className} tracking-wider antialiased bg-[url('/backdrop.png')] flex flex-col items-center justify-center bg-repeat w-full min-h-screen`}
        style={{ backgroundSize: "auto" }}
      >
        <MusicProvider>
          <div className="w-full min-h-screen max-w-pageMax">{children}</div>
          <MusicPlayer />
        </MusicProvider>
      </body>
    </html>
  );
}
