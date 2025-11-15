"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  GetMotorcyclesParams,
  Motorcycle,
  MotorcyclesResponse,
} from "@/types/motorcycles.types";
import { getMotorcycles } from "@/service/api/motorcycles";
import SearchSection from "./_components/SearchSection";
import TagBrowseMotorcyclesSection from "./_components/TagBrowseMotorcyclesSection";
import InventorySection from "./_components/InventorySection";

// --- Funciones Auxiliares de Sincronización de URL ---

/**
 * Convierte URLSearchParams a un objeto GetMotorcyclesParams
 * Se encarga de la conversión de tipos (ej: 'page' a number).
 */
const searchParamsToParams = (
  searchParams: ReadonlyURLSearchParams
): GetMotorcyclesParams => {
  const params: GetMotorcyclesParams = {};

  // Mapeo simple de parámetros de string a su tipo correcto si es necesario
  const numKeys: Array<keyof GetMotorcyclesParams> = [
    "page",
    "pageSize",
    "min_price",
    "max_price",
  ];

  searchParams.forEach((value, key) => {
    const paramKey = key as keyof GetMotorcyclesParams;

    if (numKeys.includes(paramKey)) {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        params[paramKey] = numValue as any; // Usar 'as any' para tipos más complejos como number | undefined
      }
    } else {
      // Para 'search', 'brand', 'ordering', 'condition', 'tags', etc.
      if (value) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        params[paramKey] = value as any;
      }
    }
  });

  return params;
};

export default function MotorcyclesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Estado de los resultados de la API
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<Omit<MotorcyclesResponse, "results">>({
    count: 0,
    next: null,
    previous: null,
  });

  // 2. Función para actualizar los filtros y la URL
  const handleFilterChange = useCallback(
    (newFilters: Partial<GetMotorcyclesParams>) => {
      // Crear un nuevo conjunto de parámetros, comenzando con los actuales de la URL
      const currentParams = searchParamsToParams(searchParams);

      // Combinar los parámetros existentes con los nuevos (sobrescribiendo o eliminando si es null/undefined)
      const combinedParams: GetMotorcyclesParams = {
        ...currentParams,
        ...newFilters,
      };

      // Limpiar parámetros con valor nulo o indefinido, y resetear la página a 1 si el filtro cambia (y no es el propio page)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const finalParams: Record<string, any> = {};
      // let shouldResetPage = false;

      (
        Object.keys(combinedParams) as Array<keyof GetMotorcyclesParams>
      ).forEach((key) => {
        const value = combinedParams[key];
        // Excluimos la paginación de la comprobación de reseteo
        // if (key !== "page" && key !== "pageSize") {
        //   // Comprueba si el valor del filtro ha cambiado
        //   if (
        //     String(value) !== searchParams.get(key) &&
        //     !(value === undefined && searchParams.get(key) === null)
        //   ) {
        //     shouldResetPage = true;
        //   }
        // }

        if (value !== undefined && value !== null && value !== "") {
          finalParams[key] = value;
        }
      });

      // Si algún filtro cambió, resetear la página a 1, a menos que el filtro sea la propia paginación
      // if (shouldResetPage) {
      //   console.log("se reseteo el page");
      //   finalParams.page = 1;
      // }
      // console.log(`shouldResetPage ${shouldResetPage} `);

      // Convertir el objeto final a URLSearchParams
      const newQuery = new URLSearchParams();
      (Object.keys(finalParams) as Array<keyof GetMotorcyclesParams>).forEach(
        (key) => {
          // Ignorar el page=1 si ya estaba en 1 y es el valor por defecto
          if (key === "page" && finalParams[key] === 1) {
            // console.log("lo salto");
            return;
          }
          newQuery.set(key, String(finalParams[key]));
        }
      );

      // Construir y navegar a la nueva URL
      const queryString = newQuery.toString();
      router.replace(`/motorcycles${queryString ? `?${queryString}` : ""}`, {
        scroll: false,
      });
      //router.push(`/motorcycles${queryString ? `?${queryString}` : ""}`);
    },
    [router, searchParams]
  ); // Dependencias para useCallback

  // 3. Efecto para la obtención de datos (Se ejecuta cuando los searchParams cambian)
  useEffect(() => {
    // Obtener los parámetros de consulta del objeto de la URL
    const currentQueryParams = searchParamsToParams(searchParams);

    setLoading(true);
    setError(null);

    // Si no hay 'pageSize' en la URL, establecer un valor por defecto para la API
    const apiParams: GetMotorcyclesParams = {
      pageSize: 10, // Default page size for API call
      ...currentQueryParams,
    };

    getMotorcycles(apiParams)
      .then((data) => {
        setMotorcycles(data.results);
        setMeta({
          count: data.count,
          next: data.next,
          previous: data.previous,
        });
      })
      .catch((err) => {
        console.error("Fallo al cargar datos:", err);
        setError("Lo sentimos, hubo un error al cargar las motocicletas.");
        setMotorcycles([]);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]); // Dependencia clave: solo se ejecuta cuando searchParams cambia

  // Parámetros activos actuales para pasar a los componentes de UI
  const activeParams = searchParamsToParams(searchParams);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Estado para el Drawer

  return (
    <div>
      {/* Sección 1: Búsqueda y Filtros Principales */}
      <SearchSection
        activeParams={activeParams}
        onFilterChange={handleFilterChange}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />

      {/* Sección 2: Navegación por Tags/Categorías (ej: Marcas) */}
      <TagBrowseMotorcyclesSection />

      {/* Sección 3: Resultados e Inventario */}
      <InventorySection
        motorcycles={motorcycles}
        loading={loading}
        error={error}
        meta={meta}
        activeParams={activeParams}
        onPageChange={(page) => handleFilterChange({ page })} // Implementación de paginación
        onSortChange={(ordering) => handleFilterChange({ ordering, page: 1 })} // Implementación de ordenamiento
        onFilterChange={handleFilterChange}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />

      {/* Muestra la cadena de consulta activa para debug */}
      {/* <p className="mt-8 text-sm text-gray-500">
        Parámetros de URL activos: {searchParams.toString() || "Ninguno"}
      </p> */}
    </div>
  );
}
