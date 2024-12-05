import React from 'react'
import Siderbar from '../../../components/siderbar/Siderbar'
import CalefaccionList from '../../../components/calefaccionlist/Calefaccionlist'

export default function Calefaccion() {
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

    <footer className="bg-gray-500 text-white py-4 mt-8 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Temperatura Actual</h3> 
          </div>
          {/* Otras columnas */}
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
         </div>
        </div >
  )
}
