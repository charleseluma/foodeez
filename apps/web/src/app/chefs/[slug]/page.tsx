import Link from "next/link";
import { experiences } from "@/lib/data";
import { ExperienceCard } from "@/components/ExperienceCard";

export default async function ChefPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chefExperiences = experiences.filter(e => e.chefSlug === slug);
  const chef = chefExperiences[0]?.chef ?? "Foodeez Chef";
  return (
    <main>
      <section className="hero">
        <div className="container" style={{maxWidth:800,textAlign:"center"}}>
          <div className="eyebrow">Verified Foodeez creator</div>
          <h1 style={{fontSize:"clamp(48px,7vw,76px)"}}>{chef} ✓</h1>
          <p className="lede" style={{margin:"0 auto"}}>Food was how my family brought people together. My table brings those memories forward with modern technique and generous hospitality.</p>
          <div className="chips" style={{justifyContent:"center"}}><span className="chip">★ 4.9</span><span className="chip">38 reviews</span><span className="chip">23 experiences</span></div>
          <button className="btn btn-primary">Follow chef</button>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head"><h2>Upcoming experiences</h2><Link href="/discover">Explore all →</Link></div>
          {chefExperiences.length ? <div className="grid">{chefExperiences.map(e=><ExperienceCard key={e.slug} experience={e}/>)}</div> : <p className="meta">New experiences coming soon.</p>}
        </div>
      </section>
    </main>
  );
}