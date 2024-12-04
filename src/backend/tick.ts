import { setTempActualTick } from "@/lib/actionsCalefaccion";
import {calefaccion, NUM_CALEFACCIONES} from "./calefaccion/funcionalidad/calefaccion";
import { evaluarTempActual, tempActualDBaDto } from "./calefaccion/funcionalidad/tempActual";

// ------- Emisor -------
import { EventEmitter } from "events";
export const tempEmitter = new EventEmitter();
// ------- Emisor -------

export let estadoTick:boolean=false;
let intervalo:NodeJS.Timeout; //Creamos el intervalo que es de tipo NodeJS.Timeout.
export const tempActualState = Array.from({ length: NUM_CALEFACCIONES }, () => 0); // Almacén compartido - LINEA AÑADIDA POR IA 

// -------------------- ON/OFF Tick en función de la guarda "" --------------------

export async function encenderOApagarTick(){

    // -------------------- ↓ FUNCIONES PARA EL FUNCIONAMIENTO INICIAL ↓ --------------------

    tempActualDBaDto(); //Obtenemos los datos de la DB y los establece en el Dto.

    // -------------------- ↑ FUNCIONES PARA EL FUNCIONAMIENTO INICIAL ↑ --------------------

    if (estadoTick){
        estadoTick=false;
        console.log("\n\nTick apagado.\n\n");
        clearInterval(intervalo); //Esto apaga el intervalo.
    } else {
        estadoTick=true;
        console.log("\n\nTick encendido.\n\n");
        intervalo = setInterval(async () => { //Esto crea de nuevo el intervalo y funciona hasta el infinito (o hasta que estadoTick=false). 

            // -------------------- ↓ FUNCIONES PARA EL FUNCIONAMIENTO EN INTERVALO ↓ --------------------

            for (let i=0;i<NUM_CALEFACCIONES;i++){

                //ifs para que unas Cal aumenten más rápidamente que otras.
                if (i===0) calefaccion[i].tempActual.valor+=0.1;
                if (i===1) calefaccion[i].tempActual.valor+=0.4;
                if (i===2) calefaccion[i].tempActual.valor+=1;
                
                //Esta función actualiza el valor en la DB en función de el del Dto ya aumentado.
                setTempActualTick(i, calefaccion[i].tempActual.valor);

                //Esta función evalua si el valor es mayor a 30 y lo establece en 15 en la DB y en el Dto.
                evaluarTempActual(i, calefaccion[i].tempActual.valor);

                tempActualState[i] = calefaccion[i].tempActual.valor; //EVENTO para mostrar en el page.tsx
            }
            tempEmitter.emit("tempUpdate", [...tempActualState]); //Emite EVENTO

            // -------------------- ↑ FUNCIONES PARA EL FUNCIONAMIENTO EN INTERVALO ↑ --------------------

        }, 1500);
    }
}

/*
const intervalo=setInterval(callback, intervaloEnMs);

↓ Explicación ↓

callback: Es la función que quieres ejecutar repetidamente, es decir, aquí esta todo lo gordo del código.
intervaloEnMs: Es el tiempo en milisegundos que debe esperar entre cada ejecución de la función.
*/