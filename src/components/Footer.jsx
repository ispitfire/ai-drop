import { categories } from "../data/tools";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo" aria-hidden="true">&#9889;</span>
            <span className="footer-name">AI Drop</span>
            <p className="footer-tagline">
              Curating the best recently released AI tools, apps, skills, and plugins.
            </p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4 className="footer-col-title">Browse</h4>
              {categories.map((cat) => (
                <a key={cat} href="#tools">{cat}</a>
              ))}
            </div>
            <div className="footer-col">
              <h4 className="footer-col-title">Connect</h4>
              <a href="#">X / Twitter</a>
              <a href="#">GitHub</a>
              <a href="#">Discord</a>
              <a href="#">RSS</a>
            </div>
            <div className="footer-col">
              <h4 className="footer-col-title">Info</h4>
              <a href="#">About</a>
              <a href="#">Submit a Tool</a>
              <a href="#">Privacy</a>
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