import { useTable } from "../../hooks/useTable";
import type { Reservation, Lead } from "../../lib/types";

export default function TabTableau() {
  const { rows: resa } = useTable<Reservation>("reservations", "date");
  const { rows: leads } = useTable<Lead>("leads", "created_at");
  const today = new Date().toISOString().slice(0, 10);
  const auj = resa.filter((r) => r.date === today);
  const couv = auj.reduce((s, r) => s + (r.covers || 0), 0);
  const att = resa.filter((r) => r.status === "attente").length;
  return (
    <>
      <div className="topbar"><div><h1>Tableau de bord</h1><div className="sous">Vue d'ensemble de votre activité</div></div></div>
      <div className="contenu">
        <div className="cartes-stat" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
          <div className="stat"><div className="lib">Couverts aujourd'hui</div><div className="val">{couv}</div><div className="det">{auj.length} réservation(s)</div></div>
          <div className="stat"><div className="lib">À confirmer</div><div className="val" style={{ color: "var(--attente)" }}>{att}</div><div className="det">demandes en attente</div></div>
          <div className="stat"><div className="lib">Contacts récoltés</div><div className="val">{leads.length}</div><div className="det">newsletter + réservations</div></div>
        </div>
      </div>
    </>
  );
}
