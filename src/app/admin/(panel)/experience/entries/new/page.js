import { redirect } from "next/navigation";
import { adminConfigured } from "@/lib/supabase-admin";
import ExperienceForm from "../../ExperienceForm";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default function NewExperiencePage() {
  if (!adminConfigured) redirect("/admin");
  return (
    <div className="admin-panel">
      <p className="admin-kicker">Experience</p>
      <h1 className="admin-h1">New entry</h1>
      <ExperienceForm />
    </div>
  );
}
