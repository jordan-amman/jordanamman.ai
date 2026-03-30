import Link from "next/link";
import { services } from "../../content/site";

export default function ServicesPage() {
  return (
    <main className="page-shell">
      <section className="hero section">
        <p className="eyebrow">Services</p>
        <h1>AI systems, architecture, and cloud engineering services</h1>
        <p className="lead">
          Support designed for teams that need both technical strategy and hands-on execution.
          Outcomes are concrete: working systems, clearer architecture decisions, and faster
          delivery.
        </p>
      </section>

      <section className="section">
        <p className="eyebrow">Service Areas</p>
        <h2>What you can bring me in for</h2>
        <div className="grid two" style={{ marginTop: "1rem" }}>
          {services.map((service) => (
            <article className="card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.outcome}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section hero">
        <p className="eyebrow">Outcomes</p>
        <h2>Typical deliverables</h2>
        <ul className="list-clean">
          <li>Architecture blueprint and service topology recommendations</li>
          <li>MVP implementation plan with tradeoff documentation</li>
          <li>Working prototype and integration baseline</li>
          <li>Reliability and observability checklist for production readiness</li>
          <li>Handoff notes for internal teams</li>
        </ul>
        <div className="hero-actions" style={{ marginTop: "1rem" }}>
          <Link className="button primary" href="/work-with-me">
            Discuss Engagement
          </Link>
          <Link className="button secondary" href="/contact">
            Send Project Details
          </Link>
        </div>
      </section>
    </main>
  );
}
