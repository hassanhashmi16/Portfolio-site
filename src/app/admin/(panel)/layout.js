import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-auth";
import { logout } from "./actions";

export const metadata = { robots: { index: false, follow: false } };

export default async function PanelLayout({ children }) {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!verifySession(token)) redirect("/admin/login");

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <a href="/admin" className="admin-brand">HH. <span>Content</span></a>
        <nav className="admin-topnav">
          <a href="/" target="_blank" rel="noreferrer">View site ↗</a>
          <form action={logout}>
            <button className="admin-linkbtn" type="submit">Log out</button>
          </form>
        </nav>
      </header>
      <nav className="admin-sectionnav" aria-label="Content sections">
        <a href="/admin">Overview</a>
        <a href="/admin/intro">Intro</a>
        <a href="/admin/about">About</a>
        <a href="/admin/experience">Experience</a>
        <a href="/admin/projects">Projects</a>
        <a href="/admin/writing">Writing</a>
        <a href="/admin/contact">Contact</a>
      </nav>
      <div className="admin-main">{children}</div>
    </div>
  );
}
