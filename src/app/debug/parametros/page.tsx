"use client";

import { getDataAll, getOffset, setOffset, getAlltempSinConectarCR, setTempSinConectarCR } from '@/lib/actionsCalefaccion';
import Link from 'next/link';
import React from 'react';

export default function Parametros(){

    return (
        <div className='flex flex-col w-200 items-center justify-center gap-2'>
            <h1 className='flex  flex-col w-200 items-center justify-center gap-5 mb-3 mt-5 text-2xl'>Parametros &quot;offset&quot; y &quot;tempSinConectarCR&quot;</h1>

            <Link href="/debug/tickYTempActual" className='bg-orange-600 p-2 rounded-md font-bold hover:bg-orange-800'>Tick y TempActual</Link>



            <button type="submit" onClick={getDataAll} className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800' >Imprimir parámetros</button>
            
            <div className='bg-gray-700 rounded-md p-4 mb-3'>
            <h1 className='flex  flex-col w-200 items-center justify-center text-2xl'>offset</h1>
            <div className='flex items-center gap-2'>
                <form onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault(); // Detener el envío predeterminado del formulario.
                    const formData = new FormData(event.currentTarget); // Obtener los datos del formulario.
                    await setOffset(0, formData); // Llamar a la función con el FormData.
                    }} className=''>
                    <button type="submit"  className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800'>Establecer CAL1</button>
                    <input type="number" name='valor' placeholder="Valor de Offset Cal1"  className='bg-gray-400 rounded-md ml-1 placeholder-gray-300 w-38 h-8'/>
                </form>
                <button type="submit" onClick={async () => {const offset = await getOffset(0);}} className='bg-blue-500 p-2 rounded-md hover:bg-blue-800'>Print</button>
                </div>
                <br />
                <div className='flex items-center gap-2'>
                <form onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault(); // Detener el envío predeterminado del formulario. (esto no me gusta, habría que ver si se puede tocar)
                    const formData = new FormData(event.currentTarget); // Obtener los datos del formulario.
                    await setOffset(1, formData); // Llamar a la función con el FormData.
                    }} className='' >
                    <button type="submit"  className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800'>Establecer CAL2</button>
                    <input type="number" name='valor' placeholder="Valor de Offset Cal2"  className='bg-gray-400 rounded-md ml-1 placeholder-gray-300 w-38 h-8'/>
                </form>
                <button type="submit" onClick={async () => {const offset = await getOffset(1);}} className='bg-blue-500 p-2 rounded-md hover:bg-blue-800'>Print</button>
                </div>
                <br />
                <div className='flex items-center gap-2'>
                <form onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault(); // Detener el envío predeterminado del formulario.
                    const formData = new FormData(event.currentTarget); // Obtener los datos del formulario.
                    await setOffset(2, formData); // Llamar a la función con el FormData.
                    }} className='' >
                    <button type="submit"  className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800'>Establecer CAL3</button>
                    <input type="number" name='valor' placeholder="Valor de Offset Cal2"  className='bg-gray-400 rounded-md ml-1 placeholder-gray-300 w-38 h-8'/>
                </form>
                <button type="submit" onClick={async () => {const offset = await getOffset(2);}} className='bg-blue-500 p-2 rounded-md hover:bg-blue-800'>Print</button>
                </div>
                <br />
            </div>
            

            <div  className=' bg-gray-700 rounded-md p-4 mb-5'>
            <h1 className='flex  flex-col w-200 items-center justify-center text-2xl mb-1'>tempSinConectarCR</h1>

                <div className=''>
                    <form action={setTempSinConectarCR} className="bg-gray-600 flex flex-col rounded-md items-center justify-center gap-2 mb-5 p-3">
                        <input type="text" name="id" placeholder="num calefaccion"  className='bg-gray-400 rounded-md placeholder-gray-300 w-52 h-8'/>
                        <input type="number" name="valorTempSinConectarCR" placeholder="valor (Default: 0)" className='bg-gray-400 rounded-md placeholder-gray-300 w-52 h-8'/>
                        <button type="submit" className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800'>Establecer</button>
                    </form>
                <button type="submit" onClick={getAlltempSinConectarCR} className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800'>Imprimir todos los tempSinConectarCR</button>
                
                </div>
            </div>
        </div>

    )
}