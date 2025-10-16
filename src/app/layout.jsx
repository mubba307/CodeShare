import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SnippetProvider } from "@/context/SnippetContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Code Exchanger",
  description: "Exchange and share code snippets",
  icons: {
    icon: "/pic.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SnippetProvider>
          {children}
        </SnippetProvider>
      </body>
    </html>
  );
}
