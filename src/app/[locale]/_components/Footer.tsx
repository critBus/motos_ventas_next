import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-zinc-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-black text-white">M</span>
              </div>
              <div>
                <span className="text-2xl font-black text-white">MOTO</span>
                <span className="text-2xl font-black text-orange-500">
                  RIDERS
                </span>
              </div>
            </div>
            <p className="text-zinc-400 mb-4 max-w-md">
              Your premier destination for high-performance motorcycles.
              Experience the thrill of the ride with our curated collection.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  className="text-zinc-400 hover:text-orange-500 transition-colors"
                  href="/home"
                  data-discover="true"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-zinc-400 hover:text-orange-500 transition-colors"
                  href="/bikes"
                  data-discover="true"
                >
                  Motorcycles
                </Link>
              </li>
              <li>
                <Link
                  className="text-zinc-400 hover:text-orange-500 transition-colors"
                  href="/contact"
                  data-discover="true"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-2 text-zinc-400">
              <li className="flex items-center gap-2">
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
                  className="lucide lucide-phone w-4 h-4"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center gap-2">
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
                  className="lucide lucide-mail w-4 h-4"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span>info@motoriders.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-zinc-500 text-sm">
          <p>© 2025 MotoRiders. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
