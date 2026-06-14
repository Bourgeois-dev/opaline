import { useTable } from "../../hooks/useTable";
import { useState } from "react";
import type { OpeningHour, ClosurePeriod } from "../../lib/types";

const JOURS = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];

export default function TabHoraires() {
  const oh = useTable<OpeningHour>("opening_hours", "day_of_week");
  const cp = useTable<ClosurePeriod>("closure_periods", "start_date");
  const [nc, setNc] = useState({ start_date: "", end_date: "", reason: "" });

  async function addClosure() {
    if (!nc.start_date || !nc.end_date) return;
    await cp.insert({ ...nc, blocks_reservations: true });
    setNc({ start_date: "", end_date: "", reason: "" });
  }

  return (
    <>
      <div className="topbar"><div><h1>Horaires</h1><div className="sous">Ouvertures et fermetures exceptionnelles</div></div></div>
      <div className="contenu">
        <div className="bloc">
          <h2>Horaires d'ouverture</h2>
          <table><tbody>
            {oh.rows.slice().sort((a,b)=>a.day_of_week-b.day_of_week).map((h) => (
              <tr key={h.id}>
                <td style={{ width: 110 }}><b>{JOURS[h.day_of_week]}</b></td>
                <td><label className="toggle"><input type="checkbox" checked={!h.is_closed} onChange={(e) => oh.update(h.id, { is_closed: !e.target.checked })} /><span className="piste" /></label> <span className="sub-desc">{h.is_closed ? "Fermé" : "Ouvert"}</span></td>
                <td>{!h.is_closed && (
                  <span className="sub-desc">
                    Midi {h.lunch_open || "—"}/{h.lunch_close || "—"} · Soir {h.dinner_open || "—"}/{h.dinner_close || "—"}
                  </span>
                )}</td>
              </tr>
            ))}
          </tbody></table>
          <div className="hint">Pour modifier les heures précises, éditez les champs lunch_open/close et dinner_open/close (HH:MM).</div>
        </div>
        <div className="bloc">
          <h2>Fermetures exceptionnelles</h2>
          <table><thead><tr><th>Du</th><th>Au</th><th>Motif</th><th></th></tr></thead><tbody>
            {cp.rows.map((c) => (
              <tr key={c.id}><td>{c.start_date}</td><td>{c.end_date}</td><td>{c.reason || "—"}</td><td><button className="btn btn-mini btn-danger" onClick={() => cp.remove(c.id)}>Supprimer</button></td></tr>
            ))}
          </tbody></table>
          <div className="grid2" style={{ marginTop: 14 }}>
            <div className="champ"><label>Date de début</label><input type="date" value={nc.start_date} onChange={(e) => setNc({ ...nc, start_date: e.target.value })} /></div>
            <div className="champ"><label>Date de fin</label><input type="date" value={nc.end_date} onChange={(e) => setNc({ ...nc, end_date: e.target.value })} /></div>
          </div>
          <div className="champ"><label>Motif (affiché au client)</label><input value={nc.reason} onChange={(e) => setNc({ ...nc, reason: e.target.value })} placeholder="Congés d'été" /></div>
          <button className="btn btn-accent" onClick={addClosure}>Ajouter une fermeture</button>
        </div>
      </div>
    </>
  );
}
