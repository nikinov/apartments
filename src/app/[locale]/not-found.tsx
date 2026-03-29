"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";
import { useEffect, useState } from "react";

// Inline translations for the 404 page (since we can't use async getDictionary in a client component)
const notFoundTexts: Record<Locale, { title: string; description: string; goHome: string; browseProperties: string }> = {
  en: { title: "Page Not Found", description: "The page you are looking for does not exist or has been moved. Let us help you find what you need.", goHome: "Go Home", browseProperties: "Browse Properties" },
  es: { title: "Página no encontrada", description: "La página que busca no existe o ha sido movida. Permítanos ayudarle a encontrar lo que necesita.", goHome: "Ir al inicio", browseProperties: "Ver propiedades" },
  pt: { title: "Página não encontrada", description: "A página que procura não existe ou foi movida. Deixe-nos ajudá-lo a encontrar o que precisa.", goHome: "Ir para o início", browseProperties: "Ver propriedades" },
  fr: { title: "Page non trouvée", description: "La page que vous recherchez n'existe pas ou a été déplacée. Laissez-nous vous aider à trouver ce dont vous avez besoin.", goHome: "Accueil", browseProperties: "Voir les propriétés" },
  cs: { title: "Stránka nenalezena", description: "Stránka, kterou hledáte, neexistuje nebo byla přesunuta. Pomozte nám najít to, co potřebujete.", goHome: "Na úvodní stránku", browseProperties: "Prohlédnout nemovitosti" },
  de: { title: "Seite nicht gefunden", description: "Die Seite, die Sie suchen, existiert nicht oder wurde verschoben. Lassen Sie uns Ihnen helfen, das Richtige zu finden.", goHome: "Zur Startseite", browseProperties: "Immobilien ansehen" },
  it: { title: "Pagina non trovata", description: "La pagina che stai cercando non esiste o è stata spostata. Lascia che ti aiutiamo a trovare ciò che cerchi.", goHome: "Vai alla home", browseProperties: "Sfoglia proprietà" },
  pl: { title: "Strona nie znaleziona", description: "Strona, której szukasz, nie istnieje lub została przeniesiona. Pozwól nam pomóc Ci znaleźć to, czego potrzebujesz.", goHome: "Strona główna", browseProperties: "Przeglądaj nieruchomości" },
  nl: { title: "Pagina niet gevonden", description: "De pagina die u zoekt bestaat niet of is verplaatst. Laat ons u helpen te vinden wat u nodig heeft.", goHome: "Naar home", browseProperties: "Bekijk woningen" },
  el: { title: "Η σελίδα δεν βρέθηκε", description: "Η σελίδα που αναζητάτε δεν υπάρχει ή έχει μετακινηθεί. Αφήστε μας να σας βοηθήσουμε να βρείτε αυτό που χρειάζεστε.", goHome: "Αρχική σελίδα", browseProperties: "Δείτε ακίνητα" },
  sk: { title: "Stránka nenájdená", description: "Stránka, ktorú hľadáte, neexistuje alebo bola presunutá. Dovoľte nám pomôcť vám nájsť to, čo potrebujete.", goHome: "Na úvodnú stránku", browseProperties: "Prehliadať nehnuteľnosti" },
  hu: { title: "Az oldal nem található", description: "A keresett oldal nem létezik vagy áthelyezték. Hadd segítsünk megtalálni, amit keres.", goHome: "Főoldal", browseProperties: "Ingatlanok böngészése" },
};

export default function NotFound() {
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const pathLocale = pathname.split("/")[1];
    if (pathLocale && locales.includes(pathLocale as Locale)) {
      setLocale(pathLocale as Locale);
    }
  }, [pathname]);

  const t = notFoundTexts[locale];

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 pt-24">
      <div className="text-center">
        <p
          className="text-6xl font-bold mb-4"
          style={{ color: "var(--color-gold)" }}
        >
          404
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {t.title}
        </h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          {t.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: "var(--color-gold)" }}
          >
            {t.goHome}
          </Link>
          <Link
            href={`/${locale}/properties`}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold border-2 border-gray-300 hover:bg-gray-50 transition-all duration-300"
          >
            {t.browseProperties}
          </Link>
        </div>
      </div>
    </div>
  );
}
