import projectsJson from "@/data/portfolio-projects.json";
import experienceJson from "@/data/experience.json";
import { anonClient, supabaseConfigured } from "@/lib/supabase";

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
    const { data, error } = await anonClient()
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
    const { data, error } = await anonClient()
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
