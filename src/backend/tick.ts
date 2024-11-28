import { setTempActualTick } from "@/lib/actionsCalefaccion";
import {calefaccion, NUM_CALEFACCIONES} from "./calefaccion/funcionalidad/calefaccion";
import { set } from "react-hook-form";

export let estadoTick:boolean=false;
let intervalo:NodeJS.Timeout;

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

            for (let i=0;i<NUM_CALEFACCIONES;i++){

                //ifs para que unas Cal aumenten más rápidamente que otras.
                if (i===0) calefaccion[i].tempActual.valor+=0.1;
                if (i===1) calefaccion[i].tempActual.valor+=0.4;
                if (i===2) calefaccion[i].tempActual.valor+=0.8;


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
            }
            
        }, 500);
    }

}

/*

const intervalo = setInterval(callback, intervaloEnMs);

callback: Es la función que quieres ejecutar repetidamente.
intervaloEnMs: Es el tiempo en milisegundos que debe esperar entre cada ejecución de la función.

*/