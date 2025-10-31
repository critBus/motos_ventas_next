import React from "react";
import Link from "next/link"; // Importar el componente Link para la navegación

const PremiumSelectionSection = () => {
  // Este es un Server Component por defecto ya que no usa 'use client'
  return (
    <section className="py-20 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Se elimina el estilo inline de 'opacity' y 'transform' si no es necesario para animaciones de carga inicial */}
          <div>
            <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">
              Featured Collection
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-4">
              PREMIUM SELECTION
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Handpicked motorcycles that represent the pinnacle of performance
              and design
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Tarjeta 1 */}
          <div>
            {/* Se reemplaza <a> por <Link> y se usa el 'href' como prop */}
            <Link
              href="/bikedetails?id=68fff584137391b7ffbbe18a"
              data-discover="true"
            >
              <div className="group relative bg-zinc-800 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  {/* Idealmente, usa el componente Image de next/image para optimización */}
                  <img
                    src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1920&amp;q=80"
                    alt="R1"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                      new
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-orange-500 transition-colors">
                        Yamaha R1
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
                            <rect
                              width="18"
                              height="18"
                              x="3"
                              y="4"
                              rx="2"
                            ></rect>
                            <path d="M3 10h18"></path>
                          </svg>
                          2024
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
                          998cc
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                    The ultimate superbike combining raw power with cutting-edge
                    technology. Features advanced electronics, aerodynamic
                    bodywork, and a screaming inline-four engine.
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-700">
                    <div>
                      <p className="text-zinc-500 text-xs uppercase">Price</p>
                      <p className="text-2xl font-black text-white">$18.999</p>
                    </div>
                    {/* El botón interno podría ser un <a> dentro de <Link> o un elemento clickeable. Mantengo el botón por si tiene lógica de cliente */}
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary-foreground shadow h-9 px-4 py-2 bg-orange-500 hover:bg-orange-600 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-red-600">
                      View Details
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
                        className="lucide lucide-arrow-right ml-2 w-4 h-4"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          {/* Tarjeta 2 */}
          <div>
            <Link
              href="/bikedetails?id=68fff584137391b7ffbbe18c"
              data-discover="true"
            >
              <div className="group relative bg-zinc-800 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1558980664-769d59546b3d?w=1920&amp;q=80"
                    alt="Ninja 400"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                      used
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-orange-500 transition-colors">
                        Kawasaki Ninja 400
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
                            <rect
                              width="18"
                              height="18"
                              x="3"
                              y="4"
                              rx="2"
                            ></rect>
                            <path d="M3 10h18"></path>
                          </svg>
                          2023
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
                          399cc
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                    Perfect entry-level sportbike offering sporty performance
                    with excellent fuel efficiency. Lightweight and easy to
                    handle.
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-700">
                    <div>
                      <p className="text-zinc-500 text-xs uppercase">Price</p>
                      <p className="text-2xl font-black text-white">$5299</p>
                    </div>
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary-foreground shadow h-9 px-4 py-2 bg-orange-500 hover:bg-orange-600 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-red-600">
                      View Details
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
                        className="lucide lucide-arrow-right ml-2 w-4 h-4"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          {/* Tarjeta 3 */}
          <div>
            <Link
              href="/bikedetails?id=68fff584137391b7ffbbe18b"
              data-discover="true"
            >
              <div className="group relative bg-zinc-800 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=1920&amp;q=80"
                    alt="Street Triple RS"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                      used
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-orange-500 transition-colors">
                        Triumph Street Triple RS
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
                            <rect
                              width="18"
                              height="18"
                              x="3"
                              y="4"
                              rx="2"
                            ></rect>
                            <path d="M3 10h18"></path>
                          </svg>
                          2023
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
                          765cc
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                    An aggressive naked sportbike with exceptional handling.
                    Perfect balance of performance and practicality for both
                    street and track.
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-700">
                    <div>
                      <p className="text-zinc-500 text-xs uppercase">Price</p>
                      <p className="text-2xl font-black text-white">$14.500</p>
                    </div>
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary-foreground shadow h-9 px-4 py-2 bg-orange-500 hover:bg-orange-600 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-red-600">
                      View Details
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
                        className="lucide lucide-arrow-right ml-2 w-4 h-4"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="text-center mt-12">
          <Link href="/bikes" data-discover="true">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-background shadow-sm h-9 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold px-8 py-6 text-lg group">
              View All Motorcycles
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
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PremiumSelectionSection;
