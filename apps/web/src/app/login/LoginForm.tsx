"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function LoginForm({ next, linkError }: { next?: string; linkError?: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(linkError ? "That sign-in link has expired or was already used. Sign in below." : "");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error } = await createClient().auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) {
      setError(
        error.code === "email_not_confirmed"
          ? "Please confirm your email first — check your inbox for the link."
          : "That email and password don't match.",
      );
      return;
    }
    router.replace(next?.startsWith("/") && !next.startsWith("//") ? next : "/account");
    router.refresh();
  }

  return (
    <form className="panel form" onSubmit={onSubmit} noValidate>
      <label className="label">
        Email
        <input className="input" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="label">
        Password
        <input className="input" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      {error && <p className="error" role="alert">{error}</p>}
      <button className="btn btn-primary" type="submit" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
      <p className="meta">New to Foodeez? <Link className="link" href={next ? `/signup?next=${encodeURIComponent(next)}` : "/signup"}>Create an account</Link></p>
    </form>
  );
}
