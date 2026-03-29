import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/ImageGallery";
import ContactForm from "@/components/ContactForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { properties, getPropertyBySlug } from "@/data/properties";
import { generatePropertyJsonLd } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { getDictionary } from "@/lib/dictionary";
import { type Locale, locales } from "@/lib/i18n";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import Link from "next/link";

// Map English amenity strings to dictionary keys
const amenityKeyMap: Record<string, string> = {
  "Ocean View": "oceanView",
  "Panoramic Window": "panoramicWindow",
  "Fully Equipped Kitchen": "fullyEquippedKitchen",
  "Washing Machine": "washingMachine",
  "Microwave & Oven": "microwaveOven",
  "Wi-Fi": "wifi",
  "Smart TV": "smartTv",
  "Air Conditioning": "airConditioning",
  "Marble Flooring": "marbleFlooring",
  "Rain Shower": "rainShower",
  "Elevator": "elevator",
  "Dining Area": "diningArea",
  "Sofa Bed": "sofaBed",
  "Hair Dryer": "hairDryer",
  "Iron": "iron",
  "Dishwasher": "dishwasher",
};

// Map English highlight strings to dictionary keys
const highlightKeyMap: Record<string, string> = {
  "6.5m panoramic window opening to ocean": "h1",
  "Direct oceanfront location": "h2",
  "15 minutes from Loro Park": "h3",
  "Luxury marble interiors": "h4",
  "Fully equipped and furnished": "h5",
  "High floor with unobstructed views": "h6",
};

// Map image src paths to dictionary keys
const imageAltKeyMap: Record<string, string> = {
  "/properties/oceanfront-apartment-tenerife/dining-ocean-view.png": "diningOceanView",
  "/properties/oceanfront-apartment-tenerife/living-room.png": "livingRoom",
  "/properties/oceanfront-apartment-tenerife/open-plan.png": "openPlan",
  "/properties/oceanfront-apartment-tenerife/kitchen-overview.png": "kitchenOverview",
  "/properties/oceanfront-apartment-tenerife/kitchen.png": "kitchen",
  "/properties/oceanfront-apartment-tenerife/bedroom.png": "bedroom",
  "/properties/oceanfront-apartment-tenerife/bathroom.png": "bathroom",
};

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const property of properties) {
      params.push({ locale, slug: property.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    const notFoundDict = await getDictionary(locale as Locale);
    return { title: notFoundDict.property.notFoundTitle };
  }

  const dict = await getDictionary(locale as Locale);
  const title = dict.propertyData.title;
  const description = dict.propertyData.shortDescription;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      type: "website",
      url: `${SITE_URL}/${locale}/properties/${property.slug}`,
      images: property.images.map((img) => ({
        url: img.src,
        width: img.width,
        height: img.height,
        alt: dict.propertyData.images[imageAltKeyMap[img.src] as keyof typeof dict.propertyData.images] || img.alt,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [property.images[0]?.src],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/properties/${property.slug}`,
    },
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);
  const pd = dict.propertyData;
  const pl = dict.property;

  // Translate amenities
  const translatedAmenities = property.amenities.map((amenity) => {
    const key = amenityKeyMap[amenity];
    return key ? (pd.amenities[key as keyof typeof pd.amenities] || amenity) : amenity;
  });

  // Translate highlights
  const translatedHighlights = property.highlights.map((highlight) => {
    const key = highlightKeyMap[highlight];
    return key ? (pd.highlights[key as keyof typeof pd.highlights] || highlight) : highlight;
  });

  // Translate image alt texts
  const translatedImages = property.images.map((img) => ({
    ...img,
    alt: pd.images[imageAltKeyMap[img.src] as keyof typeof pd.images] || img.alt,
  }));

  // Translate property type
  const typeMap: Record<string, string> = {
    apartment: pl.apartment,
    house: pl.house,
    villa: pl.villa,
  };
  const translatedType = typeMap[property.type] || property.type;

  // Build WhatsApp message with translated template
  const whatsappMessage = pl.whatsappMessage.replace("{title}", pd.title);

  return (
    <>
      <JsonLd data={generatePropertyJsonLd(property)} />

      <div className="pt-24 pb-20">
        <Breadcrumbs
          items={[
            { label: dict.breadcrumbs.home, href: `/${locale}` },
            { label: dict.breadcrumbs.properties, href: `/${locale}/properties` },
            { label: pd.title, href: `/${locale}/properties/${property.slug}` },
          ]}
          ariaLabel={dict.breadcrumbs.ariaLabel}
        />

        <div className="max-w-7xl mx-auto px-4 pt-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span
                className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full text-white"
                style={{ backgroundColor: "var(--color-gold)" }}
              >
                {translatedType}
              </span>
              {property.available && (
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-green-100 text-green-800">
                  {pl.available}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              {pd.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <span className="flex items-center gap-1">
                <svg
                  className="w-5 h-5"
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
                {property.location.address}
              </span>
              {property.rating && (
                <span className="flex items-center gap-1">
                  <svg
                    className="w-5 h-5"
                    style={{ color: "var(--color-gold)" }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="font-semibold">{property.rating}</span>
                  <span className="text-gray-400">
                    ({property.reviewCount} {pl.reviews})
                  </span>
                </span>
              )}
            </div>
          </div>

          {/* Image Gallery */}
          <ImageGallery images={translatedImages} propertyTitle={pd.title} dict={dict.property} />

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Key Details */}
              <div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl"
                style={{ backgroundColor: "var(--color-sand)" }}
              >
                <div className="text-center">
                  <svg
                    className="w-6 h-6 mx-auto mb-2"
                    style={{ color: "var(--color-gold)" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 7v11a1 1 0 001 1h16a1 1 0 001-1V7M3 7l4-4h10l4 4M3 7h18M8 11h.01M16 11h.01"
                    />
                  </svg>
                  <p className="text-2xl font-bold text-gray-900">
                    {property.details.bedrooms}
                  </p>
                  <p className="text-sm text-gray-500">
                    {property.details.bedrooms === 1 ? pl.bedroom : pl.bedrooms}
                  </p>
                </div>
                <div className="text-center">
                  <svg
                    className="w-6 h-6 mx-auto mb-2"
                    style={{ color: "var(--color-gold)" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M4 16V8a4 4 0 014-4h8a4 4 0 014 4v8M4 16h16"
                    />
                  </svg>
                  <p className="text-2xl font-bold text-gray-900">
                    {property.details.bathrooms}
                  </p>
                  <p className="text-sm text-gray-500">
                    {property.details.bathrooms === 1 ? pl.bathroom : pl.bathrooms}
                  </p>
                </div>
                <div className="text-center">
                  <svg
                    className="w-6 h-6 mx-auto mb-2"
                    style={{ color: "var(--color-gold)" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                  <p className="text-2xl font-bold text-gray-900">
                    {property.details.area}
                  </p>
                  <p className="text-sm text-gray-500">
                    {property.details.areaUnit}
                  </p>
                </div>
                <div className="text-center">
                  <svg
                    className="w-6 h-6 mx-auto mb-2"
                    style={{ color: "var(--color-gold)" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <p className="text-2xl font-bold text-gray-900">
                    {property.details.maxGuests}
                  </p>
                  <p className="text-sm text-gray-500">{pl.maxGuests}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {pl.aboutTitle}
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  {pd.description.split("\n\n").map((paragraph: string, i: number) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {pl.highlightsTitle}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {translatedHighlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 shrink-0"
                        style={{ color: "var(--color-gold)" }}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {pl.amenitiesTitle}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {translatedAmenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 shrink-0 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {pl.locationTitle}
                </h2>
                <div
                  className="rounded-2xl p-6"
                  style={{ backgroundColor: "var(--color-sand)" }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <svg
                      className="w-6 h-6 shrink-0 mt-0.5"
                      style={{ color: "var(--color-gold)" }}
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
                    <div>
                      <p className="font-semibold text-gray-900">
                        {property.location.address}
                      </p>
                      <p className="text-gray-600 mt-1">
                        {pl.locationDesc}
                      </p>
                    </div>
                  </div>
                  <div className="aspect-video rounded-xl overflow-hidden bg-gray-200">
                    <iframe
                      src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3510.0!2d${property.location.coordinates.longitude}!3d${property.location.coordinates.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI0JzUwLjAiTiAxNsKwMzInNTIuMSJX!5e0!3m2!1sen!2ses!4v1`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={pl.mapTitle.replace("{title}", pd.title)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Pricing Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-3xl font-bold"
                        style={{ color: "var(--color-navy)" }}
                      >
                        &euro;{property.pricing.perNight}
                      </span>
                      <span className="text-gray-500">{pl.perNight}</span>
                    </div>
                    {property.pricing.perWeek && (
                      <p className="text-gray-500 mt-1">
                        &euro;{property.pricing.perWeek} {pl.perWeek}
                      </p>
                    )}
                    {property.pricing.perMonth && (
                      <p className="text-gray-500">
                        &euro;{property.pricing.perMonth} {pl.perMonth}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <a
                      href={`https://wa.me/${property.contact.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105"
                      style={{ backgroundColor: "var(--color-whatsapp)" }}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.39 0-4.598-.77-6.396-2.078l-.446-.338-3.058 1.024 1.024-3.058-.338-.446A9.963 9.963 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                      </svg>
                      {pl.bookWhatsApp}
                    </a>
                    <a
                      href={`tel:${property.contact.phone}`}
                      className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-full font-semibold border-2 transition-all duration-300 hover:bg-gray-50"
                      style={{ borderColor: "var(--color-navy)", color: "var(--color-navy)" }}
                    >
                      <svg
                        className="w-5 h-5"
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
                      {pl.callPhone} {property.contact.phone}
                    </a>
                  </div>

                  <p className="text-center text-sm text-gray-400 mt-4">
                    {pl.directFromOwner} &bull; {pl.noBookingFees}
                  </p>
                </div>

                {/* Availability Calendar */}
                <AvailabilityCalendar
                  bookings={property.bookings}
                  dict={dict.calendar}
                />

                {/* Quick Facts */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">{pl.quickFacts}</h3>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-500">{pl.propertyType}</dt>
                      <dd className="font-medium text-gray-900 capitalize">
                        {translatedType}
                      </dd>
                    </div>
                    {property.details.floor && (
                      <div className="flex justify-between">
                        <dt className="text-gray-500">{pl.floor}</dt>
                        <dd className="font-medium text-gray-900">
                          {property.details.floor}{pl.floorSuffix}
                        </dd>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <dt className="text-gray-500">{pl.size}</dt>
                      <dd className="font-medium text-gray-900">
                        {property.details.area} {property.details.areaUnit}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">{pl.maxGuests}</dt>
                      <dd className="font-medium text-gray-900">
                        {property.details.maxGuests}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">{pl.location}</dt>
                      <dd className="font-medium text-gray-900">
                        {property.location.city}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Owner Note */}
                <div
                  className="rounded-2xl p-6"
                  style={{ backgroundColor: "var(--color-sand)" }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: "var(--color-gold)" }}
                    >
                      O
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {pl.ownerTitle}
                      </p>
                      <p className="text-sm text-gray-500">
                        {pl.ownerResponse}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {pl.ownerMessage}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {pl.sendInquiry}
            </h2>
            <ContactForm propertyTitle={pd.title} dict={dict} />
          </div>

          {/* Back to Properties */}
          <div className="mt-12 text-center">
            <Link
              href={`/${locale}/properties`}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              {pl.backToProperties}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
