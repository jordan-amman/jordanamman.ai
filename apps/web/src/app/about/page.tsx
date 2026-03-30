export default function AboutPage() {
  return (
    <main className="page-shell">
      <section className="hero section">
        <p className="eyebrow">About</p>
        <h1>Software engineer and architect, growing deep AI systems capability.</h1>
        <p className="lead">
          My core is backend engineering and software architecture. I am applying that foundation
          to AI systems work, building practical retrieval, evaluation, and workflow capabilities
          with the same production standards I use in traditional software systems.
        </p>
      </section>

      <section className="section">
        <p className="eyebrow">Career Positioning</p>
        <h2>Where I create the most value</h2>
        <div className="grid two" style={{ marginTop: "1rem" }}>
          <article className="card">
            <h3>System Design and Architecture</h3>
            <p>
              Turning ambiguous product goals into architecture plans, delivery phases, and
              production-ready implementation decisions.
            </p>
          </article>
          <article className="card">
            <h3>AI Product Engineering</h3>
            <p>
              Building RAG systems, agent workflows, and evaluation loops with practical cloud and
              backend foundations.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Focus</p>
        <h2>What I prioritize on every project</h2>
        <div className="grid three" style={{ marginTop: "1rem" }}>
          <article className="card">
            <h3>Practical Building</h3>
            <p>Architecture that directly supports delivery speed and product outcomes.</p>
          </article>
          <article className="card">
            <h3>Production Thinking</h3>
            <p>Reliability, observability, and security built into decisions from day one.</p>
          </article>
          <article className="card">
            <h3>Continuous Learning</h3>
            <p>Experimentation loops that improve quality without introducing hype or chaos.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Technology</p>
        <h2>Common tools in my stack</h2>
        <article className="card" style={{ marginTop: "1rem" }}>
          <div className="pill-list">
            {[
              "TypeScript",
              "Node.js",
              "Next.js",
              "Python",
              "AWS Lambda",
              "API Gateway",
              "DynamoDB",
              "Terraform",
              "CloudFront",
              "CI/CD"
            ].map((item) => (
              <span className="pill" key={item}>
                {item}
              </span>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
