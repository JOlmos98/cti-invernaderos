'use client'

import { getOffset, getTempSinConectarCR, setOffset, setTempSinConectarCR } from '@/lib/actionsCalefaccion';
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { FaTemperatureHigh } from 'react-icons/fa';
import { PiCheckSquareOffsetBold } from 'react-icons/pi';
import Navbar from '../navbar/Navbar';
import { Sidebar } from 'lucide-react';


interface CalefaccionClientProps{
   initialOffset: number;
   initialTempConsigna: number;
   calId: number;
}   

export default function CalefaccionClient({ initialOffset, initialTempConsigna, calId }: CalefaccionClientProps) {
    const [offset, setOffsetState] = useState(initialOffset);
    const [tempConsigna, setTempConsignaState] = useState(initialTempConsigna);
    const { offset: liveOffset, tempConsigna: liveTempConsigna } = useCalefaccion(calId);
  
    useEffect(() => {
      if (liveOffset !== null) setOffsetState(liveOffset);
      if (liveTempConsigna !== null) setTempConsignaState(liveTempConsigna);
    }, [liveOffset, liveTempConsigna]);
  
    const handleSetOffset = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      await setOffset(calId, formData);
    };
  
    const handleSetTempConsigna = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      await setTempSinConectarCR(calId, formData);
    };
   
   
   const items = [
    {
      id: 1,
      icon: FaTemperatureHigh,
      name: 'Temperatura de consigna',
      href: `/calefaccion/${calId}/temperaturaDeConsigna`,
      calId: calId,
      valorActual: `${tempConsigna.toFixed(1)} ºC`
    },
    {
      id: 2,
      icon: PiCheckSquareOffsetBold,
      name: 'OffSet',
      href: `/calefaccion/${calId}/offSet`,
      calId: calId,
      valorActual: `${offset.toFixed(1)} ºC`
    }
  ];


    return (
        <div className="min-h-screen">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-72 mt-12 p-4">
            <h1 className='text-3xl font-bold text-center bg-gray-800 text-white py-4'>
              Calefaccion {calId + 1}
            </h1>
            <ul>
              {items.map((item) => (
                <li
                  key={item.id}
                  className='flex items-center justify-between px-4 py-3 border-b last:border-none hover:bg-gray-200 transition-all'
                >
                  <div className='flex items-center space-x-3'>
                    <span className='text-4xl'>{item.icon && <item.icon />}</span>
                    <Link href={item.href} className='text-gray-900 hover:backdrop-opacity-60'>
                      {item.name}
                    </Link>
                  </div>
                  <div className='text-green-500'>
                    {item.valorActual}
                  </div>
                </li>
              ))}
            </ul>
          </main>
        </div>
      </div>
  )
}

function useCalefaccion(calId: number): { offset: number | null; tempConsigna: number | null } {
    const [offset, setOffset] = useState<number | null>(null);
    const [tempConsigna, setTempConsigna] = useState<number | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(`/api/calefaccion/${calId}`);
          const data = await res.json();
          setOffset(data.offset);
          setTempConsigna(data.tempConsigna);
        } catch (error) {
          console.error("Error al obtener datos dinámicos de calefacción", error);
        }
      };
  
      fetchData();
    }, [calId]);
  
    return { offset, tempConsigna };

}