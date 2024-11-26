import React from 'react'
import Siderbar from '../../../components/siderbar/Siderbar'

export default function calefaccion() {
  return (
    <div className='min-h-screen '> 
             < Siderbar /> 
             {/* contenido   */}
         <div className='p-4 ml-72'> {/* paddig */} 
            <main className='h-full'>  
                 {/* El contenido de mi pagina */}
                 <h1> Hola estoy en Calefaccion </h1>
            </main>
         </div>
        </div >
  )
}
