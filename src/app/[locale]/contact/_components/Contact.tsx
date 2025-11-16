"use client";

import React, { useState } from "react";
import Image from "next/image"; // Importar el componente Image

const Contact = () => {
  // Estado para los campos del formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Manejador para el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí es donde enviarías los datos a un API route o servicio
    console.log("Form data:", { name, email, phone, message });
    alert("Mensaje enviado (revisa la consola para ver los datos)");

    // Limpiar el formulario
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <main className="pt-20">
      <div className="min-h-screen bg-zinc-950">
        <div className="relative h-64 bg-zinc-900 border-b border-zinc-800 flex items-center">
          <div className="absolute inset-0">
            {/* Reemplazado <img> con next/image */}
            <Image
              src="/images/fondo-contacto.jpeg"
              alt="Contact"
              fill // Rellena el contenedor padre
              style={{ objectFit: "cover" }} // Equivalente a object-cover
              className="opacity-20"
              priority // Cargar esta imagen con prioridad
            />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div style={{ opacity: 1, transform: "none" }}>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                GET IN <span className="text-orange-500">TOUCH</span>
              </h1>
              <p className="text-zinc-400 text-lg">
                Have questions? We&apos;re here to help you find your perfect
                ride
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="rounded-xl border text-card-foreground shadow bg-zinc-900 border-zinc-800">
                <div className="p-8">
                  <h2 className="text-3xl font-black text-white mb-6">
                    Send Us a Message
                  </h2>
                  {/* Añadido el manejador onSubmit */}
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-zinc-400 mb-2 font-semibold">
                          Name *
                        </label>
                        <input
                          className="flex h-9 w-full rounded-md border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-orange-500"
                          required
                          placeholder="Your name"
                          value={name} // Vincular al estado
                          onChange={(e) => setName(e.target.value)} // Actualizar estado
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 mb-2 font-semibold">
                          Email *
                        </label>
                        <input
                          type="email"
                          className="flex h-9 w-full rounded-md border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-orange-500"
                          required
                          placeholder="your.email@example.com"
                          value={email} // Vincular al estado
                          onChange={(e) => setEmail(e.target.value)} // Actualizar estado
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-2 font-semibold">
                        Phone
                      </label>
                      <input
                        type="tel"
                        className="flex h-9 w-full rounded-md border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-orange-500"
                        placeholder="(123) 456-7890"
                        value={phone} // Vincular al estado
                        onChange={(e) => setPhone(e.target.value)} // Actualizar estado
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-2 font-semibold">
                        Message *
                      </label>
                      <textarea
                        className="flex w-full rounded-md border px-3 py-2 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-orange-500 min-h-[150px]"
                        required
                        placeholder="Tell us about your interest..."
                        value={message} // Vincular al estado
                        onChange={(e) => setMessage(e.target.value)} // Actualizar estado
                      ></textarea>
                    </div>
                    <button
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow hover:bg-primary/90 h-9 px-4 w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-6 text-lg"
                      type="submit"
                    >
                      Send Message
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
                        className="lucide lucide-send ml-2 w-5 h-5"
                      >
                        <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                        <path d="m21.854 2.147-10.94 10.939"></path>
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div style={{ opacity: 1, transform: "none" }}>
                <div className="rounded-xl border text-card-foreground shadow bg-zinc-900 border-zinc-800 hover:border-orange-500 transition-colors duration-300">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
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
                          className="lucide lucide-phone w-6 h-6 text-white"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-bold mb-2">Phone</h3>
                        <a
                          href="tel:+1234567890"
                          className="text-zinc-400 hover:text-orange-500 transition-colors"
                        >
                          (123) 456-7890
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ opacity: 1, transform: "none" }}>
                <div className="rounded-xl border text-card-foreground shadow bg-zinc-900 border-zinc-800 hover:border-orange-500 transition-colors duration-300">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
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
                          className="lucide lucide-mail w-6 h-6 text-white"
                        >
                          <rect
                            width="20"
                            height="16"
                            x="2"
                            y="4"
                            rx="2"
                          ></rect>
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-bold mb-2">Email</h3>
                        <a
                          href="mailto:info@motoriders.com"
                          className="text-zinc-400 hover:text-orange-500 transition-colors"
                        >
                          info@motoriders.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ opacity: 1, transform: "none" }}>
                <div className="rounded-xl border text-card-foreground shadow bg-zinc-900 border-zinc-800 hover:border-orange-500 transition-colors duration-300">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
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
                          className="lucide lucide-map-pin w-6 h-6 text-white"
                        >
                          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-bold mb-2">Address</h3>
                        <p className="text-zinc-400">
                          123 Rider Street, Moto City, MC 12345
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ opacity: 1, transform: "none" }}>
                <div className="rounded-xl border text-card-foreground shadow bg-zinc-900 border-zinc-800 hover:border-orange-500 transition-colors duration-300">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
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
                          className="lucide lucide-clock w-6 h-6 text-white"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-bold mb-2">Hours</h3>
                        <p className="text-zinc-400">
                          Mon-Sat: 9AM-7PM, Sun: 10AM-5PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ... El resto de los bloques de info (teléfono, email, etc.) ... */}
              <div className="rounded-xl border text-card-foreground shadow bg-zinc-900 border-zinc-800 overflow-hidden">
                <div className="h-64 bg-zinc-800 flex items-center justify-center relative">
                  {/* Segunda imagen reemplazada */}
                  <Image
                    src="/images/mapa.jpeg"
                    alt="Location"
                    fill
                    style={{ objectFit: "cover" }}
                    className="opacity-40"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
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
                      className="lucide lucide-map-pin w-12 h-12 text-orange-500"
                    >
                      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
