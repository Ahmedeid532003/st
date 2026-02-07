import { NextRequest, NextResponse } from "next/server";
import { getProductById, getStockForProduct } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    let id: string | undefined;
    try {
      const params = context.params;
      id = typeof (params as Promise<{ id: string }>).then === "function"
        ? (await (params as Promise<{ id: string }>)).id
        : (params as { id: string }).id;
    } catch (_) {
      id = undefined;
    }
    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "معرف المنتج مطلوب" }, { status: 400 });
    }
    const product = await getProductById(id);
    if (!product) {
      return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
    }
    const quantity = await getStockForProduct(id);
    const payload = {
      id: product.id,
      name: product.name,
      nameAr: product.nameAr,
      description: product.description,
      descriptionAr: product.descriptionAr,
      price: Number(product.price),
      originalPrice: product.originalPrice != null ? Number(product.originalPrice) : undefined,
      category: product.category,
      categoryAr: product.categoryAr,
      images: Array.isArray(product.images) ? product.images : [],
      sizes: product.sizes,
      colors: product.colors,
      createdAt: product.createdAt,
      isActive: product.isActive,
      quantity: Number(quantity) || 0,
    };
    return NextResponse.json(payload);
  } catch (e) {
    console.error("API products [id] error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "فشل جلب المنتج" },
      { status: 500 }
    );
  }
}
