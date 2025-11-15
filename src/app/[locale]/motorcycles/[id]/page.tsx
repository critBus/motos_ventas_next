// Ubicación: app/motorcycles/[id]/page.tsx

import React from "react";
import { notFound } from "next/navigation";

// --- Importaciones Clave ---

// 3. El tipo de datos
import { Motorcycle } from "@/types/motorcycles.types";

import DetailsMotorcyle from "./_components/DetailsMotorcyle";
import ApiService from "@/service/ApiService";

// --- Definición de Tipos ---

// Next.js pasa los parámetros de la ruta dinámica (ej: [id])
// dentro de un objeto 'params'
interface MotorcycleDetailsPageProps {
  params: {
    id: string; // Esto debe coincidir con el nombre de tu carpeta: [id]
  };
  // searchParams: { [key: string]: string | string[] | undefined }; // (Si necesitaras query params)
}

// --- El Componente de Página (Server Component Asíncrono) ---

// Hacemos la página 'async' para poder usar 'await' y
// obtener los datos antes de renderizar.
const MotorcycleDetailsPage = async ({
  params,
}: MotorcycleDetailsPageProps) => {
  const { id } = await params;
  let motorcycle: Motorcycle;

  try {
    // 2. Llamamos a la API para obtener los datos de la moto
    //    usando el ID de la URL.
    motorcycle = await ApiService.motorcycles.byId(id);
  } catch (error) {
    // 3. Si la API falla (ej. devuelve 404),
    //    le decimos a Next.js que muestre su página de 404.
    console.error(`Error al obtener la motocicleta ${id}:`, error);
    notFound();
  }

  // 4. Si todo sale bien, renderizamos el componente de detalles
  //    y le pasamos la moto que obtuvimos.
  return <DetailsMotorcyle motorcycle={motorcycle} />;
};

export default MotorcycleDetailsPage;
