import Link from "next/link";
import { ExperienceCard } from "@/components/ExperienceCard";
import { experiences } from "@/lib/data";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">A social marketplace for food experiences</div>
            <h1>Experience food together.</h1>
            <p className="lede">Discover private dinners, tastings, chef's tables, and people who believe the best food deserves more than a scroll.</p>
            <div style={{display:"flex",gap:12,marginTop:28,flexWrap:"wrap"}}>
              <Link className="btn btn-accent" href="/discover">Explore experiences</Link>
              <Link className="btn btn-outline" href="/chefs/andre-williams">Meet a chef</Link>
            </div>
          </div>
          <div className="hero-art" aria-label="Warm editorial food photography placeholder">
            <div className="hero-card">
              <div className="eyebrow">This Saturday · 7 PM</div>
              <h3 className="card-title" style={{fontSize:30,marginTop:8}}>A Taste of Jamaica</h3>
              <div className="meta">Six courses · 10 guests · Columbia, Maryland</div>
              <Link href="/experiences/taste-of-jamaica" className="btn btn-primary" style={{marginTop:18}}>See the experience →</Link>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="searchbar">
            <div className="field"><small>Where?</small><strong>Near me</strong></div>
            <div className="field"><small>When?</small><strong>This weekend</strong></div>
            <div className="field"><small>What sounds good?</small><strong>Any cuisine</strong></div>
            <Link href="/discover" className="btn btn-primary">Explore</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><div className="eyebrow">Worth leaving the house for</div><h2>Happening soon</h2></div>
            <Link href="/discover">See all →</Link>
          </div>
          <div className="grid">{experiences.map(e => <ExperienceCard key={e.slug} experience={e}/>)}</div>
        </div>
      </section>

      <section className="section" style={{background:"var(--cream)"}}>
        <div className="container">
          <div className="section-head"><div><div className="eyebrow">More than dinner</div><h2>Come hungry. Leave connected.</h2></div></div>
          <div className="value-grid">
            <div className="value"><strong>Meet the maker.</strong><p className="meta">Learn the story behind the menu and meet the person creating it.</p></div>
            <div className="value"><strong>Taste something new.</strong><p className="meta">Discover food and formats you won't find on an ordinary restaurant search.</p></div>
            <div className="value"><strong>Find your table.</strong><p className="meta">Connect with people who care about food as an experience, not content.</p></div>
          </div>
        </div>
      </section>
    </main>
  );
}