'use server';
import prisma from "@/lib/prisma";
import { refrigeracion } from "@/backend/refrigeracion/funcionalidad/refrigeracion";

/*
    OFFSET
    TEMPSINCONECTARCR
    MIN
    MAX
    RANGO
    TEMPACTUAL
*/

// -------------------------------------------------- ↓ OFFSET ↓ --------------------------------------------------

// -------------------- GET offset --------------------
export async function getOffset(idRef: number) {

    const idDto = refrigeracion[idRef].offset.id

    console.log("1. Aqui tenemos el idDto: ", refrigeracion[idRef].offset.id)

    const offsetDB = await prisma.parametros.findFirst({
        where: {
            id: idDto
        },
        select: {
            valor: true
        }
    });

    const offsetObtenido = offsetDB ? Number(offsetDB.valor) : 0;
    console.log('Valor actual de offset (' + (idRef + 1) + ') DB: ', offsetDB, "Valor actual de offset (" + (idRef + 1) + ") Dto: ", refrigeracion[idRef].offset.valor);

    refrigeracion[idRef].offset.valor = offsetObtenido;

    return refrigeracion[idRef].offset.valor;
}

// -------------------- SET offset --------------------
export async function setOffset(idRef: number, formData: FormData) {

    const idDto = refrigeracion[idRef].offset.id
    const valor = formData.get('valor');

    const offsetDB = await prisma.parametros.findFirst({ where: { id: idDto } });
    const pkid = offsetDB?.pkid;

    console.log("Offset de ", (idRef + 1), " antes: ", refrigeracion[idRef].offset.valor);

    await prisma.parametros.update({ //Establece valor en DB
        where: {
            pkid: pkid
        },
        data: {
            valor: valor as string
        }
    })

    refrigeracion[idRef].offset.valor = Number(valor); //Establece valor en Dto.

    console.log("Offset de ", (idRef + 1), " ahora: ", valor);
}

// -------------------------------------------------- ↓ TEMPSINCONECTARCR ↓ --------------------------------------------------

// -------------------- GET tempSinConectarCR --------------------
export async function getTempSinConectarCR(idRef: number) {

    const idDto = refrigeracion[idRef].tempSinConectarCR.id
    console.log("1. Aqui tenemos el idDto: ", refrigeracion[idRef].tempSinConectarCR.id)

    const tsccrDB = await prisma.parametros.findFirst({
        where: {
            id: idDto
        },
        select: {
            valor: true
        }
    });

    const tsccrObtenido = tsccrDB ? Number(tsccrDB.valor) : 0;
    console.log('Valor actual de tempSinConectarCR (' + (idRef + 1) + ') DB: ', tsccrDB, "Valor actual de tempSinConectarCR (" + (idRef + 1) + ") Dto: ", refrigeracion[idRef].tempSinConectarCR.valor);
    refrigeracion[idRef].tempSinConectarCR.valor = tsccrObtenido;

    return refrigeracion[idRef].tempSinConectarCR.valor;
}

// -------------------- SET tempSinConectarCR --------------------
export async function setTempSinConectarCR(idRef: number, formData: FormData) {

    const idDto = refrigeracion[idRef].tempSinConectarCR.id
    const valor = formData.get('valor');

    const tsccrDB = await prisma.parametros.findFirst({ where: { id: idDto } });
    const pkid = tsccrDB?.pkid;
    console.log("tempSinConectarCR de ", (idRef + 1), " antes: ", refrigeracion[idRef].tempSinConectarCR.valor);

    await prisma.parametros.update({ //Establece valor en DB
        where: {
            pkid: pkid
        },
        data: {
            valor: valor as string
        }
    })

    refrigeracion[idRef].tempSinConectarCR.valor = Number(valor); //Establece valor en Dto.
    console.log("tempSinConectarCR de ", (idRef + 1), " ahora: ", valor);
}

// -------------------------------------------------- ↓ MIN ↓ --------------------------------------------------

// -------------------- GET min --------------------
export async function getMin(idRef: number) {

    const idDto = refrigeracion[idRef].min.id
    console.log("1. Aqui tenemos el idDto: ", refrigeracion[idRef].min.id)

    const minDB = await prisma.parametros.findFirst({
        where: {
            id: idDto
        },
        select: {
            valor: true
        }
    });

    const minObtenido = minDB ? Number(minDB.valor) : 0;
    console.log('Valor actual de min (' + (idRef + 1) + ') DB: ', minDB, "Valor actual de min (" + (idRef + 1) + ") Dto: ", refrigeracion[idRef].min.valor);
    refrigeracion[idRef].min.valor = minObtenido;

    return refrigeracion[idRef].min.valor;
}

// -------------------- SET min --------------------
export async function setMin(idRef: number, formData: FormData) {
    const idDto = refrigeracion[idRef].min.id;
    const valor = formData.get("valor");

    const minDB = await prisma.parametros.findFirst({ where: { id: idDto } });
    const pkid = minDB?.pkid;
    console.log("min de ", idRef + 1, " antes: ", refrigeracion[idRef].min.valor);

    await prisma.parametros.update({
        //Establece valor en DB.
        where: {
            pkid: pkid,
        },
        data: {
            valor: valor as string,
        },
    });

    refrigeracion[idRef].min.valor = Number(valor); //Establece valor en Dto.
    console.log("min de ", idRef + 1, " ahora: ", valor);
}

// -------------------------------------------------- ↓ MAX ↓ --------------------------------------------------

// -------------------- GET max --------------------
export async function getMax(idRef: number) {

    const idDto = refrigeracion[idRef].max.id
    console.log("1. Aqui tenemos el idDto: ", refrigeracion[idRef].max.id)

    const maxDB = await prisma.parametros.findFirst({
        where: {
            id: idDto
        },
        select: {
            valor: true
        }
    });

    const maxObtenido = maxDB ? Number(maxDB.valor) : 0;
    console.log('Valor actual de max (' + (idRef + 1) + ') DB: ', maxDB, "Valor actual de max (" + (idRef + 1) + ") Dto: ", refrigeracion[idRef].max.valor);
    refrigeracion[idRef].max.valor = maxObtenido;

    return refrigeracion[idRef].max.valor;
}

// -------------------- SET max --------------------
export async function setMax(idRef: number, formData: FormData) {
    const idDto = refrigeracion[idRef].max.id;
    const valor = formData.get("valor");

    const maxDB = await prisma.parametros.findFirst({ where: { id: idDto } });
    const pkid = maxDB?.pkid;
    console.log("max de ", idRef + 1, " antes: ", refrigeracion[idRef].max.valor);

    await prisma.parametros.update({ //Establece valor en DB.
        where: {
            pkid: pkid,
        },
        data: {
            valor: valor as string,
        },
    });

    refrigeracion[idRef].max.valor = Number(valor); //Establece valor en Dto.
    console.log("max de ", idRef + 1, " ahora: ", valor);
}

// -------------------------------------------------- ↓ RANGO ↓ --------------------------------------------------

// -------------------- GET rango --------------------
export async function getRango(idRef: number) {

    const idDto = refrigeracion[idRef].rango.id
    console.log("1. Aqui tenemos el idDto: ", refrigeracion[idRef].rango.id)

    const rangoDB = await prisma.parametros.findFirst({
        where: {
            id: idDto
        },
        select: {
            valor: true
        }
    });

    const rangoObtenido = rangoDB ? Number(rangoDB.valor) : 0;
    console.log('Valor actual de rango (' + (idRef + 1) + ') DB: ', rangoDB, "Valor actual de rango (" + (idRef + 1) + ") Dto: ", refrigeracion[idRef].rango.valor);
    refrigeracion[idRef].rango.valor = rangoObtenido;

    return refrigeracion[idRef].rango.valor;
}

// -------------------- SET rango --------------------
export async function setRango(idRef: number, formData: FormData) {
    const idDto = refrigeracion[idRef].rango.id;
    const valor = formData.get("valor");

    const rangoDB = await prisma.parametros.findFirst({ where: { id: idDto } });
    const pkid = rangoDB?.pkid;
    console.log("rango de ", idRef + 1, " antes: ", refrigeracion[idRef].rango.valor);

    await prisma.parametros.update({ //Establece valor en DB.
        where: {
            pkid: pkid,
        },
        data: {
            valor: valor as string,
        },
    });

    refrigeracion[idRef].rango.valor = Number(valor); //Establece valor en Dto.
    console.log("rango de ", idRef + 1, " ahora: ", valor);
}

// -------------------------------------------------- ↓ TEMPACTUAL ↓ --------------------------------------------------

// -------------------- GET tempActual --------------------
export async function getTempActual(idRef: number) {

    const idDto = refrigeracion[idRef].tempActual.id
    console.log("1. Aqui tenemos el idDto: ", refrigeracion[idRef].tempActual.id)

    const tempActualDB = await prisma.parametros.findFirst({
        where: {
            id: idDto
        },
        select: {
            valor: true
        }
    });

    const tempActualObtenido = tempActualDB ? Number(tempActualDB.valor) : 0;
    console.log('Valor actual de tempActual (' + (idRef + 1) + ') DB: ', tempActualDB, "Valor actual de tempActual (" + (idRef + 1) + ") Dto: ", refrigeracion[idRef].tempActual.valor);
    refrigeracion[idRef].tempActual.valor = tempActualObtenido;

    return refrigeracion[idRef].tempActual.valor;
}