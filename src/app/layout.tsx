import type { Metadata } from "next";
import { Anton, IBM_Plex_Mono, Caveat } from "next/font/google";
import "./globals.css";
import NotebookBackground from "@/components/NotebookBackground";
import BindingStrip from "@/components/BindingStrip";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "reblobler — portfolio",
  description:
    "code, motion & machine-made pictures. the grid-paper portfolio of reblobler.",
};

const themeInit = `(function(){try{var s=localStorage.getItem("theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body
        className={`${anton.variable} ${plexMono.variable} ${caveat.variable} bg-paper font-mono text-ink antialiased`}
      >
        <NotebookBackground />
        <div id="top" className="relative flex min-h-svh flex-col">
          <BindingStrip />
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
