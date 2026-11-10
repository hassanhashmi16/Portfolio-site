import { createClient } from "@supabase/supabase-js";

// Server-only: uses the service role key, which bypasses RLS.
// Never import this from a client component.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const adminConfigured = Boolean(url && serviceKey);

export function adminClient() {
  if (!url || !serviceKey) {
    throw new Error("Supabase admin credentials are not configured");
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
