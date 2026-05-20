import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/store";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SOS Komšija",
  description: "Pomoć od komšija u par klikova",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f97316",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
