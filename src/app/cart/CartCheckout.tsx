"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

interface CartCheckoutProps {
  onBack: () => void;
  onSuccess?: () => void;
}

export default function CartCheckout({ onBack, onSuccess }: CartCheckoutProps) {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const orderItems = items.map((it) => ({
      productId: it.productId,
      productName: it.productName,
      quantity: it.quantity,
      price: it.price,
      size: it.size,
      color: it.color,
    }));
    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: orderItems,
        customerName: form.name,
        customerPhone: form.phone,
        customerEmail: form.email || undefined,
        address: form.address,
        notes: form.notes || undefined,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setSubmitting(false);
          return;
        }
        clearCart();
        onSuccess?.();
        router.push(`/payment?orderId=${data.id}&total=${data.total}`);
      })
      .catch(() => {
        setError("حدث خطأ. حاول مرة أخرى.");
        setSubmitting(false);
      });
  };

  return (
    <main className="max-w-md mx-auto px-5 md:px-8 py-10 md:py-16">
        <button
          type="button"
          onClick={onBack}
          className="text-sutra-charcoal/70 hover:text-sutra-gold text-sm mb-6"
        >
          ← العودة للسلة
        </button>
        <h1 className="font-display text-2xl font-semibold text-sutra-charcoal mb-6">
          بيانات التوصيل
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-sutra-charcoal/80 mb-1">الاسم *</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="input-sutra w-full border border-sutra-blush rounded-lg px-4 py-3 bg-sutra-pearl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-sutra-charcoal/80 mb-1">رقم الموبايل *</label>
            <input
              required
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="input-sutra w-full border border-sutra-blush rounded-lg px-4 py-3 bg-sutra-pearl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-sutra-charcoal/80 mb-1">البريد (اختياري)</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="input-sutra w-full border border-sutra-blush rounded-lg px-4 py-3 bg-sutra-pearl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-sutra-charcoal/80 mb-1">العنوان *</label>
            <textarea
              required
              rows={2}
              value={form.address}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
              className="input-sutra w-full border border-sutra-blush rounded-lg px-4 py-3 bg-sutra-pearl resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-sutra-charcoal/80 mb-1">ملاحظات (اختياري)</label>
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              className="input-sutra w-full border border-sutra-blush rounded-lg px-4 py-3 bg-sutra-pearl resize-none"
            />
          </div>
          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}
          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onBack}
              className="btn-secondary flex-1 py-3.5 rounded-sutra text-sutra-charcoal font-medium"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary flex-1 py-3.5 bg-sutra-charcoal text-sutra-cream rounded-sutra font-medium disabled:opacity-60"
            >
              {submitting ? "جاري الإرسال..." : "متابعة للدفع"}
            </button>
          </div>
        </form>
        <p className="mt-6 text-sm text-sutra-charcoal/60 text-center">
          الإجمالي: {new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP", minimumFractionDigits: 0 }).format(total)}
        </p>
      </main>
  );
}
