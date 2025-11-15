import Image from "next/image";
import Link from "next/link";
import React from "react";
// Asegúrate de que la ruta de importación sea correcta para tu proyecto
import { Motorcycle } from "@/types/motorcycles.types";

// --- Helper para formatear el precio ---
// Asume que un string como "14.500" significa 14,500 USD.
const formatPrice = (priceStr: string) => {
  // Elimina los puntos (separadores de miles) y reemplaza la coma decimal por un punto
  const cleanedPrice = priceStr.replace(/\./g, "").replace(",", ".");
  const price = parseFloat(cleanedPrice);

  if (isNaN(price) || price < 0) {
    return "Contact for Price";
  }

  // Formatea como moneda USD
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    // No muestra decimales si es un número entero (ej: $14,500)
    maximumFractionDigits: price % 1 === 0 ? 0 : 2,
  }).format(price);
};
// ----------------------------------------

const DetailsMotorcyle = ({ motorcycle }: { motorcycle: Motorcycle }) => {
  // Usa la primera imagen de la moto, o la de fallback
  const imageUrl =
    motorcycle.images?.[0]?.image || "/images/motorcycle-hero-girada.jpg";

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* --- Barra de Navegación (Volver) --- */}
      <div className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/motorcycles" data-discover="true">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent h-9 px-4 py-2 text-zinc-400 hover:text-white">
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
                className="lucide lucide-arrow-left w-4 h-4 mr-2"
              >
                <path d="m12 19-7-7 7-7"></path>
                <path d="M19 12H5"></path>
              </svg>
              Back to Motorcycles
            </button>
          </Link>
        </div>
      </div>

      {/* --- Contenido Principal --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* --- Imagen de Cabecera --- */}
        <div className="relative mb-8 rounded-xl overflow-hidden bg-zinc-900">
          <div className="relative h-96 md:h-[600px]">
            <Image
              src={imageUrl}
              alt={motorcycle.name} // Dinámico
              className="w-full h-full object-cover"
              fill
              priority // Buena idea para la imagen LCP
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- Columna Izquierda (Detalles) --- */}
          <div className="lg:col-span-2 space-y-6">
            {/* --- Título y Etiquetas --- */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow hover:bg-primary/80 bg-gradient-to-r from-orange-500 to-red-600 text-white capitalize">
                  {motorcycle.condition} {/* Dinámico */}
                </div>
                <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 bg-zinc-800 text-white capitalize">
                  {motorcycle.vehicle_type} {/* Dinámico */}
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
                {motorcycle.name} {/* Dinámico */}
              </h1>
              <p className="text-zinc-400 text-lg">
                Color: {motorcycle.color} {/* Dinámico */}
              </p>
            </div>

            {/* --- Especificaciones --- */}
            <div className="rounded-xl border text-card-foreground shadow bg-zinc-900 border-zinc-800">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Specifications
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {/* Año */}
                  <div>
                    <div className="flex items-center gap-2 text-zinc-500 mb-2">
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
                        className="lucide lucide-calendar w-5 h-5"
                      >
                        <path d="M8 2v4"></path>
                        <path d="M16 2v4"></path>
                        <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                        <path d="M3 10h18"></path>
                      </svg>
                      <span className="text-sm uppercase">Year</span>
                    </div>
                    <p className="text-xl font-bold text-white">
                      {motorcycle.year} {/* Dinámico */}
                    </p>
                  </div>
                  {/* Motor */}
                  <div>
                    <div className="flex items-center gap-2 text-zinc-500 mb-2">
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
                        className="lucide lucide-gauge w-5 h-5"
                      >
                        <path d="m12 14 4-4"></path>
                        <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
                      </svg>
                      <span className="text-sm uppercase">Engine</span>
                    </div>
                    <p className="text-xl font-bold text-white">
                      {motorcycle.engine_displacement_cc}cc {/* Dinámico */}
                    </p>
                  </div>
                  {/* Potencia */}
                  <div>
                    <div className="flex items-center gap-2 text-zinc-500 mb-2">
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
                        className="lucide lucide-zap w-5 h-5"
                      >
                        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                      </svg>
                      <span className="text-sm uppercase">Horsepower</span>
                    </div>
                    <p className="text-xl font-bold text-white">
                      {motorcycle.motor_power_hp} HP {/* Dinámico */}
                    </p>
                  </div>
                  {/* Kilometraje */}
                  <div>
                    <div className="flex items-center gap-2 text-zinc-500 mb-2">
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
                        className="lucide lucide-map-pin w-5 h-5"
                      >
                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span className="text-sm uppercase">Mileage</span>
                    </div>
                    <p className="text-xl font-bold text-white">
                      {motorcycle.mileage_km} km {/* Dinámico (y unidad) */}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* --- Descripción --- */}
            <div className="rounded-xl border text-card-foreground shadow bg-zinc-900 border-zinc-800">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Description
                </h2>
                <p className="text-zinc-400 leading-relaxed whitespace-pre-line">
                  {motorcycle.description} {/* Dinámico */}
                </p>
              </div>
            </div>

            {/* Sección "Features" eliminada.
              La interfaz Motorcycle no tiene un campo para 'features' (Öhlins, Brembo, etc.).
              Si añades este campo a tu 'Motorcycle' type, puedes volver a añadir
              esta sección y mapear sobre ese array.
            */}
          </div>

          {/* --- Columna Derecha (Precio y CTA) --- */}
          <div className="space-y-6">
            <div className="rounded-xl border text-card-foreground shadow bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 sticky top-24">
              <div className="p-6">
                <div className="mb-6">
                  <p className="text-zinc-400 text-sm uppercase mb-2">Price</p>
                  <p className="text-4xl font-black text-white">
                    {formatPrice(motorcycle.price)} {/* Dinámico */}
                  </p>
                </div>
                <div className="space-y-3">
                  <Link className="block" href="/contact" data-discover="true">
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow hover:bg-primary/90 h-9 px-4 w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-6 text-lg">
                      Contact Seller
                    </button>
                  </Link>
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-background shadow-sm hover:text-accent-foreground h-9 px-4 w-full border-2 border-zinc-700 text-white hover:bg-zinc-800 py-6">
                    Schedule Test Ride
                  </button>
                </div>
                <div className="mt-6 pt-6 border-t border-zinc-700">
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-zinc-400">Availability</span>
                    {/* --- Disponibilidad Dinámica --- */}
                    {motorcycle.status === "active" ? (
                      <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-primary-foreground shadow hover:bg-primary/80 bg-green-600">
                        Available
                      </div>
                    ) : (
                      <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-primary-foreground shadow hover:bg-primary/80 bg-red-600">
                        Not Available
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500">
                    Contact us today to schedule a viewing or test ride
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsMotorcyle;
