import { fields, serializeForForm } from "@/lib/admin-fields";
import ResumeUploader from "@/components/admin/ResumeUploader";
import { saveSiteContent } from "./actions";

export default function ContentForm({ section, values, saved = false }) {
  const schema = fields[section] || [];
  const data = serializeForForm(section, values);

  return (
    <form action={saveSiteContent} className="admin-form">
      <input type="hidden" name="__section" value={section} />

      {saved ? <p className="admin-saved">Saved.</p> : null}

      {schema.map((field) => {
        const isResume = field.type === "resume";
        const Wrapper = isResume ? "div" : "label";
        return (
          <Wrapper className="admin-field" key={field.name}>
            <span>{field.label}</span>
            {field.type === "text" ? (
              <input
                className="admin-input"
                name={field.name}
                defaultValue={data[field.name]}
                maxLength={field.maxLength}
              />
            ) : isResume ? (
              <ResumeUploader name={field.name} initial={data[field.name]} />
            ) : (
              <textarea
                className="admin-input"
                name={field.name}
                rows={field.rows || 4}
                defaultValue={data[field.name]}
                maxLength={field.maxLength}
              />
            )}
            {field.hint ? <small className="admin-hint">{field.hint}</small> : null}
          </Wrapper>
        );
      })}

      <div className="admin-form-actions">
        <button className="admin-btn" type="submit">Save section</button>
        <a className="admin-back" href="/admin">Back to overview</a>
      </div>
    </form>
  );
}
