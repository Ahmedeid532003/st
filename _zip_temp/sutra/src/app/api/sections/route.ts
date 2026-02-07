import { NextResponse } from "next/server";
import { getSections } from "@/lib/db";

export async function GET() {
  try {
    const sections = await getSections();
    return NextResponse.json(sections);
  } catch (e) {
    return NextResponse.json({ error: "فشل جلب الأقسام" }, { status: 500 });
  }
}
