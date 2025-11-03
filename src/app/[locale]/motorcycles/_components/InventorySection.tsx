"use client";

import React, { useState, useMemo } from "react";
import { Filter, Circle } from "lucide-react";
import {
  GetMotorcyclesParams,
  Motorcycle,
  MotorcyclesResponse,
} from "@/types/motorcycles.types";
import MotorcycleCard from "@/components/shared/MotorcycleCard";
const BACKGROUND_IMAGE_PATH = "/images/moto-ready-start.jpeg";
// 1. Importar los tipos reales

// 2. Mock Data (Ajustado a la nueva estructura. En un entorno real, esto vendría de un fetch)
const MOCK_INVENTORY: Motorcycle[] = [
  {
    id: 1,
    images: [
      {
        id: 101,
        image: BACKGROUND_IMAGE_PATH,
      },
    ],
    created: "2023-11-01T10:00:00Z",
    modified: "2023-11-01T10:00:00Z",
    name: "R1",
    brand: "Yamaha",
    model_code: "YZF-R1",
    year: 2024,
    price: "18999.00",
    condition: "new",
    vehicle_type: "motorcycle",
    fuel_type: "gas",
    description:
      "The ultimate superbike combining raw power with cutting-edge technology. Features advanced electronics, aerodynamic bodywork, and a screaming inline-four engine.",
    status: "active",
    published_at: "2023-11-01T10:00:00Z",
    expires_at: null,
    never_expires: true,
    number_of_wheels: 2,
    has_sidecar: false,
    battery_capacity_kwh: "",
    range_km: 0,
    charging_time_hours: "",
    engine_displacement_cc: 998,
    motor_power_hp: "200",
    top_speed_kmh: 300,
    weight_kg: "201",
    seat_height_mm: 855,
    fuel_capacity_l: "17",
    mileage_km: 0,
    previous_owners: 0,
    color: "Blue",
    vin: "JYA...123",
    certified: true,
    is_visible_in_home: true,
    visibility_index_in_home: 1,
  },
  {
    id: 2,
    images: [
      {
        id: 102,
        image: BACKGROUND_IMAGE_PATH,
      },
    ],
    created: "2023-09-15T10:00:00Z",
    modified: "2023-09-15T10:00:00Z",
    name: "Iron 883",
    brand: "Harley-Davidson",
    model_code: "XL883N",
    year: 2022,
    price: "9999.00",
    condition: "used",
    vehicle_type: "motorcycle",
    fuel_type: "gas",
    description:
      "Classic American cruiser with authentic styling. The iconic Evolution engine delivers that legendary Harley rumble.",
    status: "active",
    published_at: "2023-09-15T10:00:00Z",
    expires_at: null,
    never_expires: true,
    number_of_wheels: 2,
    has_sidecar: false,
    battery_capacity_kwh: "",
    range_km: 0,
    charging_time_hours: "",
    engine_displacement_cc: 883,
    motor_power_hp: "50",
    top_speed_kmh: 180,
    weight_kg: "256",
    seat_height_mm: 735,
    fuel_capacity_l: "12.5",
    mileage_km: 8500,
    previous_owners: 1,
    color: "Black",
    vin: "5HD...456",
    certified: true,
    is_visible_in_home: true,
    visibility_index_in_home: 2,
  },
  {
    id: 3,
    images: [
      {
        id: 103,
        image: BACKGROUND_IMAGE_PATH,
      },
    ],
    created: "2023-10-10T10:00:00Z",
    modified: "2023-10-10T10:00:00Z",
    name: "R 1250 GS Adventure",
    brand: "BMW",
    model_code: "R1250GSA",
    year: 2023,
    price: "22995.00",
    condition: "used",
    vehicle_type: "motorcycle",
    fuel_type: "gas",
    description:
      "The ultimate adventure touring motorcycle. Go anywhere, do anything with legendary reliability and comfort.",
    status: "active",
    published_at: "2023-10-10T10:00:00Z",
    expires_at: null,
    never_expires: true,
    number_of_wheels: 2,
    has_sidecar: false,
    battery_capacity_kwh: "",
    range_km: 0,
    charging_time_hours: "",
    engine_displacement_cc: 1254,
    motor_power_hp: "136",
    top_speed_kmh: 220,
    weight_kg: "268",
    seat_height_mm: 890,
    fuel_capacity_l: "30",
    mileage_km: 5200,
    previous_owners: 1,
    color: "White",
    vin: "WB1...789",
    certified: true,
    is_visible_in_home: true,
    visibility_index_in_home: 3,
  },
  // Agrega más mocks con los nuevos campos...
];

// 3. Tipos y Opciones para Filtros (Ajustado a los tipos reales de la API)

// Los valores de Category (brand) y Condition son ahora dinámicos o provienen de la API
type BrandValue = "all" | string; // Usaremos 'brand' como filtro
type ConditionValue = Motorcycle["condition"] | "all";
type FuelTypeValue = Motorcycle["fuel_type"] | "all";
type PriceRangeValue = "all" | "under_10k" | "10k_20k" | "20k_30k" | "over_30k";
type SortByValue =
  | "-published_at"
  | "price"
  | "-price"
  | "name"
  | "-mileage_km"
  | "mileage_km"; // Campos de ordenamiento de tu API (views.py)

const getUniqueBrands = (
  inventory: Motorcycle[]
): { label: string; value: BrandValue }[] => {
  const brands = new Set(inventory.map((m) => m.brand));
  return [
    { label: "Todas las Marcas", value: "all" },
    ...Array.from(brands).map((brand) => ({ label: brand, value: brand })),
  ];
};

const CONDITION_OPTIONS: { label: string; value: ConditionValue }[] = [
  { label: "Todas", value: "all" },
  { label: "Nueva", value: "new" },
  { label: "Usada", value: "used" },
];

const FUEL_TYPE_OPTIONS: { label: string; value: FuelTypeValue }[] = [
  { label: "Todos", value: "all" },
  { label: "Gasolina", value: "gas" },
  { label: "Eléctrica", value: "electric" },
  { label: "Híbrida", value: "hybrid" },
];

const PRICE_RANGE_OPTIONS: { label: string; value: PriceRangeValue }[] = [
  { label: "Todos los Precios", value: "all" },
  { label: "Menos de $10,000", value: "under_10k" },
  { label: "$10,000 - $20,000", value: "10k_20k" },
  { label: "$20,000 - $30,000", value: "20k_30k" },
  { label: "Más de $30,000", value: "over_30k" },
];

const SORT_BY_OPTIONS: { label: string; value: SortByValue }[] = [
  { label: "Fecha: Más Reciente", value: "-published_at" },
  { label: "Precio: Menor a Mayor", value: "price" },
  { label: "Precio: Mayor a Menor", value: "-price" },
  { label: "Kilometraje: Menor a Mayor", value: "mileage_km" },
  { label: "Nombre: A-Z", value: "name" },
];

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
}

const InventorySection = ({
  motorcycles,
  loading,
  error,
  meta,
  activeParams,
  onPageChange,
  onSortChange,
}: InventorySectionProps) => {
  const pageSize = 10; //meta.pageSize
  const totalPages =
    pageSize && meta.count ? Math.ceil(meta.count / pageSize) : 1;
  const currentPage = activeParams.page || 1;
  //TODO poner el loading

  // 4. State for Filters and Sort (Actualizado a los nuevos nombres)
  const [brand, setBrand] = useState<BrandValue>("all");
  const [condition, setCondition] = useState<ConditionValue>("all");
  const [fuelType, setFuelType] = useState<FuelTypeValue>("all");
  const [priceRange, setPriceRange] = useState<PriceRangeValue>("all");
  const [sortBy, setSortBy] = useState<SortByValue>("-published_at");

  // Opciones de marca dinámicas (en un caso real, se cargarían aparte)
  const brandOptions = useMemo(() => getUniqueBrands(MOCK_INVENTORY), []);

  // 5. Filter and Sort Logic (useMemo)
  const filteredAndSortedInventory = useMemo(() => {
    let result = MOCK_INVENTORY.filter((bike) => bike.status === "active"); // Solo activas

    // --- Filtering Logic ---
    if (brand !== "all") {
      result = result.filter((bike) => bike.brand === brand);
    }

    if (condition !== "all") {
      result = result.filter((bike) => bike.condition === condition);
    }

    if (fuelType !== "all") {
      result = result.filter((bike) => bike.fuel_type === fuelType);
    }

    if (priceRange !== "all") {
      result = result.filter((bike) => {
        const price = parseFloat(bike.price); // Parsear el string del precio
        if (isNaN(price)) return false;

        switch (priceRange) {
          case "under_10k":
            return price < 10000;
          case "10k_20k":
            return price >= 10000 && price <= 20000;
          case "20k_30k":
            return price > 20000 && price <= 30000;
          case "over_30k":
            return price > 30000;
          default:
            return true;
        }
      });
    }

    // --- Sorting Logic ---
    result.sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);

      switch (sortBy) {
        case "price":
          return isNaN(priceA) || isNaN(priceB) ? 0 : priceA - priceB;
        case "-price":
          return isNaN(priceA) || isNaN(priceB) ? 0 : priceB - priceA;
        case "name":
          return a.name.localeCompare(b.name);
        case "mileage_km":
          return a.mileage_km - b.mileage_km;
        case "-mileage_km":
          return b.mileage_km - a.mileage_km;
        case "-published_at": // Usar fecha de publicación para ordenamiento por defecto
        default:
          return (
            new Date(b.published_at!).getTime() -
            new Date(a.published_at!).getTime()
          );
      }
    });

    return result;
  }, [brand, condition, fuelType, priceRange, sortBy]);

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
                  options={brandOptions}
                  selectedValue={brand}
                  onChange={setBrand as (value: string) => void}
                  isFirst={true}
                />

                <FilterGroup
                  title="Condición"
                  options={CONDITION_OPTIONS}
                  selectedValue={condition}
                  onChange={setCondition as (value: string) => void}
                />

                <FilterGroup
                  title="Tipo de Combustible"
                  options={FUEL_TYPE_OPTIONS}
                  selectedValue={fuelType}
                  onChange={setFuelType as (value: string) => void}
                />

                <FilterGroup
                  title="Rango de Precio"
                  options={PRICE_RANGE_OPTIONS}
                  selectedValue={priceRange}
                  onChange={setPriceRange as (value: string) => void}
                />

                <FilterGroup
                  title="Ordenar Por"
                  options={SORT_BY_OPTIONS}
                  selectedValue={sortBy}
                  onChange={setSortBy as (value: string) => void}
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
