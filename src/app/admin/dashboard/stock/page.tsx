"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";

interface StockRow {
  productId: string;
  productName: string;
  quantity: number;
}

export default function AdminStockPage() {
  const [rows, setRows] = useState<StockRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const load = () => {
    setLoading(true);
    Promise.all([
      fetch("/api/admin/products").then((r) => r.json()),
      fetch("/api/admin/stock").then((r) => r.json()),
    ])
      .then(([products, stock]: [Product[], { productId: string; quantity: number }[]]) => {
        const productsList = Array.isArray(products) ? products : [];
        const stockMap = Array.isArray(stock)
          ? stock.reduce((acc, s) => {
              acc[s.productId] = s.quantity;
              return acc;
            }, {} as Record<string, number>)
          : {};
        setRows(
          productsList.map((p) => ({
            productId: p.id,
            productName: p.nameAr || p.name,
            quantity: stockMap[p.id] ?? 0,
          }))
        );
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleUpdate = (productId: string, newQty: number) => {
    setUpdating(productId);
    setMessage(null);
    fetch("/api/admin/stock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity: newQty }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setMessage({ type: "err", text: data.error });
        else {
          setMessage({ type: "ok", text: "تم تحديث الكمية." });
          setRows((prev) =>
            prev.map((r) => (r.productId === productId ? { ...r, quantity: newQty } : r))
          );
        }
      })
      .catch(() => setMessage({ type: "err", text: "حدث خطأ." }))
      .finally(() => setUpdating(null));
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-sutra-charcoal mb-2">
        المخزون
      </h1>
      <p className="text-sutra-charcoal/70 text-sm mb-6">
        هذا القسم يظهر لك فقط. أضف أو عدّل الكميات. الكمية تنقص تلقائياً عند كل طلب من العملاء.
      </p>

      {message && (
        <div
          className={`mb-4 p-3 rounded-xl text-sm ${message.type === "ok" ? "bg-green-100 text-green-800" : "bg-red-50 text-red-800"}`}
        >
          {message.text}
        </div>
      )}

      {loading ? (
        <p className="text-sutra-charcoal/70">جاري التحميل...</p>
      ) : rows.length === 0 ? (
        <p className="text-sutra-charcoal/70">لا توجد منتجات. أضف منتجات من قسم المنتجات أولاً.</p>
      ) : (
        <div className="bg-white rounded-2xl border border-sutra-blush/50 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-sutra-soft/50 border-b border-sutra-blush/50">
                <th className="text-right py-3 px-4 font-medium text-sutra-charcoal">المنتج</th>
                <th className="text-right py-3 px-4 font-medium text-sutra-charcoal">الكمية</th>
                <th className="text-right py-3 px-4 font-medium text-sutra-charcoal">تعديل</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <StockRowEdit
                  key={row.productId}
                  row={row}
                  onUpdate={handleUpdate}
                  updating={updating === row.productId}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StockRowEdit({
  row,
  onUpdate,
  updating,
}: {
  row: StockRow;
  onUpdate: (productId: string, quantity: number) => void;
  updating: boolean;
}) {
  const [qty, setQty] = useState(row.quantity);

  useEffect(() => {
    setQty(row.quantity);
  }, [row.quantity]);

  return (
    <tr className="border-b border-sutra-blush/30 last:border-0">
      <td className="py-3 px-4 text-sutra-charcoal">{row.productName}</td>
      <td className="py-3 px-4">
        <input
          type="number"
          min={0}
          value={qty}
          onChange={(e) => setQty(Number(e.target.value) || 0)}
          className="w-24 border border-sutra-blush rounded-lg px-3 py-1.5 bg-sutra-pearl text-right"
        />
      </td>
      <td className="py-3 px-4">
        <button
          type="button"
          disabled={updating}
          onClick={() => onUpdate(row.productId, qty)}
          className="px-3 py-1.5 text-sm bg-sutra-charcoal text-white rounded-lg hover:bg-sutra-gold disabled:opacity-60"
        >
          {updating ? "جاري..." : "حفظ"}
        </button>
      </td>
    </tr>
  );
}
