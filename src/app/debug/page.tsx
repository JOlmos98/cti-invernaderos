// import Image from "next/image";
//import {toast} from 'react-hot-toast';
//'use client'

import { delData, getData, setData, verifyUser } from '@/lib/actionsUser';
import Link from 'next/link';

export default function Debug() {

  return (
    <div >
      <p>Pruebas con Server Actions</p>
      <div className='flex  flex-col w-200 items-center justify-center gap-2'>
        <form action={setData} className='flex  flex-col w-200 items-center justify-center gap-2' >
          <input type="Text" name="name" placeholder="Name"  className='bg-gray-400 rounded-md placeholder-gray-300'/>
          <input type="email" name="email" placeholder="Email" className='bg-gray-400 rounded-md placeholder-gray-300'/>
          <input type="password" name="password" placeholder="Password" className='bg-gray-400 rounded-md placeholder-gray-300' />          
          {/* <input type="submit" value="Submit" className='bg-red-200 p-2 rounded-md'/> */}
          <button type="submit" className='bg-red-500 p-2 rounded-md font-bold hover:bg-red-800'>Submit</button>
        </form>


        <button className="bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800" onClick={getData}>Listar usuarios</button>
        <div className='mt-10'>
          <form action={delData} className='flex  flex-col w-200 items-center justify-center gap-2'>
            <input type="number" name="id" placeholder='id to delete'  className='bg-gray-400 rounded-md placeholder-gray-300'/>
            <button type="submit" className='bg-red-500 p-2 rounded-md font-bold hover:bg-red-800'>Delete</button>
            <br />
          </form>
        </div>

        <div>
        <form action={verifyUser} className='flex flex-col w-200 items-center justify-center gap-2' >
          <input type="number" name="id" placeholder="id"  className='bg-gray-400 rounded-md placeholder-gray-300'/>
          <input type="password" name="password" placeholder="Password" className='bg-gray-400 rounded-md placeholder-gray-300'/>
          {/* <input type="submit" value="Submit" className='bg-red-200 p-2 rounded-md'/> */}
          <button type="submit" className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800'>Comprobar existencia</button>
        </form>        
        </div>
        
        <br />
        <div>
        <Link href="/debug/calefaccion1" className="bg-green-700 p-2 m-2 rounded-md font-bold hover:bg-green-900">Calefacción 1 Inputs</Link>
        <Link href="/debug/parametros" className="bg-yellow-700 p-2 m-2 rounded-md font-bold hover:bg-yellow-900">Parametros</Link>
        <Link href="/debug/refrigeracion1" className="bg-cyan-800 p-2 m-2 rounded-md font-bold hover:bg-cyan-900">Refrigeración 1 Inputs</Link>
        </div>
      </div>
      
    </div>
  );
}