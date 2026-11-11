import { redirect } from "next/navigation";
import { adminConfigured } from "@/lib/supabase-admin";
import WritingForm from "../../WritingForm";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default function NewWritingPage() {
  if (!adminConfigured) redirect("/admin");
  return (
    <div className="admin-panel">
      <p className="admin-kicker">Writing</p>
      <h1 className="admin-h1">New note</h1>
      <WritingForm />
    </div>
  );
}
