import { adminClient, adminConfigured } from "@/lib/supabase-admin";
import { deleteWriting, moveWriting, toggleWriting } from "../actions";
import ConfirmButton from "@/components/ConfirmButton";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

function dateLabel(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default async function WritingEntriesPage() {
  if (!adminConfigured) {
    return (
      <div className="admin-panel">
        <h1 className="admin-h1">Connect Supabase</h1>
        <p className="admin-note">Add your Supabase URL and secret key to <code>.env.local</code> and restart.</p>
      </div>
    );
  }

  const { data } = await adminClient().from("writing").select("*").order("position", { ascending: true });
  const list = data || [];

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <div>
          <p className="admin-kicker">Section 05 · Writing</p>
          <h1 className="admin-h1">Notes</h1>
        </div>
        <a className="admin-btn" href="/admin/writing/entries/new">+ New note</a>
      </div>
      <p className="admin-note admin-note-spaced"><a href="/admin/writing">Edit the section heading and intro</a></p>

      <div className="admin-table">
        <div className="admin-table-head">
          <span>#</span><span>Title</span><span>Status</span><span>Order</span><span>Actions</span>
        </div>
        {list.map((note) => (
          <div className="admin-row" key={note.id}>
            <span className="admin-pos">{note.position}</span>
            <span className="admin-row-title">
              <strong>{note.title}</strong>
              <em>{note.kind}{note.published_at ? ` · ${dateLabel(note.published_at)}` : ""}</em>
            </span>
            <span>
              <span className={note.published ? "admin-badge is-live" : "admin-badge"}>{note.published ? "Published" : "Draft"}</span>
            </span>
            <span className="admin-order">
              <form action={moveWriting}><input type="hidden" name="id" value={note.id} /><input type="hidden" name="dir" value="up" /><button className="admin-mini" type="submit" aria-label="Move up">↑</button></form>
              <form action={moveWriting}><input type="hidden" name="id" value={note.id} /><input type="hidden" name="dir" value="down" /><button className="admin-mini" type="submit" aria-label="Move down">↓</button></form>
            </span>
            <span className="admin-actions">
              <a className="admin-mini" href={`/admin/writing/entries/${note.id}`}>Edit</a>
              <form action={toggleWriting}>
                <input type="hidden" name="id" value={note.id} />
                <input type="hidden" name="next" value={note.published ? "false" : "true"} />
                <button className="admin-mini" type="submit">{note.published ? "Unpublish" : "Publish"}</button>
              </form>
              <form action={deleteWriting}>
                <input type="hidden" name="id" value={note.id} />
                <ConfirmButton className="admin-mini is-danger">Delete</ConfirmButton>
              </form>
            </span>
          </div>
        ))}
        {list.length === 0 ? <p className="admin-note">No notes yet. The homepage shows example placeholders until you add one.</p> : null}
      </div>
    </div>
  );
}
