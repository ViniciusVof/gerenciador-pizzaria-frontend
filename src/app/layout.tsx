import { AuthProvider } from "@/contexts/AuthContext";
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
          {children} <ToastContainer autoClose={3000} />
        </AuthProvider>
      </body>
    </html>
  );
}
