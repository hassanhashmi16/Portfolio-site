import { saveProject } from "./actions";
import MediaManager from "@/components/admin/MediaManager";

function getId(project) {
  return project?.id && typeof project.id === "string" && project.id.includes("-") ? project.id : null;
}

export default function ProjectForm({ project = null }) {
  const media = Array.isArray(project?.media) ? project.media : [];
  const stat = media.find((m) => m.kind === "stat") || {};
  const initialImages = media
    .filter((m) => m.kind === "image" && m.src)
    .map((m) => ({ kind: "image", src: m.src, alt: m.alt || "" }));
  const id = getId(project);

  return (
    <form action={saveProject} className="admin-form">
      {id ? <input type="hidden" name="id" value={id} /> : null}

      <div className="admin-grid2">
        <label className="admin-field">
          <span>Title</span>
          <input className="admin-input" name="title" defaultValue={project?.title || ""} required />
        </label>
        <label className="admin-field">
          <span>Slug (auto from title if blank)</span>
          <input className="admin-input" name="slug" defaultValue={project?.slug || ""} />
        </label>
      </div>

      <label className="admin-field">
        <span>Type / tagline</span>
        <input className="admin-input" name="type" defaultValue={project?.type || ""} />
      </label>

      <label className="admin-field">
        <span>Lede (short line)</span>
        <input className="admin-input" name="lede" defaultValue={project?.lede || ""} />
      </label>

      <label className="admin-field">
        <span>Summary</span>
        <textarea className="admin-input" name="summary" rows="3" defaultValue={project?.summary || ""} />
      </label>

      <label className="admin-field">
        <span>Highlights (one per line)</span>
        <textarea className="admin-input" name="highlights" rows="3" defaultValue={(project?.highlights || []).join("\n")} />
      </label>

      <label className="admin-field">
        <span>Tags (comma separated)</span>
        <input className="admin-input" name="tags" defaultValue={(project?.tags || []).join(", ")} />
      </label>

      <div className="admin-grid2">
        <label className="admin-field">
          <span>Source URL</span>
          <input className="admin-input" name="href" defaultValue={project?.href || ""} />
        </label>
        <label className="admin-field">
          <span>Live URL (optional)</span>
          <input className="admin-input" name="live" defaultValue={project?.live || ""} />
        </label>
      </div>

      <div className="admin-grid2">
        <label className="admin-field">
          <span>Status label</span>
          <input className="admin-input" name="status" defaultValue={project?.status || ""} />
        </label>
        <label className="admin-field">
          <span>Diagram</span>
          <select className="admin-input" name="diagram" defaultValue={project?.diagram || ""}>
            <option value="">None</option>
            <option value="request-flow">Request flow (WhyTheDiff)</option>
            <option value="retrieval">Retrieval pipeline</option>
            <option value="agent-loop">Agent loop</option>
          </select>
        </label>
      </div>

      <fieldset className="admin-fieldset">
        <legend>Evidence stat card (optional)</legend>
        <div className="admin-grid3">
          <label className="admin-field">
            <span>Value</span>
            <input className="admin-input" name="statValue" defaultValue={stat.value || ""} />
          </label>
          <label className="admin-field">
            <span>Label</span>
            <input className="admin-input" name="statLabel" defaultValue={stat.label || ""} />
          </label>
          <label className="admin-field">
            <span>Note</span>
            <input className="admin-input" name="statNote" defaultValue={stat.note || ""} />
          </label>
        </div>
      </fieldset>

      <MediaManager initial={initialImages} folder="projects" />

      <div className="admin-grid2">
        <label className="admin-field">
          <span>Position</span>
          <input className="admin-input" type="number" name="position" defaultValue={project?.position ?? 0} />
        </label>
        <label className="admin-check">
          <input type="checkbox" name="published" defaultChecked={Boolean(project?.published)} />
          <span>Published</span>
        </label>
      </div>

      <div className="admin-form-actions">
        <button className="admin-btn" type="submit">Save project</button>
        <a className="admin-back" href="/admin">Cancel</a>
      </div>
    </form>
  );
}
