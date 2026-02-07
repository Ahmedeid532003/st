"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboardHome() {
  const [counts, setCounts] = useState({ products: 0, orders: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/products").then((r) => r.json()),
      fetch("/api/admin/orders").then((r) => r.json()),
    ]).then(([products, orders]) => {
      setCounts({
        products: Array.isArray(products) ? products.length : 0,
        orders: Array.isArray(orders) ? orders.length : 0,
      });
    });
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-sutra-charcoal mb-6">
        لوحة التحكم
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/dashboard/products"
          className="block p-6 bg-white rounded-2xl border border-sutra-blush/50 hover:border-sutra-gold/50 transition-colors"
        >
          <p className="text-sutra-charcoal/70 text-sm">المنتجات</p>
          <p className="font-display text-3xl font-semibold text-sutra-charcoal mt-1">
            {counts.products}
          </p>
        </Link>
        <Link
          href="/admin/dashboard/orders"
          className="block p-6 bg-white rounded-2xl border border-sutra-blush/50 hover:border-sutra-gold/50 transition-colors"
        >
          <p className="text-sutra-charcoal/70 text-sm">الطلبات</p>
          <p className="font-display text-3xl font-semibold text-sutra-charcoal mt-1">
            {counts.orders}
          </p>
        </Link>
      </div>
      <p className="mt-6 text-sutra-charcoal/70 text-sm">
        من قسم <Link href="/admin/dashboard/stock" className="text-sutra-gold hover:underline">المخزون</Link> يمكنك إضافة الكميات وتعديلها. المخزون يظهر لك فقط ولا يظهر للعملاء، ويقل تلقائياً عند كل طلب.
      </p>
    </div>
  );
}
