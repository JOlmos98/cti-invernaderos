import React from 'react'


{/* !! Cunado haces un componente lo tienes que exportar en index y le tienes que añadir a tailwind.config.ts !! */}
export default function MenuPage() {
    return (
        <div> 
             <h1 className="text-3xl font-bold text-gray-800">Hola</h1>
         <p className='text-gray-900'> Estoy en Menú Page</p>
        </div>
    );
  }
