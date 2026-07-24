import ToolCard from "./ToolCard";

export default function ToolGrid({ tools }) {
  return tools.length === 0 ? (
    <div className="empty-state" role="status">
      <p className="empty-icon" aria-hidden="true">&#128270;</p>
      <p className="empty-text">No tools match this filter yet.</p>
      <p className="empty-hint">Try a different category — new tools drop all the time.</p>
    </div>
  ) : (
    <div className="tool-grid">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}