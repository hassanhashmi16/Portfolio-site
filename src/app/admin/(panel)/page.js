import { sectionMeta } from "@/lib/admin-fields";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

const cards = [
  { href: "/admin/intro", key: "intro" },
  { href: "/admin/about", key: "about" },
  { href: "/admin/experience", key: "experience" },
  { href: "/admin/projects", key: "work", label: "Projects" },
  { href: "/admin/writing", key: "writing" },
  { href: "/admin/contact", key: "contact" },
  { href: "/admin/settings", key: "settings" },
];

export default function AdminOverview() {
  return (
    <div className="admin-panel">
      <p className="admin-kicker">Content</p>
      <h1 className="admin-h1">Edit your site</h1>
      <p className="admin-note">Choose a section to edit. Changes save to Supabase and appear on the public site.</p>

      <div className="admin-cards">
        {cards.map((card) => {
          const meta = sectionMeta[card.key];
          return (
            <a className="admin-card" href={card.href} key={card.href}>
              <span className="admin-kicker">{meta.kicker}</span>
              <h3>{card.label || meta.title}</h3>
              <p>{meta.description}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
}
