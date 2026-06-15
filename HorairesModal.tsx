import { useState } from "react";
import { useTable } from "../../hooks/useTable";
import type { MenuItem } from "../../lib/types";

const CAT_BASE = ["Entrées", "Plats", "Desserts", "Menus", "Boissons"];

export default function TabCarte() {
  const { rows, insert, update, remove } = useTable<MenuItem>("menu_items");
  const [edit, setEdit] = useState<Partial<MenuItem> | null>(null);
  const [newCat, setNewCat] = useState(false);
  const [catText, setCatText] = useState("");

  const cats = Array.from(new Set([...CAT_BASE, ...rows.map((r) => r.category).filter(Boolean)]));

  function nouveau() { setEdit({ name: "", category: "Plats", description: "", price: 0, is_active: true }); setNewCat(false); setCatText(""); }
  function modifier(m: MenuItem) { setEdit({ ...m }); setNewCat(false); setCatText(""); }

  async function save() {
    if (!edit?.name?.trim()) return;
    let category = edit.category;
    if (newCat) { if (!catText.trim()) return; category = catText.trim(); }
    const vals = { name: edit.name, category, description: edit.description || "", price: edit.price || 0, is_active: edit.is_active !== false };
    if (edit.id) await update(edit.id, vals); else await insert({ ...vals, position: 99 });
    setEdit(null);
  }

  if (edit) {
    return (
      <>
        <div className="topbar"><div><h1>{edit.id ? "Modifier le plat" : "Nouveau plat"}</h1></div></div>
        <div className="contenu"><div className="bloc">
          <div className="grid2">
            <div className="champ"><label>Nom du plat *</label><input value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} /></div>
            <div className="champ"><label>Catégorie</label>
              <select value={newCat ? "__new__" : edit.category} onChange={(e) => { if (e.target.value === "__new__") { setNewCat(true); } else { setNewCat(false); setEdit({ ...edit, category: e.target.value }); } }}>
                {cats.map((c) => <option key={c}>{c}</option>)}
                <option value="__new__">+ Nouvelle catégorie…</option>
              </select>
              {newCat && <input style={{ marginTop: 8 }} placeholder="Nom de la nouvelle catégorie" value={catText} onChange={(e) => setCatText(e.target.value)} />}
            </div>
          </div>
          <div className="champ"><label>Description</label><textarea rows={2} value={edit.description} onChange={(e) => setEdit({ ...edit, description: e.target.value })} /></div>
          <div className="grid2">
            <div className="champ"><label>Prix (€)</label><input type="number" step="0.50" value={edit.price ?? ""} onChange={(e) => setEdit({ ...edit, price: parseFloat(e.target.value) })} /></div>
            <div className="champ" style={{ display: "flex", alignItems: "flex-end" }}>
              <label className="ligne-toggle" style={{ border: "none", padding: 0, width: "100%" }}><span className="lib"><b>Visible sur le site</b></span><span className="toggle"><input type="checkbox" checked={edit.is_active !== false} onChange={(e) => setEdit({ ...edit, is_active: e.target.checked })} /><span className="piste" /></span></label>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}><button className="btn btn-accent" onClick={save}>{edit.id ? "Enregistrer" : "Ajouter"}</button><button className="btn btn-ligne" onClick={() => setEdit(null)}>Annuler</button></div>
        </div></div>
      </>
    );
  }

  return (
    <>
      <div className="topbar"><div><h1>La carte</h1><div className="sous">Vos plats, regroupés par catégorie</div></div></div>
      <div className="contenu"><div className="bloc">
        <div className="bloc-tete"><div><h2>Vos plats</h2></div><button className="btn btn-accent" onClick={nouveau}>+ Ajouter un plat</button></div>
        <table><thead><tr><th style={{ width: 56 }}>Visible</th><th>Plat</th><th>Catégorie</th><th>Prix</th><th></th></tr></thead><tbody>
          {rows.length ? rows.map((m) => (
            <tr key={m.id}>
              <td><label className="toggle"><input type="checkbox" checked={m.is_active} onChange={(e) => update(m.id, { is_active: e.target.checked })} /><span className="piste" /></label></td>
              <td><b style={m.is_active ? {} : { color: "var(--gris)" }}>{m.name}</b>{m.description && <div className="sub-desc">{m.description}</div>}</td>
              <td>{m.category}</td>
              <td>{m.price ? `${m.price} €` : "—"}</td>
              <td><div className="actions-ligne"><button className="btn btn-mini btn-ligne" onClick={() => modifier(m)}>Modifier</button><button className="btn btn-mini btn-danger" onClick={() => confirm(`Supprimer « ${m.name} » ?`) && remove(m.id)}>Supprimer</button></div></td>
            </tr>
          )) : <tr><td colSpan={5} className="vide">Aucun plat. Ajoutez-en un.</td></tr>}
        </tbody></table>
      </div></div>
    </>
  );
}
