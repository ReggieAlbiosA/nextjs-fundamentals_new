
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import './fontawesome';
import { Suspense } from 'react'
import { NavigationEvents } from '@/components/navigation-events'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Fundamentals Playground",
  description: "Learning Next.js fundamentals",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased p-[0_5%] pb-[100px]`}
      >

        <main> {children}</main>
          <Suspense fallback={null}>
            <NavigationEvents />
          </Suspense>

      </body>
    </html>
  );
}
