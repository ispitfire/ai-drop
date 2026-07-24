import { categories } from "../data/tools";

export default function Nav({ activeCategory, onCategoryChange }) {
  return (
    <nav className="nav" aria-label="Main navigation">
      <div className="nav-inner container">
        <a href="#top" className="nav-brand" aria-label="AI Drop home">
          <span className="nav-brand-icon" aria-hidden="true">&#9889;</span>
          AI Drop
        </a>
        <div className="nav-links">
          {categories.slice(1).map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`nav-link ${activeCategory === cat ? "active" : ""}`}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
          <a href="#tools" className="btn btn-primary btn-sm">
            Browse Tools
          </a>
        </div>
      </div>
    </nav>
  );
}
