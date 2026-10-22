// Chef accounts: shared by the website and the mobile app so both validate the
// same way. The database enforces the same rules (supabase/migrations).

export const LAUNCH_STATES = [
  { code: "DC", name: "Washington, DC" },
  { code: "MD", name: "Maryland" },
  { code: "VA", name: "Virginia" },
] as const;

export type LaunchState = (typeof LAUNCH_STATES)[number]["code"];

export type ChefApplicationStatus = "pending" | "approved" | "rejected";

/** What an applicant fills in. */
export type ChefApplicationInput = {
  display_name: string;
  phone: string;
  city: string;
  state: LaunchState | "";
  cuisines: string;
  experience_years: string; // kept as text while typing; converted on submit
  bio: string;
  food_safety_cert: boolean;
  links: string;
};

/** A row from the chef_applications table. */
export type ChefApplication = Omit<ChefApplicationInput, "experience_years" | "state"> & {
  id: string;
  user_id: string;
  state: LaunchState;
  experience_years: number;
  status: ChefApplicationStatus;
  reviewer_notes: string;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
};

export const emptyChefApplication: ChefApplicationInput = {
  display_name: "",
  phone: "",
  city: "",
  state: "",
  cuisines: "",
  experience_years: "",
  bio: "",
  food_safety_cert: false,
  links: "",
};

export const BIO_MIN = 40;
export const BIO_MAX = 2000;

export type FieldErrors = Partial<Record<keyof ChefApplicationInput, string>>;

export function validateChefApplication(input: ChefApplicationInput): FieldErrors {
  const e: FieldErrors = {};
  const len = (s: string) => s.trim().length;

  if (len(input.display_name) < 2 || len(input.display_name) > 80)
    e.display_name = "Enter the name guests will see (2–80 characters).";
  const digits = input.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) e.phone = "Enter a phone number we can reach you on.";
  if (len(input.city) < 2) e.city = "Enter your city.";
  if (!LAUNCH_STATES.some((s) => s.code === input.state))
    e.state = "Foodeez is launching in DC, Maryland and Virginia.";
  if (len(input.cuisines) < 2) e.cuisines = "Tell us what you cook.";
  const years = Number(input.experience_years);
  if (input.experience_years.trim() === "" || !Number.isInteger(years) || years < 0 || years > 80)
    e.experience_years = "Enter whole years, 0–80.";
  if (len(input.bio) < BIO_MIN) e.bio = `Tell guests a bit more (at least ${BIO_MIN} characters).`;
  if (len(input.bio) > BIO_MAX) e.bio = `Keep it under ${BIO_MAX} characters.`;
  if (input.links.length > 500) e.links = "Keep links under 500 characters.";
  return e;
}

/** Turns form input into the columns the database accepts. */
export function toChefApplicationRow(input: ChefApplicationInput, userId: string) {
  return {
    user_id: userId,
    display_name: input.display_name.trim(),
    phone: input.phone.trim(),
    city: input.city.trim(),
    state: input.state as LaunchState,
    cuisines: input.cuisines.trim(),
    experience_years: Number(input.experience_years),
    bio: input.bio.trim(),
    food_safety_cert: input.food_safety_cert,
    links: input.links.trim(),
  };
}

export function fromChefApplication(row: ChefApplication): ChefApplicationInput {
  return {
    display_name: row.display_name,
    phone: row.phone,
    city: row.city,
    state: row.state,
    cuisines: row.cuisines,
    experience_years: String(row.experience_years),
    bio: row.bio,
    food_safety_cert: row.food_safety_cert,
    links: row.links,
  };
}

export const STATUS_COPY: Record<ChefApplicationStatus, { title: string; body: string }> = {
  pending: {
    title: "Application under review",
    body: "Thanks for applying. The Foodeez team reviews every chef before they can sell seats. You can still edit your answers while we review.",
  },
  approved: {
    title: "You're a Foodeez chef",
    body: "Chef mode is on. Next up: creating your first experience.",
  },
  rejected: {
    title: "Application not approved",
    body: "We weren't able to approve this application right now. Contact the Foodeez team if you have questions.",
  },
};

/** Minimum password length for new accounts (matches Supabase's default of 6, raised). */
export const PASSWORD_MIN = 8;
