// components/WhyChooseUsSection.tsx
// ¡Este es un Server Component! next-intl funciona síncronamente aquí.
import Link from "next/link";
import { useTranslations } from "next-intl"; // 👈 Importamos useTranslations

// Definición de las características con una 'key' única para la traducción
// y los elementos no traducibles (icon, href).
const featuresData = [
  {
    key: "fuel", // Clave para buscar en el JSON: features.fuel.title / features.fuel.description
    href: "/inventory/fuel",
    icon: (
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
        className="lucide lucide-fuel w-8 h-8 text-white"
      >
        <line x1="3" x2="15" y1="22" y2="22" />
        <line x1="4" x2="14" y1="9" y2="9" />
        <path d="M14 22V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v18" />
        <path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.58-1.42L18 5" />
      </svg>
    ),
  },
  {
    key: "electric",
    href: "/inventory/electric",
    icon: (
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
        className="lucide lucide-zap w-8 h-8 text-white"
      >
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
      </svg>
    ),
  },
  {
    key: "new",
    href: "/inventory/new",
    icon: (
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
        className="lucide lucide-package w-8 h-8 text-white"
      >
        <path d="m7.5 4.27 9 5.15" />
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
  },
  {
    key: "certified",
    href: "/inventory/certified",
    icon: (
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
        className="lucide lucide-shield-check w-8 h-8 text-white"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

const backgroundStyle = {
  backgroundImage:
    "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255, 255, 255, 0.1) 35px, rgba(255, 255, 255, 0.1) 70px)",
};

export default function WhyChooseUsSection() {
  const t = useTranslations("Home.WhyChooseUsSection");

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={backgroundStyle}></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">
            {t("tagline")} {/* Traducción para el tagline */}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4">
            {t("heading")} {/* Traducción para el encabezado */}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature) => (
            <Link
              key={feature.key} // Usamos la key como clave única
              href={feature.href}
              className="group block h-full"
            >
              <div className="relative p-8 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-orange-500 transition-all duration-500 hover:shadow-lg hover:shadow-orange-500/20 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors">
                  {t(`features.${feature.key}.title`)}{" "}
                  {/* Búsqueda granular del título */}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {t(`features.${feature.key}.description`)}{" "}
                  {/* Búsqueda granular de la descripción */}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
