import type { Metadata } from "next";
import { Playfair_Display, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400","600","700","900"],
  variable: "--font-playfair",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300","400","500","600","700","800"],
  variable: "--font-manrope",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400","500","700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RiskFinder — Credit Risk Intelligence",
  description: "Web apps untuk prediksi gagal bayar peminjam (individu/bisnis) berbasis machine learning.",
  icons: [
    { rel: "icon", type: "image/svg+xml", url: "/favicon.svg" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${playfair.variable} ${manrope.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
