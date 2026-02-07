import { NextResponse } from "next/server";
import { getOrders } from "@/lib/db";

export async function GET() {
  try {
    const orders = await getOrders();
    return NextResponse.json(orders);
  } catch (e) {
    return NextResponse.json({ error: "فشل جلب الطلبات" }, { status: 500 });
  }
}
