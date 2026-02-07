import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const UPLOAD_DIR = "public/uploads";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("image") as File[];
    if (!files?.length) {
      return NextResponse.json({ error: "لم تُرفع أي صورة" }, { status: 400 });
    }

    const dir = path.join(process.cwd(), UPLOAD_DIR);
    await mkdir(dir, { recursive: true });

    const urls: string[] = [];
    for (const file of files) {
      if (!file.size) continue;
      const ext = path.extname(file.name) || ".jpg";
      const safe = Date.now().toString(36) + "-" + file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filename = safe.endsWith(ext) ? safe : safe + ext;
      const filepath = path.join(dir, filename);
      const buf = Buffer.from(await file.arrayBuffer());
      await writeFile(filepath, buf);
      urls.push(`/uploads/${filename}`);
    }

    if (urls.length === 0) {
      return NextResponse.json({ error: "لم تُحفظ أي صورة" }, { status: 400 });
    }
    return NextResponse.json(urls.length === 1 ? { url: urls[0] } : { urls });
  } catch (e) {
    return NextResponse.json({ error: "فشل رفع الصورة" }, { status: 500 });
  }
}
