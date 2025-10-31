"use client";
import Link from "next/link";
// 🚨 Importa useState de React
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  CONTACT_PHONE_NUMBER,
  CONTACT_PHONE_NUMBER_LINK,
} from "@/data/contact";
import { useTranslations } from "next-intl";

export const Navbar = () => {
  // 🚨 1. Estado para controlar la visibilidad del menú móvil
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Nadvar");
  const links = [
    { path: "/", label: t("menu.home") },
    { path: "/motorcycles", label: t("menu.motorcycles") },
    { path: "/contact", label: t("menu.contact") },
  ];

  // 🚨 Función para alternar el estado
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-md z-50 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link
            className="flex items-center gap-3 group"
            href="/"
            data-discover="true"
            // 🚨 Cerrar menú si el usuario hace clic en el logo
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
              <span className="text-2xl font-black text-white">M</span>
            </div>
            <div>
              <span className="text-2xl font-black text-white tracking-tight">
                MOTO
              </span>
              <span className="text-2xl font-black text-orange-500">
                RIDERS
              </span>
            </div>
          </Link>

          {/* ENLACES DE NAVEGACIÓN PRINCIPALES (Desktop) */}
          {/* ... (Esta sección no cambia) ... */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const isActive = pathname === link.path;

              const baseClasses =
                "text-sm font-semibold uppercase tracking-wider transition-all duration-300 relative group";
              const textClasses = isActive
                ? "text-orange-500"
                : "text-white hover:text-orange-500";
              const underlineClasses = isActive
                ? "w-full"
                : "w-0 group-hover:w-full";

              return (
                <Link
                  key={link.path}
                  className={`${baseClasses} ${textClasses}`}
                  href={link.path}
                  data-discover="true"
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-orange-500 transition-all duration-300 ${underlineClasses}`}
                  ></span>
                </Link>
              );
            })}
          </div>
          {/* ... (Fin de la sección que no cambia) ... */}

          <div className="hidden lg:flex items-center gap-6">
            <Link
              href={CONTACT_PHONE_NUMBER_LINK}
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-orange-500 transition-colors"
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
                className="lucide lucide-phone w-4 h-4"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>{CONTACT_PHONE_NUMBER}</span>
            </Link>
            <Link href="/contact" data-discover="true">
              <button
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow hover:bg-primary/90 h-9 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold
              hover:scale-110 hover:cursor-pointer
              "
              >
                {t("get_in_touch")}
              </button>
            </Link>
          </div>

          {/* 🚨 2. Añade el onClick para manejar el estado del menú */}
          <button
            onClick={toggleMenu} // Llama a la función toggleMenu
            className="md:hidden text-white p-2 
          hover:bg-zinc-800 rounded-lg transition-colors"
          >
            {/* ... (SVG del menú hamburguesa) ... */}
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
              className="lucide lucide-menu w-6 h-6"
            >
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* 🚨 3. MENÚ DE NAVEGACIÓN MÓVIL */}
      {/* Se muestra/oculta basado en el estado 'isMenuOpen' */}
      <div
        className={`md:hidden absolute w-full bg-black/95 shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-screen opacity-100 py-4"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col space-y-2 px-4 pb-2">
          {links.map((link) => {
            const isActive = pathname === link.path;
            const baseClasses =
              "block py-2 px-3 text-base font-semibold uppercase tracking-wider transition-colors duration-300 rounded-md";
            const textClasses = isActive
              ? "text-orange-500 bg-zinc-900"
              : "text-white hover:bg-zinc-900 hover:text-orange-500";

            return (
              <Link
                key={link.path}
                href={link.path}
                className={`${baseClasses} ${textClasses}`}
                data-discover="true"
                // 🚨 Cierra el menú al hacer clic en un enlace
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Enlace de contacto y teléfono también en el móvil */}
        <div className="flex flex-col gap-3 p-4 border-t border-zinc-800">
          <Link
            href="/contact"
            className="w-full inline-flex items-center justify-center gap-2 rounded-md text-sm transition-colors h-10 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold"
            onClick={() => setIsMenuOpen(false)}
          >
            {t("get_in_touch")}
          </Link>
          <Link
            href={CONTACT_PHONE_NUMBER_LINK}
            className="flex items-center justify-center gap-2 text-sm text-zinc-400 hover:text-orange-500 transition-colors"
            onClick={() => setIsMenuOpen(false)}
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
              className="lucide lucide-phone w-4 h-4"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>{CONTACT_PHONE_NUMBER}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
