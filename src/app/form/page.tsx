"use client";
import { useForm } from 'react-hook-form';

export default function Form() {
    const { register, handleSubmit } = useForm();
    const onsubmit = (data: any) => {
      console.log(data); //Lo que hace el form al pulsar el botón type="submit"
    }

  return (
    <div>
      <h1>Form</h1>
      <div>
          <form action="" onSubmit={onsubmit} className='flex  flex-col w-200 items-center justify-center gap-1'>
            <label htmlFor="username" className='text-xl pt-3'>Username</label>
            <input 
            type="text" placeholder="Username"  className='bg-gray-400 rounded-md placeholder-gray-300'
            {...register("username", { 
              required: "Usuario requerido",
              minLength: { value: 3, message: "Mínimo 3 caracteres" }
            })}
            />
            <label htmlFor="email" className='text-xl pt-3'>Email</label>
            <input type="email" placeholder="Email" className='bg-gray-400 rounded-md placeholder-gray-300'
            {...register("email", { 
              required: "Email requerido",
              minLength: { value: 8, message: "Mínimo 8 caracteres" }
            })}
            />
            <label htmlFor="password" className='text-xl pt-3'>Password</label>
            <input type="password" placeholder="Password" className='bg-gray-400 rounded-md placeholder-gray-300' 
            {...register("password", { 
                required: "Contraseña requerida",
                minLength: { value: 5, message: "Mínimo 5 caracteres" }
              })}
            />
            <label htmlFor="confirmPassword" className='text-xl pt-3'>Confirm password</label>
            <input type="password" placeholder="Repeat password" className='bg-gray-400 rounded-md placeholder-gray-300' 
            {...register("confirmPassword", { 
                required: "Repetir contraseña",
                minLength: { value: 5, message: "Mínimo 5 caracteres" }
              })}
            />
            <button type="submit" className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800'>Register</button>
          </form>
        </div>
    </div>
  );
}