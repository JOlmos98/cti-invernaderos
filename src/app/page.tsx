// import Image from "next/image";
import { TfiMenuAlt } from "react-icons/tfi";
import Menuprincipal from "../../components/menuprincipal/Menuprincipal";
import Link from "next/link";

// Esta es la buena 
//Hay que modificar 
export default function Home() {

  const TopMenu = () =>{
     return( 
      <header className="bg-gray-800 px-6 py-4 text-white flex items-start justify-between"> 
        <Link href= '/menu'
        className="flex items-center space-x-3 hover:text-green-400 transition-colors"
        >
            <TfiMenuAlt className="text-3xl" /> 
          <span className="text-2xl font-semibold tracking-wide">Menu</span> 
      </Link>
      <Link href="/debug" className="flex items-center space-x-3 hover:text-green-400 transition-colors p-1">Debug</Link>
      </header> 
     );  
  }

  return (
     <div className="min-h-screen flex flex-col bg-slate-700">  {/*Que min-h-screen que este en el centro de la pantalla*/}
       <TopMenu /> 
      <div className="flex flex-grow items-center justify-center"> 
        <div className="text-6xl font-bold text-white"> Home </div> 
      </div>
      
    {/*<Menuprincipal />*/}
    </div>
  );
}

