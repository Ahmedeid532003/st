"use client";

import Link from "next/link";
import Header from "@/components/Header";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-sutra-charcoal/70 mb-4">حدث خطأ أثناء تحميل المنتج.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            type="button"
            onClick={reset}
            className="px-4 py-2 bg-sutra-charcoal text-sutra-cream rounded-xl font-medium hover:bg-sutra-gold transition-colors"
          >
            إعادة المحاولة
          </button>
          <Link
            href="/"
            className="px-4 py-2 border border-sutra-blush rounded-xl text-sutra-charcoal hover:bg-sutra-soft transition-colors inline-block"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </>
  );
}
