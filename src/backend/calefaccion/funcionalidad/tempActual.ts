import { setTempActualTick } from "@/lib/actionsCalefaccion";
import { calefaccion } from "./calefaccion";

/*
Esta función recibe por parámetro el id de la calefacción y 
el valor de su temperatura, si es 30 o mayor lo establece en 
15 en la DB y en el Dto.
*/

export function evaluarTempActual(idCal: number, valor: number){
    console.log("Valor actual: "+valor);
    if (valor>=30) {
        setTempActualTick(idCal, 15);
        calefaccion[idCal].tempActual.valor=15; //Reiniciar el valor local
    }
}