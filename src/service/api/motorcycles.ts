import { api } from "@/service/api";
import type {
  GetMotorcyclesParams,
  Motorcycle,
  MotorcyclesResponse,
} from "@/types/motorcycles.types";

const MOTORCYCLES_API_URL = "motorcycles/";

export const forHome = async (): Promise<MotorcyclesResponse> => {
  const response = await api.get<MotorcyclesResponse>(MOTORCYCLES_API_URL, {
    params: {
      is_visible_in_home: true,
      ordering: "visibility_index_in_home",
      status: "active",
    },
  });
  return response.data;
};

/**
 * Función auxiliar para convertir un objeto de parámetros en una cadena de consulta.
 * Ignora valores nulos, indefinidos o cadenas vacías.
 * @param params El objeto con los parámetros de la solicitud.
 * @returns La cadena de consulta, por ejemplo: '?brand=Honda&ordering=-price'
 */
const buildQueryString = (params: GetMotorcyclesParams): string => {
  const urlParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    // Solo agrega parámetros que tengan un valor definido y no sean null/undefined/''
    if (value !== undefined && value !== null && value !== "") {
      urlParams.append(key, String(value));
    }
  });

  const queryString = urlParams.toString();
  return queryString ? `?${queryString}` : "";
};

/**
 * Obtiene un listado paginado y filtrado de motocicletas.
 *
 * @param params Parámetros de filtro, ordenamiento, búsqueda y paginación.
 * @returns Una promesa que resuelve a la lista paginada de motocicletas.
 */
export const getMotorcycles = async (
  params: GetMotorcyclesParams = {}
): Promise<MotorcyclesResponse> => {
  // 1. Construir la cadena de consulta con todos los filtros y ordenamiento
  const queryString = buildQueryString(params);
  const url = `${MOTORCYCLES_API_URL}${queryString}`;

  console.log(`Llamando a la API: ${url}`);

  // 2. Realizar la llamada HTTP
  const response = await api.get<MotorcyclesResponse>(url);

  // 3. Devolver los datos
  return response.data;
};

/**
 * Obtiene una motocicleta específica por su ID.
 *
 * @param id El ID (o slug) de la motocicleta.
 * @returns Una promesa que resuelve a los datos de la motocicleta.
 */
export const getMotorcycleById = async (id: string): Promise<Motorcycle> => {
  // La URL estándar de DRF para detalle es /api/recurso/<id>/
  const url = `${MOTORCYCLES_API_URL}${id}/`;

  console.log(`Llamando a la API (detalle): ${url}`);

  // 2. Realizar la llamada HTTP
  const response = await api.get<Motorcycle>(url);

  // 3. Devolver los datos
  return response.data;
};
