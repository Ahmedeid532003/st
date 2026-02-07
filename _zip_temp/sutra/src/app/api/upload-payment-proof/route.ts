import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const UPLOAD_DIR = "public/uploads/payment";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;
    if (!file?.size) {
      return NextResponse.json({ error: "لم تُرفع أي صورة" }, { status: 400 });
    }

    const dir = path.join(process.cwd(), UPLOAD_DIR);
    await mkdir(dir, { recursive: true });

    const ext = path.extname(file.name) || ".jpg";
    const safe = "proof-" + Date.now().toString(36) + "-" + file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = safe.endsWith(ext) ? safe : safe + ext;
    const filepath = path.join(dir, filename);
    const buf = Buffer.from(await file.arrayBuffer());
    await writeFile(filepath, buf);
    const url = `/uploads/payment/${filename}`;
    return NextResponse.json({ url });
  } catch (e) {
    return NextResponse.json({ error: "فشل رفع الصورة" }, { status: 500 });
  }
}
