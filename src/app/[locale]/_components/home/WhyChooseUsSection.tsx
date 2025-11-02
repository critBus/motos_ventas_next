// components/WhyChooseUsSection.tsx
// ¡Funcional y compatible con Next.js 15 (React 19)!

// Datos de ejemplo. Puedes moverlos a un archivo de datos o props si lo prefieres.
const features = [
  {
    title: "Quality Guarantee", // Títulos en inglés para coincidir con la implementación de abajo
    description:
      "Every motorcycle is thoroughly inspected and certified for your peace of mind",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2" // Corregido a camelCase
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-shield w-8 h-8 text-white"
      >
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
      </svg>
    ),
  },
  {
    title: "Premium Selection",
    description:
      "Curated collection of top-tier motorcycles from leading manufacturers",
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
        className="lucide lucide-award w-8 h-8 text-white"
      >
        <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
        <circle cx="12" cy="8" r="6"></circle>
      </svg>
    ),
  },
  {
    title: "Expert Service",
    description:
      "Professional maintenance and support from certified technicians",
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
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
      </svg>
    ),
  },
  {
    title: "Community",
    description: "Join a passionate community of riders and enthusiasts",
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
        className="lucide lucide-users w-8 h-8 text-white"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
  },
];

const backgroundStyle = {
  backgroundImage:
    "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255, 255, 255, 0.1) 35px, rgba(255, 255, 255, 0.1) 70px)",
};

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        {/* USANDO OBJETO DE ESTILO EN LUGAR DE STRING PARA COMPATIBILIDAD CON REACT */}
        <div className="absolute inset-0" style={backgroundStyle}></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ELIMINADO EL STYLE INNECESARIO (opacity/transform) */}
        <div className="text-center mb-16">
          <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4">
            THE MOTORIDERS DIFFERENCE
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            /* ELIMINADO EL STYLE INNECESARIO (opacity/transform) */
            <div key={feature.title} className="group">
              <div className="relative p-8 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-orange-500 transition-all duration-500 hover:shadow-lg hover:shadow-orange-500/20 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  {/* SE MUEVE EL SVG AL OBJETO 'features' PARA REUTILIZACIÓN Y LIMPIEZA */}
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
