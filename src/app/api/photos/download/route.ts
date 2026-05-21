import JSZip from "jszip";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function GET() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseBucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "wedding-photos";

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return new Response(
      "Configura SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY sul server per scaricare le foto.",
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  const allFiles: { name: string }[] = [];
  const pageSize = 100;
  let offset = 0;

  while (true) {
    const { data, error } = await supabase.storage
      .from(supabaseBucket)
      .list("uploads", {
        limit: pageSize,
        offset,
        sortBy: { column: "name", order: "asc" },
      });

    if (error) {
      return new Response(`Impossibile leggere le foto dal bucket: ${error.message}`, { status: 500 });
    }

    if (!data || data.length === 0) {
      break;
    }

    allFiles.push(...data.filter((item) => Boolean(item.name) && !item.name.endsWith("/")));

    if (data.length < pageSize) {
      break;
    }

    offset += pageSize;
  }

  const zip = new JSZip();

  for (const file of allFiles) {
    const filePath = `uploads/${file.name}`;
    const { data, error } = await supabase.storage
      .from(supabaseBucket)
      .download(filePath);

    if (error) {
      return new Response(`Errore download file ${file.name}: ${error.message}`, { status: 500 });
    }

    const arrayBuffer = await data.arrayBuffer();
    zip.file(file.name, Buffer.from(arrayBuffer));
  }

  if (allFiles.length === 0) {
    return new Response("", {
      status: 204,
      headers: {
        "Content-Type": "application/zip",
      },
    });
  }

  const zipBlob = await zip.generateAsync({ type: "uint8array" });

  const zipArrayBuffer = zipBlob.buffer.slice(
    zipBlob.byteOffset,
    zipBlob.byteOffset + zipBlob.byteLength,
  );

  return new Response(zipArrayBuffer as ArrayBuffer, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="foto-matrimonio.zip"',
      "Cache-Control": "no-store",
    },
  });
}
