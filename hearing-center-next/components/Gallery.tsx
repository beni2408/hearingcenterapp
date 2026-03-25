'use client';
import { useState } from 'react';

export default function Gallery({ images = [...] }: { images?: string[] }) {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <div className="w-full my-8 text-center">
      <img src={images[index]} className="mx-auto rounded shadow w-[600px]" alt="" />
      <div className="mt-3 flex justify-center gap-4">
        <button onClick={prev} className="bg-red-600 w-20 text-white rounded">Prev</button>
        <button onClick={next} className="bg-red-600 w-20 text-white rounded">Next</button>
      </div>
    </div>
  );
}