import Link from "next/link";
import { redirect } from "next/navigation";
import { STATUS_COPY } from "@foodeez/shared";
import { getSession } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/config";
import { NotConfigured } from "@/components/NotConfigured";

export const dynamic = "force-dynamic";

export const metadata = { title: "Your account — Foodeez" };

export default async function AccountPage() {
  if (!supabaseConfigured) {
    return (
      <main className="auth-layout">
        <h1 className="auth-title">Your account.</h1>
        <NotConfigured />
      </main>
    );
  }
  const { user, profile, application } = await getSession();
  if (!user) redirect("/login?next=/account");

  const status = application?.status;
  return (
    <main className="auth-layout">
      <div className="eyebrow">Your Foodeez</div>
      <h1 className="auth-title">Hi{profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}.</h1>
      <div className="panel">
        <div className="row"><span className="meta">Name</span><span>{profile?.full_name || "—"}</span></div>
        <div className="row"><span className="meta">Email</span><span>{user.email}</span></div>
        <div className="row"><span className="meta">Chef status</span><span>{status ? <span className={`status status-${status}`}>{status}</span> : "Not a chef yet"}</span></div>
      </div>

      <div className="panel" style={{ marginTop: 20 }}>
        {status ? (
          <>
            <h2 style={{ fontSize: 30 }}>{STATUS_COPY[status].title}</h2>
            <p className="meta">{STATUS_COPY[status].body}</p>
            {status === "pending" && <Link className="btn btn-outline" href="/chef/apply">Edit application</Link>}
            {status === "approved" && <span className="btn btn-accent" aria-disabled="true" style={{ opacity: 0.5 }}>Create experience — coming next</span>}
          </>
        ) : (
          <>
            <h2 style={{ fontSize: 30 }}>Cook for Foodeez.</h2>
            <p className="meta">Host private dinners and tastings for guests in DC, Maryland and Virginia. Every chef is reviewed before selling seats.</p>
            <Link className="btn btn-accent" href="/chef/apply">Apply to become a chef</Link>
          </>
        )}
      </div>

      <form action="/auth/signout" method="post" style={{ marginTop: 24 }}>
        <button className="btn btn-outline" type="submit">Sign out</button>
      </form>
    </main>
  );
}
