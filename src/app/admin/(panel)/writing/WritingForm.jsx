import { saveWriting } from "./actions";

function dateValue(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

export default function WritingForm({ note = null }) {
  const id = note?.id || null;

  return (
    <form action={saveWriting} className="admin-form">
      {id ? <input type="hidden" name="id" value={id} /> : null}

      <div className="admin-grid2">
        <label className="admin-field">
          <span>Title</span>
          <input className="admin-input" name="title" defaultValue={note?.title || ""} required />
        </label>
        <label className="admin-field">
          <span>Kind</span>
          <input className="admin-input" name="kind" defaultValue={note?.kind || "Build note"} placeholder="Build note / Milestone / Article" />
        </label>
      </div>

      <label className="admin-field">
        <span>Excerpt</span>
        <textarea className="admin-input" name="excerpt" rows="2" defaultValue={note?.excerpt || ""} />
      </label>

      <label className="admin-field">
        <span>Body</span>
        <textarea className="admin-input" name="body" rows="10" defaultValue={note?.body || ""} />
      </label>

      <div className="admin-grid2">
        <label className="admin-field">
          <span>Cover image URL (optional)</span>
          <input className="admin-input" name="coverUrl" defaultValue={note?.cover_url || ""} />
        </label>
        <label className="admin-field">
          <span>Published date (YYYY-MM-DD)</span>
          <input className="admin-input" name="publishedDate" defaultValue={dateValue(note?.published_at)} placeholder="2026-11-01" />
        </label>
      </div>

      <div className="admin-grid2">
        <label className="admin-field">
          <span>Slug (auto if blank)</span>
          <input className="admin-input" name="slug" defaultValue={note?.slug || ""} />
        </label>
        <label className="admin-field">
          <span>Position</span>
          <input className="admin-input" type="number" name="position" defaultValue={note?.position ?? 0} />
        </label>
      </div>

      <label className="admin-check">
        <input type="checkbox" name="published" defaultChecked={note ? Boolean(note.published) : true} />
        <span>Published</span>
      </label>

      <div className="admin-form-actions">
        <button className="admin-btn" type="submit">Save note</button>
        <a className="admin-back" href="/admin/writing/entries">Cancel</a>
      </div>
    </form>
  );
}
