import { notFound, redirect } from "next/navigation";
import { adminClient, adminConfigured } from "@/lib/supabase-admin";
import WritingForm from "../../WritingForm";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function EditWritingPage({ params }) {
  if (!adminConfigured) redirect("/admin");

  const { id } = await params;
  const { data: note } = await adminClient().from("writing").select("*").eq("id", id).maybeSingle();
  if (!note) notFound();

  return (
    <div className="admin-panel">
      <p className="admin-kicker">Writing</p>
      <h1 className="admin-h1">Edit note</h1>
      <WritingForm note={note} />
    </div>
  );
}
