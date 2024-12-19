"use client"

import Calefaccion from "@/app/calefaccion/page";
import React, { useRef, useState } from "react";
import { setOffset } from "@/lib/actionsCalefaccion";
import TecladoNumerico from "../tecladoNumerico/TecladoNumerico";

// ✓ Correcto funcionanmiento de los endpoints
type OffsetFormProps ={
  id:number;
}

const OffsetForm: React.FC<OffsetFormProps> = ({ id }) => {
  const formRef = useRef<HTMLFormElement>(null); 

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
    

    <form
      ref={formRef} className="space-y-4" >
      <div className="text-2xl font-semibold text-gray-900 mb-4 text-center"> Offset de Calefacción </div>
        <input
          type="number"
          name="valor"
          placeholder={`Valor de Offset para calefacción ${id + 1}`}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 
                   focus:ring focus:ring-blue-100 transition-all
                   outline-none text-gray-700 placeholder-gray-400 text-lg"
        />
    </form>
  </div>
  );
};

export default OffsetForm;