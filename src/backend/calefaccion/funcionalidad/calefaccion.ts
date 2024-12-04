// Ruta de este archivo src/backend/calefaccion/funcionalidad/calefaccion.ts

import {CalefaccionDto}  from '../interfaces/calefaccion.dto';

export const calefaccion: CalefaccionDto[] = [];

export const NUM_CALEFACCIONES:number=3;

for (let i = 0; i < NUM_CALEFACCIONES; i++){
    calefaccion[i] = new CalefaccionDto();
}





//Esta función en principio es innecesaria, metemos el if en el propio tick.
/*export async function comprobarTempActual(idCal: number){
    
    setInterval(async () => {

        //Valida la temperatura:
        if (calefaccion[idCal].tempActual.valor>=30) {
            setTempActualTick(idCal, 15);
        }

    }, 3000);

}*/

//Construir con bucle y variable MAX
//calefaccion[0] = new CalefaccionDto2();
//calefaccion[1] = new CalefaccionDto2();
//calefaccion[2] = new CalefaccionDto2();
//export const Calefaccion=()=>{
//}

//Esto se usa para establecer intervalos de tiempo.
/*
    setInterval(async () => {

    }, 3000);
*/