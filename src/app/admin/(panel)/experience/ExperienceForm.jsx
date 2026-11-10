import { saveExperience } from "./actions";

export default function ExperienceForm({ entry = null }) {
  const id = entry?.id || null;

  return (
    <form action={saveExperience} className="admin-form">
      {id ? <input type="hidden" name="id" value={id} /> : null}

      <div className="admin-grid2">
        <label className="admin-field">
          <span>Role</span>
          <input className="admin-input" name="role" defaultValue={entry?.role || ""} required />
        </label>
        <label className="admin-field">
          <span>Organization</span>
          <input className="admin-input" name="organization" defaultValue={entry?.organization || ""} />
        </label>
      </div>

      <div className="admin-grid2">
        <label className="admin-field">
          <span>Year (large numeral)</span>
          <input className="admin-input" name="year" defaultValue={entry?.year || ""} maxLength={8} />
        </label>
        <label className="admin-field">
          <span>Date range</span>
          <input className="admin-input" name="date" defaultValue={entry?.date || ""} />
        </label>
      </div>

      <label className="admin-field">
        <span>Description</span>
        <textarea className="admin-input" name="description" rows="3" defaultValue={entry?.description || ""} />
      </label>

      <div className="admin-grid2">
        <label className="admin-field">
          <span>Type</span>
          <input className="admin-input" name="type" defaultValue={entry?.type || ""} />
        </label>
        <label className="admin-field">
          <span>Slug (auto if blank)</span>
          <input className="admin-input" name="slug" defaultValue={entry?.slug || ""} />
        </label>
      </div>

      <div className="admin-grid2">
        <label className="admin-field">
          <span>Position</span>
          <input className="admin-input" type="number" name="position" defaultValue={entry?.position ?? 0} />
        </label>
        <label className="admin-check">
          <input type="checkbox" name="published" defaultChecked={entry ? Boolean(entry.published) : true} />
          <span>Published</span>
        </label>
      </div>

      <div className="admin-form-actions">
        <button className="admin-btn" type="submit">Save entry</button>
        <a className="admin-back" href="/admin/experience/entries">Cancel</a>
      </div>
    </form>
  );
}
