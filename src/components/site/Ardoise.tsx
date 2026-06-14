export default function Ardoise({ ardoise }: { ardoise: any }) {
  const plat = ardoise?.plat || "";
  const prix = ardoise?.prix || "";
  if (!plat) return null;
  return (
    <section className="ardoise" id="jour">
      <div className="wrap">
        <div className="ardoise-box">
          <div className="ardoise-lab">Le plat du jour</div>
          <div className="ardoise-pj">{plat}</div>
          {prix && <div className="ardoise-px">{prix}</div>}
        </div>
      </div>
    </section>
  );
}
