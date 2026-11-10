import { sectionMeta } from "@/lib/admin-fields";
import ContentForm from "./ContentForm";

export default function SectionEditor({ section, values, saved = false, error = false, note = null }) {
  const meta = sectionMeta[section];

  return (
    <div className="admin-panel">
      <p className="admin-kicker">{meta.kicker}</p>
      <h1 className="admin-h1">{meta.title}</h1>
      <p className="admin-note">{meta.description}</p>
      {note ? <p className="admin-note">{note}</p> : null}
      {error ? <p className="admin-error">Could not save. Check the Supabase table and try again.</p> : null}
      <div className="admin-editor">
        <ContentForm section={section} values={values} saved={saved} />
      </div>
    </div>
  );
}
