import type { Metadata } from "next";
import { Inter,Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Payme",
  description: "Payme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{backgroundColor:"#FFF8ED"}} className={inter.className}>{children}</body>
    </html>
  );
}
