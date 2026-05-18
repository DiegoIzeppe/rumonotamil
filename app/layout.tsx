import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rumo à Nota 1000 | Plataforma Premium ENEM",
  description:
    "A plataforma definitiva para alcançar nota 1000 na redação do ENEM.",
  keywords: "ENEM, redação, nota 1000, correção IA, vestibular",
  authors: [{ name: "Rumo à Nota 1000" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "rgba(13, 19, 33, 0.95)",
              border: "1px solid rgba(59, 130, 246, 0.2)",
              color: "#fff",
              backdropFilter: "blur(12px)",
            },
          }}
        />
      </body>
    </html>
  );
}
