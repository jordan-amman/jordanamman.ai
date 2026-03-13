import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jordan Amman | AI Systems Architect",
  description:
    "AI systems portfolio featuring RAG, agents, LLM evaluation, and AWS reference architectures."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
