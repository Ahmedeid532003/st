"use client";

import { useState } from "react";
import Header from "@/components/Header";
import type { Order } from "@/lib/types";

const STATUS_LABELS: Record<Order["status"], string> = {
  pending: "قيد الانتظار",
  confirmed: "تم التأكيد",
  shipped: "تم الشحن",
  delivered: "تم التوصيل",
};

const PAYMENT_STATUS_LABELS: Record<NonNullable<Order["paymentStatus"]>, string> = {
  pending: "جاري تأكيد الدفع",
  confirmed: "تم تأكيد الدفع",
  rejected: "تم رفض الطلب",
};

export default function MyOrdersPage() {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setLoading(true);
    setError(null);
    setOrders(null);
    fetch(`/api/orders?phone=${encodeURIComponent(phone.trim())}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setOrders([]);
        } else {
          setOrders(Array.isArray(data) ? data : []);
        }
      })
      .catch(() => {
        setError("حدث خطأ. حاول مرة أخرى.");
        setOrders([]);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-5 md:px-8 py-10 md:py-16">
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-sutra-charcoal mb-2">
          طلباتي
        </h1>
        <p className="text-sutra-charcoal/70 text-sm mb-8">
          أدخل رقم الموبايل الذي استخدمته عند الطلب لعرض الطلبات وحالتها.
        </p>

        <form onSubmit={handleSearch} className="flex gap-3 mb-10">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="رقم الموبايل"
            className="input-sutra flex-1 border border-sutra-blush rounded-sutra px-4 py-3 bg-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-sutra-charcoal text-sutra-cream rounded-sutra font-medium hover:bg-sutra-gold disabled:opacity-60"
          >
            {loading ? "جاري البحث..." : "عرض الطلبات"}
          </button>
        </form>

        {error && (
          <div className="mb-6 p-4 rounded-sutra bg-red-50 text-red-800 text-sm border border-red-200">
            {error}
          </div>
        )}

        {orders !== null && orders.length === 0 && !error && (
          <div className="text-center py-12 rounded-sutra-lg border border-sutra-blush bg-white/60">
            <p className="font-display text-lg text-sutra-charcoal/80">
              لا توجد طلبات لهذا الرقم.
            </p>
          </div>
        )}

        {orders !== null && orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-5 rounded-sutra-lg border border-sutra-blush bg-white"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-xs text-sutra-charcoal/60 font-mono">
                    #{order.id.slice(0, 8)}
                  </span>
                  <div className="flex items-center gap-2">
                    {order.paymentStatus && (
                      <span
                        className={`text-sm font-medium px-3 py-1 rounded-full ${
                          order.paymentStatus === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : order.paymentStatus === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {PAYMENT_STATUS_LABELS[order.paymentStatus]}
                      </span>
                    )}
                    <span
                      className={`text-sm font-medium px-3 py-1 rounded-full ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "shipped"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "confirmed"
                              ? "bg-sutra-blush/80 text-sutra-charcoal"
                              : "bg-sutra-soft text-sutra-charcoal/80"
                      }`}
                    >
                      {STATUS_LABELS[order.status]}
                    </span>
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  {order.items.map((item, i) => (
                    <li key={i} className="flex justify-between text-sm">
                      <span className="text-sutra-charcoal">
                        {item.productName}
                        {(item.size || item.color) && (
                          <span className="text-sutra-charcoal/60 mr-1">
                            ({[item.size, item.color].filter(Boolean).join(" / ")})
                          </span>
                        )}
                        <span className="text-sutra-charcoal/60"> × {item.quantity}</span>
                      </span>
                      <span className="text-sutra-gold font-medium">
                        {new Intl.NumberFormat("ar-EG", {
                          style: "currency",
                          currency: "EGP",
                          minimumFractionDigits: 0,
                        }).format(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center pt-3 border-t border-sutra-blush">
                  <span className="text-xs text-sutra-charcoal/50">
                    {new Date(order.createdAt).toLocaleDateString("ar-EG", {
                      dateStyle: "medium",
                    })}
                  </span>
                  <span className="font-semibold text-sutra-charcoal">
                    الإجمالي:{" "}
                    {new Intl.NumberFormat("ar-EG", {
                      style: "currency",
                      currency: "EGP",
                      minimumFractionDigits: 0,
                    }).format(order.total)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
