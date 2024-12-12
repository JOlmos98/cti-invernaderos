'use client'
import React, { useState } from 'react'

type NumericInputWithKeyboardProps = {
    value?: string;
    onChange?: (value: string) => void;
};
// Modificarlo --> tipo calculadora ver donde lo coloco  || Esto se tiene que borrar 
export default function NumericInputWithKeyboard({ value = "", onChange }: NumericInputWithKeyboardProps): JSX.Element {
    const [inputValue, setInputValue] = useState<string>(value); // Estado del input
    const [showKeyboard, setShowKeyboard] = useState<boolean>(false); // Estado para mostrar el teclado

    const handleKeyPress = (key: string): void => {
        const newValue = inputValue + key;
        setInputValue(newValue); 
        if (onChange) onChange(newValue); 
    };

    const handleBackspace = (): void => {
        const newValue = inputValue.slice(0, -1);
        setInputValue(newValue); 
        if (onChange) onChange(newValue); 
    };

    const handleClear = (): void => {
        setInputValue(""); 
        if (onChange) onChange(""); 
    };
    const handleFocus = (): void => {
        setShowKeyboard(true); 
    };

    const handleBlur = (): void => {
        setShowKeyboard(false); 
    };

    return (
        <div className="relative w-64 mx-auto">
            {/* Input */}
            <input
                type="text"
                value={inputValue}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Introduce un número..."
                readOnly // Evita entrada manual, solo usa el teclado virtual
            />

            {/* Teclado virtual numérico */}
            {showKeyboard && (
                <div className="absolute top-full left-0 mt-2 w-full bg-gray-200 p-4 rounded-lg shadow-md">
                    <div className="grid grid-cols-3 gap-2">
                        {/* Números del teclado */}
                        {"1234567890".split("").map((key) => (
                            <button
                                key={key}
                                onClick={() => handleKeyPress(key)}
                                className="px-4 py-2 bg-white rounded-md shadow hover:bg-gray-300 text-lg font-semibold"
                            >
                                {key}
                            </button>
                        ))}

                        {/* Botón de borrar */}
                        <button
                            onClick={handleBackspace}
                            className="col-span-2 px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 text-lg font-semibold"
                        >
                            Borrar
                        </button>

                        {/* Botón de limpiar */}
                        <button
                            onClick={handleClear}
                            className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-600 text-lg font-semibold"
                        >
                            Limpiar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}


