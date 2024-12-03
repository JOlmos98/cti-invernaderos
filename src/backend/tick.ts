import { setTempActualTick } from "@/lib/actionsCalefaccion";
import {calefaccion, NUM_CALEFACCIONES} from "./calefaccion/funcionalidad/calefaccion";
import { getTempActual } from "@/lib/actionsCalefaccion";

// ------- Emisor -------
import { EventEmitter } from "events";
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

            const tempActual1= await getTempActual(0);
            const tempActual2= await getTempActual(1);
            const tempActual3= await getTempActual(2);

            console.log("TEMPERATURAS INICIALES DB: ", tempActual1);
            console.log("TEMPERATURAS INICIALES DB: ", tempActual2);
            console.log("TEMPERATURAS INICIALES DB: ", tempActual3);

            console.log("TEMPERATURAS INICIALES Dto: ", calefaccion[0].tempActual.valor);
            console.log("TEMPERATURAS INICIALES Dto: ", calefaccion[1].tempActual.valor);
            console.log("TEMPERATURAS INICIALES Dto: ", calefaccion[2].tempActual.valor);

            calefaccion[0].tempActual.valor=tempActual1;
            calefaccion[1].tempActual.valor=tempActual2;
            calefaccion[2].tempActual.valor=tempActual3;

            console.log("TEMPERATURAS OBTENIDAS de DB en Dto: ", calefaccion[0].tempActual.valor);
            console.log("TEMPERATURAS INICIALES de DB en Dto: ", calefaccion[1].tempActual.valor);
            console.log("TEMPERATURAS INICIALES de DB en Dto: ", calefaccion[2].tempActual.valor);

            for (let i=0;i<NUM_CALEFACCIONES;i++){



                //ifs para que unas Cal aumenten más rápidamente que otras.
                if (i===0) calefaccion[i].tempActual.valor+=0.1;
                if (i===1) calefaccion[i].tempActual.valor+=0.4;
                if (i===2) calefaccion[i].tempActual.valor+=0.9;


                calefaccion[i].tempActual.valor+=0.1;
                setTempActualTick(i, (calefaccion[i].tempActual.valor));
                //comprobarTempActual(i); Esta función se reduce en el if de abajo

                if (calefaccion[i].tempActual.valor >= 30) {
                    // Restablecer a 15 solo una vez
                    setTempActualTick(i, 15);
                    calefaccion[i].tempActual.valor = 15; // Reiniciar el valor local
                } else {
                    // Continuar incrementando normalmente si no se ha llegado a 30
                    setTempActualTick(i, calefaccion[i].tempActual.valor);
                }
                tempActualState[i] = calefaccion[i].tempActual.valor; //EVENTO

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