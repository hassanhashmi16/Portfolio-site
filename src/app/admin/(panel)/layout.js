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
      <div className="admin-main">{children}</div>
    </div>
  );
}
