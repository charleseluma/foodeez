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
2. Chef accounts: sign up, log in, apply to become a chef
3. Create Experience: basics → menu → photos → location → date → seats & price → preview → publish
4. Chef dashboard: upcoming experiences, seats sold, edit/cancel
5. Foodie side: discover chef experiences nearby, booking, payments

Today both apps use sample data in `packages/shared`; the database (Supabase) comes with step 2.

## Branches

- `main` → the public site (Amplify deploys it automatically)
- `develop` → work in progress; merged into `main` after review

## Running it locally

```bash
npm install          # once, from the repo root

npm run web          # website at http://localhost:3000
npm run mobile       # mobile app: scan the QR code with the Expo Go app on your phone
```
