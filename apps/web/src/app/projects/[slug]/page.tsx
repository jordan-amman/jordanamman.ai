import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../../content/site";

type ProjectDetailProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default function ProjectDetailPage({ params }: ProjectDetailProps) {
  const project = projects.find((item) => item.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="page-shell">
      <section className="hero section">
        <p className="eyebrow">Project Case Study</p>
        <h1>{project.title}</h1>
        <p className="lead">{project.summary}</p>
        <div className="pill-list">
          <span className="status">{project.status}</span>
          {project.stack.map((tag) => (
            <span className="pill" key={`${project.slug}-${tag}`}>
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="grid two">
          <article className="card">
            <h2>Problem</h2>
            <p>{project.problem}</p>
          </article>
          <article className="card">
            <h2>Goal</h2>
            <p>{project.goal}</p>
          </article>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Architecture Overview</p>
        <h2>System shape and flow</h2>
        {project.diagramUrl && (
          <article className="card" style={{ marginTop: "1rem" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.diagramUrl}
              alt={`Architecture diagram: ${project.title}`}
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          </article>
        )}
        <article className="card" style={{ marginTop: "1rem" }}>
          <ul className="list-clean">
            {project.architecture.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section">
        <div className="grid two">
          <article className="card">
            <h3>Key Features</h3>
            <ul className="list-clean">
              {project.features.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h3>Tradeoffs and Design Decisions</h3>
            <ul className="list-clean">
              {project.tradeoffs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h3>Challenges</h3>
            <ul className="list-clean">
              {project.challenges.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h3>Results and Lessons Learned</h3>
            <ul className="list-clean">
              {project.results.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section">
        <article className="card">
          <h2>Next Steps</h2>
          <ul className="list-clean">
            {project.nextSteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      {project.demos?.length ? (
        <section className="section">
          <p className="eyebrow">Demo Paths</p>
          <h2>Video placeholders and integration flows</h2>
          <div className="grid two" style={{ marginTop: "1rem" }}>
            {project.demos.map((demo) => (
              <article className="card" key={demo.title}>
                <h3>{demo.title}</h3>
                <p>{demo.description}</p>
                <p style={{ marginTop: "0.7rem" }}>
                  <strong>{demo.placeholder}</strong>
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section">
        <Link className="button secondary" href="/projects">
          Back to Projects
        </Link>
      </section>
    </main>
  );
}
