import React from 'react'
import Navbar from '../../../../../components/navbar/Navbar';
import Siderbar from '../../../../../components/siderbar/Siderbar';
import InputForm from '../../../../../components/componentInput/InputForm';
import { getOffset, setOffset } from '@/lib/actionsCalefaccion';



{/* Siempre que paso params hay que poner async function IMP*/}
export default async function OffSetPage({params}:{params:{ id:string}}) {
  const { id } = await params; 
  const idNum = parseInt(id); 
  console.log("id:", id, "Tipo:", typeof id); 
  console.log("id:", idNum, "Tipo:", typeof idNum); 

  return (
     <div> 
      <h1 className='text-3xl font-bold text-center bg-gray-800 text-white py-4 rounded-md shadow-md'> OffSet Configuración </h1>
       <div className='min-h-screen  bg-gray-100 flex items-center justify-center'> 
        < InputForm id = {idNum} />           
       </div>
      </div>
  )
}
