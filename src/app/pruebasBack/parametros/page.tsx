"use client";

import { useState } from "react";
import {Greet, GetAllParametros, GetUserById, GetUserByIdProps} from "./invoke"; // Mantén el componente Greet si es necesario

export default function Parametros() {

  // ------------------------------ ↓ Llamamos a la función Greet en invoke.tsx ↓ ------------------------------
  const [showGreet, setShowGreet] = useState(false); // Estado para mostrar/ocultar el componente Greet
  const toggleGreet = () => {
    setShowGreet(true); // Al hacer clic, se muestra Greet
  };

  // ------------------------------ ↓ Llamamos a la función GetAllParametros en invoke.tsx ↓ ------------------------------
  const handleFetchParametros = async () => {
    await GetAllParametros(); // Aquí llamamos la función correctamente
  };

  // ------------------------------ ↓ Llamamos a la función GetUserById en invoke.tsx ↓ ------------------------------
  const [id, setUserId] = useState<number | null>(null); // Estado para el ID de usuario

  const handleGetUser = () => {
    const inputElement = document.querySelector<HTMLInputElement>('input[name="id"]');
    if (inputElement) {
      const id = Number(inputElement.value);
      if (!isNaN(id)) {
        console.log("ID de usuario válido:", id);
        setUserId(id); // Actualiza el estado con el ID del usuario
      } else {
        console.error("ID de usuario no válido.");
      }
    } else {
      console.error("No se encontró el input.");
    }
  };

  // ------------------------------ ↓ return ↓ ------------------------------
  return (
    <div className="flex flex-col w-200 items-center justify-center gap-2">
      <h1 className="flex flex-col w-200 items-center justify-center gap-8 mb-5 mt-5 text-2xl">
        Parametros Cal2
      </h1>

      {/* Botón para mostrar el componente Greet */}
      <button type="button" onClick={toggleGreet} className="bg-orange-500 p-2 rounded-xl font-bold hover:bg-orange-800">Greet</button>
      {showGreet && <Greet />}

      <div className="bg-gray-700 rounded-xl mt-5 p-4">
        <div>
          <button type="button" onClick={handleGetUser} className="bg-blue-500 p-2 rounded-xl font-bold hover:bg-blue-800 text-yellow-100">Consultar User</button>
          <input type="number" name="id" placeholder=" ID" className='bg-gray-500 rounded-md placeholder-gray-300 ml-5 pl-1 text-yellow-100 h-8 w-16' />          
          {id !== null && <GetUserById id={id} />} {/* Pasa el userId como prop */}
        </div>
      </div>

      <br />
      {/* Botón para obtener e imprimir los parámetros */}
      <button type="button" onClick={handleFetchParametros} className="bg-blue-500 p-2 rounded-xl font-bold hover:bg-blue-800 text-yellow-100">
        Imprimir parámetros<br /><span className="font-extralight">(consola del cliente)</span>
      </button>
      <br />
    </div>
  );
}
