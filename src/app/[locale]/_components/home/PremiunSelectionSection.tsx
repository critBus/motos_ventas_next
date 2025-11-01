"use client";

import { useEffect, useState } from "react";
import MotorcycleCard from "@/components/shared/MotorcycleCard";

import type { Motorcycle } from "@/types/motorcycles.types";
import ApiService from "@/service/ApiService";
import Link from "next/link";
import { useTranslations } from "next-intl";

const PremiumSelectionSection = () => {
  const t = useTranslations("Home.PremiunSelectionSection");
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ApiService.motorcycles
      .forHome()
      .then((response) => {
        // Tomamos solo las primeras 3 motos
        setMotorcycles(response.results.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching motorcycles:", err);
        setError("Failed to load motorcycles.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white">{t("loading")}</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">
            {t("featured_collection")}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-4">
            {t("premium_selection")}
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {motorcycles.map((moto) => (
            <MotorcycleCard key={moto.id} motorcycle={moto} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/bikes"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-background shadow-sm h-9 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold px-8 py-6 text-lg group"
          >
            {t("view_all_motorcycles")}
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
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PremiumSelectionSection;
