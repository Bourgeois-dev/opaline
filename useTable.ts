import type { Partner } from "../../lib/types";

export default function Partenaires({ partners }: { partners: Partner[] }) {
  const cats: string[] = [];
  partners.forEach((p) => { if (p.category && !cats.includes(p.category)) cats.push(p.category); });
  return (
    <section className="partenaires" id="producteurs">
      <div className="wrap">
        <span className="eyebrow">Nos producteurs</span>
        <h2>Main dans la main</h2>
        <div className="prod-grid">
          {(cats.length ? cats : ["Nos partenaires"]).map((cat) => (
            <div className="prod-card" key={cat}>
              <h3>{cat}</h3>
              {partners.filter((p) => (cats.length ? p.category === cat : true)).map((p) => (
                <div key={p.id} className="prod-item">
                  <b>{p.name}</b>
                  {p.description && <p>{p.description}</p>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
