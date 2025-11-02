// SearchSection.tsx

"use client";
import React, { useState } from "react";
// 1. Importar useTranslations
import { useTranslations } from "next-intl";

const SearchSection = () => {
  // Inicializar traducciones
  const t = useTranslations("Motorcycles.SearchSection");

  // 2. Define state for the search query
  const [searchQuery, setSearchQuery] = useState("");

  // 3. Define the change handler function
  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };

  // Se asume que el número de resultados (6) es una variable que se pasa por props o se calcula dentro del componente.
  // Para este ejemplo, mantendré el 6 estático como estaba, pero se recomienda reemplazarlo con una prop.
  const resultCount = 6;

  return (
    <div className="bg-black border-b border-zinc-800 sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="relative w-full lg:w-96">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <input
              type="text"
              className="flex h-9 w-full rounded-md border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-orange-500"
              // Usar 't' para el placeholder
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="text-zinc-400">
            {/* Usar 't' para el texto de resultados. Se usa un plural. */}
            <span className="font-semibold text-white">{resultCount}</span>{" "}
            {t("results", { count: resultCount })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
