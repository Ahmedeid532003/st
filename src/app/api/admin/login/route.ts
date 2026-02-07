import { NextRequest, NextResponse } from "next/server";
import { ADMIN_PASSWORD } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (password === ADMIN_PASSWORD) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "كلمة المرور غير صحيحة" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "طلب غير صالح" }, { status: 400 });
  }
}
