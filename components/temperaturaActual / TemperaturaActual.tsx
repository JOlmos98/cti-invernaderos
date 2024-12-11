'use client';

import EventEmitter from 'events';
import React, { useEffect,useState } from 'react'

// Función principal para renderizar la lista de calefacciones [IMP - Se tiene que hacer fuera de la función]
const tempEmitter = new EventEmitter();
        let tempActual = 15;
        let incremento = 0.1;

    setInterval(() => { 
        tempActual += incremento;
        if (tempActual > 30) {
            tempActual = 15; // Resetea el valor a 15 si es mayor que 30
        }
        tempEmitter.emit('tempUpdate', tempActual);
    }, 1000); 

export default function  TemperaturaActual() {    
    const [tempActualState, setTempActualState] = useState<number>(15); // Estado inicial de la temperatura

    useEffect(() => {
        const updateHandler = (newTemp: number) => {
            setTempActualState(newTemp); // Actualizar el estado con la nueva temperatura
        };

        // Suscribirse al evento "tempUpdate"
        tempEmitter.on("tempUpdate", updateHandler);

        return () => {
            // Eliminar la suscripción al desmontar el componente
            tempEmitter.off("tempUpdate", updateHandler);
        };
    }, []); // El arreglo vacío asegura que esto solo se ejecute al montar/desmontar

    return (
        <div className="text-center">
            <p className="text-lg">{tempActualState.toFixed(1)} °C</p>
        </div>
    );
}