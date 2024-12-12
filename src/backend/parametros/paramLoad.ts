import prisma from "@/lib/prisma";
import { BParam, IParam, SParam, TP } from "./tiposGlobales";

// -------------------------------------------------- Aquí se generan los ID con el CounterLevel --------------------------------------------------

const idCounter = {
     counter: BigInt(0),
     level: 0
}

const incGeneral: number = 4294967296; //+9 - 32bits
const incRepeticion1: number = 8388608;//+6 - 23bits
const incRepeticion2: number = 131072; //+6 - 17bits
const incRepeticion3: number = 2048;   //+4 - 11bits
const incRepeticion4: number = 128;    //+0 - 7bit

export const idc = (): bigint => { 
     return idCounter.counter++; //Esta función devuelve la propiedad counter de idCounter incrementado en 1.
}

export const setCounterLevel = (level: number): void => {

     idCounter.level = level;
     
     switch (idCounter.level) {
          case 0: idCounter.counter = idCounter.counter & BigInt(0xFFFFF00000000); break;  //+8 (0s) - 32bits                --- 1111 1111 1111 1111 1111 0000 0000 0000 0000 0000 0000 0000 0000 
          case 1: idCounter.counter = idCounter.counter & BigInt(0xFFFFFFF800000); break;  //+5 (0s y el 8) - 23bits         --- 1111 1111 1111 1111 1111 1111 1111 1000 0000 0000 0000 0000 0000 
          case 2: idCounter.counter = idCounter.counter & BigInt(0xFFFFFFFFE0000); break;  //+4 (0s y la E) - 17bits         --- 1111 1111 1111 1111 1111 1111 1111 1111 1110 0000 0000 0000 0000 
          case 3: idCounter.counter = idCounter.counter & BigInt(0xFFFFFFFFFF800); break;  //+2 (0s y el 8) - 11bits         --- 1111 1111 1111 1111 1111 1111 1111 1111 1111 1111 1000 0000 0000
          case 4: idCounter.counter = idCounter.counter & BigInt(0xFFFFFFFFFFF80); break;  //+1 (0 y el 8)  - 7bit           --- 1111 1111 1111 1111 1111 1111 1111 1111 1111 1111 1111 1000 0000
          default: break;
     }

     switch (idCounter.level) {
          case 0: idCounter.counter += BigInt(incGeneral); break;
          case 1: idCounter.counter += BigInt(incRepeticion1); break;
          case 2: idCounter.counter += BigInt(incRepeticion2); break;
          case 3: idCounter.counter += BigInt(incRepeticion3); break;
          case 4: idCounter.counter += BigInt(incRepeticion4); break;
          default: break;
     }

}

// -------------------------------------------------- Esta es la función que carga los parámetros y asigna los IDs --------------------------------------------------

export const loadParam = async (param: IParam|BParam|SParam, inicializacion: { tipo: number, min?: number, max?: number, valor: number | boolean | string, reset: number; tipoImportacion: number, nombre: string }) => {

     let xvalor: string = "";
     const xidc: bigint = idc();

     //Inicializamos la variable según el TP si es case INTEGER|REAL o case BOOLEAN|STRING
     switch (inicializacion.tipo) {
          case TP.REAL:
               param.id = xidc;
               param.tipo = inicializacion.tipo;
               param.valor = inicializacion.valor as number
               (param as IParam).min = inicializacion.min!;
               (param as IParam).max = inicializacion.max!;
               param.reset = inicializacion.reset;
               param.tipoImportacion = inicializacion.tipoImportacion;
               param.nombre = inicializacion.nombre;
               break;

          case TP.INTEGER:                   //Dividimos los case porque antes era TP.INTEGER|TP.REAL y daba error, los INTEGER se cargaban en el Dto con id = 0n
               param.id = xidc;
               param.tipo = inicializacion.tipo;
               param.valor = inicializacion.valor as number
               (param as IParam).min = inicializacion.min!;
               (param as IParam).max = inicializacion.max!;
               param.reset = inicializacion.reset;
               param.tipoImportacion = inicializacion.tipoImportacion;
               param.nombre = inicializacion.nombre;
               break;

          case TP.STRING:
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

          case TP.BOOLEAN:
               param.id = xidc
               param.tipo = inicializacion.tipo;
               if (inicializacion.tipo === TP.BOOLEAN) 
               param.valor = inicializacion.valor;
               else
               param.valor = inicializacion.valor as boolean;
               param.reset = inicializacion.reset;
               param.tipoImportacion = inicializacion.tipoImportacion;
               param.nombre = inicializacion.nombre;
               break;
     }

     //Consulta a DB para obtener el registro con el ID especificado
     const result = await prisma.parametros.findFirst({
          where: {
               id: xidc
          }
     })

     //Si no encuentra el registro, se crea
     if (!result) {
          // hay que crear el valor, haciendo una insercion en memoria
          // y result tendrá el valor por defecto de la variable

          xvalor = param!.valor.toString(); //el condicinal hay que trabajarlo. El valor siempre existira

          const result = await prisma.parametros.create({
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

     //Este if, según el TP de la variable, establece la variable valor:number||boolean||string
     switch (inicializacion.tipo) {
          case TP.REAL:  //TP.INTEGER|TP.REAL NO FUNCIONA, por eso hay que separarlos en dos "case"
               (param as IParam).valor = Number(xvalor);  //el condicinal hay que trabajarlo. El valor siempre existira
               break;
          case TP.INTEGER:
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