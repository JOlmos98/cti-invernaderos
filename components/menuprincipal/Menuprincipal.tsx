import { BsFire } from "react-icons/bs";
import { MenuElemento } from "../interfaces"
import { IoSettings } from "react-icons/io5";
import Link from "next/link";



//inicializar la Interfaz 
const elementosMenu: MenuElemento[] = [
  { etiqueta: "Calefaccion", icono: BsFire , ruta: '/calefaccion'},
  { etiqueta: "Configuracion", icono: IoSettings, ruta: '/Configuracion'}
]; 
//Defimos el componente Elemento que recibe los props de la interfaz
const Elemento: React.FC<MenuElemento> = ({ etiqueta, icono: Icono, ruta }) => {
    return (
      <Link href={{pathname: ruta }} className="flex flex-col items-center" > 
          <Icono className="text-8xl mb-2" />
          <span className="text-lg mt-1">{etiqueta}</span> 
      </Link>
    );
  };
const Menuprincipal = () => {
  return (
    <div className="flex justify-around p-4 space-x-3">
        {elementosMenu.map((elemento,index) => (
             <Elemento key={index} etiqueta={elemento.etiqueta} icono={elemento.icono} ruta={elemento.ruta} />
        ))}
    </div>
  )
}

export default Menuprincipal; 