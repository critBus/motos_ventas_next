import { useTranslations } from "next-intl";
import React from "react";

const TagBrowseMotorcyclesSection = () => {
  const t = useTranslations("Motorcycles.TagBrowseMotorcyclesSection");
  return (
    <div className="bg-zinc-900 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          {t("browse")}{" "}
          <span className="text-orange-500">{t("motorcycles")}</span>
        </h1>
        <p className="text-zinc-400 text-lg">{t("description")}</p>
      </div>
    </div>
  );
};

export default TagBrowseMotorcyclesSection;
