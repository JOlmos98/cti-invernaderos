"use client";

import { getOffset, setOffset, getTempSinConectarCR, setTempSinConectarCR, getMin, setMin, getMax, setMax, getRango, setRango, getTempActual } from '@/lib/actionsRefrigeracion';
import React, { useEffect, useState } from 'react';

export default function Refrigeracion1() {

    // ---------- useState y useEffect para mostrar tempActual ----------

    const [tempActual, setTempActual] = useState<number | null>(null); // Estado para almacenar el valor de tempActual

    useEffect(() => {                               // Llamada inicial para obtener el valor de tempActual
        const fetchTempActual = async () => {
            const temp = await getTempActual(0);    // Llamar a la server action, por esto se imprime por consola el tempActual simplemente al entrar a la página.
            setTempActual(temp);                    // Actualizar el estado
        };
        fetchTempActual();
    }, []);                                         // El array vacío asegura que se llama solo una vez al montar el componente.

    // ---------- useState y useEffect para mostrar tempActual ----------

    return (
        <div className='flex flex-col w-200 items-center justify-center gap-1'>
            <p className='text-2xl m-5'>Refrigeracion 1 INPUTS</p>
            <div className='bg-gray-700 rounded-md p-4 mb-1'>
                <h1 className='flex flex-col w-200 items-center justify-center font-bold'>offset</h1>
                <div className='flex items-center gap-2'>
                    <form onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault(); // Detener el envío predeterminado del formulario.
                        const formData = new FormData(event.currentTarget); // Obtener los datos del formulario.
                        await setOffset(0, formData); // Llamar a la función con el FormData.
                    }} className=''>
                        <div>
                            <input type="number" name='valor' placeholder="Valor de offset" className='bg-gray-400 rounded-md m-2 p-2 placeholder-gray-300 w-38 h-8' />
                        </div>
                        <button type="submit" className='bg-blue-500 p-2 ml-2 rounded-md font-bold hover:bg-blue-800 '>Establecer</button>
                    </form>
                    <button type="submit" onClick={async () => { const offset = await getOffset(0); }} className='bg-slate-600 rounded-md p-2 hover:text-blue-400'>Print</button>
                </div>
            </div>

            <div className='bg-gray-700 rounded-md p-4 mb-1'>
                <h1 className='flex flex-col w-200 items-center justify-center font-bold'>tempSinConectarCR</h1>
                <div className='flex items-center gap-2'>
                    <form onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault(); // Detener el envío predeterminado del formulario.
                        const formData = new FormData(event.currentTarget); // Obtener los datos del formulario.
                        await setTempSinConectarCR(0, formData); // Llamar a la función con el FormData.
                    }} className=''>
                        <div>
                            <input type="number" name='valor' placeholder="Valor de tempSinConectarCR" className='bg-gray-400 rounded-md m-2 p-2 placeholder-gray-300 w-38 h-8' />
                        </div>
                        <button type="submit" className='bg-blue-500 p-2 ml-2 rounded-md font-bold hover:bg-blue-800 '>Establecer</button>
                    </form>
                    <button type="submit" onClick={async () => { const offset = await getTempSinConectarCR(0); }} className='bg-slate-600 rounded-md p-2 hover:text-blue-400'>Print</button>
                </div>
            </div>

            <div className='bg-gradient-to-b from-sky-900 to-red-500 rounded-md p-4 mb-1'>
                <h1 className='flex flex-col w-200 items-center justify-center font-bold'>↓ min ↓</h1>
                <div className='flex items-center gap-2'>
                    <form onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault(); // Detener el envío predeterminado del formulario.
                        const formData = new FormData(event.currentTarget); // Obtener los datos del formulario.
                        await setMin(0, formData); // Llamar a la función con el FormData.
                    }} className=''>
                        <div>
                            <input type="number" name='valor' placeholder="Valor de min" className='bg-gray-400 rounded-md m-2 p-2 placeholder-gray-300 w-38 h-8' />
                        </div>
                        <button type="submit" className='bg-blue-500 p-2 ml-2 rounded-md font-bold hover:bg-blue-800 '>Establecer</button>
                    </form>
                    <button type="submit" onClick={async () => { const offset = await getMin(0); }} className='bg-slate-600 rounded-md p-2 hover:text-blue-400'>Print</button>
                </div>
                <br /><br />
                <h1 className='flex flex-col w-200 items-center justify-center font-bold'>↓ max ↓</h1>
                <div className='flex items-center gap-2'>
                    <form onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault(); // Detener el envío predeterminado del formulario.
                        const formData = new FormData(event.currentTarget); // Obtener los datos del formulario.
                        await setMax(0, formData); // Llamar a la función con el FormData.
                    }} className=''>
                        <div>
                            <input type="number" name='valor' placeholder="Valor de max" className='bg-gray-400 rounded-md m-2 p-2 placeholder-gray-300 w-38 h-8' />
                        </div>
                        <button type="submit" className='bg-blue-500 p-2 ml-2 rounded-md font-bold hover:bg-blue-800 '>Establecer</button>
                    </form>
                    <button type="submit" onClick={async () => { const offset = await getMax(0); }} className='bg-slate-600 rounded-md p-2 hover:text-blue-400'>Print</button>
                </div>
            </div>
            <div className='bg-blue-900 rounded-md p-4 mb-1'>
                <h1 className='flex flex-col w-200 items-center justify-center font-bold'>rango</h1>
                <div className='flex items-center gap-2'>
                    <form onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault(); // Detener el envío predeterminado del formulario.
                        const formData = new FormData(event.currentTarget); // Obtener los datos del formulario.
                        await setRango(0, formData); // Llamar a la función con el FormData.
                    }} className=''>
                        <div>
                            <input type="number" name='valor' placeholder="Valor de rango" className='bg-gray-400 rounded-md m-2 p-2 placeholder-gray-300 w-38 h-8' />
                        </div>
                        <button type="submit" className='bg-blue-500 p-2 ml-2 rounded-md font-bold hover:bg-blue-800 '>Establecer</button>
                    </form>
                    <button type="submit" onClick={async () => { const offset = await getRango(0); }} className='bg-slate-600 rounded-md p-2 hover:text-blue-400'>Print</button>
                </div>
            </div>
            <div className='bg-blue-900 rounded-md p-4 mb-1'>
                <p><span className='font-bold'>tempActual: </span>{tempActual !== null ? tempActual : 'Cargando...'}</p>
            </div>
        </div>
    )
}
