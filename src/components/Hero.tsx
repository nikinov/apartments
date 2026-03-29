import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  dict: {
    hero: {
      overline: string;
      title1: string;
      title2: string;
      subtitle: string;
      browseProperties: string;
      contactUs: string;
      scroll: string;
      ariaLabel: string;
    };
  };
  locale: string;
}

export default function Hero({ dict, locale }: HeroProps) {
  return (
    <section
      className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      aria-label={dict.hero.ariaLabel}
    >
      {/* Background Image */}
      <Image
        src="/properties/oceanfront-apartment-tenerife/dining-ocean-view.png"
        alt={dict.hero.title1}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
        quality={90}
      />

      {/* Gradient Overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(12, 27, 51, 0.7) 0%, rgba(12, 27, 51, 0.4) 40%, rgba(12, 27, 51, 0.6) 70%, rgba(12, 27, 51, 0.85) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle gold shimmer at top */}
      <div
        className="absolute top-0 left-0 right-0 h-40"
        style={{
          background:
            "linear-gradient(to bottom, rgba(184, 134, 11, 0.15) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Overline */}
        <p
          className="animate-fade-in-up text-sm sm:text-base font-medium uppercase tracking-widest mb-6 opacity-0"
          style={{ color: "var(--color-gold-light)", animationDelay: "200ms", animationFillMode: "forwards" }}
        >
          {dict.hero.overline}
        </p>

        {/* Headline */}
        <h1
          className="animate-fade-in-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6 opacity-0"
          style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
        >
          {dict.hero.title1}
          <br />
          <span style={{ color: "var(--color-gold-light)" }}>
            {dict.hero.title2}
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="animate-fade-in-up text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed opacity-0"
          style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
        >
          {dict.hero.subtitle}
        </p>

        {/* CTA Buttons */}
        <div
          className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0"
          style={{ animationDelay: "800ms", animationFillMode: "forwards" }}
        >
          <Link
            href={`/${locale}/properties`}
            className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
            style={{ backgroundColor: "var(--color-gold-light)", color: "var(--color-navy)", minWidth: "200px" }}
          >
            {dict.hero.browseProperties}
            <svg
              className="ml-2 h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>

          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-white border-2 border-white/30 transition-all duration-300 hover:border-white hover:bg-white/10 hover:scale-105"
            style={{ minWidth: "200px" }}
          >
            {dict.hero.contactUs}
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-widest text-white/60">
          {dict.hero.scroll}
        </span>
        <div className="animate-bounce-subtle">
          <svg
            className="h-6 w-6 text-white/60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Bottom gradient fade into page content */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{
          background: "linear-gradient(to top, var(--color-navy) 0%, rgba(12, 27, 51, 0.6) 40%, transparent 100%)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
