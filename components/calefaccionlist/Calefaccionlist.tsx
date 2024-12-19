'use client';

import { calefaccion, NUM_CALEFACCIONES } from '@/backend/calefaccion/funcionalidad/calefaccion';
import Link from 'next/link';


// Función principal para renderizar la lista de calefacciones
export default function CalefaccionList() {
  // Creamos dinámicamente la lista de calefacciones
  const calefacciones = Array.from({ length: NUM_CALEFACCIONES }, (_, index) => ({
    id: index  , 
    nombre: `Calefacción ${index +1 }`,
    }));

    console.log("calefacciones:", calefacciones);
    for (let i = 0; i < calefacciones.length; i++) {
      console.log("calefacciones[i].id:", calefacciones[i].id);
    }
   
  return (
    <div className="mt-32">
      <div className="px-4 sm:px-8 max-w-5xl m-auto">
        <h1 className="text-center font-semibold text-xl">Lista de Calefacciones</h1>
        <ul className="border border-gray-200 rounded overflow-hidden shadow-md">
          {calefacciones.map((calefaccion) => (
            <li
              key={calefaccion.id}
              className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out"
            >
              <Link
                href={`/calefaccion/${calefaccion.id}`} 
                className="text-blue-600 hover:underline"
              >
                {calefaccion.nombre}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
