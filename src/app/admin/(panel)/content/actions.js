"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminClient, adminConfigured } from "@/lib/supabase-admin";
import { contentSections, parseSection } from "@/lib/admin-fields";

export async function saveSiteContent(formData) {
  if (!adminConfigured) redirect("/admin?error=supabase");

  const section = String(formData.get("__section") || "");
  if (!contentSections.includes(section)) redirect("/admin");

  const supabase = adminClient();
  const { data } = await supabase.from("site_content").select("data").eq("id", 1).maybeSingle();
  const current = (data && data.data) || {};
  const nextData = { ...current, [section]: parseSection(section, formData) };

  const { error } = await supabase.from("site_content").upsert({ id: 1, data: nextData });
  if (error) redirect(`/admin/${section}?error=1`);

  revalidatePath("/");
  revalidatePath("/admin");
  redirect(`/admin/${section}?saved=1`);
}
