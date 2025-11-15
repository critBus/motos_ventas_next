"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Filter,
  Circle,
  ArrowBigRightDash,
  ArrowBigLeftDash,
  X, // Importamos el icono para cerrar el Drawer
} from "lucide-react";
import {
  ConditionMotorcycleType,
  FuelType,
  GetMotorcyclesParams,
  Motorcycle,
  MotorcyclesResponse,
} from "@/types/motorcycles.types";
import MotorcycleCard from "@/components/shared/MotorcycleCard";
import { useTranslations } from "next-intl";
import FilterContent from "./filter/FilterContent";

// --- REUSABLE FILTER GROUP COMPONENT (Mismo que el original) ---

// --- DRAWER COMPONENT ---

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  return (
    <>
      {/* Overlay (Fondo oscuro) */}
      <div
        className={`fixed inset-0 z-40 bg-black/80 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } lg:hidden`} // Ocultar en pantallas grandes
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Drawer (Panel lateral) */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-72 max-w-full bg-zinc-900 shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`} // Ocultar en pantallas grandes
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-drawer-title"
      >
        <div className="p-4 flex items-center justify-between border-b border-zinc-800">
          <h2
            id="filter-drawer-title"
            className="text-lg font-semibold text-white flex items-center gap-2"
          >
            <Filter className="w-5 h-5 text-orange-500" />
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors p-1"
            aria-label="Cerrar filtros"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto h-[calc(100%-65px)]">
          {/* Contenido de los filtros */}
          <div className="space-y-6">{children}</div>
        </div>
      </div>
    </>
  );
};

// --- MAIN COMPONENT ---

interface InventorySectionProps {
  motorcycles: Motorcycle[];
  loading: boolean;
  error: string | null;
  meta: Omit<MotorcyclesResponse, "results">;
  activeParams: GetMotorcyclesParams;
  onPageChange: (page: number) => void;
  onSortChange: (ordering: string) => void;
  onFilterChange: (newFilters: Partial<GetMotorcyclesParams>) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (drawerOpen: boolean) => void;
}

const InventorySection = ({
  motorcycles,
  loading,
  error,
  meta,
  activeParams,
  onPageChange,
  onSortChange,
  onFilterChange,
  isDrawerOpen,
  setIsDrawerOpen,
}: InventorySectionProps) => {
  const t = useTranslations("Motorcycles.InventorySection");
  const pageSize = 10; //meta.pageSize
  const [totalPages, setTotalPages] = useState(
    pageSize && meta.count ? Math.ceil(meta.count / pageSize) : 1
  );
  const [currentPage, setCurrentPage] = useState(activeParams.page || 1);

  useEffect(() => {
    setTotalPages(
      pageSize && meta.count ? Math.ceil(meta.count / pageSize) : 1
    );
    setCurrentPage(activeParams.page || 1);
  }, [meta, activeParams]);

  // Función para cerrar el Drawer al aplicar un filtro
  const handleFilterChangeAndCloseDrawer = useCallback(
    (newFilters: Partial<GetMotorcyclesParams>) => {
      onFilterChange(newFilters);
      setIsDrawerOpen(false); // Cierra el Drawer después de aplicar el filtro
    },
    [onFilterChange]
  );

  const handlerPaginationClick = (next: boolean) => {
    const newPage = next
      ? currentPage + 1
      : currentPage > 1
      ? currentPage - 1
      : 1;
    setCurrentPage(newPage);
    onFilterChange({
      page: newPage,
    });
  };

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        {error}
      </div>
    );
  }

  // Contenido de los filtros (reutilizable)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Drawer de Filtros (Solo visible en móviles) */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={t("filters")}
      >
        <FilterContent
          activeParams={activeParams}
          onFilterChange={onFilterChange}
        />
      </Drawer>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column - Filters and Sort (Visible SOLO en Desktop) */}
        <div className="lg:col-span-1 hidden lg:block">
          {" "}
          {/* <--- CLAVE: hidden lg:block */}
          <div className="space-y-6 sticky top-8">
            <div className="rounded-xl border text-card-foreground shadow bg-zinc-900 border-zinc-800">
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="font-semibold leading-none tracking-tight flex items-center gap-2 text-white">
                  <Filter className="w-5 h-5 text-orange-500" />
                  {t("filters")}
                </div>
              </div>
              <div className="p-6 pt-0 space-y-6">
                <FilterContent
                  activeParams={activeParams}
                  onFilterChange={onFilterChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Inventory Grid */}
        <div className="lg:col-span-3 col-span-1">
          {" "}
          {/* Aseguramos que ocupe todo el ancho en móviles */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {motorcycles.map((motorcycle) => (
              <MotorcycleCard key={motorcycle.id} motorcycle={motorcycle} />
            ))}
          </div>
          {motorcycles.length === 0 && (
            <div className="text-center py-10 text-zinc-500 text-lg">
              {t("not_match")}
            </div>
          )}
          {/* Control de Paginación */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => handlerPaginationClick(false)}
                disabled={currentPage <= 1}
                className="inline-flex 
              items-center 
            justify-center 
            h-9 px-4 py-2 
            whitespace-nowrap rounded-md 
            text-sm 
            font-medium 
            transition-colors 
            focus-visible:outline-none 
            focus-visible:ring-1 
            focus-visible:ring-ring 
            disabled:pointer-events-none 
            disabled:opacity-50 
            text-primary-foreground 
            shadow 
            bg-orange-500 
            hover:bg-orange-600 
            group-hover:bg-gradient-to-r 
            group-hover:from-orange-500 
            group-hover:to-red-600
            hover:cursor-pointer
            "
              >
                <ArrowBigLeftDash />
              </button>
              <span className="text-gray-700">
                {t("pageIndicator", {
                  currentPage,
                  totalPages,
                })}
              </span>
              <button
                onClick={() => handlerPaginationClick(true)}
                disabled={currentPage >= totalPages}
                className="inline-flex 
              items-center 
            justify-center 
            h-9 px-4 py-2 
            whitespace-nowrap rounded-md 
            text-sm 
            font-medium 
            transition-colors 
            focus-visible:outline-none 
            focus-visible:ring-1 
            focus-visible:ring-ring 
            disabled:pointer-events-none 
            disabled:opacity-50 
            text-primary-foreground 
            shadow 
            bg-orange-500 
            hover:bg-orange-600 
            group-hover:bg-gradient-to-r 
            group-hover:from-orange-500 
            group-hover:to-red-600
            hover:cursor-pointer
            "
              >
                <ArrowBigRightDash />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventorySection;
