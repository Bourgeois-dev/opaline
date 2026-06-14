import type { MenuItem } from "../../lib/types";

export default function Carte({ menu }: { menu: MenuItem[] }) {
  // Regroupe par catégorie en conservant l'ordre d'apparition
  const cats: string[] = [];
  menu.forEach((m) => { if (!cats.includes(m.category)) cats.push(m.category); });
  return (
    <section className="carte" id="carte">
      <div className="wrap">
        <div className="carte-head">
          <span className="eyebrow">La carte</span>
          <h2>Nos plats</h2>
        </div>
        <div className="menu-cols">
          {cats.map((cat) => (
            <div className="cat" key={cat}>
              <h3>{cat}</h3>
              {menu.filter((m) => m.category === cat).map((m) => (
                <div className="plat" key={m.id}>
                  <div className="plat-ligne">
                    <span className="plat-nom">{m.name}</span>
                    <span className="plat-pts" />
                    <span className="plat-prix">{m.price ? `${m.price} €` : ""}</span>
                  </div>
                  {m.description && <div className="plat-desc">{m.description}</div>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
