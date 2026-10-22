import { redirect } from "next/navigation";
import { STATUS_COPY } from "@foodeez/shared";
import { getSession } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/config";
import { NotConfigured } from "@/components/NotConfigured";
import { ChefApplicationForm } from "./ChefApplicationForm";

export const dynamic = "force-dynamic";

export const metadata = { title: "Apply to become a chef — Foodeez" };

export default async function ChefApplyPage() {
  if (!supabaseConfigured) {
    return (
      <main className="auth-layout">
        <div className="eyebrow">Chef application</div>
        <h1 className="auth-title">Cook for Foodeez.</h1>
        <NotConfigured />
      </main>
    );
  }
  const { user, profile, application } = await getSession();
  if (!user) redirect("/signup?next=/chef/apply");

  if (application && application.status !== "pending") {
    const copy = STATUS_COPY[application.status];
    return (
      <main className="auth-layout">
        <div className="eyebrow">Chef application</div>
        <h1 className="auth-title">{copy.title}</h1>
        <p className="lede" style={{ fontSize: 17 }}>{copy.body}</p>
      </main>
    );
  }

  return (
    <main className="auth-layout">
      <div className="eyebrow">Chef application</div>
      <h1 className="auth-title">{application ? "Your application." : "Cook for Foodeez."}</h1>
      <p className="lede" style={{ fontSize: 17 }}>
        {application
          ? STATUS_COPY.pending.body
          : "Tell us about your cooking. The Foodeez team reviews every application before a chef can sell seats."}
      </p>
      <ChefApplicationForm userId={user.id} existing={application} defaultName={profile?.full_name ?? ""} />
    </main>
  );
}
