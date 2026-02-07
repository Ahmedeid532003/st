import { NextRequest, NextResponse } from "next/server";
import { getStock, setStock } from "@/lib/db";

export async function GET() {
  try {
    const stock = await getStock();
    const list = Object.entries(stock).map(([productId, quantity]) => ({
      productId,
      quantity,
    }));
    return NextResponse.json(list);
  } catch (e) {
    return NextResponse.json({ error: "فشل جلب المخزون" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, quantity } = body;
    if (!productId || quantity == null) {
      return NextResponse.json(
        { error: "معرف المنتج والكمية مطلوبان" },
        { status: 400 }
      );
    }
    await setStock(productId, Number(quantity));
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "فشل تحديث المخزون" }, { status: 500 });
  }
}
