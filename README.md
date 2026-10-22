# Foodeez

**Experience food together.**

Foodeez is a social food-experience marketplace designed to help people discover chefs, private dinners, tastings, and other intentional culinary experiences without the distraction of an infinite social feed.

Launch market: **Washington DC, Maryland and Virginia (DMV)**.

## Product principle

**Experiences before engagement.** Foodeez measures success by successful real-world food experiences, not time spent scrolling.

## How the repo is organized

One repository holds the website and the mobile app. They share code and will share one backend.

| Folder | What it is |
| --- | --- |
| `apps/web` | Website (Next.js). Deployed by AWS Amplify. |
| `apps/mobile` | iOS and Android app (Expo / React Native). One app for everyone; approved chefs use **chef mode**. |
| `packages/shared` | Code both apps use: data types, sample data, brand colors. |

## Build order

1. Foundation: monorepo, website + mobile shell, testing branch ← **done**
2. Chef accounts: sign up, log in, apply to become a chef ← **built on `develop`; goes live once Supabase is connected**
3. Create Experience: basics → menu → photos → location → date → seats & price → preview → publish
4. Chef dashboard: upcoming experiences, seats sold, edit/cancel
5. Foodie side: discover chef experiences nearby, booking, payments

Experiences are still sample data in `packages/shared`. Accounts and chef applications use Supabase.

## Branches

- `main` → the public site (Amplify deploys it automatically)
- `develop` → work in progress; merged into `main` after review

## Running it locally

```bash
npm install          # once, from the repo root

npm run web          # website at http://localhost:3000
npm run mobile       # mobile app: scan the QR code with the Expo Go app on your phone
```

## Accounts & chef applications (Supabase)

Everyone signs up with one account. Anyone can apply to become a chef; the Foodeez team approves applications, and approval turns on **chef mode**.

**One-time setup**

1. In Supabase, open **SQL Editor**, paste `supabase/migrations/20261022000000_chef_accounts.sql`, and run it. It creates the tables and the security rules (each person sees only their own data; nobody can approve themselves).
2. In **Authentication → URL Configuration**, set the Site URL to the website address and add `https://<site>/auth/callback` (and `http://localhost:3000/auth/callback`) under Redirect URLs.
3. Copy the Project URL and publishable key into:
   - `apps/web/.env.local` and Amplify environment variables (see `apps/web/.env.example`)
   - `apps/mobile/.env` (see `apps/mobile/.env.example`)

Until those values are set, the sites and app show "Accounts aren't switched on yet" instead of breaking.

**Approving a chef:** Supabase → Table Editor → `chef_applications` → change `status` from `pending` to `approved` (or `rejected`). An admin screen comes later.
