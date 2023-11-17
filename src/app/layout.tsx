"use client";
import { Header } from "@/components/Header";
import { AuthProvider } from "@/contexts/AuthContext";
import { LoadingProvider } from "@/contexts/LoadingContext";
import "@/styles/globals.scss";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />

          <LoadingProvider>
            {children}
            <ToastContainer autoClose={3000} />
          </LoadingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
