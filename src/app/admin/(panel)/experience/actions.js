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

function refresh() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/experience/entries");
}

export async function saveExperience(formData) {
  if (!adminConfigured) redirect("/admin?error=supabase");

  const id = str(formData, "id");
  const role = str(formData, "role");
  const row = {
    slug: slugify(str(formData, "slug") || `${role}-${str(formData, "year")}`),
    year: str(formData, "year"),
    date: str(formData, "date"),
    role,
    organization: str(formData, "organization"),
    description: str(formData, "description"),
    type: str(formData, "type"),
    published: formData.get("published") === "on",
    position: Number(formData.get("position") || 0),
  };

  const supabase = adminClient();
  const { error } = id
    ? await supabase.from("experience").update(row).eq("id", id)
    : await supabase.from("experience").insert(row);

  if (error) {
    redirect(id ? `/admin/experience/entries/${id}?error=1` : "/admin/experience/entries/new?error=1");
  }

  refresh();
  redirect("/admin/experience/entries");
}

export async function deleteExperience(formData) {
  if (!adminConfigured) redirect("/admin?error=supabase");
  await adminClient().from("experience").delete().eq("id", str(formData, "id"));
  refresh();
  redirect("/admin/experience/entries");
}

export async function toggleExperience(formData) {
  if (!adminConfigured) redirect("/admin?error=supabase");
  const next = formData.get("next") === "true";
  await adminClient().from("experience").update({ published: next }).eq("id", str(formData, "id"));
  refresh();
  redirect("/admin/experience/entries");
}

export async function moveExperience(formData) {
  if (!adminConfigured) redirect("/admin?error=supabase");
  const id = str(formData, "id");
  const dir = formData.get("dir") === "up" ? -1 : 1;
  const supabase = adminClient();

  const { data } = await supabase.from("experience").select("id,position").order("position", { ascending: true });
  if (!data) redirect("/admin/experience/entries");

  const index = data.findIndex((item) => item.id === id);
  const target = index + dir;
  if (index < 0 || target < 0 || target >= data.length) redirect("/admin/experience/entries");

  const a = data[index];
  const b = data[target];
  await supabase.from("experience").update({ position: b.position }).eq("id", a.id);
  await supabase.from("experience").update({ position: a.position }).eq("id", b.id);

  refresh();
  redirect("/admin/experience/entries");
}
