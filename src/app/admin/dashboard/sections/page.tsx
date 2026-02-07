"use client";

import { useEffect, useState } from "react";
import type { Section } from "@/lib/types";

export default function AdminSectionsPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [form, setForm] = useState({ name: "", nameAr: "", order: "0" });

  const load = () => {
    fetch("/api/admin/sections")
      .then((r) => r.json())
      .then((data) => setSections(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    const url = editingSection ? `/api/admin/sections/${editingSection.id}` : "/api/admin/sections";
    const method = editingSection ? "PATCH" : "POST";
    const body = editingSection
      ? { name: form.name.trim(), nameAr: form.nameAr.trim() || undefined, order: Number(form.order) ?? 0 }
      : { name: form.name.trim(), nameAr: form.nameAr.trim() || undefined, order: Number(form.order) ?? 0 };
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setMessage({ type: "err", text: data.error });
        } else {
          setMessage({ type: "ok", text: editingSection ? "تم تحديث القسم." : "تمت إضافة القسم." });
          setShowForm(false);
          setEditingSection(null);
          setForm({ name: "", nameAr: "", order: "0" });
          load();
        }
      })
      .catch(() => setMessage({ type: "err", text: "حدث خطأ." }))
      .finally(() => setSaving(false));
  };

  const handleEdit = (s: Section) => {
    setEditingSection(s);
    setForm({ name: s.name, nameAr: s.nameAr || "", order: String(s.order ?? 0) });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm("حذف هذا القسم؟ المنتجات المرتبطة ستبقى بدون قسم.")) return;
    fetch(`/api/admin/sections/${id}`, { method: "DELETE" })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setMessage({ type: "err", text: data.error });
        else {
          setMessage({ type: "ok", text: "تم حذف القسم." });
          load();
        }
      })
      .catch(() => setMessage({ type: "err", text: "حدث خطأ." }));
  };

  if (loading) {
    return <p className="text-sutra-charcoal/70">جاري التحميل...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl font-semibold text-sutra-charcoal">الأقسام</h1>
        <button
          type="button"
          onClick={() => {
            setEditingSection(null);
            setForm({ name: "", nameAr: "", order: String(sections.length) });
            setShowForm(true);
          }}
          className="px-4 py-2 bg-sutra-charcoal text-white rounded-xl text-sm font-medium hover:bg-sutra-charcoal/90"
        >
          إضافة قسم
        </button>
      </div>
      {message && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm ${message.type === "ok" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
        >
          {message.text}
        </div>
      )}
      <p className="text-sutra-charcoal/70 text-sm mb-6">
        الأقسام اختيارية — يمكنك إنشاء أقسام (مثل: فساتين، بلوزات) وعرض المنتجات تحتها في الموقع.
      </p>
      {sections.length === 0 && !showForm ? (
        <p className="text-sutra-charcoal/60">لا توجد أقسام. اضف قسماً ثم اربط المنتجات به من صفحة المنتجات.</p>
      ) : (
        <ul className="space-y-3">
          {sections.map((s) => (
            <li
              key={s.id}
              className="flex items-center justify-between p-4 rounded-xl border border-sutra-blush bg-white"
            >
              <div>
                <span className="font-medium text-sutra-charcoal">{s.nameAr || s.name}</span>
                {s.nameAr && s.name !== s.nameAr && (
                  <span className="text-sutra-charcoal/60 text-sm mr-2">({s.name})</span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(s)}
                  className="px-3 py-1.5 text-sm border border-sutra-blush rounded-lg hover:bg-sutra-soft"
                >
                  تعديل
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(s.id)}
                  className="px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
                >
                  حذف
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-sutra-charcoal/50 backdrop-blur-md">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 border border-sutra-blush/50">
            <h2 className="font-display text-lg font-semibold text-sutra-charcoal mb-4">
              {editingSection ? "تعديل القسم" : "قسم جديد"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-sutra-charcoal/80 mb-1">اسم القسم (إنجليزي) *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full border border-sutra-blush rounded-lg px-3 py-2 bg-sutra-pearl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-sutra-charcoal/80 mb-1">اسم القسم (عربي)</label>
                <input
                  value={form.nameAr}
                  onChange={(e) => setForm((f) => ({ ...f, nameAr: e.target.value }))}
                  placeholder="مثل: فساتين"
                  className="w-full border border-sutra-blush rounded-lg px-3 py-2 bg-sutra-pearl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-sutra-charcoal/80 mb-1">ترتيب العرض</label>
                <input
                  type="number"
                  min={0}
                  value={form.order}
                  onChange={(e) => setForm((f) => ({ ...f, order: e.target.value }))}
                  className="w-full border border-sutra-blush rounded-lg px-3 py-2 bg-sutra-pearl"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditingSection(null); }}
                  className="px-4 py-2 border border-sutra-blush rounded-xl hover:bg-sutra-soft"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-sutra-charcoal text-white rounded-xl font-medium disabled:opacity-60"
                >
                  {saving ? "جاري الحفظ..." : "حفظ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
