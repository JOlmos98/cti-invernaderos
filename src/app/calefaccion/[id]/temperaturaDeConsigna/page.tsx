import React from 'react'
import Navbar from '../../../../../components/navbar/Navbar';
import Siderbar from '../../../../../components/siderbar/Siderbar';
import CompTempConsigna from '../../../../../components/compTempConsigna/CompTempConsigna';




export default async function TemperaturaDeConsignaPage({params}:{ params:{ id:string}}) {
  const { id } = await params;
  const calId = parseInt(id);  
  
  return (
    
    <div className="min-h-screen">
      <Navbar />

      <div className="flex"> 
        <Siderbar />

        {/* Contenido principal */}
        <main className="flex-1 ml-72 mt-12 p-4"> 
        <h1 className='text-2xl font-bold text-center bg-gray-800 text-white py-4'> Temperatura de Consigna </h1>
        <div className='min-h-screen bg-gray-100 flex items-center justify-center'> 
          < CompTempConsigna id = {calId} />
        </div>
        </main>
      </div> 
    </div> 
  )
}
