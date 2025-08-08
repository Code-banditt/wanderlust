"use client";

import { Plus_Jakarta_Sans, Noto_Sans } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store from "./store";
import { SessionProvider } from "next-auth/react";
import { LoadingProvider } from "./_components/Loading";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

// Fonts
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});
const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto",
});

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <title>Wanderlust</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      />
      <meta name="theme-color" content="#FFFFFF" />
      <link rel="icon" type="image/x-icon" href="data:image/x-icon;base64," />
      <body
        className={`${plusJakarta.variable} ${notoSans.variable} antialiased`}
      >
        <SessionProvider>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <LoadingProvider>
                <AnimatePresence mode="wait" initial={false}>
                  {children}
                </AnimatePresence>
                <Toaster richColors position="top-right" expand />{" "}
              </LoadingProvider>
            </QueryClientProvider>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
