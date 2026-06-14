import { useTable } from "../../hooks/useTable";
import type { PromoBanner } from "../../lib/types";
import { useState, useEffect } from "react";

export default function TabPromo() {
  const { rows, insert, update } = useTable<PromoBanner>("promo_banner", "id");
  const promo = rows[0];
  const [message, setMessage] = useState(""); const [cta, setCta] = useState(""); const [url, setUrl] = useState(""); const [actif, setActif] = useState(false);
  useEffect(() => { if (promo) { setMessage(promo.message || ""); setCta(promo.cta_label || ""); setUrl(promo.cta_url || ""); setActif(promo.is_active); } }, [promo]);
  async function save() {
    const vals = { message, cta_label: cta, cta_url: url, is_active: actif };
    if (promo) await update(promo.id, vals); else await insert(vals);
  }
  return (
    <>
      <div className="topbar"><div><h1>Bannière promo</h1><div className="sous">Bandeau d'annonce en haut du site</div></div></div>
      <div className="contenu"><div className="bloc">
        <label className="ligne-toggle" style={{ paddingTop: 0 }}><span className="lib"><b>Afficher la bannière</b></span><span className="toggle"><input type="checkbox" checked={actif} onChange={(e) => setActif(e.target.checked)} /><span className="piste" /></span></label>
        <div className="champ"><label>Message</label><input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Menu de Saint-Valentin disponible…" /></div>
        <div className="grid2">
          <div className="champ"><label>Libellé du bouton</label><input value={cta} onChange={(e) => setCta(e.target.value)} placeholder="Réserver" /></div>
          <div className="champ"><label>Lien du bouton</label><input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="#contact" /></div>
        </div>
        <div className="apercu-promo" style={{ background: "var(--accent)", color: "#fff", padding: "12px 18px", borderRadius: 8, marginTop: 8 }}>{message || "Aperçu du message"}</div>
        <div style={{ marginTop: 16 }}><button className="btn btn-accent" onClick={save}>Enregistrer</button></div>
      </div></div>
    </>
  );
}
