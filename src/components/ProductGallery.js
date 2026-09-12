"use client";

import { useState } from "react";
import Image from "next/image";

/*
  The image panel on a product page: one large photo and a row of thumbnails
  under it when the product has more than one.

  The photography is cut out against a plain background, so the image sits
  inside a tinted panel with generous padding rather than filling the frame.

  `tone` is which background the gallery is sitting on, not a new design: the
  panel and the thumbnails need lighter borders on the dark product hero than
  they do on a white page, and that is the whole difference.
*/
export default function ProductGallery({ productName, images, tone = "light" }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  const isDark = tone === "dark";
  const panelClasses = isDark
    ? "border-white/10 bg-white/4"
    : "border-line bg-surface";

  return (
    <div>
      <div
        className={`relative aspect-square overflow-hidden rounded-2xl border ${panelClasses}`}
      >
        <Image
          src={activeImage}
          alt={productName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-10 md:p-14"
        />
      </div>

      {images.length > 1 ? (
        <div className="mt-4 flex flex-wrap gap-3">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveImage(image)}
              aria-label={`Show image ${index + 1} of ${productName}`}
              aria-current={image === activeImage}
              className={`relative h-20 w-20 overflow-hidden rounded-lg border transition-colors ${
                isDark
                  ? `bg-white/4 ${
                      image === activeImage
                        ? "border-white/60"
                        : "border-white/10 hover:border-white/40"
                    }`
                  : `bg-surface ${
                      image === activeImage
                        ? "border-ink"
                        : "border-line hover:border-muted"
                    }`
              }`}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="80px"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
