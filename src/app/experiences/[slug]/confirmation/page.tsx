import Link from "next/link";
import { notFound } from "next/navigation";
import { getExperience } from "@/lib/data";

export default async function ConfirmationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getExperience(slug);
  if (!e) notFound();
  return (
    <main className="reserve-layout" style={{textAlign:"center",paddingTop:70,paddingBottom:70}}>
      <div style={{fontSize:56}}>✓</div>
      <div className="eyebrow">Prototype reservation complete</div>
      <h1 style={{fontSize:58}}>You're going to dinner.</h1>
      <div className="panel">
        <h2 style={{fontSize:34}}>{e.title}</h2>
        <p className="lede" style={{margin:"0 auto 24px"}}>{e.date}<br/>{e.time}<br/>2 guests · Chef {e.chef}</p>
        <p className="meta">In the production flow, this is where booking details, calendar actions, attendee privacy controls, and the Guest Circle will appear.</p>
        <Link className="btn btn-primary" href="/discover">Discover another experience</Link>
      </div>
    </main>
  );
}