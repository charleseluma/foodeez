import Link from "next/link";
import type { Experience } from "@/lib/data";

export function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Link href={`/experiences/${experience.slug}`} className="card">
      <div className="card-image"><span className="tag">{experience.type}</span></div>
      <div className="card-body">
        <h3 className="card-title">{experience.title}</h3>
        <div className="meta">
          Chef {experience.chef} · ✓<br/>
          {experience.date} · {experience.time.split(" – ")[0]}<br/>
          {experience.location}
        </div>
        <div className="card-foot">
          <span><strong>★ {experience.rating}</strong> · {experience.seatsLeft} seats left</span>
          <span className="price">${experience.price}</span>
        </div>
      </div>
    </Link>
  );
}