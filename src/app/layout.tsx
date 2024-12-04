import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { LoadingAllParams } from "@/backend/parametros/loadingParameters";
import Navbar from "../../components/navbar/Navbar";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Prueba controlador",
  description: "Aplicacion controlador clima",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    // Llama a LoadingAllParams al arrancar el programa
    LoadingAllParams();

  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

//<Navbar /> 