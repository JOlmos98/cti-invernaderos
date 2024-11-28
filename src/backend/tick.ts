import { setTempActualTick } from "@/lib/actionsCalefaccion";
import {calefaccion, NUM_CALEFACCIONES, comprobarTempActual} from "./calefaccion/funcionalidad/calefaccion";

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
                comprobarTempActual(i);
                console.log(" \n\n===== AQUI I VALE: ", i, "=====\n\n");
            }
            
        }, 500);
    }

}

/*

const intervalo = setInterval(callback, intervaloEnMs);

callback: Es la función que quieres ejecutar repetidamente.
intervaloEnMs: Es el tiempo en milisegundos que debe esperar entre cada ejecución de la función.

*/