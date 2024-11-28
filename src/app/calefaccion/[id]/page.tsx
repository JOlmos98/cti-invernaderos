
import { NUM_CALEFACCIONES } from '@/backend/calefaccion/funcionalidad/calefaccion';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function CalefaccionPage({params} : { params : {id: string }}) {
    const { id } = await params; 
    const calId = parseInt(id); 

    // Verifica que el ID sea válido
    if (isNaN(calId) || calId < 0 || calId >= NUM_CALEFACCIONES) {
      return notFound(); 
    }
  
    return (
      <div className="mt-32">
        <h1 className="text-center font-semibold text-xl">Detalles de Calefacción {id}</h1>
        <p className="text-center mt-4 text-gray-600">
          Hola estoy para la Calefacción {id}.
        </p>
      </div>
    );
  }
