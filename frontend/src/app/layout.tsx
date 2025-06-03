import type { Metadata } from "next";
import { Eczar } from "next/font/google";
import "./globals.css";
import { MusicProvider } from "@/components/music-context.client";

const ecazar = Eczar({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahaana Portfolio",
  description: "A look into my music journey and all of my work :D",
  appleWebApp: {
    title: "Ahaana Portfolio",
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
        className={`${ecazar.className} tracking-wider antialiased bg-[url('/backdrop.png')] flex flex-col items-center justify-center bg-repeat w-full min-h-screen`}
        style={{ backgroundSize: "auto" }}
      >
        <MusicProvider>
          <div className="w-full min-h-screen max-w-pageMax">{children}</div>
        </MusicProvider>
      </body>
    </html>
  );
}
