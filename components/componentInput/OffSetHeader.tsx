'use client';

import { setOffset } from "@/lib/actionsCalefaccion";
import { useRouter } from "next/navigation";
import { LuCheck, LuX } from "react-icons/lu";




type OffsetHeaderProps ={
  id:number;
};

const OffsetHeader: React.FC <OffsetHeaderProps> = ({id}) => {
    const router = useRouter();

    const handleConfirm = async () => {
    const form = document.querySelector<HTMLFormElement>('form');
    if (form) {
      const formData = new FormData(form);
      const valor = Number(formData.get('valor'));

      // Validar formulario
      if (!valor || valor <= 0) {
        alert('Por favor, ingrese un valor válido para el Offset.');
        return;
      }

      try {
        await setOffset(id, formData);  // Server Action => actualizar el valor offset
        router.back(); // Regresar a la página anterior
      } catch (error: unknown) {
        if (error instanceof Error) {
          alert(`Error al establecerse el Offset: ${error.message}`);
        }
      }
    }
  };

  const handleExit = () => {
    const confirmExit = window.confirm(
      '¿Estás seguro de que quieres salir? Se perderán los cambios no guardados.'
    );
    if (confirmExit) {
      router.back();
    }
  };

  return (
    <div className="flex justify-between items-center w-full">
    {/* Botón Confirmar */}
    <button
      onClick={handleConfirm}
      aria-label="Confirmar"
    >
      <LuCheck size={35} />
    </button>

    {/* Título */}
    <h1 className="text-3xl font-bold text-center flex-grow">
      Offset de Calefacción
    </h1>

    {/* Botón Cancelar */}
    <button
      onClick={handleExit}
      aria-label="Cancelar"
    >
      <LuX size={35} />
    </button>
  </div>    
  )   
}; 

export default OffsetHeader; 