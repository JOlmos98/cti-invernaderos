'use server'

import prisma from "@/lib/prisma";

import bcrypt from 'bcrypt';

import { calefaccion, NUM_CALEFACCIONES } from "../backend/calefaccion/funcionalidad/calefaccion";
import { globals } from "../backend/globals/globals";
import { loadParam as loadParam, setCounterLevel } from "../backend/parametros/paramLoad";
import { TP } from '../backend/parametros/tiposGlobales';
import { LoadingAllParams } from "@/backend/parametros/loadingParameters";

// -------------------------------------------------- getDataAll --------------------------------------------------
export async function getDataAll() {
     console.log('getData (Imprime la lista entera de parámetros)');
     const params = await prisma.parametros.findMany();
     console.log('Parámetros: ', params);
     return params;
}





// -------------------------------------------------- PRUEBAS CON CALEFACCION 2 --------------------------------------------------

export async function getOffsetCal2(){
     console.log('getData (Imprime el offset de la calefacción 2)');

     const idDto=calefaccion[1].offset.id;

     const offset = await prisma.parametros.findFirst({
          where: {
               id: idDto
          }
     })
     console.log('Offset: ', calefaccion[1].offset.valor);
     return calefaccion[1].offset.valor;
}

export async function setOffsetCal2(formData: FormData) {
    const idDto=calefaccion[1].offset.id;
    const valor=formData.get('valor') as string;
    console.log("1. Aqui tenemos el idDto:", idDto, typeof idDto, "Y el valor recibido del form:", valor, typeof valor);
    //Tenemos que obtener el pkid mediante el id (bigInt) para hacer un update:
    const object = await prisma.parametros.findFirst({where: {id: idDto}}); //Si usasemos select obtendriamos el pkid solo, así obtenemos elobjeto entero.

    const pkid=object?.pkid;
    console.log("2. Aqui tenemos el pkid obtenido mediante el id bigint:", pkid, typeof pkid);
    //Obtenido el pkid mediante el id bigint
    console.log("3. Aqui el cal2.offset.valor es: ", calefaccion[1].offset.valor);
    await prisma.parametros.update({
         where: {
              pkid: pkid
         },
         data: {
              valor: valor
         }
    })
    console.log('Valor Offset Cal2 establecido: ', valor);
    globals.loadedParameters = false;
    LoadingAllParams(); //Esto imprimirá otra vez el Cargando... y establece 
    console.log("4. Aqui el cal2.offset.valor es: ", calefaccion[1].offset.valor);
}