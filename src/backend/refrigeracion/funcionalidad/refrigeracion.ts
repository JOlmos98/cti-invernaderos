// Ruta de este archivo src/backend/refrigeracion/funcionalidad/refrigeracion.ts

import {RefrigeracionDto}  from '../interfaces/refrigeracion.dto';

export const refrigeracion: RefrigeracionDto[] = [];

export const NUM_REFRIGERACIONES:number=3;

for (let i = 0; i < NUM_REFRIGERACIONES; i++){
    refrigeracion[i] = new RefrigeracionDto();
}