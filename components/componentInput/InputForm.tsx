"use client"
import Calefaccion from "@/app/calefaccion/page";
import React, { useState } from "react";
import { getOffset, setOffset } from "@/lib/actionsCalefaccion";
import { Eye } from "lucide-react";

// ✓ Correcto funcionanmiento de los endpoints
type OffsetFormProps ={
  id:number;
}

const OffsetForm: React.FC<OffsetFormProps> = ({ id }) => {
  return (
    <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
    <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
      Offset de Calefacción {id + 1}
    </h2>

    <form
      onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        try {
          await setOffset(id, formData);  // Server Action => actualizar el valor offset
        } catch (error: any) {
          alert(`Error al establecer el Offset: ${error.message}`);
        }
      }}
      className="space-y-8"
    >
      <div className="space-y-4">
        <input
          type="number"
          name="valor"
          placeholder={`Valor de Offset para calefacción ${id + 1}`}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 
                   focus:ring focus:ring-blue-100 transition-all
                   outline-none text-gray-700 placeholder-gray-400 text-lg"
        />
        
        <div className="flex gap-4 justify-between mt-5">
        <button
            type="submit"
            className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg"
          >
            Establecer
          </button>

          <button
            type="button"
            onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                form.reset();  // Resetea el formulario
              }
            }}
            className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  </div>
  );
};

export default OffsetForm;