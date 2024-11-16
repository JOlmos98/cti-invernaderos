'use server'

import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt';

// -------------------------------------------------- getData --------------------------------------------------
export async function getData() {
     console.log('getData');
     const users = await prisma.user.findMany();
     console.log('Users: ', users);
     return users;
}

// -------------------------------------------------- setData --------------------------------------------------
export const setData = async (formData: FormData) => {
     const name = formData.get('name');
     const email = formData.get('email');
     const password = formData.get('password') as string;
     
     //Hasheamos la password con 10 rondas de sal
     const saltRounds = 10;
     const hashedPassword = await bcrypt.hash(password, saltRounds);

     console.log({ name, password })
     console.log(formData);
     await prisma.user.create({
          data: {
               name: name as string,
               email: email as string,
               password: hashedPassword, //Metemos el hash
          },
     });
}

// -------------------------------------------------- delData --------------------------------------------------
export const delData = async (formData: FormData) => {
     const id = formData.get('id');
     const idx = Number(id);
     const userExists = await prisma.user.findUnique({ where: { id: idx } });
     
     if (!userExists) {
          console.error('EL USUARIO "', id, '" NO EXISTE.');
     } else {
          try{
               const response = await prisma.user.delete({
                    where: {
                        id: idx,
                    },
                });
                console.log("Usuario", idx, "eliminado correctamente");
               } catch (error) { console.error('Error al eliminar usuario: Probablemente no existe el usuario o es NaN.', error);}
          };
     }

// -------------------------------------------------- verifyUser --------------------------------------------------
export const verifyUser = async (formData: FormData) => {
     const id = formData.get('id');
     const password = formData.get('password') as string;
     console.log("1. Aqui tenemos el id:", id, typeof id, "\nY la password:", password, typeof password);
     const idNum = Number(id);
     const userExists = await prisma.user.findUnique({ where: { id: idNum } });

     if (userExists) {
          const isPasswordCorrect = await bcrypt.compare(password, userExists.password); //Esta línea compara la password introducida hasheada con la que está en la DB también hasheada.
          console.log("El usuario con id", id, "existe:", userExists, "\nSu nombre es: ", userExists.name);

          if (isPasswordCorrect) {
               console.log("La contraseña es correcta");
          } else {console.error("La contraseña es incorrecta");}
     } else {console.error("El usuario con id", id, "NO existe:", userExists);}
}

// --------------------------------------------------

     //console.log("1. Aqui tenemos: ", id, typeof id, idx, typeof idx);

     //console.log(`1. id: ${id}, idx: ${idx}`);
     //const userExists = await prisma.user.findUnique({ where: { id: idx } });
     //console.log(`2. Usuario existe: ${userExists ? 'Sí' : 'No'}`);

     //if (isNaN(idx)) {
         //console.error('Invalid ID provided (not a number)', { id });
         //return;
     //}
     //try {
         // Eliminamos el usuario usando el id convertido a número

         //console.log("4. Aqui tenemos: ", id, typeof id, idx, typeof idx);

         //console.log(`Usuario con id: ${idx} eliminado correctamente`);
     //} catch (error) {
         //console.error(`Error eliminando el usuario con id: ${idx}`, error);
         //console.log("5. Aqui tenemos: ", id, typeof id, idx, typeof idx);
     //}

// --------------------------------------------------

//const prisma = new PrismaClient();
//PARECE QUE ESTA FUNCION NO SIRVE, LA BUENA ES setData2.
/*export async function setData1() {
     console.log('setData');
     const user = await prisma.user.create({
          data: {
               name: 'Alice',
               email: 'alice@prisma.io',
               posts: {
                    create: { title: 'Join us for Prisma Day 2020' },
               },
          },
     });
     console.log(`Created user ${user.name} with ID: ${user.id}`);
     return user;
}*/

// --------------------------------------------------

/*export const delData = async (formData: FormData) => {
     const id = formData.get('id');
     console.log('delData parametro', id)
     const idx = Number(id);

     //const users = await prisma.user.findMany();

     const response = await prisma.user.delete({
          where: {
               id: idx,
          }
     })
     console.log("Eliminado usuario con id: ", idx)
     //try {
          // const isdata =await prisma.user.findFirst({ where: { id: Number(id) } })
          // if (!isdata) {
          //      console.error('Error deleting user:', id)
          //      return;
          // }
          // console.log('response', response)

     //} catch (error) {
          //console.error('Error deleting user:', error)
          // throw new Error(`Error deleting user: ${error}`);
          //return { error: `Error deleting user: ${error}` }
     //}
     // const response=await prisma.user.delete({ where: { id: Number(id) } })
     //      .catch(
     //           ((error) => { console.error('Error deleting user:', error) })

     //      )   
     // console.log('response',response)
}*/

// --------------------------------------------------

/*export const delDataId = async (id: number) => {

     console.log('delData parametro', id)
     try {
          const isdata = await prisma.user.findFirst({ where: { id: Number(id) } })
          if (!isdata) {
               console.error('Error deleting user:', id)
               return "no data found";
          }
          const response = await prisma.user.delete({ where: { id: Number(id) } })
          console.log('response', response)
     } catch (error) {
          console.error('Error deleting user:', error)
     }
     // const response=await prisma.user.delete({ where: { id: Number(id) } })
     //      .catch(
     //           ((error) => { console.error('Error deleting user:', error) })

     //      )   
     // console.log('response',response)
}*/