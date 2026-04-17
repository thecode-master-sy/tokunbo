import type { Metadata } from "next";
import { Geist_Mono, Tenor_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import { CartProvider } from "@/providers/cart-provider";

const tenor_sans = Tenor_Sans({
  variable: "--tenor-sans",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reusable kitchen utensils",
  description: "Created by thecodemaster",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} ${tenor_sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          {" "}
          <Navbar />
          {children} <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
