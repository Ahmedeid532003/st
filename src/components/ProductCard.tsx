"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  /** اسم القسم يظهر تحت البطاقة إن وُجد */
  sectionName?: string;
}

export default function ProductCard({ product, priority, sectionName }: ProductCardProps) {
  const imageUrl = product.images?.[0];
  const title = product.nameAr || product.name;
  const priceFormatted = new Intl.NumberFormat("ar-EG", {
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 0,
  }).format(product.price);
  const originalPriceFormatted = product.originalPrice != null
    ? new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP", minimumFractionDigits: 0 }).format(product.originalPrice)
    : null;
  const hasImage = imageUrl && (imageUrl.startsWith("http") || imageUrl.startsWith("/") || imageUrl.startsWith("data:"));

  return (
    <Link href={`/product/${product.id}`} prefetch={false} className="block group">
      <article className="product-card overflow-hidden bg-white border-2 border-sutra-blush/50 shadow-[0_8px_30px_rgba(92,74,74,0.08)]">
        <div className="aspect-[3/4] relative bg-sutra-soft overflow-hidden">
          {hasImage ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 33vw"
              unoptimized
              priority={priority}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sutra-rose/35 font-display text-4xl">
              SUTRA
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-sutra-charcoal/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0">
            <span className="inline-block px-6 py-3 bg-white/98 text-sutra-charcoal text-sm font-semibold rounded-full shadow-lg backdrop-blur-sm border border-sutra-blush/50">
              عرض المنتج
            </span>
          </div>
        </div>
        <div className="p-6 md:p-7">
          <p className="text-[11px] text-sutra-rose uppercase tracking-[0.2em] mb-2 font-medium">
            {product.categoryAr || product.category}
          </p>
          <h3 className="font-display text-xl md:text-2xl font-semibold text-sutra-charcoal mb-3 line-clamp-2 leading-tight">
            {title}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            {originalPriceFormatted && (
              <span className="text-sutra-charcoal/60 text-base line-through">{originalPriceFormatted}</span>
            )}
            <span className="text-sutra-gold font-semibold text-lg">{priceFormatted}</span>
          </div>
          {sectionName && (
            <p className="mt-2 text-xs text-sutra-charcoal/60 uppercase tracking-wider">{sectionName}</p>
          )}
        </div>
      </article>
    </Link>
  );
}
