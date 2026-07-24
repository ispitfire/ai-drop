export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container">
        <div className="hero-decor" aria-hidden="true">
          <span className="decor-dot decor-dot-1"></span>
          <span className="decor-dot decor-dot-2"></span>
          <span className="decor-dot decor-dot-3"></span>
        </div>
        <span className="hero-badge">New drops daily</span>
        <h1 className="hero-title">
          Your next favorite <span className="gradient-text">AI tool</span>
          <br />
          just dropped
        </h1>
        <p className="hero-subtitle">
          Curated recently released AI tools, apps, skills, and plugins.
          Discover what the community is building — and find your next edge.
        </p>
        <div className="hero-actions">
          <a href="#tools" className="btn btn-primary">
            Browse Tools
          </a>
          <a href="#newsletter" className="btn btn-ghost">
            Get Updates
          </a>
        </div>
      </div>
    </section>
  );
}
