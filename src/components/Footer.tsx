import Link from "next/link";
import {
  SITE_NAME,
  CONTACT_PHONE,
  CONTACT_WHATSAPP,
  CONTACT_EMAIL,
} from "@/lib/constants";

interface FooterProps {
  dict: {
    nav: {
      home: string;
      properties: string;
      about: string;
      contact: string;
      brandName: string;
      brandTagline: string;
    };
    footer: {
      description: string;
      quickLinks: string;
      allProperties: string;
      contactUs: string;
      timezone: string;
      canaryIslandsTime: string;
      copyright: string;
      privacyPolicy: string;
      termsOfService: string;
      followFacebook: string;
      followInstagram: string;
      followTwitter: string;
    };
    contact: {
      whatsappLabel: string;
      phoneLabel: string;
      emailLabel: string;
      locationLabel: string;
      locationCity: string;
      locationRegion: string;
      locationCountry: string;
    };
    whatsapp: {
      chatMessage: string;
    };
  };
  locale: string;
}

export default function Footer({ dict, locale }: FooterProps) {
  const currentYear = new Date().getFullYear();

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
    <footer className="bg-navy text-white" role="contentinfo">
      {/* Top decorative line */}
      <div className="h-1 bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="inline-flex items-center gap-2 group" aria-label={`${SITE_NAME} - ${dict.nav.home}`}>
              <svg
                className="h-8 w-8 text-gold-light"
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
                <span className="text-lg font-bold tracking-tight leading-tight text-white">
                  {dict.nav.brandName}
                </span>
                <span className="text-xs font-medium uppercase tracking-widest leading-tight text-gold-light">
                  {dict.nav.brandTagline}
                </span>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-400 max-w-xs">
              {dict.footer.description}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-gray-400 hover:bg-gold hover:text-white transition-all duration-300"
                aria-label={dict.footer.followFacebook}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-gray-400 hover:bg-gold hover:text-white transition-all duration-300"
                aria-label={dict.footer.followInstagram}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-gray-400 hover:bg-gold hover:text-white transition-all duration-300"
                aria-label={dict.footer.followTwitter}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-light mb-6">
              {dict.footer.quickLinks}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="h-px w-0 bg-gold-light transition-all duration-300 group-hover:w-4" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/${locale}/properties`}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200 inline-flex items-center gap-2 group"
                >
                  <span className="h-px w-0 bg-gold-light transition-all duration-300 group-hover:w-4" aria-hidden="true" />
                  {dict.footer.allProperties}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-light mb-6">
              {dict.footer.contactUs}
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                  className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {/* Phone icon */}
                  <svg
                    className="h-5 w-5 text-gold-light shrink-0 mt-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>{CONTACT_PHONE}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {/* WhatsApp icon */}
                  <svg
                    className="h-5 w-5 text-whatsapp shrink-0 mt-0.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>{dict.contact.whatsappLabel}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {/* Mail icon */}
                  <svg
                    className="h-5 w-5 text-gold-light shrink-0 mt-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>{CONTACT_EMAIL}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-light mb-6">
              {dict.contact.locationLabel}
            </h3>
            <div className="flex items-start gap-3 text-sm text-gray-400">
              {/* MapPin icon */}
              <svg
                className="h-5 w-5 text-gold-light shrink-0 mt-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div className="leading-relaxed">
                <p>{dict.contact.locationCity}</p>
                <p>{dict.contact.locationRegion}</p>
                <p>{dict.contact.locationCountry}</p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-medium">
                {dict.footer.timezone}
              </p>
              <p className="text-sm text-gray-300">
                WET (UTC+0) / WEST (UTC+1)
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {dict.footer.canaryIslandsTime}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} {SITE_NAME}. {dict.footer.copyright}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href={`/${locale}/privacy`}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              {dict.footer.privacyPolicy}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              {dict.footer.termsOfService}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
