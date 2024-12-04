"use client";

import { encenderOApagarTick  } from "@/backend/tick";
import { setTempActualForm } from "@/lib/actionsCalefaccion";

export default function Parametros(){

    return (
        <div className='flex flex-col w-200 items-center justify-center gap-2'>
            <h1 className='flex  flex-col w-200 items-center justify-center gap-8 mb-8 mt-5 text-2xl'>Tick y &quot;tempActual&quot;</h1>
            
            <div className='flex items-center gap-2'>
                <form action={setTempActualForm} className='' >
                    <button type="submit"  className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800'>Establecer tempActual</button>
                    <input type="number" name='id' placeholder="id Calef."  className='bg-gray-400 rounded-md ml-2 pl-2 placeholder-gray-300 w-24 h-8'/>
                    <input type="number" name='valor' placeholder="valor tempActual"  className='bg-gray-400 rounded-md ml-2 pl-2 placeholder-gray-300 w-24 h-8'/>
                </form>
            </div>
            <button onClick={encenderOApagarTick} className='bg-orange-600 p-2 rounded-md font-bold hover:bg-orange-800'>Encender/Apagar tick</button>

        </div>
    )
}