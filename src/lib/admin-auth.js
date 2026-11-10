import crypto from "node:crypto";

export const ADMIN_COOKIE = "pf_admin_session";
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function sessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || "";
}

export function adminPasswordSet() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function checkPassword(candidate) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof candidate !== "string") return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function createSession() {
  const payload = String(Date.now());
  const sig = crypto.createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifySession(token) {
  if (!token || !sessionSecret()) return false;
  const idx = token.lastIndexOf(".");
  if (idx < 1) return false;
  const payload = token.slice(0, idx);
  const sig = token.slice(idx + 1);
  const expected = crypto.createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  const age = Date.now() - Number(payload);
  return Number.isFinite(age) && age >= 0 && age < MAX_AGE_MS;
}
