"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { locales, localeNames, localeFlags, Locale } from "@/lib/i18n";

interface LanguageSwitcherProps {
  locale: string;
  dict: {
    label: string;
    selectLanguage: string;
  };
  variant?: "desktop" | "mobile";
}

export default function LanguageSwitcher({
  locale,
  dict,
  variant = "desktop",
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const currentFlag = localeFlags[locale as Locale] || localeFlags.en;
  const currentName = localeNames[locale as Locale] || localeNames.en;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  function switchLocale(newLocale: string) {
    // Set the NEXT_LOCALE cookie
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;

    // Replace the current locale prefix in the pathname with the new one
    // pathname looks like /en/properties/slug or /en
    const segments = pathname.split("/");
    // segments[0] is "" (before first slash), segments[1] is the locale
    if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    const newPath = segments.join("/") || "/";
    window.location.href = newPath;
  }

  if (variant === "mobile") {
    return (
      <div className="px-4 py-2">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-3 px-4">
          {dict.selectLanguage}
        </p>
        <ul className="space-y-0.5">
          {locales.map((loc) => (
            <li key={loc}>
              <button
                onClick={() => switchLocale(loc)}
                className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                  loc === locale
                    ? "bg-sand text-navy font-semibold"
                    : "text-gray-700 hover:text-navy hover:bg-sand/50"
                }`}
                aria-current={loc === locale ? "true" : undefined}
              >
                <span className="text-lg leading-none" aria-hidden="true">
                  {localeFlags[loc]}
                </span>
                <span>{localeNames[loc]}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/10"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={dict.selectLanguage}
      >
        <span className="text-base leading-none" aria-hidden="true">
          {currentFlag}
        </span>
        <span className="hidden lg:inline">{currentName}</span>
        <svg
          className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 top-full mt-2 w-56 rounded-2xl border border-white/10 bg-white/95 backdrop-blur-xl shadow-2xl shadow-black/20 transition-all duration-200 origin-top-right ${
          isOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
        role="listbox"
        aria-label={dict.selectLanguage}
      >
        <div className="p-2 max-h-80 overflow-y-auto">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => {
                switchLocale(loc);
                setIsOpen(false);
              }}
              role="option"
              aria-selected={loc === locale}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm transition-all duration-150 ${
                loc === locale
                  ? "bg-navy/10 text-navy font-semibold"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <span className="text-lg leading-none" aria-hidden="true">
                {localeFlags[loc]}
              </span>
              <span>{localeNames[loc]}</span>
              {loc === locale && (
                <svg
                  className="ml-auto h-4 w-4 text-navy"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
