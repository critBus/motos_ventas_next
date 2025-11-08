"use client";

import React, { useState, useMemo } from "react";
import { Filter, Circle } from "lucide-react";
import {
  ConditionMotorcycleType,
  FuelType,
  GetMotorcyclesParams,
  Motorcycle,
  MotorcyclesResponse,
} from "@/types/motorcycles.types";
import MotorcycleCard from "@/components/shared/MotorcycleCard";
const BACKGROUND_IMAGE_PATH = "/images/moto-ready-start.jpeg";
// 1. Importar los tipos reales

// 2. Mock Data (Ajustado a la nueva estructura. En un entorno real, esto vendría de un fetch)

// --- REUSABLE FILTER GROUP COMPONENT (Mismo que en la respuesta anterior) ---

interface FilterGroupProps<T extends string> {
  title: string;
  options: { label: string; value: T }[];
  selectedValue: T;
  onChange: (value: T) => void;
  isFirst?: boolean;
}

// Nota: Mantener el componente FilterGroup aquí o en un archivo aparte.
function FilterGroup<T extends string>({
  title,
  options,
  selectedValue,
  onChange,
  isFirst = false,
}: FilterGroupProps<T>) {
  return (
    <div className={isFirst ? "" : "pt-6 border-t border-zinc-800"}>
      <label className="text-sm leading-none text-white font-semibold mb-3 block">
        {title}
      </label>
      <div role="radiogroup" className="grid gap-2 space-y-2">
        {options.map((option) => {
          const isSelected = option.value === selectedValue;
          return (
            <div key={option.value} className="flex items-center space-x-2">
              <button
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onChange(option.value)}
                className="aspect-square h-4 w-4 rounded-full border text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border-zinc-600"
              >
                {isSelected && (
                  <span className="flex items-center justify-center">
                    <Circle className="lucide lucide-circle h-3.5 w-3.5 fill-primary text-orange-500" />
                  </span>
                )}
              </button>
              <label
                className={`text-sm font-medium leading-none cursor-pointer ${
                  isSelected ? "text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

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
}: InventorySectionProps) => {
  const pageSize = 10; //meta.pageSize
  const totalPages =
    pageSize && meta.count ? Math.ceil(meta.count / pageSize) : 1;
  const currentPage = activeParams.page || 1;
  //TODO poner el loading

  // 4. State for Filters and Sort (Actualizado a los nuevos nombres)
  const [brand, setBrand] = useState(activeParams.brand ?? "");
  const [condition, setCondition] = useState(activeParams.condition ?? "");
  const [fuelType, setFuelType] = useState(activeParams.fuel_type ?? "");
  // const [priceRange, setPriceRange] = useState<PriceRangeValue>("all");
  const [sortBy, setSortBy] = useState(
    activeParams.ordering ?? "-published_at"
  );

  // Opciones de marca dinámicas (en un caso real, se cargarían aparte)
  //const brandOptions = useMemo(() => getUniqueBrands(MOCK_INVENTORY), []);

  const handleBrandClick = (brand: string) => {
    const newBrand = activeParams.brand === brand ? undefined : brand; // Desactivar si ya está seleccionado
    setBrand(brand);
    onFilterChange({
      brand: newBrand,
      page: 1, // Resetear la paginación
    });
  };

  const handleConditionClick = (condition: ConditionMotorcycleType | "") => {
    const newCondition =
      activeParams.condition === condition ? undefined : condition; // Desactivar si ya está seleccionado
    setCondition(condition);
    onFilterChange({
      condition: newCondition,
      page: 1, // Resetear la paginación
    });
  };

  const handleFuelClick = (fuel: FuelType | "") => {
    const newFuelType = activeParams.fuel_type === fuel ? undefined : fuel; // Desactivar si ya está seleccionado
    setFuelType(fuel);
    onFilterChange({
      fuel_type: newFuelType,
      page: 1, // Resetear la paginación
    });
  };

  const handleOrderClick = (ordering: string | "") => {
    const newOrdering =
      activeParams.ordering === ordering ? undefined : ordering; // Desactivar si ya está seleccionado
    setSortBy(ordering);
    onFilterChange({
      ordering: newOrdering,
      page: 1, // Resetear la paginación
    });
  };

  // 5. Filter and Sort Logic (useMemo)
  // const filteredAndSortedInventory = useMemo(() => {
  //   let result = MOCK_INVENTORY.filter((bike) => bike.status === "active"); // Solo activas

  //   // --- Filtering Logic ---
  //   if (brand !== "all") {
  //     result = result.filter((bike) => bike.brand === brand);
  //   }

  //   if (condition !== "all") {
  //     result = result.filter((bike) => bike.condition === condition);
  //   }

  //   if (fuelType !== "all") {
  //     result = result.filter((bike) => bike.fuel_type === fuelType);
  //   }

  //   if (priceRange !== "all") {
  //     result = result.filter((bike) => {
  //       const price = parseFloat(bike.price); // Parsear el string del precio
  //       if (isNaN(price)) return false;

  //       switch (priceRange) {
  //         case "under_10k":
  //           return price < 10000;
  //         case "10k_20k":
  //           return price >= 10000 && price <= 20000;
  //         case "20k_30k":
  //           return price > 20000 && price <= 30000;
  //         case "over_30k":
  //           return price > 30000;
  //         default:
  //           return true;
  //       }
  //     });
  //   }

  //   // --- Sorting Logic ---
  //   result.sort((a, b) => {
  //     const priceA = parseFloat(a.price);
  //     const priceB = parseFloat(b.price);

  //     switch (sortBy) {
  //       case "price":
  //         return isNaN(priceA) || isNaN(priceB) ? 0 : priceA - priceB;
  //       case "-price":
  //         return isNaN(priceA) || isNaN(priceB) ? 0 : priceB - priceA;
  //       case "name":
  //         return a.name.localeCompare(b.name);
  //       case "mileage_km":
  //         return a.mileage_km - b.mileage_km;
  //       case "-mileage_km":
  //         return b.mileage_km - a.mileage_km;
  //       case "-published_at": // Usar fecha de publicación para ordenamiento por defecto
  //       default:
  //         return (
  //           new Date(b.published_at!).getTime() -
  //           new Date(a.published_at!).getTime()
  //         );
  //     }
  //   });

  //   return result;
  // }, [brand, condition, fuelType, priceRange, sortBy]);

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        {error}
      </div>
    );
  }

  // 6. Render
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column - Filters and Sort */}
        <div className="lg:col-span-1">
          <div className="space-y-6 sticky top-8">
            {" "}
            {/* Añadido sticky top-8 para mejor UX en filtros */}
            <div className="rounded-xl border text-card-foreground shadow bg-zinc-900 border-zinc-800">
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="font-semibold leading-none tracking-tight flex items-center gap-2 text-white">
                  <Filter className="w-5 h-5 text-orange-500" />
                  Filtros
                </div>
              </div>
              <div className="p-6 pt-0 space-y-6">
                <FilterGroup
                  title="Marca"
                  options={[
                    { label: "All", value: "" },
                    { label: "Yamaha", value: "Yamaha" },
                    { label: "Triumph", value: "Triumph" },
                    { label: "Kawasaki", value: "Kawasaki" },
                  ]}
                  selectedValue={brand}
                  onChange={handleBrandClick}
                  isFirst={true}
                />

                <FilterGroup
                  title="Condición"
                  options={[
                    { label: "Todas", value: "" },
                    { label: "Nueva", value: "new" },
                    { label: "Usada", value: "used" },
                  ]}
                  selectedValue={condition}
                  onChange={handleConditionClick}
                />

                <FilterGroup
                  title="Tipo de Combustible"
                  options={[
                    { label: "Todos", value: "" },
                    { label: "Gasolina", value: "gas" },
                    { label: "Eléctrica", value: "electric" },
                    { label: "Híbrida", value: "hybrid" },
                    { label: "Diesel", value: "diesel" },
                    { label: "Other", value: "other" },
                  ]}
                  selectedValue={fuelType}
                  onChange={handleFuelClick}
                />

                <FilterGroup
                  title="Ordenar Por"
                  options={[
                    { label: "Fecha: Más Reciente", value: "-published_at" },
                    { label: "Precio: Menor a Mayor", value: "price" },
                    { label: "Precio: Mayor a Menor", value: "-price" },
                    {
                      label: "Kilometraje: Menor a Mayor",
                      value: "mileage_km",
                    },
                    { label: "Nombre: A-Z", value: "name" },
                  ]}
                  selectedValue={sortBy}
                  onChange={handleOrderClick}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Inventory Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {motorcycles.map((motorcycle) => (
              <MotorcycleCard key={motorcycle.id} motorcycle={motorcycle} />
            ))}
          </div>
          {motorcycles.length === 0 && (
            <div className="text-center py-10 text-zinc-500 text-lg">
              No se encontraron motocicletas que coincidan con tus filtros.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventorySection;
