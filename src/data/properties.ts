import { Property } from "@/lib/types";

export const properties: Property[] = [
  {
    slug: "oceanfront-apartment-tenerife",
    title: "Luxury Oceanfront Apartment in Tenerife",
    description:
      "Experience breathtaking ocean views from this stunning 75m\u00B2 fully furnished apartment on the coast of Tenerife. Located just 15 minutes from Loro Park, this modern apartment features a spectacular 6.5-meter panoramic window that opens completely, transforming your living space into an open-air terrace overlooking the Atlantic Ocean.\n\nThe apartment boasts elegant marble flooring throughout, a mirrored ceiling that amplifies the natural light, and a fully equipped modern kitchen with premium appliances. The spacious living area includes two comfortable sofas and a dining area for six, all positioned to take advantage of the incredible sea views.\n\nThe bedroom offers a peaceful retreat with a comfortable double bed and built-in wardrobe, while the modern bathroom features a walk-in rain shower with glass partition. Every detail has been carefully considered to provide a luxurious and comfortable stay.\n\nWhether you're watching the sunrise over the ocean from your dining table, cooking in the fully equipped kitchen, or simply relaxing on the sofa with the panoramic window wide open, this apartment offers an unforgettable experience on the beautiful island of Tenerife.",
    shortDescription:
      "Stunning 75m\u00B2 oceanfront apartment with panoramic Atlantic views, 6.5m opening window, and luxury marble interiors. 15 min from Loro Park.",
    type: "apartment",
    location: {
      city: "Puerto de la Cruz",
      region: "Tenerife",
      country: "Spain",
      address: "Puerto de la Cruz, Tenerife, Canary Islands",
      coordinates: {
        latitude: 28.4139,
        longitude: -16.5478,
      },
    },
    details: {
      bedrooms: 1,
      bathrooms: 1,
      area: 75,
      areaUnit: "m\u00B2",
      maxGuests: 4,
      floor: 8,
    },
    amenities: [
      "Ocean View",
      "Panoramic Window",
      "Fully Equipped Kitchen",
      "Washing Machine",
      "Microwave & Oven",
      "Wi-Fi",
      "Smart TV",
      "Air Conditioning",
      "Marble Flooring",
      "Rain Shower",
      "Elevator",
      "Dining Area",
      "Sofa Bed",
      "Hair Dryer",
      "Iron",
      "Dishwasher",
    ],
    highlights: [
      "6.5m panoramic window opening to ocean",
      "Direct oceanfront location",
      "15 minutes from Loro Park",
      "Luxury marble interiors",
      "Fully equipped and furnished",
      "High floor with unobstructed views",
    ],
    images: [
      {
        src: "/properties/oceanfront-apartment-tenerife/dining-ocean-view.png",
        alt: "Dining area with panoramic ocean view through 6.5 meter window in Tenerife apartment",
        width: 1200,
        height: 900,
      },
      {
        src: "/properties/oceanfront-apartment-tenerife/living-room.png",
        alt: "Spacious living room with ocean view, sofa and marble floors",
        width: 1200,
        height: 900,
      },
      {
        src: "/properties/oceanfront-apartment-tenerife/open-plan.png",
        alt: "Open plan living and dining area with mirrored ceiling and sea view",
        width: 1200,
        height: 900,
      },
      {
        src: "/properties/oceanfront-apartment-tenerife/kitchen-overview.png",
        alt: "Modern kitchen with breakfast bar overlooking living area and ocean",
        width: 1200,
        height: 900,
      },
      {
        src: "/properties/oceanfront-apartment-tenerife/kitchen.png",
        alt: "Fully equipped white kitchen with marble backsplash and modern appliances",
        width: 1200,
        height: 900,
      },
      {
        src: "/properties/oceanfront-apartment-tenerife/bedroom.png",
        alt: "Comfortable bedroom with double bed and built-in wardrobe",
        width: 1200,
        height: 900,
      },
      {
        src: "/properties/oceanfront-apartment-tenerife/bathroom.png",
        alt: "Modern marble bathroom with walk-in rain shower and glass partition",
        width: 1200,
        height: 900,
      },
    ],
    pricing: {
      perNight: 95,
      perWeek: 595,
      perMonth: 1800,
      currency: "EUR",
    },
    contact: {
      phone: "+34644849648",
      whatsapp: "34644849648",
      email: "contact@tenerife-rentals.com",
    },
    bookings: [
      { startDate: "2026-04-15", endDate: "2026-04-21" },
    ],
    rating: 4.9,
    reviewCount: 47,
    available: true,
    featured: true,
  },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.featured);
}

export function getPropertiesByType(type: Property["type"]): Property[] {
  return properties.filter((p) => p.type === type);
}
