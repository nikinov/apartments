import { Property } from "@/lib/types";
import {
  SITE_NAME,
  SITE_URL,
  CONTACT_PHONE,
  CONTACT_EMAIL,
} from "@/lib/constants";

/**
 * Generates JSON-LD structured data for a vacation rental property.
 * Uses Schema.org VacationRental with LodgingBusiness and Accommodation fallbacks.
 */
export function generatePropertyJsonLd(property: Property): Record<string, unknown> {
  const propertyUrl = `${SITE_URL}/properties/${property.slug}`;
  const images = property.images.map((img) =>
    img.src.startsWith("http") ? img.src : `${SITE_URL}${img.src}`
  );

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["VacationRental", "LodgingBusiness", "Accommodation"],
    name: property.title,
    description: property.shortDescription,
    url: propertyUrl,
    image: images,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.location.address,
      addressLocality: property.location.city,
      addressRegion: property.location.region,
      addressCountry: property.location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.location.coordinates.latitude,
      longitude: property.location.coordinates.longitude,
    },
    amenityFeature: property.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
      value: true,
    })),
    numberOfRooms: property.details.bedrooms + property.details.bathrooms,
    numberOfBedrooms: property.details.bedrooms,
    numberOfBathroomsTotal: property.details.bathrooms,
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: property.details.maxGuests,
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.details.area,
      unitCode: property.details.areaUnit === "m²" ? "MTK" : "FTK",
      unitText: property.details.areaUnit,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: property.pricing.currency,
      lowPrice: property.pricing.perNight,
      highPrice:
        property.pricing.perMonth ??
        property.pricing.perWeek ??
        property.pricing.perNight,
      offerCount: [
        property.pricing.perNight ? 1 : 0,
        property.pricing.perWeek ? 1 : 0,
        property.pricing.perMonth ? 1 : 0,
      ].reduce((a, b) => a + b, 0),
      offers: [
        {
          "@type": "Offer",
          name: "Per Night",
          price: property.pricing.perNight,
          priceCurrency: property.pricing.currency,
          unitCode: "DAY",
          availability: property.available
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        },
        ...(property.pricing.perWeek
          ? [
              {
                "@type": "Offer",
                name: "Per Week",
                price: property.pricing.perWeek,
                priceCurrency: property.pricing.currency,
                unitCode: "WEE",
                availability: property.available
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
              },
            ]
          : []),
        ...(property.pricing.perMonth
          ? [
              {
                "@type": "Offer",
                name: "Per Month",
                price: property.pricing.perMonth,
                priceCurrency: property.pricing.currency,
                unitCode: "MON",
                availability: property.available
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
              },
            ]
          : []),
      ],
    },
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      telephone: CONTACT_PHONE,
      email: CONTACT_EMAIL,
    },
  };

  if (property.details.floor !== undefined) {
    jsonLd.floorLevel = property.details.floor.toString();
  }

  if (property.rating !== undefined && property.reviewCount !== undefined) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: property.rating,
      bestRating: 5,
      worstRating: 1,
      reviewCount: property.reviewCount,
    };
  }

  return jsonLd;
}

/**
 * Generates BreadcrumbList JSON-LD structured data.
 */
export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Generates Organization / LocalBusiness JSON-LD for the site.
 */
export function generateOrganizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "LodgingBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Premium oceanfront apartments and luxury holiday homes for rent in Tenerife, Canary Islands. Direct from owner with stunning ocean views.",
    telephone: CONTACT_PHONE,
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Puerto de la Cruz",
      addressRegion: "Tenerife",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.4139,
      longitude: -16.5478,
    },
    areaServed: {
      "@type": "Place",
      name: "Tenerife, Canary Islands, Spain",
    },
    priceRange: "$$",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT_PHONE,
      contactType: "reservations",
      availableLanguage: ["English", "Spanish"],
    },
  };
}

/**
 * Generates FAQPage JSON-LD structured data.
 */
export function generateFAQJsonLd(
  faqs: { question: string; answer: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
