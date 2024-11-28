// Ruta de este archivo src/backend/calefaccion/funcionalidad/calefaccion.ts

import {CalefaccionDto}  from '../interfaces/calefaccion.dto';

export const calefaccion: CalefaccionDto[] = [];
export const NUM_CALEFACCIONES=4;

for (let i = 0; i < NUM_CALEFACCIONES; i++){
    calefaccion[i] = new CalefaccionDto();
}

//Construir con bucle y variable MAX
//calefaccion[0] = new CalefaccionDto2();
//calefaccion[1] = new CalefaccionDto2();
//calefaccion[2] = new CalefaccionDto2();
//export const Calefaccion=()=>{
//}