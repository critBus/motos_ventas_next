"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { GetMotorcyclesParams } from "@/types/motorcycles.types";
import { Filter } from "lucide-react"; // Importamos el icono Filter

const SearchSection = ({
  onFilterChange,
  activeParams,
  isDrawerOpen,
  setIsDrawerOpen,
}: {
  onFilterChange: (newFilters: Partial<GetMotorcyclesParams>) => void;
  activeParams: GetMotorcyclesParams;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (drawerOpen: boolean) => void;
}) => {
  const t = useTranslations("Motorcycles.SearchSection");
  const [initialState, setInitialState] = useState(activeParams.search ?? "");
  const [searchQuery, setSearchQuery] = useState(activeParams.search ?? "");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(
    activeParams.search ?? ""
  );
  // Referencia para detectar el primer renderizado
  const isFirstRender = useRef(true);
  const DEBOUNCE_DELAY = 500;
  useEffect(() => {
    if ((activeParams.search ?? "") !== initialState) {
      setInitialState(activeParams.search ?? "");
    }
  }, [activeParams]);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, DEBOUNCE_DELAY);
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);
  // Modificación clave: evita la ejecución en el primer renderizado
  useEffect(() => {
    // Si es el primer renderizado, solo marcamos que ya pasó y salimos
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (debouncedSearchQuery !== initialState) {
      // Solo ejecutamos la búsqueda después de la interacción del usuario
      onFilterChange({
        search: debouncedSearchQuery,
        page: 1,
      });
    }
  }, [debouncedSearchQuery, onFilterChange]);
  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value + "");
  };
  const resultCount = 6;
  return (
    <div className="bg-black border-b border-zinc-800 sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="relative w-full lg:w-96 flex items-center gap-2">
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
            {/* Botón para abrir el Drawer en pantallas pequeñas */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label="Abrir filtros"
            >
              <Filter className="w-5 h-5 text-orange-500" />
            </button>
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
