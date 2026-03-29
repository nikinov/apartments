import Image from "next/image";
import Link from "next/link";
import { Property } from "@/lib/types";

interface PropertyCardProps {
  property: Property;
  locale: string;
  dict: {
    property: {
      perNight: string;
      perWeek: string;
      apartment: string;
      house: string;
      villa: string;
      reviews: string;
    };
  };
}

export default function PropertyCard({ property, locale, dict }: PropertyCardProps) {
  const {
    slug,
    title,
    shortDescription,
    type,
    location,
    details,
    images,
    pricing,
    rating,
    reviewCount,
  } = property;

  const mainImage = images[0];

  const typeLabels: Record<string, string> = {
    apartment: dict.property.apartment,
    house: dict.property.house,
    villa: dict.property.villa,
  };
  const typeLabel = typeLabels[type] || type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <Link
      href={`/${locale}/properties/${slug}`}
      className="group block rounded-2xl overflow-hidden bg-white shadow-md shadow-black/5 transition-all duration-500 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={mainImage.src}
          alt={mainImage.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Property Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm" style={{ backgroundColor: "rgba(12, 27, 51, 0.8)" }}>
            {typeLabel}
          </span>
        </div>

        {/* Rating Badge */}
        {rating && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white bg-black/50 backdrop-blur-sm">
              {/* Star icon */}
              <svg
                className="h-3.5 w-3.5 text-yellow-400"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {rating}
              {reviewCount && (
                <span className="text-white/70">({reviewCount} {dict.property.reviews})</span>
              )}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>
            {location.city}, {location.region}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
          {shortDescription}
        </p>

        {/* Details Row */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-5 pb-5 border-b border-gray-100">
          {/* Bedrooms */}
          <div className="flex items-center gap-1.5">
            <svg
              className="h-4 w-4 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2 4v16" />
              <path d="M2 8h18a2 2 0 0 1 2 2v10" />
              <path d="M2 17h20" />
              <path d="M6 8v9" />
            </svg>
            <span>{details.bedrooms}</span>
          </div>

          {/* Bathrooms */}
          <div className="flex items-center gap-1.5">
            <svg
              className="h-4 w-4 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
              <line x1="10" x2="8" y1="5" y2="7" />
              <line x1="2" x2="22" y1="12" y2="12" />
              <line x1="7" x2="7" y1="19" y2="21" />
              <line x1="17" x2="17" y1="19" y2="21" />
            </svg>
            <span>{details.bathrooms}</span>
          </div>

          {/* Area */}
          <div className="flex items-center gap-1.5">
            <svg
              className="h-4 w-4 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 3H3v18h18V3z" />
              <path d="M21 9H3" />
              <path d="M21 15H3" />
              <path d="M9 3v18" />
              <path d="M15 3v18" />
            </svg>
            <span>
              {details.area}{details.areaUnit}
            </span>
          </div>

          {/* Guests */}
          <div className="flex items-center gap-1.5">
            <svg
              className="h-4 w-4 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>{details.maxGuests}</span>
          </div>
        </div>

        {/* Price Row */}
        <div className="flex items-end justify-between">
          <div>
            <span className="text-2xl font-bold" style={{ color: "var(--color-navy)" }}>
              &euro;{pricing.perNight}
            </span>
            <span className="text-sm text-gray-500 ml-1">{dict.property.perNight}</span>
          </div>
          {pricing.perWeek && (
            <div className="text-right">
              <span className="text-sm font-medium text-gray-600">
                &euro;{pricing.perWeek}
              </span>
              <span className="text-xs text-gray-400 ml-1">{dict.property.perWeek}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
