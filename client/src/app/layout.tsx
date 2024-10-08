import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider"
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { ContextProvider } from '../contexts/ContextProvider';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Surch App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContextProvider>
    <ClerkProvider>
    <html lang="en">
    <head>
        <link rel="icon" href="./face-with-monocle.svg" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        
      </body>
    </html>
    </ClerkProvider>
    </ContextProvider>
  );
}
