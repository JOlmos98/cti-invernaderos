// import Image from "next/image";

'use client'

import { delData, getData, setData } from '@/lib/actions';

export default function About() {

  console.log('setting data3...');
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

  return (
    <div >
      <p> About!!</p>
      <div className='flex  flex-col w-200 items-center justify-center gap-2'>
        <form action={setData} className='flex  flex-col w-200 items-center justify-center gap-2' >
          <input type="Text" name="name" placeholder="Name"  className='bg-slate-200'/>
          <input type="email" name="email" placeholder="Email" className='bg-slate-200'/>
          <input type="password" name="password" placeholder="Password" className='bg-slate-200' />          
          {/* <input type="submit" value="Submit" className='bg-red-200 p-2 rounded-md'/> */}
          <button type="submit" className='bg-red-200 p-2 rounded-md'>Submit</button>

        </form>
        <button className="bg-blue-300 p-2 rounded-md font-bold" onClick={getData}> listar</button>
        <div className='mt-10'>
          <form action={delData} className='flex  flex-col w-200 items-center justify-center gap-2'>
            <input type="Text" name="id" placeholder='id to delete'  className='bg-slate-200'/>
            <button type="submit" className='bg-red-200 p-2 rounded-md'>Delete</button>
          </form>
        </div>
        <div>
          <button className="bg-blue-300 p-2 rounded-md font-bold" /*onClick={/</div>async ()=>{const response=await delDataId(1); alert(response)}}*/> boton action eliminado</button>
        </div>
      </div>
      
    </div>
  );
}
