export default function ToolCard({ tool, featured }) {
  const accentClass = `accent-${tool.accent}`;
  return (
    <article className={`tool-card ${accentClass} ${featured ? "tool-card-featured" : ""}`}>
      <div className="tool-card-header">
        <span className="tool-icon" aria-hidden="true" style={{ background: tool.accent === "coral" ? "#ff6b6b" : tool.accent === "lime" ? "#51cf66" : tool.accent === "blue" ? "#339af0" : "#b197fc" }}>
          {tool.icon}
        </span>
        <div className="tool-card-meta">
          {tool.isNew && <span className="tool-badge">New</span>}
          {tool.featured && <span className="tool-badge tool-badge-featured">Featured</span>}
        </div>
      </div>
      <h3 className="tool-name">{tool.name}</h3>
      <p className="tool-desc">{tool.description}</p>
      <div className="tool-card-footer">
        <div className="tool-tags">
          {tool.tags.map((tag) => (
            <span key={tag} className="tool-tag">{tag}</span>
          ))}
        </div>
        <a
          href={tool.url}
          target="_blank"
          rel="noreferrer"
          className="tool-link"
        >
          Try it &rarr;
        </a>
      </div>
    </article>
  );
}