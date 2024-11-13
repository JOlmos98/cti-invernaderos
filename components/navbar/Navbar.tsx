import { MoreVertical } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import BotonVolver from './botonVolver';



const Navbar = () => {
  return (
    <nav className="bg-gray-800 py-5 px-7">
       <div className="flex items-center justify-between text-white max-w-7xl mx-auto">
          {/* Lada izquierdo Home y < */}
          <div className="flex items-center space-x-4">
          <BotonVolver /> 
          <Link 
            href="/" 
            className="text-white hover:text-gray-300 transition-colors font-medium"
          >
            Home
          </Link>  
        </div> 
        {/* Contenedor del centro */}
          <div className="flex-1"></div>
       {/* Lado derecho: About y menú de tres puntos */}
       <div className="flex items-center space-x-6">
          <Link 
            href="/about" 
            className="text-white hover:text-gray-300 transition-colors font-medium"
          >
            About
          </Link>
          <button className="text-white hover:text-gray-300 transition-colors">
            <MoreVertical size={24} />
          </button>
        </div>
      </div>
    </nav>
      );
    };

export default Navbar;