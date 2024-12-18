'use client';

import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Siderbar from "../../components/siderbar/Siderbar";


{/* Este LayoutWrapper es el que se encarga de renderizar el siderBar y sus hijos en el navegador, para que sea responsive */}

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
     const [isSidebarVisible, setIsSidebarVisible] = useState(false);
     const toggleSidebar = () => {
      setIsSidebarVisible((prev) => !prev);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
          {/* Navbar */}
             <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800">
                 <Navbar currentPage="Home" toggleSidebar={toggleSidebar} />
             </div>

          {/* Sidebar */}
        <div
        className={`fixed top-12 left-0 h- h-[calc(100vh-4rem)] w-72 bg-gray-900 transition-transform duration-300 ${
          isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ zIndex: 40 }}
      >
        <Siderbar />
      </div>
        {/* Contenedor Principal */}
        <div
          className={`flex flex-col flex-grow transition-all duration-300 ${
            isSidebarVisible ? 'ml-72' : ''
          }`}
        >
          
          {/* Contenido Principal */}
          <main className="mt-16 p-6">{children}</main>
        </div>
      </div>
    );
  };

export default LayoutWrapper;