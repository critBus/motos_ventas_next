"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import {
  CONTACT_PHONE_NUMBER,
  CONTACT_PHONE_NUMBER_LINK,
} from "@/data/contact";
import { useTranslations } from "next-intl";

export const Navbar = () => {
  const pathname = usePathname();
  const t = useTranslations("Nadvar");
  const links = [
    { path: "/", label: t("menu.home") },
    { path: "/motorcycles", label: t("menu.motorcycles") },
    { path: "/contact", label: t("menu.contact") },
  ];
  return (
    <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-md z-50 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link
            className="flex items-center gap-3 group"
            href="/"
            data-discover="true"
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
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              // Comprobamos si la ruta actual coincide con la ruta del enlace.
              // El enlace activo usa 'text-orange-500' y 'w-full' en el span.
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
                Get in Touch
              </button>
            </Link>
          </div>
          <button
            className="md:hidden text-white p-2 
          hover:bg-zinc-800 rounded-lg transition-colors
          
          "
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
              className="lucide lucide-menu w-6 h-6"
            >
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};
