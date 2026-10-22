import { redirect } from "next/navigation";
import { getSession } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/config";
import { NotConfigured } from "@/components/NotConfigured";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Sign in — Foodeez" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const { next, error } = await searchParams;
  const { user } = await getSession();
  if (user) redirect(next?.startsWith("/") && !next.startsWith("//") ? next : "/account");
  return (
    <main className="auth-layout">
      <div className="eyebrow">Welcome back</div>
      <h1 className="auth-title">Sign in.</h1>
      {supabaseConfigured ? (
        <LoginForm next={next} linkError={error === "link"} />
      ) : (
        <NotConfigured />
      )}
    </main>
  );
}
