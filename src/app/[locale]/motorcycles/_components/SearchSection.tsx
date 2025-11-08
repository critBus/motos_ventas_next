"use client";
import React, { useState, useEffect, useRef } from "react"; // 1. Importar useEffect y useRef
import { useTranslations } from "next-intl";
import { GetMotorcyclesParams } from "@/types/motorcycles.types";

const SearchSection = ({
  onFilterChange,
}: {
  onFilterChange: (newFilters: Partial<GetMotorcyclesParams>) => void;
}) => {
  const t = useTranslations("Motorcycles.SearchSection");

  // 2. Define state for the search query (lo que se escribe en el input)
  const [searchQuery, setSearchQuery] = useState("");

  // 3. Define state for the DEBOUNCED search query (lo que se usa para filtrar)
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  // 4. Duración del debounce en milisegundos
  const DEBOUNCE_DELAY = 500; // 500ms

  // --- Manejo del Debounce con useEffect ---

  // Este useEffect se ejecuta cada vez que 'searchQuery' cambia.
  useEffect(() => {
    // 5. Establecer un temporizador (timeout)
    const handler = setTimeout(() => {
      // 6. Actualizar el estado debounced después del retraso
      setDebouncedSearchQuery(searchQuery);
    }, DEBOUNCE_DELAY);

    // 7. Cleanup function: se ejecuta si searchQuery cambia antes del retraso
    // o cuando el componente se desmonta. Esto "cancela" el temporizador anterior.
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]); // Dependencia: solo se ejecuta cuando searchQuery cambia

  // --- Aplicar Filtro Debounceado con un segundo useEffect ---

  // Este useEffect se ejecuta solo cuando 'debouncedSearchQuery' cambia (después del debounce)
  useEffect(() => {
    // 8. Aplicar el filtro a través de la prop onFilterChange
    onFilterChange({
      search: debouncedSearchQuery,
      page: 1, // Resetear la paginación
    });
  }, [debouncedSearchQuery, onFilterChange]); // Dependencia: solo se ejecuta cuando debouncedSearchQuery cambia. Incluir onFilterChange.

  // 9. Define the input change handler function
  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    // Solo actualiza el estado inmediato del input
    setSearchQuery(event.target.value + "");
    // NOTA: Ya NO se llama a onFilterChange aquí, el useEffect lo manejará
  };

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
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="text-zinc-400">
            <span className="font-semibold text-white">{resultCount}</span>{" "}
            {t("results", { count: resultCount })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
