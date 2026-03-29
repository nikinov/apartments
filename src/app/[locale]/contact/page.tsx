import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CONTACT_PHONE, CONTACT_EMAIL, CONTACT_WHATSAPP } from "@/lib/constants";
import { getDictionary } from "@/lib/dictionary";
import { type Locale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return {
    title: dict.contact.pageTitle,
    description: dict.contact.pageDescription,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="pt-24 pb-20">
      <Breadcrumbs
        items={[
          { label: dict.breadcrumbs.home, href: `/${locale}` },
          { label: dict.breadcrumbs.contact, href: `/${locale}/contact` },
        ]}
        ariaLabel={dict.breadcrumbs.ariaLabel}
      />

      <section className="px-4 pt-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-3"
              style={{ color: "var(--color-gold)" }}
            >
              {dict.contact.overline}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {dict.contact.title}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {dict.contact.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(
                  dict.contact.whatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-white"
                  style={{ backgroundColor: "var(--color-whatsapp)" }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.39 0-4.598-.77-6.396-2.078l-.446-.338-3.058 1.024 1.024-3.058-.338-.446A9.963 9.963 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                    {dict.contact.whatsappLabel}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {dict.contact.whatsappDesc}
                  </p>
                  <p className="font-medium mt-2" style={{ color: "var(--color-whatsapp)" }}>
                    {CONTACT_PHONE}
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-white"
                  style={{ backgroundColor: "var(--color-ocean)" }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {dict.contact.phoneLabel}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {dict.contact.phoneDesc}
                  </p>
                  <p className="font-medium mt-2" style={{ color: "var(--color-ocean)" }}>
                    {CONTACT_PHONE}
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-white"
                  style={{ backgroundColor: "var(--color-gold)" }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-yellow-700 transition-colors">
                    {dict.contact.emailLabel}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {dict.contact.emailDesc}
                  </p>
                  <p className="font-medium mt-2" style={{ color: "var(--color-gold)" }}>
                    {CONTACT_EMAIL}
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="p-6 rounded-2xl bg-white shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-white"
                    style={{ backgroundColor: "var(--color-navy)" }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{dict.contact.locationLabel}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {dict.contact.locationCity}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {dict.contact.locationRegion}
                    </p>
                    <p className="text-gray-600 text-sm">{dict.contact.locationCountry}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm dict={dict} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
