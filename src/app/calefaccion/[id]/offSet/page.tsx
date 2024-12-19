import React from 'react'
import OffSetHeader from '../../../../../components/componentInput/OffSetHeader';
import OffsetForm from '../../../../../components/componentInput/InputForm';



{/* Siempre que paso params hay que poner async function IMP*/}
export default async function OffSetPage({params}:{params:{ id:string}}) {
  const { id } = await params; 
  const idNum = parseInt(id); 


  return (
     <div> 
       <HeaderOffSet id= {idNum} />  

      {/* Formulario */}
      <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
        <OffsetForm id= {idNum} /> 
      </div>
    </div> 
  )
}

const HeaderOffSet = ({ id }: { id: number } ) => {
  return(
      <div className='flex justify-between bg-gray-800 text-white p-4 rounded-md shadow-md'>
         <OffSetHeader id={id} />
      </div>
  );
}; 
