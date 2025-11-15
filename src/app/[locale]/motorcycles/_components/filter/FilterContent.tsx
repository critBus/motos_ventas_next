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

import PriceRangeFilter from "./PriceRangeFilter";
import { useTranslations } from "next-intl";

interface FilterGroupProps<T extends string> {
  title: string;
  options: { label: string; value: T }[];
  selectedValue: T;
  onChange: (value: T) => void;
  isFirst?: boolean;
}

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

interface FilterContentProps {
  //   motorcycles: Motorcycle[];
  //   loading: boolean;
  //   error: string | null;
  //   meta: Omit<MotorcyclesResponse, "results">;
  activeParams: GetMotorcyclesParams;
  //   onPageChange: (page: number) => void;
  //   onSortChange: (ordering: string) => void;
  onFilterChange: (newFilters: Partial<GetMotorcyclesParams>) => void;
  //   handleFilterChangeAndCloseDrawer: (
  //     newFilters: Partial<GetMotorcyclesParams>
  //   ) => void;
}

const FilterContent = ({
  //   motorcycles,
  //   loading,
  //   error,
  //   meta,
  activeParams,
  //   onPageChange,
  //   onSortChange,
  onFilterChange,
}: //   handleFilterChangeAndCloseDrawer,
FilterContentProps) => {
  const t = useTranslations("Motorcycles.InventorySection");

  const [brand, setBrand] = useState(activeParams.brand ?? "");
  const [condition, setCondition] = useState(activeParams.condition ?? "");
  const [fuelType, setFuelType] = useState(activeParams.fuel_type ?? "");
  const [sortBy, setSortBy] = useState(
    activeParams.ordering ?? "-published_at"
  );

  const [minPrice, setMinPrice] = useState<string>(
    activeParams.min_price?.toString() || ""
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    activeParams.max_price?.toString() || ""
  );

  useEffect(() => {
    // Actualizar el estado de precios cuando los parámetros cambien
    setMinPrice(activeParams.min_price?.toString() || "");
    setMaxPrice(activeParams.max_price?.toString() || "");
  }, [activeParams]);

  const handleBrandClick = (brand: string) => {
    const newBrand = activeParams.brand === brand ? undefined : brand;
    setBrand(brand);
    onFilterChange({
      brand: newBrand,
      page: 1,
    });
  };

  const handleConditionClick = (condition: ConditionMotorcycleType | "") => {
    const newCondition =
      activeParams.condition === condition ? undefined : condition;
    setCondition(condition);
    onFilterChange({
      condition: newCondition,
      page: 1,
    });
  };

  const handleFuelClick = (fuel: FuelType | "") => {
    const newFuelType = activeParams.fuel_type === fuel ? undefined : fuel;
    setFuelType(fuel);
    onFilterChange({
      fuel_type: newFuelType,
      page: 1,
    });
  };

  const handleOrderClick = (ordering: string | "") => {
    const newOrdering =
      activeParams.ordering === ordering ? undefined : ordering;
    setSortBy(ordering);
    onFilterChange({
      ordering: newOrdering,
      page: 1,
    });
  };

  // Función específica para manejar el rango de precios
  const handlePriceRangeChange = useCallback(
    (min: string, max: string) => {
      const newFilters: Partial<GetMotorcyclesParams> = {
        page: 1,
      };

      // Limpiar los valores de min_price y max_price si están vacíos
      if (min.trim() === "") {
        newFilters.min_price = undefined;
      } else {
        newFilters.min_price = Math.max(0, parseInt(min));
      }

      if (max.trim() === "") {
        newFilters.max_price = undefined;
      } else {
        newFilters.max_price = Math.max(0, parseInt(max));
      }

      onFilterChange(newFilters);
    },
    [onFilterChange]
  );

  // Función para limpiar el rango de precios
  const handleClearPriceRange = useCallback(() => {
    onFilterChange({
      min_price: undefined,
      max_price: undefined,
      page: 1,
    });
  }, [onFilterChange]);

  return (
    <>
      <PriceRangeFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        onApply={handlePriceRangeChange}
        onClear={handleClearPriceRange}
      />
      <FilterGroup
        title={t("brand")}
        options={[
          { label: t("all"), value: "" },
          { label: "Yamaha", value: "Yamaha" },
          { label: "Triumph", value: "Triumph" },
          { label: "Kawasaki", value: "Kawasaki" },
        ]}
        selectedValue={brand}
        onChange={handleBrandClick}
        isFirst={true}
      />

      <FilterGroup
        title={t("condition")}
        options={[
          { label: t("all"), value: "" },
          { label: "Nueva", value: "new" },
          { label: "Usada", value: "used" },
        ]}
        selectedValue={condition}
        onChange={handleConditionClick}
      />

      <FilterGroup
        title={t("fuel_type")}
        options={[
          { label: t("all"), value: "" },
          { label: t("gasoline"), value: "gas" },
          { label: t("electric"), value: "electric" },
          { label: t("hybrid"), value: "hybrid" },
          { label: t("diesel"), value: "diesel" },
          { label: t("other"), value: "other" },
        ]}
        selectedValue={fuelType}
        onChange={handleFuelClick}
      />

      <FilterGroup
        title={t("sort_by")}
        options={[
          { label: t("most_recent_date"), value: "-published_at" },
          { label: t("price_low_to_high"), value: "price" },
          { label: t("price_high_to_low"), value: "-price" },
          {
            label: t("mileage_low_to_high"),
            value: "mileage_km",
          },
          { label: t("name_a_z"), value: "name" },
        ]}
        selectedValue={sortBy}
        onChange={handleOrderClick}
      />
    </>
  );
};

export default FilterContent;
