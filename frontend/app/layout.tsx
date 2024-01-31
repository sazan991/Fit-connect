import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import UserProvider from "@/lib/providers/UserContext";
import ToastProvider from "@/lib/providers/ToastProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600"],
  variable: "--font-inter",
  display: "swap",
});

const satoshi = localFont({
  src: [
    {
      path: "../fonts/Satoshi-Black.woff2",
      style: "normal",
      weight: "900",
    },
    {
      path: "../fonts/Satoshi-Bold.woff2",
      style: "normal",
      weight: "700",
    },
    {
      path: "../fonts/Satoshi-Light.woff2",
      style: "normal",
      weight: "300",
    },
    {
      path: "../fonts/Satoshi-Medium.woff2",
      style: "normal",
      weight: "500",
    },
  ],
  display: "swap",
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "Fitconnect | Home",
  description: "It is our fitness application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${satoshi.variable}`}
        suppressHydrationWarning={true}
      >
        <UserProvider>
          <ToastProvider>{children}</ToastProvider>
        </UserProvider>
      </body>
    </html>
  );
}
