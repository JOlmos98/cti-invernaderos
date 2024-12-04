import { setTempActualTick, getTempActual } from "@/lib/actionsCalefaccion";
import { calefaccion } from "./calefaccion";



// -------------------- SET tempActual en Dto en función de la DB --------------------
export async function tempActualDBaDto(){
                //Obtenemos temperaturas de la DB.
    const tempActual1= await getTempActual(0);
    const tempActual2= await getTempActual(1);
    const tempActual3= await getTempActual(2);
    
                //Establecemos temperaturas en el Dto.
    calefaccion[0].tempActual.valor=tempActual1;
    calefaccion[1].tempActual.valor=tempActual2;
    calefaccion[2].tempActual.valor=tempActual3;
}

// -------------------- SET tempActual si es >=30 y establecerlo en 15 --------------------
export function evaluarTempActual(idCal: number, valor: number){
    console.log("Valor actual: "+valor);
    if (valor>=30) {
        setTempActualTick(idCal, 15);
        calefaccion[idCal].tempActual.valor=15; //Reiniciar el valor local
    }
}

/*
Esta función recibe por parámetro el id de la calefacción y 
el valor de su temperatura, si es 30 o mayor lo establece en 
15 en la DB y en el Dto.
*/