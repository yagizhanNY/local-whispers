import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Providers from "../redux/provider";
import { NextAuthProvider } from "./auth/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Local Whispers",
  description: "Share your toughts with your frineds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Providers>
          <NextAuthProvider>{children}</NextAuthProvider>
        </Providers>
      </body>
    </html>
  );
}
