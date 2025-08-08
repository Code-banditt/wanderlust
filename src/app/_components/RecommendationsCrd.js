import Image from "next/image";
import Button from "./Button";

export default function ProductCard({ countryinfo, image, onselect }) {
  const description = image?.tags.split(" ").slice(0, 3).join(" ");
  return (
    <div className="relative group w-72 h-72 overflow-hidden rounded-xl shadow-lg bg-base-100">
      {/* Image */}
      {image?.url && (
        <Image
          width={400}
          height={400}
          src={image.url}
          alt="Product"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition duration-500" />

      {/* Hover Info */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
        <h2 className="text-lg font-light">{description}</h2>
        <div className=" text-black rounded-full p-2 hover:bg-gray-200 transition">
          <Button
            onClick={() =>
              onselect(image, countryinfo.tags?.split(",")[0].trim())
            }
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
