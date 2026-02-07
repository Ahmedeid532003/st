"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import type { Product, Section } from "@/lib/types";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const [productsRes, sectionsRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/sections"),
        ]);
        const productsData = productsRes.ok ? await productsRes.json().catch(() => []) : [];
        const sectionsData = sectionsRes.ok ? await sectionsRes.json().catch(() => []) : [];
        if (!cancelled) {
          setProducts(Array.isArray(productsData) ? productsData : []);
          setSections(Array.isArray(sectionsData) ? sectionsData : []);
        }
      } catch {
        if (!cancelled) {
          setProducts([]);
          setSections([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const productsBySection = sections.length > 0
    ? sections.map((sec) => ({
        section: sec,
        products: products.filter((p) => p.sectionId === sec.id),
      })).filter((g) => g.products.length > 0)
    : [];
  const productsWithoutSection = products.filter((p) => !p.sectionId);

  return (
    <>
      <Header />
      <main>
        <section className="relative py-28 md:py-44 px-5 md:px-8 overflow-hidden min-h-[70vh] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-sutra-blush/60 via-sutra-cream/80 to-sutra-pearl" />
          <div className="absolute inset-0 bg-gradient-to-t from-sutra-pearl/90 via-transparent to-sutra-blush/30" />
          <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235C4A4A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
          <div className="max-w-4xl mx-auto relative text-center">
            <p className="text-sutra-rose text-xs uppercase tracking-[0.4em] mb-6 font-semibold animate-fade-in-up opacity-90">
              ملابس حريمى
            </p>
            <div className="sutra-line mx-auto mb-8 animate-fade-in-up opacity-0 animate-fade-in-up-delay-1 [animation-fill-mode:forwards]" style={{ width: "56px", height: "3px" }} />
            <div className="sutra-hero-3d sutra-hero-3d-visible mb-8 inline-block px-2">
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tight select-none" style={{ color: "#4a3c3c" }}>
                SUTRA
              </h1>
            </div>
            <p className="text-sutra-charcoal/75 text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed animate-fade-in-up opacity-0 animate-fade-in-up-delay-3 [animation-fill-mode:forwards]">
              تشكيلة مختارة من المستلزمات الحريمى الأنيقة — أناقة وراحة
            </p>
          </div>
        </section>

        <section id="products" className="py-24 md:py-32 px-5 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 md:mb-24">
              <div className="sutra-line mx-auto mb-5" style={{ width: "48px", height: "2px" }} />
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-sutra-charcoal mb-4 tracking-tight">
                المنتجات
              </h2>
              <p className="text-sutra-charcoal/65 text-base md:text-lg max-w-md mx-auto leading-relaxed">
                تشكيلتنا المختارة لك
              </p>
            </div>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-sutra-lg bg-sutra-soft/60 aspect-[3/4] animate-pulse"
                  />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-28 px-8 bg-white/80 rounded-2xl border-2 border-sutra-blush/50 shadow-[0_8px_32px_rgba(92,74,74,0.06)]">
                <p className="font-display text-2xl md:text-3xl text-sutra-charcoal/85">لا توجد منتجات حالياً.</p>
                <p className="mt-4 text-sutra-charcoal/65">تابعينا قريباً.</p>
              </div>
            ) : sections.length > 0 ? (
              <div className="space-y-16">
                {productsBySection.map(({ section, products: secProducts }) => (
                  <div key={section.id} className="scroll-mt-24">
                    <div className="flex items-center gap-5 mb-8">
                      <div className="sutra-line flex-shrink-0" style={{ width: "56px", height: "3px" }} />
                      <h3 className="font-display text-2xl md:text-4xl font-semibold text-sutra-charcoal tracking-tight">
                        {section.nameAr || section.name}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                      {secProducts.map((product, index) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          priority={index === 0}
                          sectionName={section.nameAr || section.name}
                        />
                      ))}
                    </div>
                  </div>
                ))}
                {productsWithoutSection.length > 0 && (
                  <div className="scroll-mt-24">
                    <div className="flex items-center gap-5 mb-8">
                      <div className="sutra-line flex-shrink-0" style={{ width: "56px", height: "3px" }} />
                      <h3 className="font-display text-2xl md:text-4xl font-semibold text-sutra-charcoal tracking-tight">
                        أخرى
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                      {productsWithoutSection.map((product, index) => (
                        <ProductCard key={product.id} product={product} priority={index === 0} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {products.map((product, index) => (
                  <ProductCard key={product.id} product={product} priority={index === 0} />
                ))}
              </div>
            )}
          </div>
        </section>

        <footer className="border-t border-sutra-blush/80 py-14 md:py-16 px-5 md:px-8 mt-24 bg-gradient-to-b from-white/70 to-sutra-pearl">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            <div>
              <p className="font-display text-2xl md:text-3xl text-sutra-charcoal font-semibold tracking-wide" style={{ textShadow: "0 2px 4px rgba(92,74,74,0.12)" }}>
                SUTRA
              </p>
              <p className="text-sutra-charcoal/65 text-sm md:text-base mt-2">
                ملابس حريمى أنيقة
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://wa.me/201553888323" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-full bg-sutra-blush/90 text-sutra-charcoal hover:bg-sutra-gold hover:text-white hover:scale-110 transition-all duration-300" aria-label="واتساب">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </a>
              <a href="https://www.instagram.com/sutrastore_eg?igsh=Z2Vxdjl3OXV0eDlo" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-full bg-sutra-blush/90 text-sutra-charcoal hover:bg-sutra-gold hover:text-white hover:scale-110 transition-all duration-300" aria-label="انستغرام">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.facebook.com/share/17UGzfQedG/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-full bg-sutra-blush/90 text-sutra-charcoal hover:bg-sutra-gold hover:text-white hover:scale-110 transition-all duration-300" aria-label="فيسبوك">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@sutrastore_eg?_r=1&_t=ZS-93h776wNSLa" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-full bg-sutra-blush/90 text-sutra-charcoal hover:bg-sutra-gold hover:text-white hover:scale-110 transition-all duration-300" aria-label="تيك توك">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
