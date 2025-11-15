"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Filter,
  Circle,
  ArrowBigRightDash,
  ArrowBigLeftDash,
  X,
  Minus,
  DollarSign,
} from "lucide-react";
import {
  ConditionMotorcycleType,
  FuelType,
  GetMotorcyclesParams,
  Motorcycle,
  MotorcyclesResponse,
} from "@/types/motorcycles.types";
import MotorcycleCard from "@/components/shared/MotorcycleCard";
import { useTranslations } from "next-intl";

// --- PRICE RANGE FILTER COMPONENT ---
interface PriceRangeFilterProps {
  minPrice: string | number;
  maxPrice: string | number;
  onApply: (min: string, max: string) => void;
  onClear: () => void;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  minPrice,
  maxPrice,
  onApply,
  onClear,
}) => {
  const t = useTranslations("Motorcycles.InventorySection.price_range");
  const [localMinPrice, setLocalMinPrice] = useState<string>(
    String(minPrice || "")
  );
  const [localMaxPrice, setLocalMaxPrice] = useState<string>(
    String(maxPrice || "")
  );
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setLocalMinPrice(String(minPrice || ""));
    setLocalMaxPrice(String(maxPrice || ""));
  }, [minPrice, maxPrice]);

  const handleApply = () => {
    onApply(localMinPrice.trim(), localMaxPrice.trim());
  };

  const handleClear = () => {
    setLocalMinPrice("");
    setLocalMaxPrice("");
    onClear();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleApply();
    }
  };

  return (
    <div className="pt-6 border-t border-zinc-800">
      <label className="text-sm leading-none text-white font-semibold mb-3 block flex items-center gap-2">
        <DollarSign className="w-4 h-4 text-orange-500" />
        {t("price_range")}
      </label>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400">
              $
            </span>
            <input
              type="number"
              value={localMinPrice}
              onChange={(e) => setLocalMinPrice(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={t("min_price")}
              className="w-full pl-7 pr-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <Minus className="w-4 h-4 text-zinc-400" />
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400">
              $
            </span>
            <input
              type="number"
              value={localMaxPrice}
              onChange={(e) => setLocalMaxPrice(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={t("max_price")}
              className="w-full pl-7 pr-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleApply}
            className="flex-1 py-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium rounded-md transition-colors"
          >
            {t("apply")}
          </button>
          <button
            onClick={handleClear}
            className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-md transition-colors border border-zinc-700"
          >
            {t("clear")}
          </button>
        </div>

        {isFocused && (
          <p className="text-xs text-zinc-500 mt-1">
            {t("price_instructions")}
          </p>
        )}
      </div>
    </div>
  );
};

export default PriceRangeFilter;
