import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.SUPABASE_URL;
const key = import.meta.env.SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(url && key);

// Shared project with the dashboard. The anon key is public; RLS limits writes.
export const supabase = createClient(url || "http://localhost", key || "public-anon-key", {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});
