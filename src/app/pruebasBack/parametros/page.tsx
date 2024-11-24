"use client";

import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import Greet from "./invoke"; // Mantén el componente Greet si es necesario

export default function Parametros() {
  const [showGreet, setShowGreet] = useState(false); // Estado para mostrar/ocultar el componente Greet
  const toggleGreet = () => {
    setShowGreet(true); // Al hacer clic, se muestra Greet
  };

  // Función para obtener todos los parámetros
  const fetchAllParametros = async () => {
    try {
      // Llamar al comando de Rust para obtener todos los parámetros
      const parametros = await invoke<{ id: number; nombre: string; valor: number }[]>(
        "get_all_parametros_command"
      );
      // Imprimir por consola la lista de parámetros obtenida
      console.log("Lista de parámetros:", parametros);
    } catch (error) {
      console.error("Error obteniendo los parámetros:", error);
    }
  };

  return (
    <div className="flex flex-col w-200 items-center justify-center gap-2">
      <h1 className="flex flex-col w-200 items-center justify-center gap-8 mb-10 mt-5 text-2xl">
        Parametros Cal2
      </h1>

      {/* Botón para mostrar el componente Greet */}
      <button
        type="button"
        onClick={toggleGreet}
        className="bg-orange-500 p-2 mb-7 rounded-md font-bold hover:bg-orange-800"
      >
        Greet
      </button>
      {showGreet && <Greet />}

      <div className="bg-gray-700 rounded-md p-4">
        <div>
          <p className="text-yellow-100">HACER: introducir id de usuario e imprimir por consola</p>
        </div>
      </div>

      <br />
      {/* Botón para obtener e imprimir los parámetros */}
      <button
        type="button"
        onClick={fetchAllParametros}
        className="bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800"
      >
        Imprimir parámetros
      </button>
      <br />
    </div>
  );
}
