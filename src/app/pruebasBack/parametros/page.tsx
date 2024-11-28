import { getDataAll, getOffsetCal1, getOffsetCal2, getOffsetCal3, setOffsetCal1, setOffsetCal2, setOffsetCal3, getAlltempSinConectarCR, setTempSinConectarCR } from '@/lib/actionsCalefaccion';
import Link from 'next/link';

export default function Parametros(){

    return (
        <div className='flex flex-col w-200 items-center justify-center gap-2'>
            <h1 className='flex  flex-col w-200 items-center justify-center gap-5 mb-3 mt-5 text-2xl'>Parametros "offset" y "tempSinConectarCR"</h1>

            <Link href="/pruebasBack/tickYTempActual" className='bg-orange-600 p-2 rounded-md font-bold hover:bg-orange-800'>Tick y TempActual</Link>

            <div className='bg-gray-700 rounded-md p-4'>
            <div className='flex items-center gap-2'>
            <button type="submit" className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800'>Activar / Desactivar</button>
            <p className='bg-green-700 p-2 rounded-3xl font-bold'>passReq</p>
            </div>
            <p className='text-red-400 font-bold'>Por terminar</p>
            </div>

            <button type="submit" onClick={getDataAll} className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800' >Imprimir parámetros</button>
            
            <div className='bg-gray-700 rounded-md p-4 mb-3'>
            <h1 className='flex  flex-col w-200 items-center justify-center text-2xl'>offset</h1>
            <div className='flex items-center gap-2'>
                <form action={setOffsetCal1} className='' >
                    <button type="submit"  className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800'>Establecer CAL1</button>
                    <input type="number" name='valor' placeholder="Valor de Offset Cal1"  className='bg-gray-400 rounded-md ml-1 placeholder-gray-300 w-38 h-8'/>
                </form>
                <button type="submit" onClick={getOffsetCal1} className='bg-blue-500 p-2 rounded-md hover:bg-blue-800'>Print</button>
                </div>
                <br />
                <div className='flex items-center gap-2'>
                <form action={setOffsetCal2} className='' >
                    <button type="submit"  className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800'>Establecer CAL2</button>
                    <input type="number" name='valor' placeholder="Valor de Offset Cal2"  className='bg-gray-400 rounded-md ml-1 placeholder-gray-300 w-38 h-8'/>
                </form>
                <button type="submit" onClick={getOffsetCal2} className='bg-blue-500 p-2 rounded-md hover:bg-blue-800'>Print</button>
                </div>
                <br />
                <div className='flex items-center gap-2'>
                <form action={setOffsetCal3} className='' >
                    <button type="submit"  className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800'>Establecer CAL3</button>
                    <input type="number" name='valor' placeholder="Valor de Offset Cal2"  className='bg-gray-400 rounded-md ml-1 placeholder-gray-300 w-38 h-8'/>
                </form>
                <button type="submit" onClick={getOffsetCal3} className='bg-blue-500 p-2 rounded-md hover:bg-blue-800'>Print</button>
                </div>
                <br />
            </div>
            

            <div  className=' bg-gray-700 rounded-md p-4 mb-5'>
            <h1 className='flex  flex-col w-200 items-center justify-center text-2xl mb-1'>tempSinConectarCR</h1>

                <div className=''>
                    <form action={setTempSinConectarCR} className="bg-gray-600 flex flex-col rounded-md items-center justify-center gap-2 mb-5 p-3">
                        <input type="text" name="id" placeholder="num calefaccion"  className='bg-gray-400 rounded-md placeholder-gray-300 w-52 h-8'/>
                        <input type="number" name="valorTempSinConectarCR" placeholder="valor (Default: 0)" className='bg-gray-400 rounded-md placeholder-gray-300 w-52 h-8'/>
                        <button type="submit" className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800'>Establecer</button>
                    </form>
                <button type="submit" onClick={getAlltempSinConectarCR} className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800'>Imprimir todos los tempSinConectarCR</button>
                
                </div>
            </div>
        </div>

    )
}

//<p className='text-red-400'>Por terminar</p>