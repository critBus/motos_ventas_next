import React from "react";
// Importa el componente Image de Next.js para la optimización de imágenes.
import Image from "next/image";
import Link from "next/link";
// IMPORTANTE: Importa useTranslations de next-intl
import { useTranslations } from "next-intl";

// Variable para la ruta de la imagen estática.
// Asume que la imagen está en /public/images/moto-ready-start.jpeg
const BACKGROUND_IMAGE_PATH = "/images/moto-ready-start.jpeg";

const ReadyToStart = () => {
  // Inicializa la función de traducción con el namespace correcto
  const t = useTranslations("Home.ReadyToStartSection");

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        {/* Componente Image de Next.js para la imagen de fondo */}
        <Image
          src={BACKGROUND_IMAGE_PATH}
          // Usa la traducción para el alt de la imagen
          alt={t("backgroundImageAlt")}
          // 'fill' hace que la imagen se expanda para llenar el contenedor padre
          fill
          // 'object-cover' asegura que la imagen cubra todo el contenedor sin distorsionarse
          style={{ objectFit: "cover" }}
          // Opcional: añade 'quality' o 'priority' si es necesario
          quality={80}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/50"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl" style={{ opacity: 1, transform: "none" }}>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            {/* Usa la traducción para el título principal */}
            {t("title")}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
              {/* Usa la traducción para el subtítulo */}
              {t("subtitle")}
            </span>
          </h2>
          <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
            {/* Usa la traducción para la descripción */}
            {t("description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Link para Explorar Motocicletas - Usa ruta y texto traducidos */}
            <Link
              href="/motorcycles" // Ruta traducida (ej: /bikes o /motos)
              data-discover="true"
              className="sm:flex sm:flex-row sm:justify-center 
              sm:items-center"
            >
              <button
                className="inline-flex items-center 
              justify-center gap-2 whitespace-nowrap rounded-md 
              transition-colors focus-visible:outline-none 
              focus-visible:ring-1 focus-visible:ring-ring 
              disabled:pointer-events-none disabled:opacity-50 
              [&amp;_svg]:pointer-events-none 
              [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow 
              hover:bg-primary/90 h-9 bg-gradient-to-r 
              from-orange-500 to-red-600 
              hover:from-orange-600 hover:to-red-700 
              text-white font-bold text-lg px-8 py-6 group
              hover:cursor-pointer
              "
              >
                {t("exploreButton")} {/* Texto del botón traducido */}
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
                  className="lucide lucide-arrow-right ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </Link>
            {/* Link para Empezar - Usa ruta y texto traducidos */}
            <Link href="/contact" data-discover="true">
              {" "}
              {/* Ruta traducida (ej: /contact o /contacto) */}
              <button
                className="inline-flex items-center 
              justify-center gap-2 whitespace-nowrap rounded-md 
              transition-colors focus-visible:outline-none 
              focus-visible:ring-1 focus-visible:ring-ring 
              disabled:pointer-events-none disabled:opacity-50 
              [&amp;_svg]:pointer-events-none 
              [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 
              bg-background shadow-sm h-9 border-2 
              border-white text-white hover:bg-white 
              hover:text-black font-bold text-lg px-8 py-6
              hover:cursor-pointer
              "
              >
                {t("contactButton")} {/* Texto del botón traducido */}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadyToStart;
