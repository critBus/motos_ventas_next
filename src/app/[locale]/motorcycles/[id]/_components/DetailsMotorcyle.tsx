"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
// --- Importaciones de next-intl ---
import { useLocale, useTranslations } from "next-intl";
// ------------------------------------
// Asegúrate de que la ruta de importación sea correcta para tu proyecto
import { Motorcycle } from "@/types/motorcycles.types";
import ImageMagnifier from "@/components/shared/ImageMagnifier";

const DetailsMotorcyle = ({ motorcycle }: { motorcycle: Motorcycle }) => {
  // --- Hooks de next-intl ---
  const t = useTranslations("DetailsMotorcyle");
  const locale = useLocale(); // Para formatear el número según el idioma
  // -------------------------

  // --- Helper para formatear el precio (movido aquí) ---
  const formatPrice = (priceStr: string) => {
    // Elimina los puntos (separadores de miles) y reemplaza la coma decimal por un punto
    const cleanedPrice = priceStr.replace(/\./g, "").replace(",", ".");
    const price = parseFloat(cleanedPrice);

    if (isNaN(price) || price < 0) {
      return t("contactForPrice"); // <-- Traducido
    }

    // Formatea como moneda USD, pero usando el 'locale' actual para los separadores
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD", // Se mantiene USD como en la lógica original
      // No muestra decimales si es un número entero (ej: $14,500)
      maximumFractionDigits: price % 1 === 0 ? 0 : 2,
    }).format(price);
  };
  // ----------------------------------------

  // Estados para la galería de imágenes
  const fallbackImage = "/images/motorcycle-hero-girada.jpg";
  const images = motorcycle.images || [];
  const thumbnailLimit = 4; // Muestra hasta 3 thumbs + "more" si hay más de 4
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const selectedImage = images[selectedImageIndex]?.image || fallbackImage;
  const [largeImageDimensions, setLargeImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  // Estados para la lupa

  const imageRef = React.useRef<HTMLImageElement>(null);
  const zoomFactor = 2;
  const lensSize = 150;

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* --- Barra de Navegación (Volver) --- */}
      <div className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/motorcycles" data-discover="true">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent h-9 px-4 py-2 text-zinc-400 hover:text-white">
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
              {t("backToMotorcycles")} {/* <-- Traducido */}
            </button>
          </Link>
        </div>
      </div>

      {/* --- Contenido Principal --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* --- Galería de Imágenes --- */}
        <div className="mb-8 rounded-xl overflow-hidden bg-zinc-900">
          <div className="flex flex-col md:flex-row gap-4 p-4">
            {/* Thumbnails (horizontal en mobile, vertical en desktop) */}
            {images.length > 0 && (
              <div className="flex md:flex-col gap-2 order-2 md:order-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                {images.slice(0, thumbnailLimit).map((img, idx) => {
                  if (
                    idx < thumbnailLimit - 1 ||
                    images.length <= thumbnailLimit
                  ) {
                    return (
                      <div
                        key={img.id}
                        className={`relative w-20 h-20 flex-shrink-0 cursor-pointer rounded-md overflow-hidden ${
                          selectedImageIndex === idx
                            ? "border-2 border-orange-500"
                            : "border border-zinc-700"
                        }`}
                        onClick={() => setSelectedImageIndex(idx)}
                      >
                        <Image
                          src={img.image}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key="more"
                        className="relative w-20 h-20 flex-shrink-0 bg-zinc-800 flex items-center justify-center cursor-pointer text-white text-lg font-bold rounded-md border border-zinc-700"
                        onClick={() => {
                          setShowModal(true);
                          setModalIndex(0);
                        }}
                      >
                        +{images.length - (thumbnailLimit - 1)}
                      </div>
                    );
                  }
                })}
              </div>
            )}

            {/* Imagen Principal con Lupa */}
            <div className="flex-1 relative min-h-[300px] md:min-h-[600px] order-1 md:order-2 rounded-md overflow-hidden">
              <ImageMagnifier
                fill
                ref={imageRef}
                src={selectedImage}
                alt={motorcycle.name}
                className="w-full h-full object-cover"
                onLoad={(e) =>
                  setLargeImageDimensions({
                    width: e.currentTarget.naturalWidth,
                    height: e.currentTarget.naturalHeight,
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Modal para ver todas las imágenes */}
        {showModal && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
            <div className="relative w-full max-w-4xl h-[80vh] p-4">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-white bg-zinc-800 rounded-full p-2 hover:bg-zinc-700"
              >
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
                  className="w-6 h-6"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
              <button
                onClick={() =>
                  setModalIndex((prev) =>
                    prev > 0 ? prev - 1 : images.length - 1
                  )
                }
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-zinc-800 rounded-full p-2 hover:bg-zinc-700"
              >
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
                  className="w-6 h-6"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <Image
                src={images[modalIndex].image}
                alt={`Image ${modalIndex + 1}`}
                fill
                className="object-contain"
              />
              <button
                onClick={() =>
                  setModalIndex((prev) =>
                    prev < images.length - 1 ? prev + 1 : 0
                  )
                }
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-zinc-800 rounded-full p-2 hover:bg-zinc-700"
              >
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
                  className="w-6 h-6"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        )}

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
                {t("colorLabel")}: {motorcycle.color} {/* <-- Traducido */}
              </p>
            </div>

            {/* --- Especificaciones --- */}
            <div className="rounded-xl border text-card-foreground shadow bg-zinc-900 border-zinc-800">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {t("specificationsTitle")} {/* <-- Traducido */}
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
                      <span className="text-sm uppercase">
                        {t("specYear")} {/* <-- Traducido */}
                      </span>
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
                      <span className="text-sm uppercase">
                        {t("specEngine")} {/* <-- Traducido */}
                      </span>
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
                      <span className="text-sm uppercase">
                        {t("specHorsepower")} {/* <-- Traducido */}
                      </span>
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
                      <span className="text-sm uppercase">
                        {t("specMileage")} {/* <-- Traducido */}
                      </span>
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
                  {t("descriptionTitle")} {/* <-- Traducido */}
                </h2>
                <p className="text-zinc-400 leading-relaxed whitespace-pre-line">
                  {motorcycle.description} {/* Dinámico */}
                </p>
              </div>
            </div>
          </div>

          {/* --- Columna Derecha (Precio y CTA) --- */}
          <div className="space-y-6">
            <div className="rounded-xl border text-card-foreground shadow bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 sticky top-24">
              <div className="p-6">
                <div className="mb-6">
                  <p className="text-zinc-400 text-sm uppercase mb-2">
                    {t("priceLabel")} {/* <-- Traducido */}
                  </p>
                  <p className="text-4xl font-black text-white">
                    {formatPrice(motorcycle.price)} {/* Dinámico y traducido */}
                  </p>
                </div>
                <div className="space-y-3">
                  <Link className="block" href="/contact" data-discover="true">
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow hover:bg-primary/90 h-9 px-4 w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-6 text-lg">
                      {t("contactSellerButton")} {/* <-- Traducido */}
                    </button>
                  </Link>
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-background shadow-sm hover:text-accent-foreground h-9 px-4 w-full border-2 border-zinc-700 text-white hover:bg-zinc-800 py-6">
                    {t("testRideButton")} {/* <-- Traducido */}
                  </button>
                </div>
                <div className="mt-6 pt-6 border-t border-zinc-700">
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-zinc-400">
                      {t("availabilityLabel")} {/* <-- Traducido */}
                    </span>
                    {/* --- Disponibilidad Dinámica --- */}
                    {motorcycle.status === "active" ? (
                      <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-primary-foreground shadow hover:bg-primary/80 bg-green-600">
                        {t("statusAvailable")} {/* <-- Traducido */}
                      </div>
                    ) : (
                      <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-primary-foreground shadow hover:bg-primary/80 bg-red-600">
                        {t("statusNotAvailable")} {/* <-- Traducido */}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500">
                    {t("contactHint")} {/* <-- Traducido */}
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
