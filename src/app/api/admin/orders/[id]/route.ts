import { NextRequest, NextResponse } from "next/server";
import { updateOrderStatus, updateOrder } from "@/lib/db";
import type { Order } from "@/lib/types";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, paymentStatus } = body;
    if (paymentStatus != null) {
      if (!["pending", "confirmed", "rejected"].includes(paymentStatus)) {
        return NextResponse.json({ error: "حالة الدفع غير صالحة" }, { status: 400 });
      }
      const order = await updateOrder(id, { paymentStatus: paymentStatus as Order["paymentStatus"] });
      if (!order) return NextResponse.json({ error: "الطلب غير موجود" }, { status: 404 });
      return NextResponse.json(order);
    }
    if (status != null) {
      if (!["pending", "confirmed", "shipped", "delivered"].includes(status)) {
        return NextResponse.json({ error: "حالة غير صالحة" }, { status: 400 });
      }
      const order = await updateOrderStatus(id, status as Order["status"]);
      if (!order) return NextResponse.json({ error: "الطلب غير موجود" }, { status: 404 });
      return NextResponse.json(order);
    }
    return NextResponse.json({ error: "لا يوجد تحديث" }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: "فشل التحديث" }, { status: 500 });
  }
}
