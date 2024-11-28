'use server'

import prisma from "@/lib/prisma";

import bcrypt from 'bcrypt';

import { calefaccion, NUM_CALEFACCIONES } from "../backend/calefaccion/funcionalidad/calefaccion";
import { globals } from "../backend/globals/globals";
import { loadParam as loadParam, setCounterLevel } from "../backend/parametros/paramLoad";
import { TP } from '../backend/parametros/tiposGlobales';
import { LoadingAllParams } from "@/backend/parametros/loadingParameters";
import { threadId } from "worker_threads";

// -------------------------------------------------- getDataAll --------------------------------------------------
export async function getDataAll() {
     console.log('getData (Imprime la lista entera de parámetros)');
     const params = await prisma.parametros.findMany();
     console.log('Parámetros: ', params);
     return params;
}

// -------------------------------------------------- PRUEBAS CON CALEFACCION --------------------------------------------------

// -------------------------------------------------- ↓ GET ↓ --------------------------------------------------

//GET cal 1
export async function getOffsetCal1(){
     console.log('getData (Imprime el offset de la calefacción 1)');

     const idDto=calefaccion[0].offset.id;

     /*const offset = await prisma.parametros.findFirst({
          where: {
               id: idDto
          }
     })*/
     console.log('Offset: ', calefaccion[0].offset.valor);
     return calefaccion[0].offset.valor;
}

//GET cal 2
export async function getOffsetCal2(){
     console.log('getData (Imprime el offset de la calefacción 2)');

     const idDto=calefaccion[1].offset.id;

     /*const offset = await prisma.parametros.findFirst({
          where: {
               id: idDto
          }
     })*/
     console.log('Offset: ', calefaccion[1].offset.valor);
     return calefaccion[1].offset.valor;
}

//GET cal 3
export async function getOffsetCal3(){
     console.log('getData (Imprime el offset de la calefacción 3)');

     const idDto=calefaccion[2].offset.id;

     /*const offset = await prisma.parametros.findFirst({
          where: {
               id: idDto
          }
     })*/
     console.log('Offset: ', calefaccion[2].offset.valor);
     return calefaccion[2].offset.valor;
}

//GET los tres tempSinConectarCR
export async function getAlltempSinConectarCR(){
     console.log('getData (Imprime todos los tempSinConectarCR)');

     //Aquí para hacerlo automático haríamos un bucle que recorra todas las posibles calefacciones en función de NUM_CALEFACCIONES
     for (let i=0;i<NUM_CALEFACCIONES;i++) {
          const idDto=calefaccion[i].tempSinConectarCR.id;
          /*const tempSinConectarCR = await prisma.parametros.findFirst({
               where: {
                    id: idDto
               }
          })*/
          console.log('tempSinConectarCR de CAL', (i+1), ":" , calefaccion[i].tempSinConectarCR.valor);
     }
     return true;
}
     /*const idDto1=calefaccion[0].tempSinConectarCR.id;
     const idDto2=calefaccion[1].tempSinConectarCR.id;
     const idDto3=calefaccion[2].tempSinConectarCR.id;

     const offset = await prisma.parametros.findFirst({
          where: {
               id: idDto
          }
     })
     console.log('Offset: ', calefaccion[2].offset.valor);
     return calefaccion[2].offset.valor;
}*/

// -------------------------------------------------- ↓ SET ↓ --------------------------------------------------

//SET cal 1
export async function setOffsetCal1(formData: FormData) {
    const idDto=calefaccion[0].offset.id;
    const valor=formData.get('valor');
    console.log("1. Aqui tenemos el idDto:", idDto, typeof idDto, "Y el valor recibido del form:", valor, typeof valor);
    //Tenemos que obtener el pkid mediante el id (bigInt) para hacer un update:
    const object = await prisma.parametros.findFirst({where: {id: idDto}}); //Si usasemos select obtendriamos el pkid solo, así obtenemos elobjeto entero.

    const pkid=object?.pkid;
    console.log("2. Aqui tenemos el pkid obtenido mediante el id bigint:", pkid, typeof pkid);
    //Obtenido el pkid mediante el id bigint
    console.log("3. Aqui el cal1.offset.valor es: ", calefaccion[0].offset.valor);
    await prisma.parametros.update({
         where: {
              pkid: pkid
         },
         data: {
              valor: valor as string
         }
    })
    console.log('Valor Offset Cal1 establecido: ', valor);
    calefaccion[0].offset.valor = Number(valor);
    //globals.loadedParameters = false;
    //LoadingAllParams(); //Esto imprimirá otra vez el Cargando... y establece 

    console.log("4. Aqui el cal1.offset.valor es: ", calefaccion[0].offset.valor);
}

//SET cal 2
export async function setOffsetCal2(formData: FormData) {
     const idDto=calefaccion[1].offset.id;
     const valor=formData.get('valor');
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
               valor: valor as string
          }
     })
     console.log('Valor Offset Cal2 establecido: ', valor);
     calefaccion[1].offset.valor = Number(valor);
     //globals.loadedParameters = false;
     //LoadingAllParams(); //Esto imprimirá otra vez el Cargando... y establece 
 
     console.log("4. Aqui el cal2.offset.valor es: ", calefaccion[1].offset.valor);
 }

 //SET cal 3
 export async function setOffsetCal3(formData: FormData) {
     const idDto=calefaccion[2].offset.id;
     const valor=formData.get('valor');
     console.log("1. Aqui tenemos el idDto:", idDto, typeof idDto, "Y el valor recibido del form:", valor, typeof valor);
     //Tenemos que obtener el pkid mediante el id (bigInt) para hacer un update:
     const object = await prisma.parametros.findFirst({where: {id: idDto}}); //Si usasemos select obtendriamos el pkid solo, así obtenemos elobjeto entero.
 
     const pkid=object?.pkid;
     console.log("2. Aqui tenemos el pkid obtenido mediante el id bigint:", pkid, typeof pkid);
     //Obtenido el pkid mediante el id bigint
     console.log("3. Aqui el cal3.offset.valor es: ", calefaccion[2].offset.valor);
     await prisma.parametros.update({
          where: {
               pkid: pkid
          },
          data: {
               valor: valor as string
          }
     })
     console.log('Valor Offset Cal3 establecido: ', valor);
     calefaccion[2].offset.valor = Number(valor);
     //globals.loadedParameters = false;
     //LoadingAllParams(); //Esto imprimirá otra vez el Cargando... y establece 
 
     console.log("4. Aqui el cal3.offset.valor es: ", calefaccion[2].offset.valor);
 }

//SET tempSinConectarCR según calefacción elegida
export async function setTempSinConectarCR(formData: FormData) {

     //for (let i=0;i<NUM_CALEFACCIONES;i++) {

     //}

     const idInput=formData.get('id');
     const valor=formData.get('valorTempSinConectarCR');

     const idInputNumber=Number(idInput);
     if (idInputNumber<=0 || idInputNumber>NUM_CALEFACCIONES) {
          console.error("El idInput debe ser mayor que 0 y menor o igual que "+NUM_CALEFACCIONES);
          return; //Detiene la ejecución de la función
     }

     const idDto=calefaccion[(idInputNumber-1)].tempSinConectarCR.id

     console.log("1. Aqui tenemos el idDto:", idDto, typeof idDto, "Y el valor recibido del form:", valor, typeof valor);
     //Tenemos que obtener el pkid mediante el id (bigInt) para hacer un update:
     const object = await prisma.parametros.findFirst({where: {id: idDto}}); //Si usasemos select obtendriamos el pkid solo, así obtenemos elobjeto entero.
 
     const pkid=object?.pkid;
     console.log("2. Aqui tenemos el pkid obtenido mediante el id bigint:", pkid, typeof pkid);
     //Obtenido el pkid mediante el id bigint
     console.log("3. Aqui el calefaccion.["+idInputNumber+"].tempSinConectarCR.valor es: ", calefaccion[(idInputNumber-1)].tempSinConectarCR.valor);
     await prisma.parametros.update({
          where: {
               pkid: pkid
          },
          data: {
               valor: valor as string
          }
     })
     console.log("Valor tempSinConectarCR Cal"+idInputNumber+" establecido: ", valor);
     calefaccion[(idInputNumber-1)].tempSinConectarCR.valor = Number(valor);
     //globals.loadedParameters = false;
     //LoadingAllParams(); //Esto imprimirá otra vez el Cargando... y establece 
 
     console.log("4. Aqui el calefaccion.["+idInputNumber+"].tempSinConectarCR.valor es: ", calefaccion[(idInputNumber-1)].tempSinConectarCR.valor);
 }

 //SET tempActual según calefacción elegida con FORM
 export async function setTempActualForm(formData: FormData) {

     const idInput=formData.get('id');
     const valor=formData.get('valor');

     const idInputNumber=Number(idInput);
     if (idInputNumber<=0 || idInputNumber>NUM_CALEFACCIONES) {
          console.error("El idInput debe ser mayor que 0 y menor o igual que "+NUM_CALEFACCIONES);
          return; //Detiene la ejecución de la función
     }

     const idDto=calefaccion[(idInputNumber-1)].tempActual.id

     console.log("1. Aqui tenemos el idDto:", idDto, typeof idDto, "Y el valor recibido del form:", valor, typeof valor);
     //Tenemos que obtener el pkid mediante el id (bigInt) para hacer un update:
     const object = await prisma.parametros.findFirst({where: {id: idDto}}); //Si usasemos select obtendriamos el pkid solo, así obtenemos elobjeto entero.
 
     const pkid=object?.pkid;
     console.log("2. Aqui tenemos el pkid obtenido mediante el id bigint:", pkid, typeof pkid);
     //Obtenido el pkid mediante el id bigint
     console.log("3. Aqui el calefaccion.["+(idInputNumber-1)+"].tempActual.valor es: ", calefaccion[(idInputNumber-1)].tempActual.valor);
     await prisma.parametros.update({
          where: {
               pkid: pkid
          },
          data: {
               valor: valor as string
          }
     })
     console.log("Valor tempActual Cal"+idInputNumber+" establecido: ", valor);
     calefaccion[(idInputNumber-1)].tempActual.valor = Number(valor);
     //globals.loadedParameters = false;
     //LoadingAllParams(); //Esto imprimirá otra vez el Cargando... y establece 
 
     console.log("4. Aqui el calefaccion.["+(idInputNumber-1)+"].tempActual.valor es: ", calefaccion[(idInputNumber-1)].tempActual.valor);
 }

 //SET tempActual según calefacción elegida con TICK
 export async function setTempActualTick(idCal:number, valorTempActual:number) {

     const idInput=idCal;
     const valor=valorTempActual.toString();

     const idInputNumber=Number(idInput);
     if (idInputNumber<0 || idInputNumber>NUM_CALEFACCIONES) {
          console.error("El idInput debe ser 0 y menor o igual que "+NUM_CALEFACCIONES);
          return; //Detiene la ejecución de la función
     }

     const idDto=calefaccion[idInputNumber].tempActual.id

     console.log("1. Aqui tenemos el idDto:", idDto, typeof idDto, "Y el valor recibido del form:", valor, typeof valor);
     //Tenemos que obtener el pkid mediante el id (bigInt) para hacer un update:
     const object = await prisma.parametros.findFirst({where: {id: idDto}}); //Si usasemos select obtendriamos el pkid solo, así obtenemos elobjeto entero.
 
     const pkid=object?.pkid;
     console.log("2. Aqui tenemos el pkid obtenido mediante el id bigint:", pkid, typeof pkid);
     //Obtenido el pkid mediante el id bigint
     console.log("3. Aqui el calefaccion.["+idInputNumber+"].tempActual.valor es: ", calefaccion[idInputNumber].tempActual.valor);
     await prisma.parametros.update({
          where: {
               pkid: pkid
          },
          data: {
               valor: valor as string
          }
     })
     console.log("Valor tempActual Cal"+idInputNumber+" establecido: ", valor);
     calefaccion[idInputNumber].tempActual.valor = Number(valor);
     //globals.loadedParameters = false;
     //LoadingAllParams(); //Esto imprimirá otra vez el Cargando... y establece 
 
     console.log("4. Aqui el calefaccion.["+idInputNumber+"].tempActual.valor es: ", calefaccion[idInputNumber].tempActual.valor);
 }

 //export async function getTempActual(idCal:number) {

 //}
/*export async function loadParamAgain(){
    globals.loadedParameters = false;
    LoadingAllParams(); 
    //Esto imprimirá otra vez el Cargando... y teoricamente actualiza los DTO obteniendo los datos de la DB
}*/