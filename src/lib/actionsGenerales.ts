import prisma from "@/lib/prisma";

// -------------------------------------------------- getDataAll --------------------------------------------------
export async function getDataAll() {                                        
    console.log('getData (Imprime la lista entera de parámetros, es decir, la tabla entera de la base de datos)');
    const params = await prisma.parametros.findMany();
    console.log('Parámetros: ', params);
    return params;
}