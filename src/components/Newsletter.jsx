import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | error | success

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !e.target.checkValidity()) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  }

  function handleChange(e) {
    setEmail(e.target.value);
    if (status === "error") setStatus("idle");
  }

  return (
    <section className="newsletter-section" id="newsletter" aria-labelledby="newsletter-heading">
      <div className="container">
        <div className="newsletter-card">
          <span className="section-label">
            <span aria-hidden="true">&#9993;</span> Stay in the loop
          </span>
          <h2 id="newsletter-heading" className="newsletter-title">
            Never miss a <span className="gradient-text">drop</span>
          </h2>
          <p className="newsletter-desc">
            Get the latest AI tools delivered to your inbox. No spam, just the good stuff.
          </p>
          <form
            className="newsletter-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={handleChange}
              required
              aria-describedby={
                status === "error" ? "newsletter-error" : undefined
              }
            />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
          {status === "error" && (
            <p id="newsletter-error" className="newsletter-status newsletter-error" role="alert">
              Please enter a valid email address.
            </p>
          )}
          {status === "success" && (
            <p className="newsletter-status newsletter-success" role="status">
              You&rsquo;re on the list!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
