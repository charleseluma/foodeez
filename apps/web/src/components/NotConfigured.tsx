export function NotConfigured() {
  return (
    <div className="notice">
      <strong>Accounts aren&apos;t switched on yet.</strong>
      <p className="meta" style={{ margin: "6px 0 0" }}>
        This site isn&apos;t connected to the Foodeez database yet. Once the Supabase project
        exists and its URL and publishable key are added, sign-up and chef applications go live here.
      </p>
    </div>
  );
}
