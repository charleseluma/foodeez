"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PASSWORD_MIN } from "@foodeez/shared";
import { createClient } from "@/lib/supabase/client";

export function SignupForm({ next }: { next?: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState("");
  const [busy, setBusy] = useState(false);
  const after = next?.startsWith("/") && !next.startsWith("//") ? next : "/account";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2) return setError("Enter your name.");
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setError("Enter a valid email address.");
    if (password.length < PASSWORD_MIN) return setError(`Use at least ${PASSWORD_MIN} characters for your password.`);
    setBusy(true);
    setError("");
    const { data, error } = await createClient().auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { full_name: name.trim() },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(after)}`,
      },
    });
    setBusy(false);
    if (error) return setError(error.message);
    if (data.session) {
      // Email confirmation is turned off in Supabase: signed in straight away.
      router.replace(after);
      router.refresh();
    } else {
      setSentTo(email.trim());
    }
  }

  if (sentTo) {
    return (
      <div className="panel">
        <h2 style={{ fontSize: 30 }}>Check your email.</h2>
        <p className="meta">We sent a confirmation link to <strong>{sentTo}</strong>. Open it on this device to finish creating your account.</p>
      </div>
    );
  }

  return (
    <form className="panel form" onSubmit={onSubmit} noValidate>
      <label className="label">
        Your name
        <input className="input" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label className="label">
        Email
        <input className="input" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="label">
        Password
        <input className="input" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <span className="hint">At least {PASSWORD_MIN} characters.</span>
      </label>
      {error && <p className="error" role="alert">{error}</p>}
      <button className="btn btn-accent" type="submit" disabled={busy}>{busy ? "Creating account…" : "Create account"}</button>
      <p className="meta">Already have an account? <Link className="link" href="/login">Sign in</Link></p>
    </form>
  );
}
