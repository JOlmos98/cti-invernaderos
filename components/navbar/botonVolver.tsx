'use client'
import { ChevronLeftIcon } from "lucide-react";

const botonVolver = () => {
  return (
        <button
        onClick={() => window.history.back()}
        className='text-white hover:text-gray-300 transition-colors'
        > 
          <ChevronLeftIcon size={25}/> 
        </button>
      ); 
}; 

export default botonVolver;

