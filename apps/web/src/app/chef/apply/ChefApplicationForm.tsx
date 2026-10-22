"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  BIO_MAX,
  LAUNCH_STATES,
  emptyChefApplication,
  fromChefApplication,
  toChefApplicationRow,
  validateChefApplication,
  type ChefApplication,
  type ChefApplicationInput,
  type FieldErrors,
} from "@foodeez/shared";
import { createClient } from "@/lib/supabase/client";

type Props = { userId: string; existing: ChefApplication | null; defaultName: string };

export function ChefApplicationForm({ userId, existing, defaultName }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<ChefApplicationInput>(
    existing ? fromChefApplication(existing) : { ...emptyChefApplication, display_name: defaultName },
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  const set = <K extends keyof ChefApplicationInput>(key: K, value: ChefApplicationInput[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validateChefApplication(form);
    setErrors(found);
    if (Object.keys(found).length) return setFormError("Please fix the highlighted answers.");
    setBusy(true);
    setFormError("");
    const supabase = createClient();
    const row = toChefApplicationRow(form, userId);
    const { error } = existing
      ? await supabase.from("chef_applications").update((({ user_id, ...rest }) => rest)(row)).eq("id", existing.id)
      : await supabase.from("chef_applications").insert(row);
    setBusy(false);
    if (error) return setFormError("We couldn't save your application. Please try again.");
    if (existing) {
      setSaved(true);
      router.refresh();
    } else {
      router.replace("/account");
      router.refresh();
    }
  }

  const field = (key: keyof ChefApplicationInput) => ({
    "aria-invalid": errors[key] ? true : undefined,
    className: "input",
  });

  return (
    <form className="panel form" onSubmit={onSubmit} noValidate>
      <label className="label">
        Chef name guests will see
        <input {...field("display_name")} value={form.display_name} onChange={(e) => set("display_name", e.target.value)} />
        <Err msg={errors.display_name} />
      </label>
      <div className="form-row">
        <label className="label">
          City
          <input {...field("city")} autoComplete="address-level2" value={form.city} onChange={(e) => set("city", e.target.value)} />
          <Err msg={errors.city} />
        </label>
        <label className="label">
          State
          <select {...field("state")} value={form.state} onChange={(e) => set("state", e.target.value as ChefApplicationInput["state"])}>
            <option value="">Choose…</option>
            {LAUNCH_STATES.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
          </select>
          <Err msg={errors.state} />
        </label>
      </div>
      <div className="form-row">
        <label className="label">
          Phone
          <input {...field("phone")} type="tel" autoComplete="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
          <span className="hint">Only the Foodeez team sees this.</span>
          <Err msg={errors.phone} />
        </label>
        <label className="label">
          Years cooking professionally or seriously
          <input {...field("experience_years")} inputMode="numeric" value={form.experience_years} onChange={(e) => set("experience_years", e.target.value.replace(/\D/g, ""))} />
          <Err msg={errors.experience_years} />
        </label>
      </div>
      <label className="label">
        What do you cook?
        <input {...field("cuisines")} placeholder="e.g. Nigerian, West African, modern Southern" value={form.cuisines} onChange={(e) => set("cuisines", e.target.value)} />
        <Err msg={errors.cuisines} />
      </label>
      <label className="label">
        About you
        <textarea {...field("bio")} rows={6} maxLength={BIO_MAX} placeholder="Your story, your food, and the kind of experiences you want to host." value={form.bio} onChange={(e) => set("bio", e.target.value)} />
        <span className="hint">{form.bio.trim().length} / {BIO_MAX}</span>
        <Err msg={errors.bio} />
      </label>
      <label className="label">
        Links (optional)
        <input {...field("links")} placeholder="Instagram, website, past events" value={form.links} onChange={(e) => set("links", e.target.value)} />
        <Err msg={errors.links} />
      </label>
      <label className="check">
        <input type="checkbox" checked={form.food_safety_cert} onChange={(e) => set("food_safety_cert", e.target.checked)} />
        I hold a current food-handler or food-safety certification (e.g. ServSafe).
      </label>
      {formError && <p className="error" role="alert">{formError}</p>}
      {saved && <p className="success" role="status">Changes saved.</p>}
      <button className="btn btn-accent" type="submit" disabled={busy}>
        {busy ? "Saving…" : existing ? "Save changes" : "Submit application"}
      </button>
    </form>
  );
}

function Err({ msg }: { msg?: string }) {
  return msg ? <span className="error">{msg}</span> : null;
}
