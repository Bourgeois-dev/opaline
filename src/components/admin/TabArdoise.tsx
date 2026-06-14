import { useEffect, useState } from "react";
import { supabase, fetchContent } from "../../lib/supabase";

export default function TabArdoise() {
  const [plat, setPlat] = useState("");
  const [prix, setPrix] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => { (async () => { const a = await fetchContent("ardoise"); if (a) { setPlat(a.plat || ""); setPrix(a.prix || ""); setEnabled(a.enabled !== false); } })(); }, []);

  async function save() {
    await supabase.from("site_content").upsert({ section_key: "ardoise", content: { plat, prix, enabled } }, { onConflict: "section_key" });
    setMsg("Ardoise enregistrée ✓"); setTimeout(() => setMsg(""), 2500);
  }
  return (
    <>
      <div className="topbar"><div><h1>Ardoise du jour</h1><div className="sous">Le plat du jour affiché sur le site</div></div></div>
      <div className="contenu">
        <div className="bloc">
          <div className="ardoise-edit">
            <div className="champ"><label>Plat du jour</label><input value={plat} onChange={(e) => setPlat(e.target.value)} /></div>
            <div className="champ"><label>Prix</label><input value={prix} onChange={(e) => setPrix(e.target.value)} /></div>
            <label className="ligne-toggle" style={{ border: "none", padding: "6px 0" }}>
              <span className="lib"><b>Afficher l'ardoise sur le site</b></span>
              <span className="toggle"><input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} /><span className="piste" /></span>
            </label>
            <div className="apercu-ardoise"><div className="pj">{plat || "—"}</div><div className="px">{prix}</div></div>
          </div>
          <div style={{ marginTop: 16 }}><button className="btn btn-accent" onClick={save}>Enregistrer</button> {msg && <span className="ok-msg">{msg}</span>}</div>
        </div>
      </div>
    </>
  );
}
