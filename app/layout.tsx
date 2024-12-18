import type { Metadata } from "next";
import "./globals.css";
import { Inter, DM_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className}  antialiased`}>{children}</body>
    </html>
  );
}
