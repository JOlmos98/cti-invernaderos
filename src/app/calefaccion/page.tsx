// 'use client'
import React from 'react'
import CalefaccionList from '../../../components/calefaccionlist/Calefaccionlist'
import TemperaturaActual from '../../../components/temperaturaActual / TemperaturaActual'

export default function Calefaccion() {
  return (
    <div> 
      <header className='text-3xl font-bold text-center bg-gray-800 text-white py-4 rounded-md shadow-md'>
        <h1> Calefacciones </h1>
      </header>
      <main className='h-full pt-3'>
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
            < TemperaturaActual />
          </div>
          <div className="mt-8 border-t border-gray-700 pt-4 text-center text-white">
            <p>&copy; {new Date().getFullYear()} CTIControl. </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
