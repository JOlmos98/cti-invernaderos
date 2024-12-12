import { MoreVertical } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import BotonVolver from './botonVolver';




const Navbar: React.FC = () => {
  return ( 
    <nav className="bg-gray-800 h-12 w-[calc(100vw-72px)] fixed top-0 left-72 z-50">
    <div className="flex items-center justify-between h-full max-w-7xl mx-auto px-4 text-white">
      <div className="flex items-center space-x-4">
        <BotonVolver />
        <Link href="/" className="text-white hover:text-gray-300 transition-colors font-medium">
          Inicio
        </Link>

      </div>
      {/* Lado derecho */}
      <div className="flex items-center space-x-6">
        <Link href="/debug" className="text-white hover:text-gray-300 transition-colors font-medium">
          Debug
        </Link>
        <button className="text-white hover:text-gray-300 transition-colors">
          <MoreVertical size={24} />
        </button>
      </div>
    </div>
  </nav>     
  )
  };

export default Navbar;