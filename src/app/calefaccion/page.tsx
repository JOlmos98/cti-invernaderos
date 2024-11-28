import React from 'react'
import Siderbar from '../../../components/siderbar/Siderbar'
import CalefaccionList from '../../../components/calefaccionlist/Calefaccionlist'

export default function calefaccion() {
  return (
    <div className='min-h-screen '> 
             < Siderbar /> 
             {/* contenido   */}
         <div className='p-4 ml-72'> {/* paddig */}
            <header className='bg-gray-900 text-white text-2xl px-4 py-6 rounded-md shadow-md mb-6 flex flex-col items-center justify-center'> 
              <h1> Calefacciones </h1>
            </header> 
            <main className='h-full'>  
                 {/* El contenido de mi pagina */}
                 <CalefaccionList /> 
            </main>
         </div>
        </div >
  )
}
