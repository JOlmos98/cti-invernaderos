'use client';

import { setTempSinConectarCR } from "@/lib/actionsCalefaccion";
import { useRouter } from "next/navigation";
import { LuCheck, LuX } from "react-icons/lu";



type TempConsignaHeaderProps ={
  id:number;
}; 

const TempConsignaHeader: React.FC <TempConsignaHeaderProps> = ({id}) => {
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
        await setTempSinConectarCR(id, formData);
        alert('Offset establecido correctamente.');
        router.back(); // Regresar a la página anterior
      } catch (error: unknown) {
        if (error instanceof Error) {
          alert(`Error al establecer el Offset: ${error.message}`);
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
      Temperatura de Consigna
    </h1>

    {/* Botón Cancelar */}
    <button
      onClick={handleExit}
      aria-label="Cancelar"
    >
      <LuX size={35} />
    </button>
  </div>  
  );
}; 
export default TempConsignaHeader;