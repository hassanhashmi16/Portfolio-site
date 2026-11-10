"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { adminClient, adminConfigured } from "@/lib/supabase-admin";
import { ADMIN_COOKIE } from "@/lib/admin-auth";

function str(formData, name) {
  return String(formData.get(name) || "").trim();
}

function parseLines(value) {
  return String(value || "")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseCsv(value) {
  return String(value || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildMedia(formData) {
  const media = [];
  const diagram = str(formData, "diagram");
  if (diagram) media.push({ kind: "diagram", type: diagram });
  const statValue = str(formData, "statValue");
  if (statValue) {
    media.push({
      kind: "stat",
      value: statValue,
      label: str(formData, "statLabel"),
      note: str(formData, "statNote"),
    });
  }
  return media;
}

function refresh() {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");
}

export async function saveProject(formData) {
  if (!adminConfigured) redirect("/admin?error=supabase");

  const supabase = adminClient();
  const id = str(formData, "id");
  const title = str(formData, "title");
  const row = {
    slug: slugify(str(formData, "slug") || title),
    title,
    type: str(formData, "type"),
    lede: str(formData, "lede"),
    summary: str(formData, "summary"),
    status: str(formData, "status"),
    href: str(formData, "href") || null,
    live: str(formData, "live") || null,
    diagram: str(formData, "diagram") || null,
    highlights: parseLines(formData.get("highlights")),
    tags: parseCsv(formData.get("tags")),
    media: buildMedia(formData),
    published: formData.get("published") === "on",
    position: Number(formData.get("position") || 0),
  };

  const { error } = id
    ? await supabase.from("projects").update(row).eq("id", id)
    : await supabase.from("projects").insert(row);

  if (error) {
    redirect(id ? `/admin/projects/${id}?error=1` : "/admin/projects/new?error=1");
  }

  refresh();
  redirect("/admin");
}

export async function deleteProject(formData) {
  if (!adminConfigured) redirect("/admin?error=supabase");
  const id = str(formData, "id");
  await adminClient().from("projects").delete().eq("id", id);
  refresh();
  redirect("/admin");
}

export async function toggleProject(formData) {
  if (!adminConfigured) redirect("/admin?error=supabase");
  const id = str(formData, "id");
  const next = formData.get("next") === "true";
  await adminClient().from("projects").update({ published: next }).eq("id", id);
  refresh();
  redirect("/admin");
}

export async function moveProject(formData) {
  if (!adminConfigured) redirect("/admin?error=supabase");
  const id = str(formData, "id");
  const dir = formData.get("dir") === "up" ? -1 : 1;
  const supabase = adminClient();

  const { data } = await supabase.from("projects").select("id,position").order("position", { ascending: true });
  if (!data) redirect("/admin");

  const index = data.findIndex((p) => p.id === id);
  const target = index + dir;
  if (index < 0 || target < 0 || target >= data.length) redirect("/admin");

  const a = data[index];
  const b = data[target];
  await supabase.from("projects").update({ position: b.position }).eq("id", a.id);
  await supabase.from("projects").update({ position: a.position }).eq("id", b.id);

  refresh();
  redirect("/admin");
}

export async function logout() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}
