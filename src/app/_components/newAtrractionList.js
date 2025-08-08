import Image from "next/image";
import { FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function NewAttraction() {
  return (
    <div className="rounded-xl overflow-hidden bg-white relative group w-1/3">
      <Image
        src="https://images.pexels.com/photos/853199/pexels-photo-853199.jpeg"
        alt="it"
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />
      <button className="absolute top-2 right-2 bg-white p-1 rounded-full text-gray-800 text-xs shadow">
        <FaHeart className="text-pink-500" />
      </button>
      <div className="p-2">
        <h5 className="text-sm font-semibold leading-tight text-gray-800">
          Hawaii
        </h5>
        <p className="text-[10px] text-gray-500">tag</p>
        <p className="text-[10px] text-yellow-600 font-medium">
          ⭐ 4.6 , was a good tour
        </p>
      </div>
    </div>
  );
}
