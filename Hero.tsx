export default function Ardoise({ ardoise }: { ardoise: any }) {
  const plat = ardoise?.plat || "";
  const prix = ardoise?.prix || "";
  const label = ardoise?.label || "Le plat du jour";
  const note = ardoise?.note || "";
  if (!plat) return null;
  return (
    <section className="ardoise" id="jour">
      <div className="wrap">
        <div className="ardoise-box">
          <div className="ardoise-lab">{label}</div>
          <div className="ardoise-pj">{plat}</div>
          {prix && <div className="ardoise-px">{prix}</div>}
          {note && <div className="ardoise-note">{note}</div>}
        </div>
      </div>
    </section>
  );
}
