// import Image from "next/image";
//'use client'

import { delData, getData, setData, verifyUser } from '@/lib/actions';
import Link from 'next/link';

export default function About() {

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
        <Link href="/form" className="bg-purple-500 p-2 rounded-md font-bold hover:bg-purple-800">React-Hook-Form</Link>
        </div>
      </div>
      
    </div>
  );
}

  //console.log('setting data3...');
  // useEffect(() => {

  //   const doSetData = async () => {
  //     console.log('setting data');
  //     await setData();
  //   };
  //   console.log('setting data2...');
  //   doSetData();
  // }, []);

  /*async function clientDelData(formData: FormData) {    
    console.log('deleting data...');
    const result=await delData(formData);
    if (result?.error) {
      // alert(result.error);
      toast.error(result.error);

      // console.error('Error deleting user!!!:', formData.get('id'))
      // return;
    }
    else{
      toast.success('User deleted successfully');
    }
  }*/