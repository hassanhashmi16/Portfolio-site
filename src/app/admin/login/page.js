import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, adminPasswordSet, checkPassword, createSession } from "@/lib/admin-auth";

export const metadata = { title: "Admin login", robots: { index: false, follow: false } };

async function login(formData) {
  "use server";
  const password = String(formData.get("password") || "");
  if (!checkPassword(password)) {
    redirect("/admin/login?error=1");
  }
  const token = createSession();
  const store = await cookies();
  store.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/admin");
}

export default async function LoginPage({ searchParams }) {
  const sp = await searchParams;
  const error = sp?.error;

  return (
    <main className="admin-login">
      <div className="admin-login-card">
        <p className="admin-kicker">Hassan Hashmi · Content</p>
        <h1 className="admin-login-title">Admin</h1>
        {adminPasswordSet() ? (
          <form action={login} className="admin-form">
            <label className="admin-field">
              <span>Password</span>
              <input className="admin-input" type="password" name="password" autoComplete="current-password" required autoFocus />
            </label>
            {error ? <p className="admin-error">Wrong password. Try again.</p> : null}
            <button className="admin-btn" type="submit">Enter</button>
          </form>
        ) : (
          <p className="admin-note">Set <code>ADMIN_PASSWORD</code> in <code>.env.local</code> to enable admin login.</p>
        )}
        <a className="admin-back" href="/">← Back to site</a>
      </div>
    </main>
  );
}
