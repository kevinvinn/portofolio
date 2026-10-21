import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

// We use Inter as it's a common modern sans-serif
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
// We use Caveat for the signature logo style
const caveat = Caveat({ subsets: ["latin"], variable: "--font-signature" });

import { Navbar } from "@/components/layout/Navbar";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { ScrollRestorer } from "@/components/layout/ScrollRestorer";

export const metadata: Metadata = {
  metadataBase: new URL("https://kevin.dev"),
  title: "Kevin Risky - Portfolio",
  description:
    "Fullstack Developer crafting clean interfaces and scalable systems, where thoughtful design meets solid engineering.",
  openGraph: {
    title: "Kevin Risky - Portfolio",
    description:
      "Fullstack Developer crafting clean interfaces and scalable systems, where thoughtful design meets solid engineering.",
    url: "https://kevin.dev",
    siteName: "Kevin Risky - Portfolio",
    images: [
      {
        url: "/header.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/icon.png", // Menggunakan icon.png untuk title/tab browser
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${caveat.variable} font-sans antialiased bg-background text-foreground custom-scrollbar`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollRestorer />

          <Navbar />

          <main className="min-h-screen">{children}</main>

          <FloatingActions />
        </ThemeProvider>
      </body>
    </html>
  );
}
