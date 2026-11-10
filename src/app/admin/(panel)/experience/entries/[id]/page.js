import { notFound, redirect } from "next/navigation";
import { adminClient, adminConfigured } from "@/lib/supabase-admin";
import ExperienceForm from "../../ExperienceForm";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function EditExperiencePage({ params }) {
  if (!adminConfigured) redirect("/admin");

  const { id } = await params;
  const { data: entry } = await adminClient().from("experience").select("*").eq("id", id).maybeSingle();
  if (!entry) notFound();

  return (
    <div className="admin-panel">
      <p className="admin-kicker">Experience</p>
      <h1 className="admin-h1">Edit entry</h1>
      <ExperienceForm entry={entry} />
    </div>
  );
}
