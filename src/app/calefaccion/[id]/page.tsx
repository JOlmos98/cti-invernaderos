
import { NUM_CALEFACCIONES } from '@/backend/calefaccion/funcionalidad/calefaccion';
import { notFound } from 'next/navigation';
import React from 'react'
import Siderbar from '../../../../components/siderbar/Siderbar';
import Navbar from '../../../../components/navbar/Navbar';
import { FaTemperatureHigh } from 'react-icons/fa';

export default async function CalefaccionPage({params} : { params : {id: string }}) {
    const { id } = await params; 
    const calId = parseInt(id); 

    // Verifica que el ID sea válido
    if (isNaN(calId) || calId < 0 || calId >= NUM_CALEFACCIONES) {
      return notFound(); 
    }
  
    const items = [
      {icon: FaTemperatureHigh , name: 'Temperatura de consigna', href: '/t'}
    ]
    return (
      <div className="min-h-screen">
      <Navbar />

      <div className="flex"> 
        <Siderbar />

        {/* Contenido principal */}
        <main className="flex-1 ml-72 mt-12 p-4">
          {/* Ajuste de márgenes para evitar superposiciones */}
          <p className="text-center mt-4 text-gray-600">
            Hola estoy en la Calefacción {id}.
          
            
            
          </p>
        </main>
      </div>
    </div>
    );
  }
