// /src/app/pruebasBack/parametros/page.tsx
"use client";

import { getDataAll, getOffsetCal2, setOffsetCal2 } from '@/lib/actionsCalefaccion';
import { invoke } from '@tauri-apps/api/core';
import Greet from './greet';





export default function Parametros(){

  // Función para obtener el offset
  const getOffsetCal2 = async () => {
    try {
      const offset = await invoke<number>("get_offset_cal2_command");
      alert(`Offset Calefacción 2: ${offset}`);
      console.log("Offset Calefacción 2:", offset);
    } catch (error) {
      console.error("Error obteniendo el offset:", error);
      alert("Error obteniendo el offset");
    }
  };

    // Función para establecer el offset
    const setOffsetCal2 = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevenir comportamiento por defecto del formulario
        const formData = new FormData(event.currentTarget);
        const valor = Number(formData.get("valor"));
    
        if (isNaN(valor)) {
          alert("Por favor, introduce un número válido.");
          return;
        }
    
        try {
          const response = await invoke<string>("set_offset_cal2_command", {
            id: 1, // ID fijo para Calefacción 2
            valor,
          });
          alert(response);
          console.log("Nuevo valor de Offset Calefacción 2:", response);
        } catch (error) {
          console.error("Error estableciendo el offset:", error);
          alert("Error estableciendo el offset");
        }
      };

      

    return (
        <div className='flex flex-col w-200 items-center justify-center gap-2'>
            <h1 className='flex  flex-col w-200 items-center justify-center gap-8 mb-10 mt-5 text-2xl'>Parametros Cal2</h1>
            <Greet />
            <button type="submit" /*onClick={loadParamAgain}*/ className='bg-orange-500 p-2 mb-7 rounded-md font-bold hover:bg-orange-800'>Greet</button>
            
            <div className='bg-gray-700 rounded-md p-4'>
            <div className='flex items-center gap-2'>
            <button type="submit" className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800'>Activar / Desactivar</button>
            <p className='bg-green-700 p-2 rounded-3xl font-bold'>passReq</p>
            </div>
            <p className='text-red-500 font-bold'>Por terminar</p>
            </div>

            <br />
            <button type="submit" onClick={getDataAll} className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800' >Imprimir parámetros</button>
            <br />
            
            <div className='bg-gray-700 rounded-md p-4 mb-5'>
                <div className='flex items-center gap-2'>
                <form onSubmit={setOffsetCal2} className='' >
                    <button type="submit"  className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800'>Establecer</button>
                    <input type="number" name='valor' placeholder="Valor de Offset Cal2"  className='bg-gray-400 rounded-md ml-5 placeholder-gray-300 w-38 h-8'/>
                </form>
                </div>
                <br />
                <button type="button" onClick={getOffsetCal2} className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800'>Imprimir offset.valor Calefacción 2</button>
            </div>
            

            <div  className=' bg-gray-700 rounded-md p-4 mb-5'>
            <p className='text-red-500 font-bold'>Por terminar</p>

                <div className=''>
                    <form action="" className="flex flex-col items-center justify-center gap-4 mb-5">
                        <input type="number" name="id" placeholder="num calefaccion"  className='bg-gray-400 rounded-md placeholder-gray-300 w-52 h-8'/>
                        <input type="number" name="tempSinConectarCR" placeholder="valor tempSinConectarCR" className='bg-gray-400 rounded-md placeholder-gray-300 w-52 h-8'/>
                        <button type="submit" className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800'>Establecer</button>
                    </form>
                <button type="submit" /*onClick={getOffsetCal2}*/ className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800'>Imprimir todos los tempSinConectarCR</button>

                </div>
            </div>
        </div>

    )
}