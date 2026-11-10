import { adminClient, adminConfigured } from "@/lib/supabase-admin";
import { deleteProject, moveProject, toggleProject } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function ProjectsListPage() {
  if (!adminConfigured) {
    return (
      <div className="admin-panel">
        <h1 className="admin-h1">Connect Supabase</h1>
        <p className="admin-note">Add your Supabase URL and secret key to <code>.env.local</code> and restart.</p>
      </div>
    );
  }

  const { data: projects } = await adminClient()
    .from("projects")
    .select("*")
    .order("position", { ascending: true });

  const list = projects || [];

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <div>
          <p className="admin-kicker">Section 04 · Projects</p>
          <h1 className="admin-h1">Selected work</h1>
        </div>
        <a className="admin-btn" href="/admin/projects/new">+ New project</a>
      </div>
      <p className="admin-note admin-note-spaced">Each row becomes one project block on the homepage and one entry in the archive.</p>

      <div className="admin-table">
        <div className="admin-table-head">
          <span>#</span><span>Title</span><span>Status</span><span>Order</span><span>Actions</span>
        </div>
        {list.map((project) => (
          <div className="admin-row" key={project.id}>
            <span className="admin-pos">{project.position}</span>
            <span className="admin-row-title">
              <strong>{project.title}</strong>
              <em>/{project.slug}</em>
            </span>
            <span>
              <span className={project.published ? "admin-badge is-live" : "admin-badge"}>{project.published ? "Published" : "Draft"}</span>
            </span>
            <span className="admin-order">
              <form action={moveProject}><input type="hidden" name="id" value={project.id} /><input type="hidden" name="dir" value="up" /><button className="admin-mini" type="submit" aria-label="Move up">↑</button></form>
              <form action={moveProject}><input type="hidden" name="id" value={project.id} /><input type="hidden" name="dir" value="down" /><button className="admin-mini" type="submit" aria-label="Move down">↓</button></form>
            </span>
            <span className="admin-actions">
              <a className="admin-mini" href={`/admin/projects/${project.id}`}>Edit</a>
              <form action={toggleProject}>
                <input type="hidden" name="id" value={project.id} />
                <input type="hidden" name="next" value={project.published ? "false" : "true"} />
                <button className="admin-mini" type="submit">{project.published ? "Unpublish" : "Publish"}</button>
              </form>
              <form action={deleteProject}>
                <input type="hidden" name="id" value={project.id} />
                <button className="admin-mini is-danger" type="submit">Delete</button>
              </form>
            </span>
          </div>
        ))}
        {list.length === 0 ? <p className="admin-note">No projects yet. Create your first one.</p> : null}
      </div>
    </div>
  );
}
