import projectsJson from "@/data/portfolio-projects.json";
import experienceJson from "@/data/experience.json";
import { publicClient, supabaseConfigured } from "@/lib/supabase";
import { defaultContent } from "@/lib/site-defaults";

// Public content reads. Falls back to the bundled JSON when Supabase is not
// configured yet, so the site works before the database is set up.

function mapProject(row) {
  return {
    id: row.slug,
    title: row.title,
    type: row.type,
    lede: row.lede,
    summary: row.summary,
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
    tags: Array.isArray(row.tags) ? row.tags : [],
    status: row.status,
    href: row.href,
    live: row.live || null,
    diagram: row.diagram,
    media: Array.isArray(row.media) && row.media.length
      ? row.media
      : row.diagram
        ? [{ kind: "diagram", type: row.diagram }]
        : [],
  };
}

function mapExperience(row) {
  return {
    id: row.slug,
    year: row.year,
    date: row.date,
    role: row.role,
    organization: row.organization,
    description: row.description,
    type: row.type,
  };
}

export async function getProjects() {
  if (!supabaseConfigured) return projectsJson;
  try {
    const { data, error } = await publicClient()
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("position", { ascending: true });
    if (error || !data || data.length === 0) return projectsJson;
    return data.map(mapProject);
  } catch {
    return projectsJson;
  }
}

export async function getExperience() {
  if (!supabaseConfigured) return experienceJson;
  try {
    const { data, error } = await publicClient()
      .from("experience")
      .select("*")
      .eq("published", true)
      .order("position", { ascending: true });
    if (error || !data || data.length === 0) return experienceJson;
    return data.map(mapExperience);
  } catch {
    return experienceJson;
  }
}

function mapWriting(row) {
  return {
    id: row.slug || row.id,
    title: row.title,
    kind: row.kind || "Note",
    excerpt: row.excerpt || "",
    publishedAt: row.published_at || null,
  };
}

export async function getWriting() {
  if (!supabaseConfigured) return [];
  try {
    const { data, error } = await publicClient()
      .from("writing")
      .select("*")
      .eq("published", true)
      .order("position", { ascending: true });
    if (error || !data) return [];
    return data.map(mapWriting);
  } catch {
    return [];
  }
}

function mergeSite(overrides) {
  const source = overrides || {};
  const merged = {};
  for (const key of Object.keys(defaultContent)) {
    const base = defaultContent[key];
    const extra = source[key];
    if (base && typeof base === "object" && !Array.isArray(base) && extra && typeof extra === "object") {
      merged[key] = { ...base, ...extra };
    } else {
      merged[key] = extra || base;
    }
  }
  return merged;
}

export async function getSiteContent() {
  if (!supabaseConfigured) return defaultContent;
  try {
    const { data, error } = await publicClient()
      .from("site_content")
      .select("data")
      .eq("id", 1)
      .maybeSingle();
    if (error || !data || !data.data) return defaultContent;
    return mergeSite(data.data);
  } catch {
    return defaultContent;
  }
}
