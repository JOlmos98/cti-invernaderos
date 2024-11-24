// /src/app/pruebasBack/parametros/greet.tsx
'use client'

import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';

// -------------------------------------------------- fn greet --------------------------------------------------
export default function Greet() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    invoke<string>('greet', { name: 'Next.js' })
      .then(result => setGreeting(result))
      .catch(console.error)
  }, [])

  return <div className="font-bold text-orange-500">{greeting}</div>;
}

