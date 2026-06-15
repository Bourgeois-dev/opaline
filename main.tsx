import { useState } from "react";
import { supabase } from "../../lib/supabase";
import type { SocialLink } from "../../lib/types";
import { SOCIAL_SVG } from "./socialIcons";

export default function Newsletter({ socials }: { socials: SocialLink[] }) {
  const [sent, setSent] = useState(false);
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const phone = import.meta.env.VITE_RESTO_PHONE || "";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !consent) return;
    await supabase.from("leads").insert({ first_name: prenom, last_name: nom, email, source: "newsletter" });
    setSent(true);
  }
  const actifs = socials.filter((s) => s.url && SOCIAL_SVG[s.platform]);

  return (
    <section className="news" id="contact">
      <div className="wrap news-inner">
        <span className="eyebrow">Restez informé</span>
        <h2>Nos actualités</h2>
        <div className="news-boxe">
          {phone && <div className="news-tel">Réservation par téléphone : <b>{phone}</b></div>}
          {!sent ? (
            <form onSubmit={submit}>
              <div className="news-grid2">
                <div className="champ"><label>Prénom</label><input value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder="Marie" /></div>
                <div className="champ"><label>Nom</label><input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Durand" /></div>
              </div>
              <div className="champ"><label>Adresse e-mail *</label><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="marie.durand@email.com" /></div>
              <label className="consent"><input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} /><span>J'accepte de recevoir les actualités du restaurant par e-mail. Désinscription possible à tout moment. *</span></label>
              <button className="btn btn-accent" type="submit" style={{ width: "100%" }}>S'inscrire</button>
            </form>
          ) : (
            <div className="merci"><b>Merci !</b><p>Votre inscription a bien été enregistrée.</p></div>
          )}
          {actifs.length > 0 && (
            <div className="socials">
              {actifs.map((s) => <a key={s.id} href={s.url} target="_blank" rel="noopener" aria-label={s.platform}>{SOCIAL_SVG[s.platform]}</a>)}
            </div>
          )}
          <p className="rgpd">Vos données sont traitées conformément au RGPD et jamais transmises à des tiers.</p>
        </div>
      </div>
    </section>
  );
}
