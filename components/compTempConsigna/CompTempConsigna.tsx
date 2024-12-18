
import { getTempSinConectarCR, setOffset, setTempSinConectarCR } from '@/lib/actionsCalefaccion';
import { useRouter } from 'next/router';
import React, { useRef } from 'react'
import { LuCheck, LuX } from 'react-icons/lu';

// endpoints temperatura de consigna
type TempConsignaProps ={
  id:number;
}

const CompTempConsigna: React.FC <TempConsignaProps> = ({id}) => {
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const handleConfirm = async () => {
        if (formRef.current) {
            const formData = new FormData (formRef.current); 
            const valor = formData.get("valor"); 
            if (!valor || Number(valor) <= 0) {
                alert("Por favor, ingrese un valor válido para el Offset.");
                return;
              }
              try {
                await setOffset(id, formData);
                alert("Offset establecido correctamente.");
                router.back(); // Navega a la pantalla anterior
              } catch (error: unknown) {
                if (error instanceof Error) {
                  alert(`Error al establecer el Offset: ${error.message}`);
                }
        }
    }
}; 

const handleExit = () => {
    const confirmExit = window.confirm(
      "¿Estás seguro de que quieres salir? Se perderán los cambios no guardados."
    );
    if (confirmExit) {
      router.back();
    }
  };


   return (
    <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
    {/* Encabezado */}
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={handleConfirm}
        className="text-gray-800 hover:text-green-600 transition"
        aria-label="Confirmar"
      >
        <LuCheck size={28} />
      </button>

      <h2 className="text-2xl font-semibold text-gray-900 text-center flex-grow">
        Temperatura de Consigna {id + 1}
      </h2>

      <button
        onClick={handleExit}
        className="text-gray-800 hover:text-red-600 transition"
        aria-label="Cancelar"
      >
        <LuX size={28} />
      </button>
    </div>

    {/* Formulario */}
    <form ref={formRef} className="space-y-4">
      <input
        type="number"
        name="valor"
        placeholder={`Valor de Offset para calefacción ${id + 1}`}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 
                   focus:ring focus:ring-blue-100 transition-all outline-none text-gray-700 
                   placeholder-gray-400 text-lg"
      />
    </form>
  </div>

  )
}

export default CompTempConsigna
