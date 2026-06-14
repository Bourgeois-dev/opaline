export default function Hero({ onReserve, onHours }: { onReserve: () => void; onHours: () => void }) {
  const name = import.meta.env.VITE_RESTO_NAME || "Restaurant";
  const tagline = import.meta.env.VITE_RESTO_TAGLINE || "";
  const heroImg = import.meta.env.VITE_HERO_IMAGE || "";
  return (
    <section className="hero">
      {heroImg && <img className="hero-bg" src={heroImg} alt="" />}
      <div className="hero-voile" />
      <div className="wrap hero-inner">
        <span className="eyebrow hero-eyebrow">{import.meta.env.VITE_RESTO_CITY || ""}</span>
        <h1>{name}</h1>
        <div className="hero-sous">{tagline}</div>
        <div className="hero-cta">
          <button className="btn btn-accent" onClick={onReserve}>Réserver une table</button>
          <button className="btn btn-ghost hero-ghost" onClick={onHours}>Voir les horaires</button>
        </div>
      </div>
    </section>
  );
}
