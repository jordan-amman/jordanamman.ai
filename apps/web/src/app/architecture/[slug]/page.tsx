import Link from "next/link";
import { notFound } from "next/navigation";
import { architectureNotes } from "../../../content/site";

type ArchitectureDetailProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return architectureNotes.map((note) => ({ slug: note.slug }));
}

export default function ArchitectureDetailPage({ params }: ArchitectureDetailProps) {
  const note = architectureNotes.find((item) => item.slug === params.slug);

  if (!note) {
    notFound();
  }

  return (
    <main className="page-shell">
      <section className="hero section">
        <p className="eyebrow">Architecture Note</p>
        <h1>{note.title}</h1>
        <p className="lead">{note.summary}</p>
        <div className="pill-list">
          <span className="pill">Reference Architecture</span>
          {note.tags?.map((tag) => (
            <span className="pill" key={`${note.slug}-${tag}`}>
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="grid two">
          <article className="card">
            <h2>Context</h2>
            <p>{note.context}</p>
          </article>
          <article className="card">
            <h2>Goal</h2>
            <p>{note.goal}</p>
          </article>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Architecture Overview</p>
        <h2>System design and patterns</h2>
        {"diagramUrl" in note && typeof note.diagramUrl === "string" && (
          <article className="card" style={{ marginTop: "1rem" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={note.diagramUrl}
              alt={`Architecture diagram: ${note.title}`}
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          </article>
        )}
        <article className="card" style={{ marginTop: "1rem" }}>
          <ul className="list-clean">
            {note.components?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section">
        <div className="grid two">
          <article className="card">
            <h3>Key Decisions</h3>
            <ul className="list-clean">
              {note.decisions?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h3>Tradeoffs</h3>
            <ul className="list-clean">
              {note.tradeoffs?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h3>Technology Stack</h3>
            <ul className="list-clean">
              {note.stack?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h3>Considerations</h3>
            <ul className="list-clean">
              {note.considerations?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section">
        <article className="card">
          <h2>When to Use This Pattern</h2>
          <ul className="list-clean">
            {note.whenToUse?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section">
        <article className="card">
          <h2>When to Avoid</h2>
          <ul className="list-clean">
            {note.whenToAvoid?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section">
        <article className="card">
          <h2>Further Reading</h2>
          <ul className="list-clean">
            {note.furtherReading?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section">
        <Link className="button secondary" href="/architecture">
          Back to Architecture Notes
        </Link>
      </section>
    </main>
  );
}
