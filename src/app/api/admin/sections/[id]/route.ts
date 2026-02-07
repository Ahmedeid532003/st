import { NextRequest, NextResponse } from "next/server";
import { updateSection, deleteSection } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const section = await updateSection(id, body);
    if (!section) return NextResponse.json({ error: "القسم غير موجود" }, { status: 404 });
    return NextResponse.json(section);
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
    const ok = await deleteSection(id);
    if (!ok) return NextResponse.json({ error: "القسم غير موجود" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "فشل الحذف" }, { status: 500 });
  }
}
