export default function Histoire({ story }: { story: any }) {
  const title = story?.title || "Notre histoire";
  const content = story?.content || "";
  const signature = story?.signature || "";
  const valeurs: string[] = Array.isArray(story?.valeurs) ? story.valeurs : [];
  const img = import.meta.env.VITE_STORY_IMAGE || "";
  return (
    <section className="histoire" id="histoire">
      <div className="wrap histoire-grid">
        <div className="histoire-visuel">{img && <img src={img} alt="" />}</div>
        <div>
          <span className="eyebrow">Notre cuisine</span>
          <h2 className="histoire-titre">{title}</h2>
          {content.split("\n").map((p: string, i: number) => p.trim() && <p key={i}>{p}</p>)}
          {signature && <div className="histoire-signature">« {signature} »</div>}
          {valeurs.length > 0 && (
            <div className="histoire-valeurs">
              {valeurs.map((v, i) => <span key={i}>{v}</span>)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
