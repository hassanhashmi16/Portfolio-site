"use server";

import { adminClient, adminConfigured } from "@/lib/supabase-admin";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = ["image/png", "image/jpeg", "image/webp"];

export async function uploadMedia(formData) {
  if (!adminConfigured) return { error: "Supabase is not configured." };

  const file = formData.get("file");
  if (!file || typeof file.arrayBuffer !== "function") {
    return { error: "No file provided." };
  }
  if (!ALLOWED.includes(file.type)) {
    return { error: "Use a PNG, JPG, or WebP image." };
  }
  if (file.size > MAX_BYTES) {
    return { error: "Image must be under 5MB." };
  }

  const folder = String(formData.get("folder") || "misc").replace(/[^a-z0-9-]/gi, "") || "misc";
  const ext = (String(file.name).split(".").pop() || "webp").toLowerCase().replace(/[^a-z0-9]/g, "") || "webp";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const supabase = adminClient();
  const { error } = await supabase.storage.from("media").upload(path, buffer, {
    contentType: file.type,
    upsert: false,
  });
  if (error) return { error: error.message };

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return { url: data.publicUrl, path };
}

export async function uploadResume(formData) {
  if (!adminConfigured) return { error: "Supabase is not configured." };

  const file = formData.get("file");
  if (!file || typeof file.arrayBuffer !== "function") {
    return { error: "No file provided." };
  }
  if (file.type !== "application/pdf") {
    return { error: "Upload a PDF file." };
  }
  if (file.size > 10 * 1024 * 1024) {
    return { error: "PDF must be under 10MB." };
  }

  const path = `resume/${Date.now()}.pdf`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const supabase = adminClient();
  const { error } = await supabase.storage.from("media").upload(path, buffer, {
    contentType: "application/pdf",
    upsert: false,
  });
  if (error) return { error: error.message };

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return { url: data.publicUrl, path };
}
