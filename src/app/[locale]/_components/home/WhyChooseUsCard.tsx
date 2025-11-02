"use client"; // Solo si usas hooks o interactividad. Si no, puedes omitirlo.

import Link from "next/link";

interface WhyChooseUsCardProps {
  title: string;
  description: string;
  href: string; // URL a la que redirige al hacer clic
}

export default function WhyChooseUsCard({
  title,
  description,
  href,
}: WhyChooseUsCardProps) {
  return (
    <Link href={href} className="block group">
      <div className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 mb-2">
          {title}
        </h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}
