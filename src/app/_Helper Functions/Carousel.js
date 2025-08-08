"use client";
import { useState, Children, cloneElement } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";

export default function CarouselWrapper({ children, itemsPerPage = 2 }) {
  const [currentPage, setCurrentPage] = useState(0);

  const childrenArray = Children.toArray(children);
  const totalPages = Math.ceil(childrenArray.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const startIndex = currentPage * itemsPerPage;
  const visibleItems = childrenArray.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="w-full ">
      {/* Carousel Items */}
      <div className="flex flex-row justify-center gap-6">
        {visibleItems.map((child, idx) => (
          <div key={idx} className="w-full sm:w-1/2 lg:w-1/3 px-2">
            {cloneElement(child)}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {childrenArray.length > itemsPerPage && (
        <div className="flex justify-center gap-4 mt-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition ${
              currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaArrowAltCircleRight className="transform rotate-180" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition ${
              currentPage === totalPages - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <FaArrowAltCircleRight />
          </button>
        </div>
      )}
    </div>
  );
}
