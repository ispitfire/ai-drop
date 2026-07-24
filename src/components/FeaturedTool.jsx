import ToolCard from "./ToolCard";

export default function FeaturedTool({ tool }) {
  if (!tool) return null;
  return (
    <section id="featured" className="featured-section" aria-labelledby="featured-heading">
      <div className="container">
        <div className="featured-label">
          <span className="section-label">
            <span aria-hidden="true">&#9733;</span> Tool of the Day
          </span>
        </div>
        <h2 id="featured-heading" className="section-title">
          Featured Drop
        </h2>
        <ToolCard tool={tool} featured />
      </div>
    </section>
  );
}
