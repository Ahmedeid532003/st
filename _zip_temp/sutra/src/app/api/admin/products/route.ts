import { NextRequest, NextResponse } from "next/server";
import { getProductsAdmin, addProduct } from "@/lib/db";
import type { Product } from "@/lib/types";

export async function GET() {
  try {
    const products = await getProductsAdmin();
    return NextResponse.json(products);
  } catch (e) {
    return NextResponse.json({ error: "فشل جلب المنتجات" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      nameAr,
      description,
      descriptionAr,
      price,
      originalPrice,
      category,
      categoryAr,
      images,
      sizes,
      colors,
      variants,
      sectionId,
      initialStock,
    } = body;
    if (!name?.trim() || !Array.isArray(images)) {
      return NextResponse.json(
        { error: "الاسم والصور مطلوبة" },
        { status: 400 }
      );
    }
    const product: Omit<Product, "id" | "createdAt"> = {
      name: name.trim(),
      nameAr: nameAr?.trim(),
      description: description?.trim() ?? "",
      descriptionAr: descriptionAr?.trim(),
      price: price != null && price !== "" ? Number(price) : 0,
      originalPrice: originalPrice != null && originalPrice !== "" ? Number(originalPrice) : undefined,
      category: category?.trim() ?? "عام",
      categoryAr: categoryAr?.trim(),
      images: Array.isArray(images) ? images : [],
      sizes: Array.isArray(sizes) ? sizes : undefined,
      colors: Array.isArray(colors) ? colors : undefined,
      variants: Array.isArray(variants) && variants.length > 0 ? variants : undefined,
      sectionId: sectionId?.trim() || undefined,
      isActive: true,
    };
    const created = await addProduct(product, Number(initialStock) || 0);
    return NextResponse.json(created);
  } catch (e) {
    return NextResponse.json({ error: "فشل إضافة المنتج" }, { status: 500 });
  }
}
