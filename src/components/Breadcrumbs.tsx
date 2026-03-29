import JsonLd from "@/components/JsonLd";
import { generateBreadcrumbJsonLd } from "@/lib/seo";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  ariaLabel?: string;
}

export default function Breadcrumbs({ items, ariaLabel }: BreadcrumbsProps) {
  const jsonLdItems = items.map((item) => ({
    name: item.label,
    url: item.href,
  }));

  return (
    <nav aria-label={ariaLabel ?? "Breadcrumb"} className="py-3">
      <JsonLd data={generateBreadcrumbJsonLd(jsonLdItems)} />
      <ol
        className="flex items-center gap-1.5 text-sm text-neutral-500"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={item.href}
              className="flex items-center gap-1.5"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {index > 0 && (
                <span className="text-neutral-300 select-none" aria-hidden="true">
                  /
                </span>
              )}
              {isLast ? (
                <span
                  className="text-neutral-800 font-medium"
                  itemProp="name"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-neutral-800"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
