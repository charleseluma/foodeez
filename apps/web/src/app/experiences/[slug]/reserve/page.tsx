import Link from "next/link";
import { notFound } from "next/navigation";
import { getExperience } from "@/lib/data";

export default async function ReservePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getExperience(slug);
  if (!e) notFound();
  const guests = 2;
  const subtotal = e.price * guests;
  const service = Math.round(subtotal * .1);
  return (
    <main className="reserve-layout">
      <div className="eyebrow">Reservation</div>
      <h1 style={{fontSize:52}}>Reserve your table.</h1>
      <div className="panel">
        <h2 style={{fontSize:34}}>{e.title}</h2>
        <p className="meta">Chef {e.chef} ✓<br/>{e.date} · {e.time}<br/>{e.location}</p>
        <hr className="rule"/>
        <div className="row"><span>Guests</span><strong>− &nbsp;&nbsp; {guests} &nbsp;&nbsp; +</strong></div>
        <div className="row"><span>{guests} × ${e.price}</span><span>${subtotal}</span></div>
        <div className="row"><span>Illustrative service fee</span><span>${service}</span></div>
        <div className="row total"><span>Estimated total</span><span>${subtotal + service}</span></div>
        <p className="meta">This prototype does not collect payment. Final fees, taxes, and cancellation rules will be shown transparently before production checkout.</p>
        <Link href={`/experiences/${e.slug}/confirmation`} className="btn btn-accent" style={{width:"100%",marginTop:16}}>Continue prototype reservation</Link>
      </div>
    </main>
  );
}