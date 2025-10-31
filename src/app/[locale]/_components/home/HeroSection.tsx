import React from "react";
// import Image from 'next/image'; // Se ha eliminado la importación de next/image debido a errores de resolución
import { Gauge, ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * Hero section component for a Premium Motorcycles website.
 * This component features a full-screen background image,
 * a dark overlay for text contrast, and key call-to-action buttons.
 *
 * NOTA IMPORTANTE: En un proyecto Next.js real, se DEBE usar 'next/image'.
 * Para que este componente compile en este entorno, usamos la etiqueta <img>.
 * La ruta de la imagen estática ahora es una variable.
 */

// Usamos la ruta estática para la imagen (asumiendo que está en /public/images/)
const IMAGE_SRC = "/images/motorcycle-hero.jpg";

const HeroSection = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image and Overlays */}
      <div className="absolute inset-0">
        {/*
          CORRECCIÓN DEL ERROR: Reemplazamos <Image> de Next.js por un <img> estándar.
          Los estilos de fill y object-fit se logran con clases de Tailwind CSS.
        */}
        <img
          src={IMAGE_SRC} // Ruta relativa desde la carpeta 'public'
          alt="Motorcycle on a dark road"
          className="w-full h-full object-cover" // Asegura que la imagen llene y cubra el contenedor
          // Las propiedades 'fill' y 'priority' de next/image se simulan con estilos y el orden de carga.
        />
        {/* Gradient Overlay for the background */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        {/* Darkening Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Tagline */}
          <div className="flex items-center gap-2 mb-6">
            <Gauge className="w-6 h-6 text-orange-500" />
            <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">
              Premium Motorcycles
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            RIDE THE
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
              FREEDOM
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
            Discover your perfect ride from our curated collection of
            high-performance motorcycles. Experience the thrill, embrace the
            journey.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Primary Button */}
            <Link
              href="/bikes"
              data-discover="true"
              className="sm:flex sm:flex-row sm:justify-center 
              sm:items-center"
            >
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow hover:bg-primary/90 h-9 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-lg px-8 py-6 group">
                Browse Motorcycles
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            {/* Secondary Button */}
            <Link href="/contact" data-discover="true">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-background shadow-sm h-9 border-2 border-white text-white hover:bg-white hover:text-black font-bold text-lg px-8 py-6">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
