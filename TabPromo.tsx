import { useTable } from "../../hooks/useTable";
import { useState } from "react";
import type { RestaurantTable } from "../../lib/types";

export default function TabPlan() {
  const { rows, insert, update, remove } = useTable<RestaurantTable>("restaurant_tables");
  const [edit, setEdit] = useState<Partial<RestaurantTable> | null>(null);

  async function save() {
    if (!edit?.label?.trim()) return;
    const vals = { label: edit.label, capacity: edit.capacity || 2, online_limit: edit.online_limit || 2, shape: edit.shape || "square" };
    if (edit.id) await update(edit.id, vals); else await insert({ ...vals, pos_x: 50, pos_y: 50, is_active: true });
    setEdit(null);
  }

  if (edit) return (
    <>
      <div className="topbar"><div><h1>{edit.id ? "Modifier la table" : "Nouvelle table"}</h1></div></div>
      <div className="contenu"><div className="bloc">
        <div className="grid2">
          <div className="champ"><label>Nom / numéro *</label><input value={edit.label} onChange={(e) => setEdit({ ...edit, label: e.target.value })} placeholder="Table 1" /></div>
          <div className="champ"><label>Forme</label>
            <select value={edit.shape} onChange={(e) => setEdit({ ...edit, shape: e.target.value })}>
              <option value="square">Rectangulaire</option><option value="round">Ronde</option>
            </select>
          </div>
        </div>
        <div className="grid2">
          <div className="champ"><label>Capacité totale</label><input type="number" value={edit.capacity} onChange={(e) => setEdit({ ...edit, capacity: Number(e.target.value) })} /></div>
          <div className="champ"><label>Couverts en ligne max</label><input type="number" value={edit.online_limit} onChange={(e) => setEdit({ ...edit, online_limit: Number(e.target.value) })} /></div>
        </div>
        <div style={{ display: "flex", gap: 10 }}><button className="btn btn-accent" onClick={save}>{edit.id ? "Enregistrer" : "Ajouter"}</button><button className="btn btn-ligne" onClick={() => setEdit(null)}>Annuler</button></div>
      </div></div>
    </>
  );

  return (
    <>
      <div className="topbar"><div><h1>Plan de salle</h1><div className="sous">Tables disponibles à la réservation</div></div></div>
      <div className="contenu"><div className="bloc">
        <div className="bloc-tete"><div><h2>Vos tables</h2></div><button className="btn btn-accent" onClick={() => setEdit({ label: "", capacity: 2, online_limit: 2, shape: "square" })}>+ Ajouter une table</button></div>
        <table><thead><tr><th style={{ width: 56 }}>Active</th><th>Nom</th><th>Capacité</th><th>En ligne max</th><th></th></tr></thead><tbody>
          {rows.length ? rows.map((t) => (
            <tr key={t.id}>
              <td><label className="toggle"><input type="checkbox" checked={t.is_active} onChange={(e) => update(t.id, { is_active: e.target.checked })} /><span className="piste" /></label></td>
              <td><b>{t.label}</b><div className="sub-desc">{t.shape === "round" ? "Ronde" : "Rectangulaire"}</div></td>
              <td>{t.capacity} couvert(s)</td>
              <td>{t.online_limit} en ligne</td>
              <td><div className="actions-ligne"><button className="btn btn-mini btn-ligne" onClick={() => setEdit({ ...t })}>Modifier</button><button className="btn btn-mini btn-danger" onClick={() => confirm(`Supprimer "${t.label}" ?`) && remove(t.id)}>Supprimer</button></div></td>
            </tr>
          )) : <tr><td colSpan={5} className="vide">Aucune table configurée.</td></tr>}
        </tbody></table>
      </div></div>
    </>
  );
}
