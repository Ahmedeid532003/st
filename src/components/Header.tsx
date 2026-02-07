"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/sutrastore_eg?igsh=Z2Vxdjl3OXV0eDlo", label: "إنستغرام", icon: "instagram" },
  { href: "https://www.facebook.com/share/17UGzfQedG/?mibextid=wwXIfr", label: "فيسبوك", icon: "facebook" },
  { href: "https://www.tiktok.com/@sutrastore_eg?_r=1&_t=ZS-93h776wNSLa", label: "تيك توك", icon: "tiktok" },
  { href: "https://wa.me/201553888323", label: "واتساب", icon: "whatsapp" },
] as const;

function SocialIcon({ icon, className }: { icon: string; className?: string }) {
  const c = className ?? "w-5 h-5";
  if (icon === "instagram")
    return (
      <svg className={c} fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
    );
  if (icon === "facebook")
    return (
      <svg className={c} fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
    );
  if (icon === "tiktok")
    return (
      <svg className={c} fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" /></svg>
    );
  if (icon === "whatsapp")
    return (
      <svg className={c} fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
    );
  return null;
}

export default function Header() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-50 bg-sutra-pearl/98 backdrop-blur-md border-b border-sutra-blush/60 shadow-sutra">
      <div className="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-20">
        <Link
          href="/"
          className="font-display text-2xl md:text-3xl font-bold text-sutra-charcoal tracking-wide hover:text-sutra-gold transition-colors duration-300"
          style={{ textShadow: "0 2px 4px rgba(92,74,74,0.15)" }}
        >
          SUTRA
        </Link>
        <nav className="flex items-center gap-4 md:gap-6">
          <Link
            href="/cart"
            className="relative p-2 rounded-full text-sutra-charcoal/85 hover:text-sutra-gold hover:bg-sutra-blush/50 transition-colors"
            aria-label="سلة المشتريات"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-0.5 -left-0.5 min-w-[1.25rem] h-5 px-1 flex items-center justify-center text-xs font-medium bg-sutra-gold text-white rounded-full">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </Link>
          <Link
            href="/my-orders"
            className="text-sutra-charcoal/85 hover:text-sutra-gold font-medium text-sm hidden sm:inline"
          >
            طلباتي
          </Link>
          <div className="hidden sm:flex items-center gap-3">
            {SOCIAL_LINKS.map(({ href, label, icon }) => (
              <a
                key={icon}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-sutra-charcoal/70 hover:text-sutra-gold hover:bg-sutra-blush/50 transition-colors"
                aria-label={label}
              >
                <SocialIcon icon={icon} />
              </a>
            ))}
          </div>
          <Link
            href="/"
            className="text-sutra-charcoal/85 hover:text-sutra-gold font-medium text-[15px] transition-colors duration-200 relative after:absolute after:bottom-[-2px] after:right-0 after:w-0 after:h-[1.5px] after:bg-sutra-gold after:transition-all after:duration-300 hover:after:w-full"
          >
            الرئيسية
          </Link>
          <Link
            href="/#products"
            className="text-sutra-charcoal/85 hover:text-sutra-gold font-medium text-[15px] transition-colors duration-200 relative after:absolute after:bottom-[-2px] after:right-0 after:w-0 after:h-[1.5px] after:bg-sutra-gold after:transition-all after:duration-300 hover:after:w-full"
          >
            المنتجات
          </Link>
          <Link
            href="/admin"
            className="text-sutra-charcoal/60 hover:text-sutra-gold text-sm transition-colors duration-200"
          >
            لوحة الأدمن
          </Link>
        </nav>
      </div>
    </header>
  );
}
