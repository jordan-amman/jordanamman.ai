import Link from "next/link";
import { projects } from "../../content/site";

export default function ProjectsPage() {
  const shipped = projects.filter((item) => item.status === "Shipped");
  const inProgress = projects.filter((item) => item.status === "In Progress");
  const planned = projects.filter((item) => item.status === "Planned");

  return (
    <main className="page-shell">
      <section className="hero section">
        <p className="eyebrow">Projects</p>
        <h1>AI Systems Portfolio and Case Studies</h1>
        <p className="lead">
          Real engineering projects focused on architecture clarity, production tradeoffs, and
          practical delivery across AI workflows and AWS infrastructure.
        </p>
      </section>

      <section className="section">
        <p className="eyebrow">Featured Work</p>
        <h2>Detailed projects with architecture, constraints, and lessons learned</h2>
        <div className="grid two" style={{ marginTop: "1rem" }}>
          {projects.map((project) => (
            <article className="card" key={project.slug}>
              <p className="status">{project.status}</p>
              <h3 style={{ marginTop: "0.45rem" }}>{project.title}</h3>
              <p>{project.summary}</p>
              <p style={{ marginTop: "0.5rem" }}>
                <strong>Outcome:</strong> {project.outcome}
              </p>
              <div className="pill-list">
                {project.stack.map((tag) => (
                  <span className="pill" key={`${project.slug}-${tag}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="hero-actions" style={{ marginTop: "0.9rem" }}>
                <Link className="button secondary" href={`/projects/${project.slug}`}>
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Pipeline</p>
        <h2>Roadmap and build momentum</h2>
        <div className="grid three" style={{ marginTop: "1rem" }}>
          <article className="card">
            <h3>Shipped</h3>
            <ul className="list-clean">
              {shipped.map((item) => (
                <li key={item.slug}>{item.title}</li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h3>In Progress</h3>
            <ul className="list-clean">
              {inProgress.map((item) => (
                <li key={item.slug}>{item.title}</li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h3>Planned</h3>
            <ul className="list-clean">
              {planned.map((item) => (
                <li key={item.slug}>{item.title}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}
