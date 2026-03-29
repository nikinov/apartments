"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { SITE_NAME, CONTACT_WHATSAPP } from "@/lib/constants";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface NavbarProps {
  dict: {
    nav: {
      home: string;
      properties: string;
      about: string;
      contact: string;
      whatsapp: string;
      menu: string;
      closeMenu: string;
      openMenu: string;
      brandName: string;
      brandTagline: string;
      mainNavigation: string;
    };
    whatsapp: {
      chatMessage: string;
    };
    languageSwitcher: {
      label: string;
      selectLanguage: string;
    };
  };
  locale: string;
}

export default function Navbar({ dict, locale }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const whatsappUrl = `https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(
    dict.whatsapp.chatMessage
  )}`;

  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/properties`, label: dict.nav.properties },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white shadow-lg shadow-black/5"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label={dict.nav.mainNavigation}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 group"
              aria-label={`${SITE_NAME} - ${dict.nav.home}`}
            >
              {/* Diamond icon */}
              <svg
                className={`h-8 w-8 transition-colors duration-500 ${
                  isScrolled ? "text-gold" : "text-gold-light"
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z" />
              </svg>
              <div className="flex flex-col">
                <span
                  className={`text-lg font-bold tracking-tight leading-tight transition-colors duration-500 ${
                    isScrolled ? "text-navy" : "text-white"
                  }`}
                >
                  {dict.nav.brandName}
                </span>
                <span
                  className={`text-xs font-medium uppercase tracking-widest leading-tight transition-colors duration-500 ${
                    isScrolled ? "text-gold" : "text-gold-light"
                  }`}
                >
                  {dict.nav.brandTagline}
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isScrolled
                      ? "text-gray-700 hover:text-navy hover:bg-sand"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA + Language Switcher + Mobile Toggle */}
            <div className="flex items-center gap-3">
              {/* Desktop Language Switcher */}
              <div
                className={`hidden md:block ${
                  isScrolled ? "text-gray-700" : "text-white"
                }`}
              >
                <LanguageSwitcher
                  locale={locale}
                  dict={dict.languageSwitcher}
                  variant="desktop"
                />
              </div>

              {/* WhatsApp CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg"
                style={{ backgroundColor: "var(--color-whatsapp)" }}
                aria-label={dict.nav.whatsapp}
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {dict.nav.whatsapp}
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
                  isScrolled
                    ? "text-navy hover:bg-sand"
                    : "text-white hover:bg-white/10"
                }`}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
              >
                {isMobileMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 bottom-0 z-50 w-80 max-w-full bg-white shadow-2xl md:hidden ${
          isMobileMenuOpen
            ? "animate-slide-in-right"
            : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={dict.nav.menu}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <span className="text-lg font-bold text-navy">{dict.nav.menu}</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg text-gray-500 hover:text-navy hover:bg-sand transition-colors"
              aria-label={dict.nav.closeMenu}
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Drawer Links */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-navy hover:bg-sand transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Language Switcher */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <LanguageSwitcher
                locale={locale}
                dict={dict.languageSwitcher}
                variant="mobile"
              />
            </div>
          </nav>

          {/* Drawer Footer */}
          <div className="p-6 border-t border-gray-100">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-full px-6 py-3 text-base font-semibold text-white transition-all duration-300"
              style={{ backgroundColor: "var(--color-whatsapp)" }}
              aria-label={dict.nav.whatsapp}
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {dict.nav.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
