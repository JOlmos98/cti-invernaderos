

import { NUM_CALEFACCIONES } from '@/backend/calefaccion/funcionalidad/calefaccion';
import { notFound } from 'next/navigation';
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
    <div> 
        {/* Encabezado */}
        <h1 className="text-3xl font-bold text-center bg-gray-800 text-white py-4 rounded-md shadow-md">
          Calefacción {calId + 1}
        </h1>
  
        {/* Lista de Elementos */}
        <ul className="mt-6 bg-white rounded-lg shadow-md">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between px-6 py-4 border-b last:border-none hover:bg-gray-200 transition-all"
            >
              {/* Icono y Nombre */}
              <div className="flex items-center space-x-4">
                {item.icon && (
                  <span className="text-4xl text-gray-600">
                    <item.icon />
                  </span>
                )}
                <Link
                  href={item.href}
                  className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-all"
                >
                  {item.name}
                </Link>
              </div>
            </li>
          ))}
        </ul>
    </ div>     
    );
  };
