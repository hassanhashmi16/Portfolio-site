import { createClient } from "@supabase/supabase-js";

// Server-only: uses the secret key, which bypasses RLS.
// Never import this from a client component.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Secret key (sb_secret_...) replaces the legacy service_role key.
// Supabase returns 401 if a secret key is used from a browser.
const secretKey =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY;

export const adminConfigured = Boolean(url && secretKey);

export function adminClient() {
  if (!url || !secretKey) {
    throw new Error("Supabase admin credentials are not configured");
  }
  return createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
