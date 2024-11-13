'use server'
//Esto es el actions.ts que suele estar en lib/actions.ts (Comprobar estructura por convención)

import prisma from "@/lib/prisma";

// const prisma = new PrismaClient();

//PARECE QUE ESTA FUNCION NO SIRVE, LA BUENA ES setData2.
export async function setData() {
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
}

//GETDATA
export async function getData() {
     console.log('getData');
     const users = await prisma.user.findMany();
     console.log('Users: ', users);
     return users;
}

//PARECE QUE ESTA FUNCION ES LA BUENA
export const setData2 = async (formData: FormData) => {

     const name = formData.get('name');
     const password = formData.get('password');
     const email = formData.get('email');

     console.log({ name, password })
     console.log(formData);
     await prisma.user.create({
          data: {
               name: name as string,
               email: email as string,
               posts: {
                    create: { title: 'Join us for Prisma Day 2020' + { password } },
               },
          },
     });

}

export const delData = async (formData: FormData) => {
     const id = formData.get('id');
     console.log('delData parametro', id)
     const idx = Number(id);

     try {
          // const isdata =await prisma.user.findFirst({ where: { id: Number(id) } })
          // if (!isdata) {
          //      console.error('Error deleting user:', id)
          //      return;
          // }
          // console.log('response', response)
          const response = await prisma.user.delete({
               where: {
                    id: idx,
               }
          })
     } catch (error) {
          //console.error('Error deleting user:', error)
          // throw new Error(`Error deleting user: ${error}`);
          return { error: `Error deleting user: ${error}` }
     }
     // const response=await prisma.user.delete({ where: { id: Number(id) } })
     //      .catch(
     //           ((error) => { console.error('Error deleting user:', error) })

     //      )   
     // console.log('response',response)

}


export const delDataId = async (id: number) => {

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

}