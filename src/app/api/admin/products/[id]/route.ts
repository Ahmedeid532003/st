import { NextRequest, NextResponse } from "next/server";
import { updateProduct, deleteProduct } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const product = await updateProduct(id, body);
    if (!product) return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
    return NextResponse.json(product);
  } catch (e) {
    return NextResponse.json({ error: "فشل التحديث" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ok = await deleteProduct(id);
    if (!ok) return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "فشل الحذف" }, { status: 500 });
  }
}
