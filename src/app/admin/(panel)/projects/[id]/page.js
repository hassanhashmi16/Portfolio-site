import { notFound, redirect } from "next/navigation";
import { adminClient, adminConfigured } from "@/lib/supabase-admin";
import ProjectForm from "../../ProjectForm";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function EditProjectPage({ params }) {
  if (!adminConfigured) redirect("/admin");

  const { id } = await params;
  const { data: project } = await adminClient()
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!project) notFound();

  return (
    <div className="admin-panel">
      <p className="admin-kicker">Projects</p>
      <h1 className="admin-h1">Edit project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
