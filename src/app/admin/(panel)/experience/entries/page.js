import { adminClient, adminConfigured } from "@/lib/supabase-admin";
import { deleteExperience, moveExperience, toggleExperience } from "../actions";
import ConfirmButton from "@/components/ConfirmButton";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function ExperienceEntriesPage() {
  if (!adminConfigured) {
    return (
      <div className="admin-panel">
        <h1 className="admin-h1">Connect Supabase</h1>
        <p className="admin-note">Add your Supabase URL and secret key to <code>.env.local</code> and restart.</p>
      </div>
    );
  }

  const { data } = await adminClient().from("experience").select("*").order("position", { ascending: true });
  const list = data || [];

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <div>
          <p className="admin-kicker">Section 03 · Experience</p>
          <h1 className="admin-h1">Entries</h1>
        </div>
        <a className="admin-btn" href="/admin/experience/entries/new">+ New entry</a>
      </div>
      <p className="admin-note admin-note-spaced"><a href="/admin/experience">Edit the section heading and intro</a></p>

      <div className="admin-table">
        <div className="admin-table-head">
          <span>#</span><span>Role</span><span>Status</span><span>Order</span><span>Actions</span>
        </div>
        {list.map((item) => (
          <div className="admin-row" key={item.id}>
            <span className="admin-pos">{item.position}</span>
            <span className="admin-row-title">
              <strong>{item.role}</strong>
              <em>{item.organization}{item.date ? ` · ${item.date}` : ""}</em>
            </span>
            <span>
              <span className={item.published ? "admin-badge is-live" : "admin-badge"}>{item.published ? "Published" : "Draft"}</span>
            </span>
            <span className="admin-order">
              <form action={moveExperience}><input type="hidden" name="id" value={item.id} /><input type="hidden" name="dir" value="up" /><button className="admin-mini" type="submit" aria-label="Move up">↑</button></form>
              <form action={moveExperience}><input type="hidden" name="id" value={item.id} /><input type="hidden" name="dir" value="down" /><button className="admin-mini" type="submit" aria-label="Move down">↓</button></form>
            </span>
            <span className="admin-actions">
              <a className="admin-mini" href={`/admin/experience/entries/${item.id}`}>Edit</a>
              <form action={toggleExperience}>
                <input type="hidden" name="id" value={item.id} />
                <input type="hidden" name="next" value={item.published ? "false" : "true"} />
                <button className="admin-mini" type="submit">{item.published ? "Unpublish" : "Publish"}</button>
              </form>
              <form action={deleteExperience}>
                <input type="hidden" name="id" value={item.id} />
                <ConfirmButton>Delete</ConfirmButton>
              </form>
            </span>
          </div>
        ))}
        {list.length === 0 ? <p className="admin-note">No entries yet.</p> : null}
      </div>
    </div>
  );
}
