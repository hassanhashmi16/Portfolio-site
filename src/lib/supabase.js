import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Publishable key (sb_publishable_...) replaces the legacy anon key.
const publicKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(url && publicKey);

export function publicClient() {
  if (!url || !publicKey) throw new Error("Supabase is not configured");
  return createClient(url, publicKey, { auth: { persistSession: false } });
}
