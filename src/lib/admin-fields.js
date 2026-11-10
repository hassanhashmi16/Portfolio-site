// Field schemas and (de)serializers for the section-wise content admin.
// Only allowlisted fields are ever read from or written to site_content.

export const contentSections = ["intro", "about", "experience", "work", "writing", "contact"];

export const sectionMeta = {
  intro: { kicker: "Section 01", title: "Intro", description: "Hero eyebrow, headline, summary, portrait captions and résumé link." },
  about: { kicker: "Section 02", title: "About", description: "The pull-quote, biography paragraphs and the facts list." },
  experience: { kicker: "Section 03", title: "Experience", description: "Timeline heading and intro. Entries are managed in the Experience list." },
  work: { kicker: "Section 04", title: "Selected work", description: "Work section heading, intro and the repositories link." },
  writing: { kicker: "Section 05", title: "Writing", description: "Writing section heading and intro." },
  contact: { kicker: "Section 06", title: "Contact", description: "Closing pitch, email, résumé link and social links." },
};

const MARKUP = "Use **bold**, *italic*, ==highlight==, and a new line for a line break.";

export const fields = {
  intro: [
    { name: "eyebrow", label: "Eyebrow", type: "text", maxLength: 80 },
    { name: "headline", label: "Headline", type: "textarea", rows: 3, maxLength: 160, hint: MARKUP },
    { name: "summary", label: "Summary", type: "textarea", rows: 4, maxLength: 320, hint: MARKUP },
    { name: "location", label: "Location line", type: "text", maxLength: 60 },
    { name: "resumeUrl", label: "Résumé URL", type: "text", maxLength: 200 },
    { name: "portraitAlt", label: "Portrait alt text", type: "text", maxLength: 120 },
    { name: "captionLeft", label: "Portrait caption · left", type: "text", maxLength: 40 },
    { name: "captionRight", label: "Portrait caption · right", type: "text", maxLength: 40 },
  ],
  about: [
    { name: "label", label: "Section label", type: "text", maxLength: 40 },
    { name: "quote", label: "Pull quote", type: "textarea", rows: 2, maxLength: 120, hint: MARKUP },
    { name: "paragraphs", label: "Paragraphs", type: "paragraphs", rows: 9, maxLength: 1400, hint: "Separate paragraphs with a blank line. " + MARKUP },
    { name: "facts", label: "Facts", type: "facts", rows: 12, maxLength: 800, hint: "Separate facts with a blank line. First line = label, remaining lines = value." },
  ],
  experience: [
    { name: "label", label: "Section label", type: "text", maxLength: 40 },
    { name: "heading", label: "Heading", type: "textarea", rows: 2, maxLength: 80, hint: MARKUP },
    { name: "intro", label: "Intro", type: "textarea", rows: 3, maxLength: 240 },
  ],
  work: [
    { name: "label", label: "Section label", type: "text", maxLength: 40 },
    { name: "heading", label: "Heading", type: "textarea", rows: 2, maxLength: 80, hint: MARKUP },
    { name: "intro", label: "Intro", type: "textarea", rows: 3, maxLength: 240 },
    { name: "browseLabel", label: "Browse link label", type: "text", maxLength: 60 },
    { name: "browseUrl", label: "Browse link URL", type: "text", maxLength: 200 },
  ],
  writing: [
    { name: "label", label: "Section label", type: "text", maxLength: 40 },
    { name: "heading", label: "Heading", type: "textarea", rows: 2, maxLength: 80, hint: MARKUP },
    { name: "intro", label: "Intro", type: "textarea", rows: 3, maxLength: 240 },
  ],
  contact: [
    { name: "eyebrow", label: "Eyebrow", type: "text", maxLength: 80 },
    { name: "heading", label: "Heading", type: "textarea", rows: 2, maxLength: 80, hint: MARKUP },
    { name: "blurb", label: "Blurb", type: "textarea", rows: 3, maxLength: 260 },
    { name: "email", label: "Email", type: "text", maxLength: 120 },
    { name: "resumeLabel", label: "Résumé link label", type: "text", maxLength: 40 },
    { name: "resumeUrl", label: "Résumé URL", type: "text", maxLength: 200 },
    { name: "socials", label: "Social links", type: "socials", rows: 4, maxLength: 400, hint: "One per line: Label | URL" },
  ],
};

export function serializeForForm(section, values) {
  const schema = fields[section] || [];
  const out = {};
  for (const field of schema) {
    const value = values ? values[field.name] : undefined;
    if (field.type === "paragraphs") {
      out[field.name] = Array.isArray(value) ? value.join("\n\n") : "";
    } else if (field.type === "facts") {
      out[field.name] = Array.isArray(value)
        ? value.map((f) => `${f.label}\n${f.value}`).join("\n\n")
        : "";
    } else if (field.type === "socials") {
      out[field.name] = Array.isArray(value)
        ? value.map((s) => `${s.label} | ${s.url}`).join("\n")
        : "";
    } else {
      out[field.name] = value == null ? "" : String(value);
    }
  }
  return out;
}

export function parseSection(section, formData) {
  const schema = fields[section] || [];
  const out = {};
  for (const field of schema) {
    let raw = String(formData.get(field.name) || "");
    if (field.maxLength) raw = raw.slice(0, field.maxLength);

    if (field.type === "paragraphs") {
      out[field.name] = raw.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);
    } else if (field.type === "facts") {
      out[field.name] = raw
        .split(/\n\s*\n/)
        .map((block) => {
          const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
          if (!lines.length) return null;
          return { label: lines[0], value: lines.slice(1).join("\n") };
        })
        .filter(Boolean);
    } else if (field.type === "socials") {
      out[field.name] = raw
        .split("\n")
        .map((line) => {
          const idx = line.indexOf("|");
          if (idx < 0) return null;
          const label = line.slice(0, idx).trim();
          const url = line.slice(idx + 1).trim();
          return label && url ? { label, url } : null;
        })
        .filter(Boolean);
    } else {
      out[field.name] = raw.trim();
    }
  }
  return out;
}
