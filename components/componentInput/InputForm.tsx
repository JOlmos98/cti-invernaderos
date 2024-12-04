"use client"
import React, { useState } from "react";

const InputForm = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleConfirm = () => {
    alert(`Valor confirmado: ${inputValue}`);
    setInputValue(""); // Reinicia el valor después de confirmar
  };

  const handleCancel = () => {
    setInputValue(""); // Reinicia el valor al cancelar
  };

  return (
    <div className="max-w-2xl mx-auto p-10 bg-gray-50 border rounded-md shadow-md">
      <label htmlFor="title" className="block text-xl font-medium text-gray-700">
        Configuracion  <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="title"
        placeholder="Escribiendo"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
      <p className="mt-2 text-sm text-gray-500">
        Por favor introduzca un valor entre 15º C - 30 ºC
      </p>

      <div className="mt-6 flex justify-end space-x-5">
        <button
          onClick={handleCancel}
          className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Cancelar
        </button>
        <button
          onClick={handleConfirm}
          className="px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default InputForm;