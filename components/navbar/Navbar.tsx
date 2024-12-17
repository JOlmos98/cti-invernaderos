'use client';

import React from 'react';
import { MoreVertical } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  toggleSidebar: () => void; // Función para alternar el Sidebar
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, toggleSidebar }) => {
  return (
    <nav className="bg-gray-800 h-12 fixed top-0 w-full z-50 shadow-md">
      <div className="flex items-center justify-between h-full px-6 text-white">
        {/* Lado Izquierdo */}
        <div className="flex items-center space-x-4">
          <button onClick={toggleSidebar} className="hover:text-gray-400 transition-colors">
            <MoreVertical size={24} />
          </button>
          <span className="text-white font-medium">
            Estás en <strong>{currentPage}</strong>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
