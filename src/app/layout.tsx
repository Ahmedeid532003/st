import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "SUTRA | ملابس حريمى أنيقة",
  description: "SUTRA - تشكيلة مختارة من الملابس الحريمى الأنيقة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased min-h-screen bg-sutra-pearl text-sutra-charcoal">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
