import React from "react";
// Importa el componente Image de Next.js para la optimización de imágenes.
import Image from "next/image";
import Link from "next/link";

// Variable para la ruta de la imagen estática.
// Asume que la imagen está en /public/assets/images/motorcycle-bg.jpg
// Puedes ajustar esta ruta fácilmente.
const BACKGROUND_IMAGE_PATH = "/images/moto-ready-start.jpeg";

const ReadyToStart = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        {/* Componente Image de Next.js para la imagen de fondo */}
        <Image
          src={BACKGROUND_IMAGE_PATH}
          alt="Ride - Motorcycle background"
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
            READY TO START
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
              YOUR JOURNEY?
            </span>
          </h2>
          <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
            Find your perfect motorcycle today and experience the freedom of the
            open road. Our team is ready to help you make the right choice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/bikes" data-discover="true">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow hover:bg-primary/90 h-9 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-lg px-8 py-6 group">
                Explore Motorcycles
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
            <Link href="/contact" data-discover="true">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-background shadow-sm h-9 border-2 border-white text-white hover:bg-white hover:text-black font-bold text-lg px-8 py-6">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadyToStart;
