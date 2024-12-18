'use client';

import React, { useEffect, useState } from 'react';
import {  } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { BsBell } from 'react-icons/bs';
import { LuAlignJustify, LuWifi, LuWifiOff } from "react-icons/lu";

interface NavbarProps {
  toggleSidebar: () => void; // Para abrir y cerrar el Sidebar
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const pathname = usePathname(); // ruta actual
  const [online, setOnline] = useState<boolean | null> (null); // Estado inicial segro de conexión del navegador
  const [hora, setHora] = useState<string | null >(null); // Hora actual

  // Efecto para detectar los cambios en la conexión 
  useEffect(() => {
    setOnline(navigator.onLine); // Establecer el estado de conexión

    const checkConnection = () => {setOnline(navigator.onLine);};

    window.addEventListener('online', checkConnection);
    window.addEventListener('offline', checkConnection);

    return () => {
      window.removeEventListener('online', checkConnection);
      window.removeEventListener('offline', checkConnection);
    };
  }, []);

  // Efecto para detectar los cambios en la hora
  useEffect(() => {
    const updateTime = () => setHora(new Date().toLocaleTimeString());  // Inicializamos la hora --> cadena vacía para que no prob. en la fase de hidratación
    updateTime(); 
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []); 

  const formattedPathname = () => {
    if (pathname === '/') return 'Home';
    const cleanPath = pathname.replace(/^\/|\/$/g, ''); 
    const parts = cleanPath.split('/'); 
    return parts[0]?.charAt(0).toUpperCase() + parts[0]?.slice(1) || 'Home';
  };
  
  return (
    <nav className="bg-gray-800 h-16 fixed top-0 w-full z-50 shadow-md">
    <div className="flex items-center justify-between h-full px-4 text-white">
      {/* Lado Izquierdo */}
      <div className="flex items-center space-x-4 ">
        <button onClick={toggleSidebar} className="hover:text-gray-400 transition-colors">
          <LuAlignJustify size={32} />
        </button>
        <span className="text-white text-2xl font-semibold">
          Estás en: <strong>{formattedPathname()}</strong>
        </span>
      </div>

      {/* Lado Derecho */}
      <div className="flex items-center gap-8">
        {/* Estado de Conexión */}
        <div className="flex items-center">
          {online ? (
            <LuWifi size={32} className="text-green-400" />
          ) : (
            <LuWifiOff size={32} className="text-red-400" />
          )}
        </div>

        {/* Icono de Notificaciones */}
        <button className="hover:text-gray-400 transition-colors">
          <BsBell size={32} />
        </button>

        {/* Hora Actual */}
        <div className="font-mono text-2xl">{hora}</div>
      </div>
    </div>
  </nav>
  );
};

export default Navbar;
