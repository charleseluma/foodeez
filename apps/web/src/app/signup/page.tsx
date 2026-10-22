import { redirect } from "next/navigation";
import { getSession } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/config";
import { NotConfigured } from "@/components/NotConfigured";
import { SignupForm } from "./SignupForm";

export const metadata = { title: "Create an account — Foodeez" };

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  const { user } = await getSession();
  if (user) redirect("/account");
  return (
    <main className="auth-layout">
      <div className="eyebrow">Join Foodeez</div>
      <h1 className="auth-title">Create your account.</h1>
      <p className="lede" style={{ fontSize: 17 }}>
        One account for everything: book seats as a guest, and apply to cook as a chef.
      </p>
      {supabaseConfigured ? <SignupForm next={next} /> : <NotConfigured />}
    </main>
  );
}
