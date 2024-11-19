import { Url } from "next/dist/shared/lib/router/router";
import { IconType } from "react-icons";


export interface MenuElemento {
    etiqueta: string; 
    icono: IconType; 
    ruta: string ; // propiedad de la ruta, para poder movernos 
}