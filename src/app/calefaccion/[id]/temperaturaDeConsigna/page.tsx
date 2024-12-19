import React from 'react'
import CompTempConsigna from '../../../../../components/compTempConsigna/CompTempConsigna';
import TempConsignaHeader from '../../../../../components/compTempConsigna/TempConsignaHeader';


export default async function TemperaturaDeConsignaPage({params}:{ params:{ id:string}}) {
  const { id } = await params;
  const calId = parseInt(id);  
  
  return (
    <div>
      {/* Header */}
      <Header id={calId} />

      {/* Contenido principal */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <CompTempConsigna id={calId} />
      </div>
    </div>
  );
}


const Header = ({ id }: { id: number }) => {
  return (
    <div className="flex justify-between items-center bg-gray-800 text-white p-4 rounded-md shadow-md">
      <TempConsignaHeader id={id} />
    </div>
  );
};
