import { NextRequest, NextResponse } from "next/server";
import { getSections, createSection } from "@/lib/db";
import type { Section } from "@/lib/types";

export async function GET() {
  try {
    const sections = await getSections();
    return NextResponse.json(sections);
  } catch (e) {
    return NextResponse.json({ error: "فشل جلب الأقسام" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, nameAr, order } = body;
    if (!name?.trim()) {
      return NextResponse.json({ error: "اسم القسم مطلوب" }, { status: 400 });
    }
    const section: Omit<Section, "id"> = {
      name: name.trim(),
      nameAr: nameAr?.trim(),
      order: Number(order) ?? 0,
    };
    const created = await createSection(section);
    return NextResponse.json(created);
  } catch (e) {
    return NextResponse.json({ error: "فشل إضافة القسم" }, { status: 500 });
  }
}
