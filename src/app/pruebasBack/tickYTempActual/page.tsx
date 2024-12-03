"use client";

import { useEffect, useState } from "react";
import { encenderOApagarTick, tempEmitter  } from "@/backend/tick";
import { setTempActualForm } from "@/lib/actionsCalefaccion";

export default function Parametros(){

// ------------------------ Actualizar tabla ------------------------
    const [tempActual, setTempActual] = useState<number[]>([]);

    useEffect(() => {
        const updateHandler = (newTemps: number[]) => {
            setTempActual(newTemps);
        };

        // Escuchar eventos
        tempEmitter.on("tempUpdate", updateHandler);

        return () => {
            // Eliminar listener al desmontar
            tempEmitter.off("tempUpdate", updateHandler);
        };
    }, []);
// ------------------------ Actualizar tabla ------------------------

    return (
        <div className='flex flex-col w-200 items-center justify-center gap-2'>
            <h1 className='flex  flex-col w-200 items-center justify-center gap-8 mb-8 mt-5 text-2xl'>Tick y "tempActual"</h1>
            
            <div className='flex items-center gap-2'>
                <form action={setTempActualForm} className='' >
                    <button type="submit"  className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800'>Establecer tempActual</button>
                    <input type="number" name='id' placeholder="id Calef."  className='bg-gray-400 rounded-md ml-2 pl-2 placeholder-gray-300 w-24 h-8'/>
                    <input type="number" name='valor' placeholder="valor tempActual"  className='bg-gray-400 rounded-md ml-2 pl-2 placeholder-gray-300 w-24 h-8'/>
                </form>
            </div>
            <button onClick={encenderOApagarTick} className='bg-orange-600 p-2 rounded-md font-bold hover:bg-orange-800'>Encender/Apagar tick</button>
        
            <table className="bg-blue-700 p-2 rounded-md font-bold">
                <thead>
                    <tr className="">
                        <th className="p-3">Calefacción</th>
                        <th className="p-3">Temp Actual</th>
                    </tr>
                </thead>
                <tbody>
                    {tempActual.map((temp, index) => (
                        <tr key={index}>
                            <td className="border border-gray-400 px-4 py-2 text-center">{index+1}</td>
                            <td className="border border-gray-400 px-4 py-2 text-center">{temp.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

//<p className='text-red-400'>Por terminar</p>