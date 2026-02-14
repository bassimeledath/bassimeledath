import type { Metadata } from "next";
import { Instrument_Sans, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Bassim Eledath",
  description: "AI Engineer — building with LLMs, machine learning, and web technologies.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans">
        <div className="mx-auto max-w-[1200px] px-6">
          <Header />
          <main className="min-h-[calc(100vh-200px)]">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
