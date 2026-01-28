import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProviderWrapper } from "@/components/CartProviderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Topnotch Books",
    template: "%s | Topnotch Books",
  },
  description:
    "KCSE revision books and calm study resources by educator Thaddeus Mbaluka, built around the Octopus Revision Method.",
  openGraph: {
    title: "Topnotch Books",
    description:
      "KCSE revision books and calm study resources by educator Thaddeus Mbaluka, built around the Octopus Revision Method.",
    siteName: "Topnotch Books",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <CartProviderWrapper>
          <Navbar />

          {/* Main content area */}
          <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
            <main className="flex-1">
              <div className="space-y-6 md:space-y-8">{children}</div>
            </main>

            <Footer />
          </div>
        </CartProviderWrapper>
      </body>
    </html>
  );
}
