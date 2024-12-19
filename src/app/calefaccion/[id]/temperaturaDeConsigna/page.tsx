import React from 'react'
import CompTempConsigna from '../../../../../components/compTempConsigna/CompTempConsigna';
import TempConsignaHeader from '../../../../../components/compTempConsigna/TempConsignaHeader';
import { calefaccion } from '@/backend/calefaccion/funcionalidad/calefaccion';


export default async function TemperaturaDeConsignaPage({params}:{ params:{ id:string}}) {
  const { id } = await params;
  const calId = parseInt(id);  

  

  const  min  = calefaccion[calId].tempSinConectarCR.min;  
  const  max  = calefaccion[calId].tempSinConectarCR.max; 
  return (
    <div>
      {/* Header */}
      <Header id={calId} min={0} max={100} />

      {/* Contenido principal */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <CompTempConsigna id={calId} />
      </div>
    </div>
  );
}


const Header = ({ 
  id, 
  min, 
  max, 
}: { 
  id: number; 
  min: number; 
  max: number;
}) => {
  return (
    <div className="flex justify-between items-center bg-gray-800 text-white p-4 rounded-md shadow-md">
      <TempConsignaHeader id={id} minValor={ min } maxValor={ max } />
    </div>
  );
};
