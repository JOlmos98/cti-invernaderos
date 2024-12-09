"use client"
import Calefaccion from "@/app/calefaccion/page";
import React, { useState } from "react";
import {calefaccion } from "@/backend/calefaccion/funcionalidad/calefaccion";
import { getOffset, setOffset } from "@/lib/actionsCalefaccion";

//pruebas Endpoints 
type OffsetFormProps ={
  id:number;
}

const OffsetForm: React.FC<OffsetFormProps> = ({ id }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Formulario para establecer el Offset */}
      <form
        onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault(); // Evitar el comportamiento predeterminado
          const formData = new FormData(event.currentTarget); 
          await setOffset(id, formData); 
        }}
        className="flex items-center gap-2"
      >
        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 rounded-md font-bold text-white hover:bg-blue-800"
        >
          Establecer CAL{id}
        </button>
        <input
          type="number"
          name="valor"
          placeholder={`Valor de Offset Cal${id}`}
          className="bg-gray-200 rounded-md ml-1 placeholder-gray-500 w-32 h-10 px-2"
        />
      </form>

      {/* Botón para imprimir el Offset */}
      <button
        type="button"
        onClick={async () => {
           await getOffset (id); // Llamada a la función onGetOffset
          alert(`Offset actual para CAL${id}`);
        }}
        className="bg-green-500 px-4 py-2 rounded-md font-bold text-white hover:bg-green-800"
      >
        Mostrar Offset
      </button>
    </div>
  );
};

export default OffsetForm;