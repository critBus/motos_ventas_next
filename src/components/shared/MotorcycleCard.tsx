"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Motorcycle } from "@/types/motorcycles.types";
import { useTranslations } from "next-intl";

interface MotorcycleCardProps {
  motorcycle: Motorcycle;
}

export default function MotorcycleCard({ motorcycle }: MotorcycleCardProps) {
  const t = useTranslations("MotorcycleCard");
  const isUsed = motorcycle.condition === "used";
  const formattedPrice = parseFloat(motorcycle.price) || 0;

  // Si la moto no tiene imágenes, usamos una imagen por defecto
  const imageUrl =
    motorcycle.images[0]?.image || "/images/placeholder-moto.jpg";

  return (
    <Link
      href={`/bikedetails?id=${motorcycle.id}`}
      data-discover="true"
      className="block"
    >
      <div className="group relative bg-zinc-800 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={imageUrl}
            alt={motorcycle.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
          <div className="absolute top-4 right-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                isUsed
                  ? "bg-gray-600 text-white"
                  : "bg-gradient-to-r from-orange-500 to-red-600 text-white"
              }`}
            >
              {isUsed ? t("used") : t("new")}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-2xl font-bold text-white group-hover:text-orange-500 transition-colors">
                {motorcycle.brand} {motorcycle.name}
              </h3>
              <div className="flex items-center gap-4 mt-2 text-sm text-zinc-400">
                <span className="flex items-center gap-1">
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
                    className="lucide lucide-calendar w-4 h-4"
                  >
                    <path d="M8 2v4"></path>
                    <path d="M16 2v4"></path>
                    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                    <path d="M3 10h18"></path>
                  </svg>
                  {motorcycle.year}
                </span>
                <span className="flex items-center gap-1">
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
                    className="lucide lucide-gauge w-4 h-4"
                  >
                    <path d="m12 14 4-4"></path>
                    <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
                  </svg>
                  {motorcycle.engine_displacement_cc
                    ? `${motorcycle.engine_displacement_cc}cc`
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
          <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
            {motorcycle.description || t("no_description_available")}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-zinc-700">
            <div>
              <p className="text-zinc-500 text-xs uppercase">{t("price")}</p>
              <p className="text-2xl font-black text-white">
                {formattedPrice > 0
                  ? `$${formattedPrice.toLocaleString()}`
                  : t("contact")}
              </p>
            </div>
            <button
              className="inline-flex items-center 
            justify-center gap-2 whitespace-nowrap rounded-md 
            text-sm font-medium transition-colors 
            focus-visible:outline-none focus-visible:ring-1 
            focus-visible:ring-ring 
            disabled:pointer-events-none disabled:opacity-50 
            text-primary-foreground shadow h-9 px-4 py-2 
            bg-orange-500 hover:bg-orange-600 
            group-hover:bg-gradient-to-r 
            group-hover:from-orange-500 
            group-hover:to-red-600
            hover:cursor-pointer
            "
            >
              {t("view_details")}
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
