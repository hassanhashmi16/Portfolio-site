import { redirect } from "next/navigation";
import { adminConfigured } from "@/lib/supabase-admin";
import ProjectForm from "../../ProjectForm";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default function NewProjectPage() {
  if (!adminConfigured) redirect("/admin");
  return (
    <div className="admin-panel">
      <p className="admin-kicker">Projects</p>
      <h1 className="admin-h1">New project</h1>
      <ProjectForm />
    </div>
  );
}
