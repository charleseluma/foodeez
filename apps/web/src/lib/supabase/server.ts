import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { ChefApplication } from "@foodeez/shared";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL, supabaseConfigured } from "./config";

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (toSet) => {
        try {
          toSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component, where cookies are read-only. The
          // middleware refreshes sessions, so this is safe to ignore.
        }
      },
    },
  });
}

/** The signed-in person, their profile and chef application (or nulls). */
export async function getSession() {
  if (!supabaseConfigured) return { user: null, profile: null, application: null };
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { user: null, profile: null, application: null };
  const [{ data: profile }, { data: application }] = await Promise.all([
    supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle(),
    supabase.from("chef_applications").select("*").eq("user_id", user.id).maybeSingle(),
  ]);
  return {
    user,
    profile: profile as { full_name: string } | null,
    application: application as ChefApplication | null,
  };
}
