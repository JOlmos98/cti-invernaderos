// /src/app/pruebasBack/parametros/greet.tsx
'use client'

import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';

// -------------------------------------------------- fn greet --------------------------------------------------
export function Greet() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    invoke<string>('greet', { name: 'Next.js' })
      .then(result => setGreeting(result))
      .catch(console.error)
  }, [])

  return <div className="font-bold text-orange-500">{greeting}</div>;
}

// -------------------------------------------------- fn get_all_parametros --------------------------------------------------
export async function GetAllParametros() {
    try {
      // Llamar al comando de Rust para obtener todos los parámetros
      console.log("TS1. Obteniendo parámetros...");
      const parametros = await invoke<{ id: number; nombre: string; valor: string }[]>(
        "get_all_parametros_command"
      );
      console.log("TS2. Comando ejecutado.");
      // Imprimir por consola la lista de parámetros obtenida
      console.log("Lista de parámetros:", parametros);
    } catch (error) {
      console.error("Error obteniendo los parámetros:", error);
    }
}

// -------------------------------------------------- fn get_user_by_id --------------------------------------------------

// Componente GetUserById
interface User {
  id: number;
  name: string;
  email: string;
}

export interface GetUserByIdProps {
  id: number; // Recibe el ID como prop
}

export const GetUserById: React.FC<GetUserByIdProps> = ({ id: id }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        try {
          // Aquí llamas al comando de Rust (o la API) para obtener el usuario
          console.log("Buscando usuario con ID:", id);
          const fetchedUser = await invoke<{ id: number; name: string; email: string } | null>(
            "get_user_by_id_command", 
            { id: id }
          );
          if (fetchedUser) {
            setUser(fetchedUser);
          } else {
            setError("No se encontró el usuario.");
          }
        } catch (err) {
          setError(`Error al obtener el usuario: ${err}`);
        }
      }
    };

    fetchUser();
  }, [id]); // Esto se ejecuta cada vez que userId cambia

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className='bg-gray-500 rounded-md mt-3 p-4 text-yellow-100'>
      <h3>Usuario Encontrado:</h3>
      <p>ID: {user.id}</p>
      <p>Nombre: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};



/*export async function GetUserById(id: number) {
  try {
    // Llamar al comando de Rust para obtener el usuario por ID
    console.log(`Buscando usuario con ID: ${id}`);
    const user = await invoke<{ id: number; name: string; email: string } | null>(
      "get_user_by_id_command", // Comando de Rust
      { id: id } // Cambiado de "user_id" a "id"
    );
    if (user) {
      console.log("Usuario encontrado:", user);
      return <div>Hola {user.name}</div>
    } else {
      console.log("No se encontró ningún usuario con ese ID.");
    }
    console.log("888. Parametros enviados a Rust:", { id });
  } catch (error) {
    console.error("Error obteniendo el usuario:", error);
  }

}*/


