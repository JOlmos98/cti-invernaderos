'use client'
import { getTempSinConectarCR, setTempSinConectarCR } from '@/lib/actionsCalefaccion';
import React from 'react'

// endpoints temperatura de consigna
type TempConsignaProps ={
  id:number;
}

function CompTempConsigna({id}:TempConsignaProps) {
  
   return (
    <div className='w-full max-w-md p-8 bg-white rounded-xl shadow-md'> 
        <h2
        className='text-2xl font-semibold text-gray-900 mb-4 text-center'
        > 
            Temperatura de consigna {id + 1}
        </h2>
        <form 
        onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            try {
                await setTempSinConectarCR(id, formData);  // Server Action => actualizar el valor TempSinConectar
            } catch (error: any) {
                alert(`Error al establecer la Temperatura de consigna: ${error.message}`);
            }
        }}
        className='space-y-8'
        >
            <div className='space-y-4'>
                <input
                type='number'
                name='valor'
                placeholder={`Valor de Temperatura de consigna para calefacción ${id + 1}`}
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 
                       focus:ring focus:ring-blue-100 transition-all
                       outline-none text-gray-700 placeholder-gray-400 text-lg'
                />
                <div className='flex gap-4 justify-between mt-5'>
                    <button
                        type='submit'
                        className='flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg'
                    >
                        Establecer
                    </button>

                    <button
                        type='button'
                        onClick={() => {
                            const form = document.querySelector('form');
                            if (form) {
                                form.reset();  // Resetea el formulario
                            }
                        }}
                        className='flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg'
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default CompTempConsigna
