import React from 'react'
import CompTempConsigna from '../../../../../components/compTempConsigna/CompTempConsigna';


export default async function TemperaturaDeConsignaPage({params}:{ params:{ id:string}}) {
  const { id } = await params;
  const calId = parseInt(id);  
  
  return (
    <div> 
      <div>
        <h1 className='text-3xl font-bold text-center bg-gray-800 text-white py-4 rounded-md shadow-md'> Temperatura de Consigna </h1>
        <div className='min-h-screen bg-gray-100 flex items-center justify-center'> 
          < CompTempConsigna id = {calId} />
        </div>
      </div> 
    </div> 
  )
}
