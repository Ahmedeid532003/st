"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import CartCheckout from "./CartCheckout";

export default function CartPage() {
  const { items, count, total, removeFromCart, updateQty } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (showCheckout) {
    return (
      <>
        <Header />
        <CartCheckout
          onBack={() => setShowCheckout(false)}
          onSuccess={() => setShowCheckout(false)}
        />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-5 md:px-8 py-10 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-sutra-charcoal">
            سلة المشتريات
          </h1>
          {count > 0 && (
            <p className="text-sutra-charcoal/70 text-sm">
              {count} {count === 1 ? "قطعة" : "قطعة"}
            </p>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 rounded-sutra-lg border border-sutra-blush bg-white/60">
            <p className="font-display text-xl text-sutra-charcoal/80 mb-4">
              السلة فارغة
            </p>
            <Link
              href="/#products"
              className="inline-block px-6 py-3 bg-sutra-charcoal text-sutra-cream rounded-sutra font-medium hover:bg-sutra-gold transition-colors"
            >
              تصفح المنتجات
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <ul className="space-y-4">
              {items.map((item, index) => (
                <li
                  key={`${item.productId}-${index}-${item.size ?? ""}-${item.color ?? ""}`}
                  className="flex gap-4 p-4 rounded-sutra-lg border border-sutra-blush bg-white"
                >
                  <div className="relative w-24 h-28 rounded-sutra overflow-hidden bg-sutra-soft flex-shrink-0">
                    {item.image && (item.image.startsWith("http") || item.image.startsWith("/") || item.image.startsWith("data:")) ? (
                      <Image
                        src={item.image}
                        alt={item.productName}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sutra-rose/40 font-display text-2xl">
                        SUTRA
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg font-semibold text-sutra-charcoal truncate">
                      {item.productName}
                    </h3>
                    {(item.size || item.color) && (
                      <p className="text-sm text-sutra-charcoal/70 mt-0.5">
                        {[item.size, item.color].filter(Boolean).join(" / ")}
                      </p>
                    )}
                    <p className="text-sutra-gold font-semibold mt-1">
                      {new Intl.NumberFormat("ar-EG", {
                        style: "currency",
                        currency: "EGP",
                        minimumFractionDigits: 0,
                      }).format(item.price * item.quantity)}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-sutra-blush rounded-sutra overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQty(index, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center text-sutra-charcoal hover:bg-sutra-soft"
                        >
                          −
                        </button>
                        <span className="w-10 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(index, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-sutra-charcoal hover:bg-sutra-soft"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(index)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-sutra-blush">
              <p className="text-lg font-semibold text-sutra-charcoal">
                الإجمالي:{" "}
                <span className="text-sutra-gold">
                  {new Intl.NumberFormat("ar-EG", {
                    style: "currency",
                    currency: "EGP",
                    minimumFractionDigits: 0,
                  }).format(total)}
                </span>
              </p>
              <button
                type="button"
                onClick={() => setShowCheckout(true)}
                className="btn-primary px-8 py-3 bg-sutra-charcoal text-sutra-cream rounded-sutra font-medium hover:bg-sutra-gold"
              >
                إتمام الطلب والدفع
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
