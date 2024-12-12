'use client'; 

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { AiFillHome } from 'react-icons/ai';
import { BsFire } from 'react-icons/bs';

import clsx from 'clsx';
import { IoSettings } from 'react-icons/io5';

//map of links para mostrar en el sidebar 
//El método map recorre la lista links y genera un componente <Link> para cada uno
// React.ElementType --> + flexible, acepta cualquier tipo de props hasta CSS 
const links: { name: string; href: string; icon: React.ElementType }[] = [
  { name: 'Menú', href: '/menu', icon: AiFillHome },
  { name: 'Calefacción', href: '/calefaccion', icon: BsFire },
  { name: 'Configuración', href:'/configuracion', icon: IoSettings }

];
 { /* Arriba si hace falta añadir subapartados ejem { name ... / href : '/calefaccion/calefaccion[i] ... tinene que seguir la ruta de los directorios'} */}

export default function NavLinks() {
  const pathname = usePathname(); // ruta actual

  return (
    <>
      {links.map((link) => {
        const LinkIcono = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href ?? '/'}
            className={clsx(
              'flex items-center gap-4 px-4 py-3 rounded-lg text-white hover:bg-blue-600 transition-colors',
              {
                // si la ruta coincide resaltamos
                'bg-blue-500': pathname === link.href,
              }
            )}
          >
            <LinkIcono className="w-6 h-6" /> 
            <span>{link.name}</span> 
          </Link>
        );
      })}
    </>
  );
}



