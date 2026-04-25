import type { Metadata } from "next";
import { Geist_Mono, Tenor_Sans } from "next/font/google";
import "./globals.css";
import { Inter } from "next/font/google";
import { CartProvider } from "@/providers/cart-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

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
          <NuqsAdapter>{children}</NuqsAdapter>
        </CartProvider>
      </body>
    </html>
  );
}
