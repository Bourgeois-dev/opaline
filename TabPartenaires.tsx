import { useEffect, useState } from "react";
import { supabase, fetchActive } from "../../lib/supabase";
import type { ReservationSettings } from "../../lib/types";

export default function TabParametres() {
  const [s, setS] = useState<ReservationSettings | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => { fetchActive<ReservationSettings>("reservation_settings").then((r) => setS(r[0] || null)); }, []);

  async function save() {
    if (!s) return;
    await supabase.from("reservation_settings").update({ enabled: s.enabled, phone_threshold: s.phone_threshold, min_advance_hours: s.min_advance_hours }).eq("id", s.id);
    setMsg("Réglages enregistrés ✓"); setTimeout(() => setMsg(""), 2500);
  }

  if (!s) return <div className="loading">Chargement…</div>;
  return (
    <>
      <div className="topbar"><div><h1>Réservations & site</h1><div className="sous">Paramètres de réservation en ligne</div></div></div>
      <div className="contenu"><div className="bloc">
        <label className="ligne-toggle" style={{ paddingTop: 0 }}>
          <span className="lib"><b>Activer la réservation en ligne</b><span>Si désactivé, seul le bouton d'appel est affiché.</span></span>
          <span className="toggle"><input type="checkbox" checked={s.enabled} onChange={(e) => setS({ ...s, enabled: e.target.checked })} /><span className="piste" /></span>
        </label>
        <div className="grid2" style={{ marginTop: 18 }}>
          <div className="champ"><label>Seuil groupe (→ téléphone)</label><input type="number" value={s.phone_threshold} onChange={(e) => setS({ ...s, phone_threshold: Number(e.target.value) })} /></div>
          <div className="champ"><label>Délai minimum (heures)</label><input type="number" value={s.min_advance_hours} onChange={(e) => setS({ ...s, min_advance_hours: Number(e.target.value) })} /></div>
        </div>
        <div style={{ marginTop: 16 }}><button className="btn btn-accent" onClick={save}>Enregistrer</button> {msg && <span className="ok-msg">{msg}</span>}</div>
      </div></div>
    </>
  );
}
