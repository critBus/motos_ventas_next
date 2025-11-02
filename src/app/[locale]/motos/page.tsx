"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { API_URL } from "@/config";

type MotoImage = {
  id: number;
  image: string;
};

type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: MotoImage[];
};

export default function MotosPage() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pageUrl, setPageUrl] = useState<string | null>(
    `${API_URL}moto-images/`
  );

  useEffect(() => {
    if (!pageUrl) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(pageUrl)
      .then(async (res) => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const json: ApiResponse = await res.json();
        if (!cancelled) setData(json);
      })
      .catch((err) => {
        if (!cancelled) setError(String(err));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [pageUrl]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Galería de motos</h1>

      <div className="mb-4 flex items-center gap-3">
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => data?.previous && setPageUrl(data.previous)}
          disabled={!data?.previous || loading}
        >
          Anterior
        </button>
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => data?.next && setPageUrl(data.next)}
          disabled={!data?.next || loading}
        >
          Siguiente
        </button>

        <div className="ml-auto text-sm text-gray-600">
          {loading
            ? "Cargando..."
            : data
            ? `${data.results.length} de ${data.count}`
            : "-"}
        </div>
      </div>

      {error && (
        <div className="text-red-600 mb-4">
          Error cargando imágenes: {error}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data?.results.map((m) => (
          <div key={m.id} className="bg-white rounded shadow overflow-hidden">
            <div className="relative w-full h-48">
              <Image
                src={m.image}
                alt={`moto-${m.id}`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
                onError={() => {
                  /* next/image handles fallback differently; keep it simple */
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
