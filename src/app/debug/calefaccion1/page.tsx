"use client";

import { getOffset, setOffset, getTempSinConectarCR, setTempSinConectarCR } from '@/lib/actionsCalefaccion';
import Link from 'next/link';
import React from 'react';

export default function Calefaccion1() {


    return (
        <div className='flex flex-col w-200 items-center justify-center gap-2 '>
            <p className='text-2xl m-5'>Calefaccion 1 INPUTS</p>
            <div className='bg-gray-700 rounded-md p-4 mb-3'>
                <h1 className='flex flex-col w-200 items-center justify-center font-bold'>offset</h1>
                <div className='flex items-center gap-2'>
                    <form onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault(); // Detener el envío predeterminado del formulario.
                        const formData = new FormData(event.currentTarget); // Obtener los datos del formulario.
                        await setOffset(0, formData); // Llamar a la función con el FormData.
                        }} className=''>
                        <div>
                        <input type="number" name='valor' placeholder="Valor de offset"  className='bg-gray-400 rounded-md m-2 p-2 placeholder-gray-300 w-38 h-8'/>
                        </div>
                        <button type="submit"  className='bg-blue-500 p-2 ml-2 rounded-md font-bold hover:bg-blue-800 '>Establecer</button>
                    </form>
                    <button type="submit" onClick={async () => {const offset = await getOffset(0);}} className='bg-slate-600 rounded-md p-2 hover:text-blue-400'>Print</button>
                </div>
            </div>

            <div className='bg-gray-700 rounded-md p-4 mb-3'>
                <h1 className='flex flex-col w-200 items-center justify-center font-bold'>tempSinConectarCR</h1>
                <div className='flex items-center gap-2'>
                    <form onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault(); // Detener el envío predeterminado del formulario.
                        const formData = new FormData(event.currentTarget); // Obtener los datos del formulario.
                        await setTempSinConectarCR(0, formData); // Llamar a la función con el FormData.
                        }} className=''>
                        <div>
                        <input type="number" name='valor' placeholder="Valor de tempSinConectarCR"  className='bg-gray-400 rounded-md m-2 p-2 placeholder-gray-300 w-38 h-8'/>
                        </div>
                        <button type="submit"  className='bg-blue-500 p-2 ml-2 rounded-md font-bold hover:bg-blue-800 '>Establecer</button>
                    </form>
                    <button type="submit" onClick={async () => {const offset = await getTempSinConectarCR(0);}} className='bg-slate-600 rounded-md p-2 hover:text-blue-400'>Print</button>
                </div>
            </div>

        </div>
    )
}
