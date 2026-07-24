export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div id="about" className="footer-brand">
            <span className="footer-logo" aria-hidden="true">&#9889;</span>
            <span className="footer-name">AI Drop</span>
            <p className="footer-tagline">
              Curating the best recently released AI tools, apps, skills, and plugins.
            </p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4 className="footer-col-title">Browse</h4>
              <a href="#tools">Browse Tools</a>
              <a href="#featured">Featured</a>
              <a href="#newsletter">Newsletter</a>
            </div>
            <div className="footer-col">
              <h4 className="footer-col-title">Connect</h4>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                Visit X
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                Explore GitHub
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                Visit Discord
              </a>
            </div>
            <div className="footer-col">
              <h4 className="footer-col-title">Info</h4>
              <a href="#about">About AI Drop</a>
              <a href="#top">Back to top</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} AI Drop. Built with energy for the AI community.</span>
        </div>
      </div>
    </footer>
  );
}
