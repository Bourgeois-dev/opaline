export default function Histoire({ story }: { story: any }) {
  const title = story?.title || "Notre histoire";
  const content = story?.content || "";
  const img = import.meta.env.VITE_STORY_IMAGE || "";
  return (
    <section className="histoire" id="histoire">
      <div className="wrap histoire-grid">
        <div className="histoire-visuel">{img && <img src={img} alt="" />}</div>
        <div>
          <span className="eyebrow">Notre cuisine</span>
          <h2 className="histoire-titre">{title}</h2>
          {content.split("\n").map((p: string, i: number) => p.trim() && <p key={i}>{p}</p>)}
        </div>
      </div>
    </section>
  );
}
