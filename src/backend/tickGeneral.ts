import { setTempActualTick } from "@/lib/actionsCalefaccion";
import { evaluarTempActual } from "./calefaccion/funcionalidad/tempActual";
import { globals } from "./globals/globals";
import { calefaccion, NUM_CALEFACCIONES } from "./calefaccion/funcionalidad/calefaccion";

//export let estadoTick:boolean=false;
let intervalo: NodeJS.Timeout; //Creamos el intervalo que es de tipo NodeJS.Timeout
let contadorSeg: number = 0;
let segundosTranscurridos: number = 0;

export async function encenderOApagarTick() {
  if (globals.tickGeneralEncendido) return; //Si es true, detenemos el arranque (por defecto al inicio será false).
  globals.tickGeneralEncendido = true;

  if (globals.guardaParametrosTick) {
    console.log("\n\nTick encendido.\n\n");
    intervalo = setInterval(async () => { //Esto crea de nuevo el intervalo y funciona hasta el infinito.
      

      // ---------- ↓ Funciones cada décima (100) ↓ ----------





      contadorSeg++;
      if (contadorSeg === 10) {
        contadorSeg = 0;
        segundosTranscurridos++;
        console.log("Segundos transcurridos: " + segundosTranscurridos);
        // ---------- ↓ Funciones cada segundo (1000) ↓ ----------

        for (let i=0;i<NUM_CALEFACCIONES;i++){
            if (i===0) calefaccion[i].tempActual.valor-=0.01;
            if (i===1) calefaccion[i].tempActual.valor-=0.2;
            if (i===2) calefaccion[i].tempActual.valor-=0.4;        
            setTempActualTick(i, calefaccion[i].tempActual.valor); //Estas 4 lineas de código son de prueba para que la tempActual vaya disminuyendo.

            evaluarTempActual(i, calefaccion[i].tempActual.valor); //Evalua cuando el contador interno llegue a 3, es decir, cada 3 segundos.
        }



      }

    }, 100); //Se ejecuta cada décima
  }
}

//DEPRECATED:

/*      //Este bloque funcionaba como interruptor, cada vez que se ejecutaba la función encendía o apagaba el Tick.
        if (estadoTick){
            estadoTick=false;
            console.log("\n\nTick apagado.\n\n");
            clearInterval(intervalo); //Esto apaga el intervalo.
        } else {

        }
*/

/*
const intervalo=setInterval(callback, intervaloEnMs);

↓ Explicación ↓

callback: Es la función que quieres ejecutar repetidamente, es decir, aquí esta todo lo gordo del código.
intervaloEnMs: Es el tiempo en milisegundos que debe esperar entre cada ejecución de la función.
*/

// -------------------- ↓ FUNCIONES PARA EL FUNCIONAMIENTO EN INTERVALO ↓ --------------------
/*
            for (let i=0;i<NUM_CALEFACCIONES;i++){

                // ifs para que unas Cal aumenten más rápidamente que otras.
                if (i===0) calefaccion[i].tempActual.valor+=0.1;
                if (i===1) calefaccion[i].tempActual.valor+=0.4;
                if (i===2) calefaccion[i].tempActual.valor+=1;
                
                // Esta función actualiza el valor en la DB en función de el del Dto ya aumentado.
                setTempActualTick(i, calefaccion[i].tempActual.valor);

                // Esta función evalua si el valor es mayor a 30 y lo establece en 15 en la DB y en el Dto.
                evaluarTempActual(i, calefaccion[i].tempActual.valor);

            }
            */
// -------------------- ↑ FUNCIONES PARA EL FUNCIONAMIENTO EN INTERVALO ↑ --------------------
