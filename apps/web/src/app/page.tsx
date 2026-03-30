import Link from "next/link";
import { HeroSpaceField } from "../components/HeroSpaceField";
import {
  architecturePrinciples,
  capabilityCards,
  metrics,
  projects,
  whatIBuild
} from "../content/site";

export default function HomePage() {
  const statusOrder = {
    Shipped: 0,
    "In Progress": 1,
    Planned: 2
  } as const;

  const featured = [...projects]
    .sort((a, b) => statusOrder[a.status] - statusOrder[b.status])
    .slice(0, 4);

  return (
    <main className="page-shell">
      <HeroSpaceField>
        <p className="eyebrow">Engineer | Architect | AI Systems</p>
        <h1>Practical AI systems, built on strong software architecture</h1>
        <p className="lead">
          I design and build systems connecting software fundamentals with modern AI: RAG
          pipelines, agent workflows, evaluation, and production-ready AWS delivery.
        </p>
        <div className="hero-actions">
          <Link className="button primary" href="/projects">
            View Projects
          </Link>
          <Link className="button secondary" href="/about">
            About My Approach
          </Link>
          <Link className="button ghost" href="/work-with-me">
            Collaboration
          </Link>
        </div>
      </HeroSpaceField>

      <section className="section">
        <div className="grid three">
          {metrics.map((metric) => (
            <article className="metric" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-label="Expertise areas">
        <p className="eyebrow">Capabilities</p>
        <h2>Strong engineering foundation with practical AI implementation</h2>
        <div className="grid three" style={{ marginTop: "1rem" }}>
          {capabilityCards.map((item) => (
            <article key={item.title} className="card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">What I Build</p>
        <h2>From architecture decisions to working systems</h2>
        <ul className="list-clean">
          {whatIBuild.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <section className="section">
        <p className="eyebrow">Selected Work</p>
        <h2>Case studies that show technical depth, not just feature lists</h2>
        <div className="grid two" style={{ marginTop: "1rem" }}>
          {featured.map((project) => (
            <article className="card" key={project.slug}>
              <p className="status">{project.status}</p>
              <h3 style={{ marginTop: "0.45rem" }}>{project.title}</h3>
              <p>{project.value}</p>
              <div className="pill-list">
                {project.stack.slice(0, 4).map((tag) => (
                  <span className="pill" key={`${project.slug}-${tag}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="hero-actions" style={{ marginTop: "0.95rem" }}>
                <Link className="button secondary" href={`/projects/${project.slug}`}>
                  View Case Study
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Engineering Principles</p>
        <h2>How I evaluate technical decisions</h2>
        <div className="grid two" style={{ marginTop: "1rem" }}>
          {architecturePrinciples.map((principle) => (
            <article className="card" key={principle}>
              <p>{principle}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section hero">
        <p className="eyebrow">Career Focus</p>
        <h2>Building visible proof of architecture and implementation skill</h2>
        <p className="lead">
          This portfolio is designed to show real software engineering execution, architecture
          thinking, and applied AI learning. I am open to collaborating on the right consulting or
          contract projects, but the primary goal is showcasing high-quality technical work.
        </p>
        <div className="hero-actions">
          <Link className="button primary" href="/projects">
            Explore Project Work
          </Link>
          <Link className="button secondary" href="/work-with-me">
            Work With Me
          </Link>
        </div>
      </section>
    </main>
  );
}
