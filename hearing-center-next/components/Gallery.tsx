// "use client";
// import { useState } from "react";

// export default function Gallery({ images = [] }: { images?: string[] }) {
//   const [index, setIndex] = useState(0);
//   const next = () => setIndex((index + 1) % images.length);
//   const prev = () => setIndex((index - 1 + images.length) % images.length);

//   return (
//     <div className="w-full my-8 text-center">
//       <img
//         src={images[index]}
//         className="mx-auto rounded shadow w-[600px]"
//         alt=""
//       />
//       <div className="mt-3 flex justify-center gap-4">
//         <button onClick={prev} className="bg-red-600 w-20 text-white rounded">
//           Prev
//         </button>
//         <button onClick={next} className="bg-red-600 w-20 text-white rounded">
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";

export default function Gallery({ images = [] }: { images?: string[] }) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  if (!images.length) return null;

  return (
    <div className="w-full my-10">
      <div className="relative max-w-4xl mx-auto">
        {/* IMAGE */}
        <div className="overflow-hidden rounded-xl shadow-sm">
          <img
            src={images[index]}
            alt=""
            className="w-full h-[220px] sm:h-[300px] lg:h-[400px] object-cover transition duration-300"
          />
        </div>

        {/* LEFT ARROW */}
        <button
          onClick={prev}
          className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-4 bg-white/80 hover:bg-white backdrop-blur p-2 rounded-full shadow transition"
        >
          ←
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={next}
          className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-4 bg-white/80 hover:bg-white backdrop-blur p-2 rounded-full shadow transition"
        >
          →
        </button>

        {/* DOTS */}
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer transition ${
                i === index ? "bg-gray-900" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
