import { NextRequest, NextResponse } from "next/server";
import { createOrder, getOrders } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get("phone")?.trim();
    if (!phone) {
      return NextResponse.json(
        { error: "رقم الموبايل مطلوب" },
        { status: 400 }
      );
    }
    const orders = await getOrders();
    const byPhone = orders.filter(
      (o) => o.customerPhone?.replace(/\s/g, "") === phone.replace(/\s/g, "")
    );
    return NextResponse.json(byPhone);
  } catch (e) {
    return NextResponse.json(
      { error: "فشل جلب الطلبات" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      items,
      customerName,
      customerPhone,
      customerEmail,
      address,
      notes,
    } = body;
    if (
      !items?.length ||
      !customerName?.trim() ||
      !customerPhone?.trim() ||
      !address?.trim()
    ) {
      return NextResponse.json(
        { error: "الرجاء إدخال البيانات المطلوبة" },
        { status: 400 }
      );
    }
    const result = await createOrder(items, {
      name: customerName,
      phone: customerPhone,
      email: customerEmail,
      address,
      notes,
    });
    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: "فشل إنشاء الطلب" }, { status: 500 });
  }
}
