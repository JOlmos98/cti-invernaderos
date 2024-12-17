'use server';
import prisma from "@/lib/prisma";
import { refrigeracion } from "@/backend/refrigeracion/funcionalidad/refrigeracion";


// WIP REFRIGERACION:


/*
    OFFSET
    TEMPSINCONECTARCR
    MIN
    MAX
    RANGO
*/

 // -------------------------------------------------- ↓ OFFSET ↓ --------------------------------------------------
 
 // -------------------- GET offset --------------------
 export async function getOffset(idRef:number){
 
    const idDto=refrigeracion[idRef].offset.id

    console.log("1. Aqui tenemos el idDto: ", refrigeracion[idRef].offset.id)

    const offsetDB = await prisma.parametros.findFirst({
            where: {
                id: idDto
            },
            select: {
                valor: true
            }
    });

    const offsetObtenido=offsetDB ? Number(offsetDB.valor) : 0;
    console.log('Valor actual de offset ('+(idRef+1)+') DB: ', offsetDB, "Valor actual de offset ("+(idRef+1)+") Dto: ", refrigeracion[idRef].offset.valor);

    refrigeracion[idRef].offset.valor=offsetObtenido;

    return refrigeracion[idRef].offset.valor;
}

// -------------------- SET offset --------------------
export async function setOffset(idRef:number, formData: FormData) {

   const idDto=refrigeracion[idRef].offset.id
   const valor=formData.get('valor');

   const offsetDB = await prisma.parametros.findFirst({where: {id: idDto}});
   const pkid=offsetDB?.pkid;

   console.log("Offset de ", (idRef+1)," antes: ", refrigeracion[idRef].offset.valor);

   await prisma.parametros.update({ //Establece valor en DB
        where: {
             pkid: pkid
        },
        data: {
             valor: valor as string
        }
   })

   refrigeracion[idRef].offset.valor = Number(valor); //Establece valor en Dto.

   console.log("Offset de ", (idRef+1)," ahora: ", valor);
}

 // -------------------------------------------------- ↓ TEMPSINCONECTARCR ↓ --------------------------------------------------
 
 // -------------------- GET tempSinConectarCR --------------------
 export async function getTempSinConectarCR(idRef:number){
 
    const idDto=refrigeracion[idRef].tempSinConectarCR.id

    console.log("1. Aqui tenemos el idDto: ", refrigeracion[idRef].tempSinConectarCR.id)

    const tsccrDB = await prisma.parametros.findFirst({
            where: {
                id: idDto
            },
            select: {
                valor: true
            }
    });

    const tsccrObtenido=tsccrDB ? Number(tsccrDB.valor) : 0;
    console.log('Valor actual de tempSinConectarCR ('+(idRef+1)+') DB: ', tsccrDB, "Valor actual de tempSinConectarCR ("+(idRef+1)+") Dto: ", refrigeracion[idRef].tempSinConectarCR.valor);

    refrigeracion[idRef].tempSinConectarCR.valor=tsccrObtenido;

    return refrigeracion[idRef].tempSinConectarCR.valor;
}

// -------------------- SET tempSinConectarCR --------------------
export async function setTempSinConectarCR(idRef:number, formData: FormData) {

   const idDto=refrigeracion[idRef].tempSinConectarCR.id
   const valor=formData.get('valor');

   const tsccrDB=await prisma.parametros.findFirst({where: {id: idDto}});
   const pkid=tsccrDB?.pkid;

   console.log("tempSinConectarCR de ", (idRef+1)," antes: ", refrigeracion[idRef].tempSinConectarCR.valor);

   await prisma.parametros.update({ //Establece valor en DB
        where: {
             pkid: pkid
        },
        data: {
             valor: valor as string
        }
   })

   refrigeracion[idRef].tempSinConectarCR.valor = Number(valor); //Establece valor en Dto.

   console.log("tempSinConectarCR de ", (idRef+1)," ahora: ", valor);
}
