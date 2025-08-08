"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ImageCarousel({ data }) {
  const [index, setIndex] = useState(0);

  const images = data.images || [];
  const total = images.length;

  const prev = () => setIndex((i) => (i === 0 ? total - 1 : i - 1));
  const next = () => setIndex((i) => (i === total - 1 ? 0 : i + 1));

  if (total === 0) return null;

  return (
    <div className="relative w-full max-w-lg">
      <Image
        src={images[index]?.url}
        width={500}
        height={300}
        className="rounded-xl object-cover w-full h-[200px]"
        alt={`${data.name} scenic ${index + 1}`}
      />
      <h4 className="mt-2 text-sm font-medium">Tour</h4>
      <p className="text-xs text-gray-500">{data.description}</p>

      <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
        <span>{data.name}</span>
        <span className="flex gap-2 items-center">
          <button onClick={prev}>
            <ArrowLeft className="w-4 h-4" />
          </button>
          {index + 1}/{total}
          <button onClick={next}>
            <ArrowRight className="w-4 h-4" />
          </button>
        </span>
      </div>
    </div>
  );
}
