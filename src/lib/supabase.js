import { createClient } from "@supabase/supabase-js";

// Accept either name. Vite only inlines vars allowed by envPrefix, and only at build time.
const url = import.meta.env.SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(url && key);

// Shared project with the dashboard. The anon key is public; RLS limits writes.
export const supabase = createClient(url || "http://localhost", key || "public-anon-key", {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});
