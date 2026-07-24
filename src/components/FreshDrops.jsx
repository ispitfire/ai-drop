import ToolCard from "./ToolCard";

export default function FreshDrops({ tools }) {
  if (!tools || tools.length === 0) return null;
  return (
    <section className="fresh-section" aria-labelledby="fresh-heading">
      <div className="container">
        <span className="section-label">
          <span aria-hidden="true">&#9889;</span> Fresh Drops
        </span>
        <h2 id="fresh-heading" className="section-title">
          Just Landed
        </h2>
        <p className="section-subtitle">
          The latest tools added to the collection.
        </p>
        <div className="fresh-grid">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}