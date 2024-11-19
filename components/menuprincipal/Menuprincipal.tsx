import { BsFire } from "react-icons/bs";
import { MenuElemento } from "../interfaces"
import { IoSettings } from "react-icons/io5";
import Link from "next/link";
import { PiFanFill } from "react-icons/pi";
import { LuThermometerSnowflake } from "react-icons/lu";



//inicializar la Interfaz 
const elementosMenu: MenuElemento[] = [
  { etiqueta: "Calefaccion", icono: BsFire , ruta: '/calefaccion'},
  { etiqueta: "Refrigeracion" , icono: LuThermometerSnowflake, ruta: '/refrigeracion'},
  { etiqueta: "Configuracion", icono: IoSettings, ruta: '/configuracion'}
  

]; 
//Defimos el componente Elemento que recibe los props de la interfaz
const Elemento: React.FC<MenuElemento> = ({ etiqueta, icono: Icono, ruta }) => {
    return (
      <Link href={{pathname: ruta }} className="flex flex-col items-center" > 
          <Icono style={{ fontSize: "150px", width: "80px", height: "80px" }} className="mb-4" />
          {/*Espacio entre icono y text*/}
          <span className="text-lg mt-1">{etiqueta}</span> 
      </Link>
    );
  };
  
const Menuprincipal = () => {
  return (
   <div className="flex gap-4 justify-around px-4"> {/*Espacio entre iconos*/}
        {elementosMenu.map((elemento,index) => (
             <Elemento key={index} etiqueta={elemento.etiqueta} icono={elemento.icono} ruta={elemento.ruta} />
        ))}
    </div>
  )
}


export default Menuprincipal; 