import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const satoshi = localFont({
  variable: "--font-sans",
  src: [
    { path: "../../public/fonts/Satoshi-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/Satoshi-LightItalic.otf", weight: "300", style: "italic" },
    { path: "../../public/fonts/Satoshi-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Satoshi-Italic.otf", weight: "400", style: "italic" },
    { path: "../../public/fonts/Satoshi-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Satoshi-MediumItalic.otf", weight: "500", style: "italic" },
    { path: "../../public/fonts/Satoshi-Bold.otf", weight: "700", style: "normal" },
    { path: "../../public/fonts/Satoshi-BoldItalic.otf", weight: "700", style: "italic" },
    { path: "../../public/fonts/Satoshi-Black.otf", weight: "900", style: "normal" },
    { path: "../../public/fonts/Satoshi-BlackItalic.otf", weight: "900", style: "italic" },
  ],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gold NextJS System",
  description: "Gold NextJS System - Phase 1 frontend prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
