'use client';
import { calefaccion } from '@/backend/calefaccion/funcionalidad/calefaccion';
import { getTempSinConectarCR, setOffset, setTempSinConectarCR } from '@/lib/actionsCalefaccion';
import { useRouter } from 'next/navigation';

import React, { useRef } from 'react'
import { LuCheck, LuX } from 'react-icons/lu';

// endpoints temperatura de consigna
type TempConsignaProps ={
  id:number;
}

const CompTempConsigna: React.FC <TempConsignaProps> = ({ id }) => {
    const formRef = useRef<HTMLFormElement>(null);
    
    console.log(calefaccion[0].tempSinConectarCR.max); 
    console.log(calefaccion[0].tempSinConectarCR.min); 

   return (
    <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
    {/* Formulario */}
    <form ref={formRef} className="space-y-4">
      <div className='text-2xl font-semibold text-gray-900 mb-4 text-center'> Temperatura de consigna </div>
      <input
        type="number"
        name="valor"
        placeholder={`Valor para calefacción ${id + 1}`}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 
                   focus:ring focus:ring-blue-100 transition-all outline-none text-gray-700 
                   placeholder-gray-400 text-lg"
      />
    </form>
  </div>
  )
}

export default CompTempConsigna; 
