import { useTable } from "../../hooks/useTable";
import type { Reservation } from "../../lib/types";

const STATUTS: Record<string, string> = { attente: "t-attente", confirme: "t-ok", annule: "t-annule" };
const LABELS: Record<string, string> = { attente: "En attente", confirme: "Confirmée", annule: "Annulée" };

export default function TabReservations() {
  const { rows, update } = useTable<Reservation>("reservations", "date");
  return (
    <>
      <div className="topbar"><div><h1>Réservations</h1><div className="sous">Gérez les demandes reçues</div></div></div>
      <div className="contenu"><div className="bloc">
        <table><thead><tr><th>Date</th><th>Heure</th><th>Client</th><th>Couverts</th><th>Statut</th><th></th></tr></thead><tbody>
          {rows.length ? rows.map((r) => (
            <tr key={r.id}>
              <td>{new Date(r.date + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}</td>
              <td>{r.time}</td>
              <td><b>{r.customer_name}</b><div className="sub-desc">{r.phone}</div></td>
              <td>{r.covers}</td>
              <td><span className={`tag ${STATUTS[r.status] || ""}`}>{LABELS[r.status] || r.status}</span></td>
              <td><div className="actions-ligne">
                {r.status !== "confirme" && <button className="btn btn-mini btn-ok" onClick={() => update(r.id, { status: "confirme" })}>Confirmer</button>}
                {r.status !== "annule" && <button className="btn btn-mini btn-danger" onClick={() => update(r.id, { status: "annule" })}>Annuler</button>}
              </div></td>
            </tr>
          )) : <tr><td colSpan={6} className="vide">Aucune réservation.</td></tr>}
        </tbody></table>
      </div></div>
    </>
  );
}
