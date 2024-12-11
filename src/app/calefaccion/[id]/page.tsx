
import { NUM_CALEFACCIONES } from '@/backend/calefaccion/funcionalidad/calefaccion';
import { notFound } from 'next/navigation';
import React from 'react'
import Siderbar from '../../../../components/siderbar/Siderbar';
import Navbar from '../../../../components/navbar/Navbar';
import { FaTemperatureHigh } from 'react-icons/fa';
import { PiCheckSquareOffsetBold } from 'react-icons/pi';
import Link from 'next/link';

export default async function CalefaccionPage({params} : { params : {id: string }}) {
    const { id } = await params; 
    const calId = parseInt(id); 

    // Verifica que el ID sea válido A
    if (isNaN(calId) || calId < 0 || calId >= NUM_CALEFACCIONES) {
      return notFound(); 
    }
  
    const items = [
      {id: 1, icon: FaTemperatureHigh, name: 'Temperatura de consigna', href: `/calefaccion/${id}/temperaturaDeConsigna`}, 
      {id: 2, icon: PiCheckSquareOffsetBold, name: 'OffSet Temperatura', href: `/calefaccion/${id}/offSet`} 
    ]
    return (
      <div className="min-h-screen">
      <Navbar />

      <div className="flex"> 
        <Siderbar />

        {/* Contenido principal */}
        <main className="flex-1 ml-72 mt-12 p-4">
          {/* Ajuste de márgenes para evitar superposiciones */}
          <h1 className='text-3xl font-bold text-center bg-gray-800 text-white py-4'> Calefaccion {(calId+1)}</h1>
          <ul> 
             {items.map((item) => (
               <li
               key={item.id}
               className='flex items-center justify-between px-4 py-3 border-b last:border-none hover:bg-gray-200 transition-all'
               > 

               <div className='flex items-center space-x-3'>
                {/* Icono */} 
                <span className='text-4xl'> {item.icon && <item.icon />} </span>
                <Link href={item.href} className='text-gray-900 hover:backdrop-opacity-60' > 
                {/* Enlace && name */}
                {item.name}
                </Link>
               </div>
               </li>
             )
            )}
          </ul>
        </main>
      </div> 
    </div>
    );
  }
