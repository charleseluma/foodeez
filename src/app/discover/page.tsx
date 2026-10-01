import { ExperienceCard } from "@/components/ExperienceCard";
import { experiences } from "@/lib/data";

export default function DiscoverPage() {
  return (
    <main className="section">
      <div className="container">
        <div className="eyebrow">Discover Foodeez</div>
        <h1 style={{fontSize:"clamp(44px,6vw,72px)"}}>What are you hungry to experience?</h1>
        <p className="lede">Explore intentionally. Find a table, meet a chef, and go experience something.</p>
        <div className="chips">
          <button className="chip">This weekend</button>
          <button className="chip">Near me</button>
          <button className="chip">Private dinners</button>
          <button className="chip">Tastings</button>
          <button className="chip">Under $75</button>
          <button className="chip">Something different</button>
        </div>
        <div className="section-head"><h2>Upcoming experiences</h2><span className="meta">{experiences.length} curated experiences</span></div>
        <div className="grid">{experiences.map(e => <ExperienceCard key={e.slug} experience={e}/>)}</div>
      </div>
    </main>
  );
}