// /src/app/pruebasBack/parametros/greet.tsx
'use client'

import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';

export default function Greet() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    invoke<string>('greet', { name: 'Next.js' })
      .then(result => setGreeting(result))
      .catch(console.error)
  }, [])

  // Necessary because we will have to use Greet as a component later.
  return <div className="font-bold text-orange-500">{greeting}</div>;
}