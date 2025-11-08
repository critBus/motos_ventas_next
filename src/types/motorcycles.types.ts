// src/types/motorcycles.types.ts

export interface MotorcycleImage {
  id: number;
  image: string;
}

export type FuelType = "gas" | "electric" | "hybrid" | "diesel" | "other";
export type StatusMotorcycleType = "draft" | "active" | "inactive";
export type ConditionMotorcycleType = "new" | "used";
export type VehicleMotorcycleType = "motorcycle" | "scooter" | "moped";

export interface Motorcycle {
  id: number;
  images: MotorcycleImage[];
  created: string; // ISO 8601 date string
  modified: string;
  name: string;
  price: string; // Puede ser un número, pero el ejemplo usa string ("-0.1")
  description: string;
  status: StatusMotorcycleType; // Ajusta según tus valores reales
  published_at: string | null;
  expires_at: string | null;
  never_expires: boolean;
  brand: string;
  model_code: string;
  year: number;
  condition: ConditionMotorcycleType;
  vehicle_type: VehicleMotorcycleType; // Ajusta según tu API
  fuel_type: FuelType;
  number_of_wheels: number;
  has_sidecar: boolean;
  battery_capacity_kwh: string; // Puede estar vacío o ser un número como string
  range_km: number;
  charging_time_hours: string; // Ej: "-.93"
  engine_displacement_cc: number;
  motor_power_hp: string; // Ej: "7055.2"
  top_speed_kmh: number;
  weight_kg: string; // Ej: "-"
  seat_height_mm: number;
  fuel_capacity_l: string; // Ej: "81"
  mileage_km: number;
  previous_owners: number;
  color: string;
  vin: string;
  certified: boolean;
  is_visible_in_home: boolean;
  visibility_index_in_home: number;
}

export interface MotorcyclesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Motorcycle[];
}

// src/types/motorcycles.types.ts

// ... [Motorcycle y MotorcycleImage interfaces existentes] ...

/**
 * Interfaz para los parámetros de la solicitud GET /motorcycles/
 * Incluye filtros (DjangoFilter), ordenamiento (OrderingFilter) y paginación.
 */
export interface GetMotorcyclesParams {
  // Paginación (ajusta si usas 'limit' y 'offset' en lugar de 'page' y 'pageSize')
  page?: number;
  pageSize?: number;

  // Ordenamiento (ej: 'price', '-year', 'created'). El '-' indica descendente.
  ordering?: string | "";

  // Búsqueda libre (ej: ?search=Honda)
  search?: string | "";

  // Filtros comunes (usando la sintaxis de DjangoFilter)
  brand?: string;
  condition?: ConditionMotorcycleType | "";
  status?: StatusMotorcycleType;

  fuel_type?: FuelType | "";

  // Filtros de rango (ej: ?year__gte=2020)
  year__gte?: number | string; // Año mayor o igual que
  year__lte?: number | string; // Año menor o igual que
  price__gte?: number | string; // Precio mayor o igual que
  price__lte?: number | string; // Precio menor o igual que

  // Puedes añadir más filtros aquí:
  min_price?: number;
  max_price?: number;
  // Permite otros parámetros de filtro dinámicos (necesario por el uso de DjangoFilterBackend)
}
