import Link from "next/link";
import { notFound } from "next/navigation";
import { getExperience } from "@/lib/data";

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const experience = getExperience(slug);
  if (!experience) notFound();

  return (
    <main>
      <div className="detail-hero" aria-label="Experience food photography placeholder"/>
      <div className="container detail-grid">
        <article>
          <div className="eyebrow">{experience.type} · {experience.cuisine}</div>
          <h1 style={{fontSize:"clamp(44px,6vw,72px)",marginTop:10}}>{experience.title}</h1>
          <p className="lede">{experience.description}</p>
          <p><Link href={`/chefs/${experience.chefSlug}`}><strong>Chef {experience.chef} ✓</strong></Link> &nbsp; ★ {experience.rating} · {experience.reviews} verified guest reviews</p>
          <hr className="rule"/>
          <h2>The experience</h2>
          <p className="lede" style={{fontSize:17}}>This is an intimate table designed for conversation as much as cuisine. Arrive curious; the chef will guide the table through the menu and the stories behind it.</p>
          <hr className="rule"/>
          <h2>Your menu</h2>
          <ul className="menu-list">{experience.menu.map((item,i)=><li key={item}><span>{item}</span><span>{String(i+1).padStart(2,"0")}</span></li>)}</ul>
          <hr className="rule"/>
          <h2>Meet your chef</h2>
          <p><strong>{experience.chef} ✓</strong><br/><span className="meta">{experience.cuisine} · 23 Foodeez experiences</span></p>
          <Link className="btn btn-outline" href={`/chefs/${experience.chefSlug}`}>View chef profile</Link>
        </article>
        <aside className="sticky">
          <div className="eyebrow">Reserve your seat</div>
          <h3 className="card-title" style={{fontSize:32,marginTop:8}}>${experience.price} <span className="meta">/ person</span></h3>
          <p><strong>{experience.date}</strong><br/><span className="meta">{experience.time}<br/>{experience.location}</span></p>
          <p><strong>{experience.seatsLeft} seats remaining</strong></p>
          <Link className="btn btn-accent" style={{width:"100%"}} href={`/experiences/${experience.slug}/reserve`}>Reserve</Link>
          <div className="trust" style={{marginTop:20}}>✓ Creator identity verified<br/>✓ Secure checkout in payment phase<br/>★ Reviews from verified guests<br/>Cancellation policy shown before payment</div>
        </aside>
      </div>
    </main>
  );
}