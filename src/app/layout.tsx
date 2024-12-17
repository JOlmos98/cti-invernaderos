import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { LoadingAllParams } from "@/backend/parametros/loadingParameters";
import { encenderOApagarTick } from "@/backend/tick";
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

  const toggleSidebar = () => {
    console.log('Sidebar toggled'); // Esto se implementará en el futuro
  };
  // Guarda si se han cargado bien los parámetros
    LoadingAllParams();
   // encenderOApagarTick(); //Si se han cargado bien los parámetros, la guarda es igual a true y se enciende.

  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
          {/* Navbar siempre visible */}
          <Navbar currentPage="Controlador Clima" toggleSidebar={toggleSidebar} />

          {/* Contenedor principal con margen para no solaparse con el Navbar */}
          <main className="mt-12">
          {children}
          </main>

          {/* Notificaciones */}
          <Toaster position="top-right" />
      </body>
    </html>
  );
}

//<Navbar /> 