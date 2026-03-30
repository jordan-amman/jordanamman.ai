import type { Metadata } from "next";
import { IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import "./globals.css";

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body"
});

const titleFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-title"
});

export const metadata: Metadata = {
  title: "Jordan Amman | AI Systems Engineer and Software Architect",
  description:
    "Portfolio and consulting site for AI systems engineering, AWS-first architecture, and production-minded software delivery."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${titleFont.variable}`}>
        <div className="site-chrome">
          <NavBar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
