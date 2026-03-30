import Link from "next/link";
import { architectureNotes } from "../../content/site";

export default function ArchitecturePage() {
  return (
    <main className="page-shell">
      <section className="hero section">
        <p className="eyebrow">Architecture Notes</p>
        <h1>Technical writing and system design reference architectures</h1>
        <p className="lead">
          A growing set of practical writeups on AI systems, cloud architecture, and engineering
          patterns. These are reference architectures and decision frameworks, not tied to a single
          project.
        </p>
      </section>

      <section className="section">
        <p className="eyebrow">Reference Architectures</p>
        <h2>Patterns and design decisions for common challenges</h2>
        <div className="grid two" style={{ marginTop: "1rem" }}>
          {architectureNotes.map((note) => (
            <article className="card" key={note.slug}>
              <h3>{note.title}</h3>
              <p>{note.summary}</p>
              <div className="pill-list">
                <span className="pill">Architecture</span>
                {note.tags?.map((tag) => (
                  <span className="pill" key={`${note.slug}-${tag}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="hero-actions" style={{ marginTop: "0.9rem" }}>
                <Link className="button secondary" href={`/architecture/${note.slug}`}>
                  Read Full Note
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <article className="card">
          <h2>Planned topics</h2>
          <ul className="list-clean">
            <li>Tradeoffs between Lambdas, containers, queues, and managed workflows</li>
            <li>Evaluation-first design for retrieval and generation systems</li>
            <li>Observability patterns for AI pipelines in AWS</li>
            <li>Architecture decision records for AI-enabled product teams</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
