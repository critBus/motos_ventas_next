import Link from "next/link";
import React from "react";
import { useTranslations } from "next-intl"; // Import the hook
import { CONTACT_EMAIL, CONTACT_PHONE_NUMBER } from "@/data/contact";

// Adjust the component to accept contact data as props
const Footer: React.FC = () => {
  // Initialize translations for the "Footer" section
  const t = useTranslations("Footer");

  return (
    <footer className="bg-black border-t border-zinc-800 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info / Tagline Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              {/* Logo/Name - Kept as-is (not internationalized) */}
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
            {/* Tagline - Internationalized */}
            <p className="text-zinc-400 mb-4 max-w-md">{t("tagline")}</p>
          </div>

          {/* Quick Links Section */}
          <div>
            {/* Title - Internationalized */}
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider">
              {t("quickLinksTitle")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  className="text-zinc-400 hover:text-orange-500 transition-colors"
                  href="/home" // Link is constant
                  data-discover="true"
                >
                  {t("linkHome")} {/* Text - Internationalized */}
                </Link>
              </li>
              <li>
                <Link
                  className="text-zinc-400 hover:text-orange-500 transition-colors"
                  href="/bikes" // Link is constant
                  data-discover="true"
                >
                  {t("linkMotorcycles")} {/* Text - Internationalized */}
                </Link>
              </li>
              <li>
                <Link
                  className="text-zinc-400 hover:text-orange-500 transition-colors"
                  href="/contact" // Link is constant
                  data-discover="true"
                >
                  {t("linkContact")} {/* Text - Internationalized */}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            {/* Title - Internationalized */}
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider">
              {t("contactTitle")}
            </h3>
            <ul className="space-y-2 text-zinc-400">
              {/* Phone Number - Using external variable */}
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
                <span>{CONTACT_PHONE_NUMBER}</span>
              </li>
              {/* Email Address - Using external variable */}
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
                <span>{CONTACT_EMAIL}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-zinc-500 text-sm">
          <p>{t("copyright")}</p> {/* Text - Internationalized */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
