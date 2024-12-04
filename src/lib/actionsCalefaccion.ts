'use server'

import prisma from "@/lib/prisma";
import { calefaccion, NUM_CALEFACCIONES } from "../backend/calefaccion/funcionalidad/calefaccion";

// -------------------------------------------------- getDataAll --------------------------------------------------
export async function getDataAll() {                                        
     console.log('getData (Imprime la lista entera de parámetros)');
     const params = await prisma.parametros.findMany();
     console.log('Parámetros: ', params);
     return params;
}

// -------------------------------------------------- ↓ GET ↓ --------------------------------------------------

// -------------------- GET offset --------------------
export async function getOffset(idCal:number){
     const idDto=calefaccion[idCal].offset.id

     const offsetDB = await prisma.parametros.findFirst({
          where: {
               id: idDto
          },
          select: {
               valor: true
          }
     });

     const offsetObtenido=offsetDB ? Number(offsetDB.valor) : 0;
     console.log('TempActual DB: ', offsetDB, "TempActual Dto: ", calefaccion[idCal].offset.valor);

     calefaccion[idCal].offset.valor=offsetObtenido;

     return calefaccion[idCal].offset.valor;
}

// -------------------- GETALL tempSinConectarCR --------------------
export async function getAlltempSinConectarCR(){
     console.log('getData (Imprime todos los tempSinConectarCR)');

     for (let i=0;i<NUM_CALEFACCIONES;i++) {
          const idDto=calefaccion[i].tempSinConectarCR.id;

          console.log('tempSinConectarCR de CAL', (i+1), ":" , calefaccion[i].tempSinConectarCR.valor);
     }
     return true;
}

// -------------------------------------------------- ↓ SET ↓ --------------------------------------------------

// -------------------- SET offset --------------------
export async function setOffset(idCal:number, formData: FormData) {

     const idDto=calefaccion[idCal].offset.id
     const valor=formData.get('valor');

     const offsetDB = await prisma.parametros.findFirst({where: {id: idDto}});
     const pkid=offsetDB?.pkid;

     console.log("Offset de ", (idCal+1)," antes: ", calefaccion[idCal].offset.valor);

     //Esto establece el valor en la DB
     await prisma.parametros.update({
          where: {
               pkid: pkid
          },
          data: {
               valor: valor as string
          }
     })

     //Esto establece el valor en el Dto
     calefaccion[idCal].offset.valor = Number(valor);

     console.log("Offset de ", (idCal+1)," ahora: ", valor);
}

// -------------------- SET tempSinConectarCR --------------------
//En este SET lo gestionamos todo con el Form, en el se introducen el id de la Calefaccion y el valor de tempSinConectarCR
export async function setTempSinConectarCR(formData: FormData) {

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
 
     console.log("4. Aqui el calefaccion.["+idInputNumber+"].tempSinConectarCR.valor es: ", calefaccion[(idInputNumber-1)].tempSinConectarCR.valor);
 }

 // -------------------------------------------------- ↓ TICK ↓ --------------------------------------------------

// -------------------- Get para el tick, para asignar en el Dto antes de empezar a aumentar --------------------

//Este get lo usamos para que en el tick las tempActual no empiecen en 0 y se coja el valor de la base de datos para el Dto.
export async function getTempActual(idCal:number) {

     const idDto=calefaccion[idCal].tempActual.id

     const tempActualDB = await prisma.parametros.findFirst({
          where: {
               id: idDto
          },
          select: {
               valor: true
          }
     });

     console.log('TempActual DB: ', tempActualDB);
     return tempActualDB ? Number(tempActualDB.valor) : 0;
}

// -------------------- SET tempActual (form) --------------------
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

 // -------------------- SET tempActual (tick) --------------------
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
 
     console.log("4. Aqui el calefaccion.["+idInputNumber+"].tempActual.valor es: ", calefaccion[idInputNumber].tempActual.valor);
 }



//Este es el GET correcto, con la consulta obtiene el valor de la DB (que es un string) y al final del action lo devuelve como number, y si no deuvele nada, devuelve un valor 0.

//ANTIGUO SET cal 1 (action={setOffsetCal1})
/*
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
*/