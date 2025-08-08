"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import debounce from "lodash.debounce";

export default function DestinationInput({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  const debouncedSearch = useCallback(
    debounce(async (value) => {
      if (value.length < 2) return;
      try {
        const res = await fetch(`/api/countries/search?query=${value}`);
        const data = await res.json();
        setResults(data.results || []);
        setShowDropdown(true);
      } catch (err) {
        console.error("❌ Search failed:", err);
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (query.trim().length > 1) {
      debouncedSearch(query);
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  }, [query, debouncedSearch]);

  const handleSelect = (item) => {
    setQuery(item.name);
    setShowDropdown(false);
    onSelect(item);
  };

  const handleClickOutside = (e) => {
    if (!inputRef.current?.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={inputRef}>
      <input
        type="text"
        value={query}
        placeholder="Search destination..."
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 border-2 rounded-lg"
      />

      {showDropdown && results.length > 0 && (
        <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow max-h-60 overflow-y-auto">
          {results.map((item, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(item)}
              className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
            >
              {item.flag && (
                <img src={item.flag} alt={item.name} className="w-5 h-4" />
              )}
              <span className="text-sm">
                {item.name}{" "}
                <span className="text-gray-500 text-xs">
                  ({item.type === "country" ? "Country" : item.country})
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
