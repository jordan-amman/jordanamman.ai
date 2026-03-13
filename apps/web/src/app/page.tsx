const tracks = [
  {
    title: "RAG Systems",
    description:
      "Production-style retrieval pipelines with citations, evaluation, and cost-aware AWS deployment."
  },
  {
    title: "Autonomous Agents",
    description:
      "Tool-using agents with planning, observability, and failure-safe execution loops."
  },
  {
    title: "Local LLM Engineering",
    description:
      "Practical local model workflows for coding, evaluation, and enterprise constraints."
  },
  {
    title: "AI Infrastructure",
    description:
      "Architecture notes and experiments focused on latency, cost, and reliability at scale."
  }
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">Jordan Amman</p>
        <h1>AI Systems Architect</h1>
        <p className="lead">
          Building practical AI systems with AWS-first architecture: RAG, agents, evaluation,
          and platform engineering.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="/projects">
            View Projects
          </a>
          <a className="button secondary" href="/work-with-me">
            Hire Me
          </a>
        </div>
      </section>

      <section className="track-grid" aria-label="Core portfolio tracks">
        {tracks.map((track) => (
          <article key={track.title} className="card">
            <h2>{track.title}</h2>
            <p>{track.description}</p>
          </article>
        ))}
      </section>

      <section className="footnote">
        <p>
          Starter scaffold complete. Next steps: route pages, connect Lambda API, deploy to AWS
          with a cost-first baseline.
        </p>
      </section>
    </main>
  );
}
