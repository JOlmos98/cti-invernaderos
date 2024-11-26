import React from 'react'
import Siderbar from '../../../components/siderbar/Siderbar';

{/* !! Cunado haces un componente lo tienes que exportar en index y le tienes que añadir a tailwind.config.ts !! */}
export default function MenuPage() {
    return (
        <div className='min-h-screen '> 
             < Siderbar /> 
             {/* contenido   */}
         <div className='p-4 ml-72'> {/* paddig */} 
            <main className='h-full'>  
                 {/* El contenido de mi pagina */}
                 <h1> Hola estoy en Menu </h1>
            </main>
         </div>
        </div >
       
    );
  }
