import { setTempActualTick } from "@/lib/actionsCalefaccion";
import {calefaccion, NUM_CALEFACCIONES} from "./calefaccion/funcionalidad/calefaccion";
import { getTempActual } from "@/lib/actionsCalefaccion";

// ------- Emisor -------
import { EventEmitter } from "events";
import { evaluarTempActual } from "./calefaccion/funcionalidad/tempActual";
export const tempEmitter = new EventEmitter();
// ------- Emisor -------

export let estadoTick:boolean=false;
let intervalo:NodeJS.Timeout; //Creamos el intervalo que es de tipo NodeJS.Timeout, abajo lo usamos.
export const tempActualState = Array.from({ length: NUM_CALEFACCIONES }, () => 0); // Almacén compartido - LINEA AÑADIDA POR IA 

export async function encenderOApagarTick(){

    if (estadoTick){
        estadoTick=false;
        console.log("\n\nTick apagado.\n\n");
        clearInterval(intervalo); //Esto apaga el intervalo.
    }
    else {
        estadoTick=true;
        console.log("\n\nTick encendido.\n\n");
        intervalo = setInterval(async () => { //Esto crea de nuevo el intervalo y funciona hasta el infinito.

            //Obtenemos temperaturas de la DB.
            const tempActual1= await getTempActual(0);
            const tempActual2= await getTempActual(1);
            const tempActual3= await getTempActual(2);

            //Establecemos temperaturas en el Dto.
            calefaccion[0].tempActual.valor=tempActual1;
            calefaccion[1].tempActual.valor=tempActual2;
            calefaccion[2].tempActual.valor=tempActual3;

            for (let i=0;i<NUM_CALEFACCIONES;i++){

                //ifs para que unas Cal aumenten más rápidamente que otras.
                if (i===0) calefaccion[i].tempActual.valor+=0.1;
                if (i===1) calefaccion[i].tempActual.valor+=0.4;
                if (i===2) calefaccion[i].tempActual.valor+=1;
                
                //Esta función actualiza el valor en la DB.
                setTempActualTick(i, calefaccion[i].tempActual.valor);

                //Esta función evalua si el valor es mayor a 30 y lo establece en 15 en la DB y en el Dto.
                evaluarTempActual(i, calefaccion[i].tempActual.valor);

                tempActualState[i] = calefaccion[i].tempActual.valor; //EVENTO para mostrar en el page.tsx

            }
            tempEmitter.emit("tempUpdate", [...tempActualState]); //Emite EVENTO

        }, 1500);
    }
}

/*

const intervalo = setInterval(callback, intervaloEnMs);

callback: Es la función que quieres ejecutar repetidamente.
intervaloEnMs: Es el tiempo en milisegundos que debe esperar entre cada ejecución de la función.

*/