import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { LoadingAllParams } from "@/backend/parametros/loadingParameters";
import { encenderOApagarTick } from "@/backend/tick";
import Navbar from "../../components/navbar/Navbar";
import { Sidebar } from "lucide-react";

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
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  //Mostrar ocultar siderbar
  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
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
          <Navbar currentPage="Home" toggleSidebar={toggleSidebar}   />

          {isSidebarVisible && <Sidebar />} 
          
          <main className={`mt-12 ${isSidebarVisible ? 'ml-72' : ''}`}>
          {children}
          </main>

          {/* Notificaciones */}
          <Toaster position="top-right" />
      </body>
    </html>
  );
}

//<Navbar /> 