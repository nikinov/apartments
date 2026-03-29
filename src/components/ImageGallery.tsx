"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { PropertyImage } from "@/lib/types";

interface ImageGalleryProps {
  images: PropertyImage[];
  propertyTitle: string;
  dict?: {
    imageGalleryFor: string;
    previousImage: string;
    nextImage: string;
    imageThumbnails: string;
    viewImage: string;
  };
}

export default function ImageGallery({
  images,
  propertyTitle,
  dict,
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const selectedImage = images[selectedIndex];

  const handleThumbnailClick = useCallback(
    (index: number) => {
      if (index === selectedIndex) return;
      setIsTransitioning(true);
      // Allow fade-out to start, then swap image
      setTimeout(() => {
        setSelectedIndex(index);
        setIsTransitioning(false);
      }, 200);
    },
    [selectedIndex]
  );

  const handlePrevious = useCallback(() => {
    const newIndex =
      selectedIndex === 0 ? images.length - 1 : selectedIndex - 1;
    handleThumbnailClick(newIndex);
  }, [selectedIndex, images.length, handleThumbnailClick]);

  const handleNext = useCallback(() => {
    const newIndex =
      selectedIndex === images.length - 1 ? 0 : selectedIndex + 1;
    handleThumbnailClick(newIndex);
  }, [selectedIndex, images.length, handleThumbnailClick]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    },
    [handlePrevious, handleNext]
  );

  if (!images.length) return null;

  return (
    <div className="w-full" role="region" aria-label={dict ? dict.imageGalleryFor.replace("{title}", propertyTitle) : `Image gallery for ${propertyTitle}`}>
      {/* Main Image */}
      <div
        className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 mb-3 group"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="img"
        aria-label={selectedImage.alt}
      >
        <Image
          src={selectedImage.src}
          alt={selectedImage.alt}
          fill
          className={`object-cover transition-opacity duration-300 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
          priority={selectedIndex === 0}
          quality={90}
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/80 text-gray-800 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 backdrop-blur-sm"
              aria-label={dict?.previousImage ?? "Previous image"}
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/80 text-gray-800 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 backdrop-blur-sm"
              aria-label={dict?.nextImage ?? "Next image"}
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-3 right-3 rounded-full px-3 py-1 text-xs font-medium text-white bg-black/50 backdrop-blur-sm">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div
          className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin"
          role="tablist"
          aria-label={dict?.imageThumbnails ?? "Image thumbnails"}
        >
          {images.map((image, index) => (
            <button
              key={image.src}
              onClick={() => handleThumbnailClick(index)}
              role="tab"
              aria-selected={index === selectedIndex}
              aria-label={dict ? dict.viewImage.replace("{alt}", image.alt) : `View ${image.alt}`}
              className={`relative shrink-0 w-20 h-16 sm:w-24 rounded-lg overflow-hidden transition-all duration-300 ${
                index === selectedIndex
                  ? "ring-2 opacity-100 scale-100"
                  : "ring-1 ring-gray-200 opacity-60 hover:opacity-100 hover:ring-gray-400"
              }`}
              style={
                index === selectedIndex
                  ? { ["--tw-ring-color" as string]: "var(--color-gold)" }
                  : undefined
              }
            >
              <Image
                src={image.src}
                alt=""
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
