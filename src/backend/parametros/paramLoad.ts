import prisma from "@/lib/prisma";
import { Parametros1 } from "@prisma/client";
import { BParam, IParam, SParam, TP } from "./tiposGlobales";

const idCounter = {
     counter: BigInt(0),
     level: 0
}

const incGeneral: number = 4294967296; //+9 - 32bits
const inRepeticion1: number = 8388608; //+6 - 23bits
const incRepeticion2: number = 131072; //+6 - 17bits
const incRepeticion3: number = 2048;   //+4 - 11bits
const incRepeticion4: number = 128;    //+0    7bit

export const loadParam4 = async (param:  IParam | BParam|SParam, inicializacion: { tipo: number, min?: number, max?: number, valor: number | boolean | string, reset: number; tipoImportacion: number, nombre: string }) => {

     let xvalor: string = "";
     const xidc: bigint = idc();

     switch (inicializacion.tipo) {
          case TP.INTEGER|TP.REAL:
               param.id = xidc;
               param.tipo = inicializacion.tipo;
               param.valor = inicializacion.valor as number
               (param as IParam).min = inicializacion.min!;
               (param as IParam).max = inicializacion.max!;
               param.reset = inicializacion.reset;
               param.tipoImportacion = inicializacion.tipoImportacion;
               param.nombre = inicializacion.nombre;
               break;
          case TP.BOOLEAN|TP.STRING:
               param.id = xidc
               param.tipo = inicializacion.tipo;
               if (inicializacion.tipo === TP.STRING) 
                    param.valor = inicializacion.valor;
               else
                    param.valor = inicializacion.valor as boolean;
               param.reset = inicializacion.reset;
               param.tipoImportacion = inicializacion.tipoImportacion;
               param.nombre = inicializacion.nombre;
               break;
     }


     const result = await prisma.parametros1.findFirst({
          where: {
               id: xidc
          }
     })

     if (!result) {
          // hay que crear el valor, haciendo una insercion en memoria
          // y result tendrá el valor por defecto de la variable

          xvalor = param!.valor.toString(); //el condicinal hay que trabajarlo. El valor siempre existira

          const result = await prisma.parametros1.create({
               data: {
                    id: xidc,
                    valor: xvalor, //segun el tipo
                    nombre: inicializacion.nombre,
                    tipo: inicializacion.tipo,
               },
          });

     } else {

          xvalor = result.valor; //segun el tipo          
     }

     switch (inicializacion.tipo) {
          case TP.INTEGER|TP.REAL:
               (param as IParam).valor = Number(xvalor);  //el condicinal hay que trabajarlo. El valor siempre existira
               break;
          case TP.BOOLEAN:
               (param as BParam).valor = Boolean(xvalor); //el condicinal hay que trabajarlo. El valor siempre existira
               break;
          case TP.STRING:
               (param as SParam).valor = xvalor; //el condicinal hay que trabajarlo. El valor siempre existira
               break;
     }

}

export const idc = (): bigint => {

     return idCounter.counter++;
}

export const setCounterLevel = (level: number): void => {

     idCounter.level = level;
     

     switch (idCounter.level) {
          case 0: idCounter.counter = idCounter.counter & BigInt(0xFFFFF00000000); break;  //+9 - 32bits
          case 1: idCounter.counter = idCounter.counter & BigInt(0xFFFFFFF800000); break;  //+6 - 23bits
          case 2: idCounter.counter = idCounter.counter & BigInt(0xFFFFFFFFE0000); break;  //+6 - 17bits
          case 3: idCounter.counter = idCounter.counter & BigInt(0xFFFFFFFFFF800); break;  //+4 - 11bits
          case 4: idCounter.counter = idCounter.counter & BigInt(0xFFFFFFFFFFF80); break;  //      7bit
          default: break;
     }


     switch (idCounter.level) {
          case 0: idCounter.counter += BigInt(incGeneral); break;
          case 1: idCounter.counter += BigInt(inRepeticion1); break;
          case 2: idCounter.counter += BigInt(incRepeticion2); break;
          case 3: idCounter.counter += BigInt(incRepeticion3); break;
          case 4: idCounter.counter += BigInt(incRepeticion4); break;
          default: break;
     }


}