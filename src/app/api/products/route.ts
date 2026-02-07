import { NextResponse } from "next/server";
import { getProducts } from "@/lib/db";

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(Array.isArray(products) ? products : []);
  } catch (e) {
    console.error("API /api/products error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "فشل جلب المنتجات" },
      { status: 500 }
    );
  }
}
