import { getDataAll, getOffsetCal2, setOffsetCal2 } from '@/lib/actionsCalefaccion';

export default function Parametros(){

    return (
        <div className='flex flex-col w-200 items-center justify-center gap-2'>
            <h1 className='flex  flex-col w-200 items-center justify-center gap-8 mb-10 mt-5 text-2xl'>Parametros Cal2</h1>

            <div className='bg-gray-700 rounded-md p-4'>
            <div className='flex items-center gap-2'>
            <button type="submit" className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800'>Activar / Desactivar</button>
            <p className='bg-green-700 p-2 rounded-md font-bold'>passReq</p>
            </div>
            <p>Por terminar</p>
            </div>

            <br />
            <button type="submit" onClick={getDataAll} className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800' >Imprimir parámetros</button>
            <br />
            
            <div className='bg-gray-700 rounded-md p-4'>
                <div className='flex items-center gap-2'>
                <form action={setOffsetCal2} className='' >
                    <button type="submit"  className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800'>Establecer</button>
                    <input type="number" name='valor' placeholder="Valor de Offset Cal2"  className='bg-gray-400 rounded-md ml-5 placeholder-gray-300 w-38 h-10'/>
                </form>
                </div>
                <br />
                <button type="submit" onClick={getOffsetCal2} className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800'>Imprimir offset.valor Calefacción 2</button>
            </div>
            
        </div>

    )
}