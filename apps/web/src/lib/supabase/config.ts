// Public Supabase settings. These are safe in the browser: the publishable key only
// allows what Row Level Security permits. Never put the secret/service_role key here.
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

/** False until the two environment variables are set (locally in .env.local, or in Amplify). */
export const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);
