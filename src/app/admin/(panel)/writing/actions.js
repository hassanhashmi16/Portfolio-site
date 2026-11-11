"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminClient, adminConfigured } from "@/lib/supabase-admin";

function str(formData, name) {
  return String(formData.get(name) || "").trim();
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function refresh() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/writing/entries");
}

export async function saveWriting(formData) {
  if (!adminConfigured) redirect("/admin?error=supabase");

  const id = str(formData, "id");
  const title = str(formData, "title");
  const row = {
    slug: slugify(str(formData, "slug") || title),
    title,
    kind: str(formData, "kind") || "Note",
    excerpt: str(formData, "excerpt"),
    body: str(formData, "body"),
    cover_url: str(formData, "coverUrl") || null,
    published: formData.get("published") === "on",
    position: Number(formData.get("position") || 0),
    published_at: parseDate(str(formData, "publishedDate")),
  };

  const supabase = adminClient();
  const { error } = id
    ? await supabase.from("writing").update(row).eq("id", id)
    : await supabase.from("writing").insert(row);

  if (error) {
    redirect(id ? `/admin/writing/entries/${id}?error=1` : "/admin/writing/entries/new?error=1");
  }

  refresh();
  redirect("/admin/writing/entries");
}

export async function deleteWriting(formData) {
  if (!adminConfigured) redirect("/admin?error=supabase");
  await adminClient().from("writing").delete().eq("id", str(formData, "id"));
  refresh();
  redirect("/admin/writing/entries");
}

export async function toggleWriting(formData) {
  if (!adminConfigured) redirect("/admin?error=supabase");
  const next = formData.get("next") === "true";
  await adminClient().from("writing").update({ published: next }).eq("id", str(formData, "id"));
  refresh();
  redirect("/admin/writing/entries");
}

export async function moveWriting(formData) {
  if (!adminConfigured) redirect("/admin?error=supabase");
  const id = str(formData, "id");
  const dir = formData.get("dir") === "up" ? -1 : 1;
  const supabase = adminClient();

  const { data } = await supabase.from("writing").select("id,position").order("position", { ascending: true });
  if (!data) redirect("/admin/writing/entries");

  const index = data.findIndex((item) => item.id === id);
  const target = index + dir;
  if (index < 0 || target < 0 || target >= data.length) redirect("/admin/writing/entries");

  const a = data[index];
  const b = data[target];
  await supabase.from("writing").update({ position: b.position }).eq("id", a.id);
  await supabase.from("writing").update({ position: a.position }).eq("id", b.id);

  refresh();
  redirect("/admin/writing/entries");
}
