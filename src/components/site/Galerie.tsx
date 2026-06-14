import { useState } from "react";
import type { GalleryImage } from "../../lib/types";

export default function Galerie({ images }: { images: GalleryImage[] }) {
  const [idx, setIdx] = useState(0);
  const total = images.length;
  const go = (d: number) => setIdx((idx + d + total) % total);
  return (
    <section className="galerie" id="galerie">
      <div className="wrap galerie-inner">
        <span className="eyebrow">En images</span>
        <h2>Galerie</h2>
        <div className="carrousel">
          <div className="slides" style={{ transform: `translateX(-${idx * 100}%)` }}>
            {images.map((im) => (
              <div className="slide" key={im.id}><img src={im.url} alt={im.alt || ""} loading="lazy" /></div>
            ))}
          </div>
        </div>
        <div className="car-nav">
          <button className="car-btn" onClick={() => go(-1)} aria-label="Précédent">←</button>
          <span>{idx + 1} / {total}</span>
          <button className="car-btn" onClick={() => go(1)} aria-label="Suivant">→</button>
        </div>
      </div>
    </section>
  );
}
