const projectSeeds = [
  "AWS RAG Tutor",
  "Research Agent",
  "Local LLM Coding Assistant",
  "LLM Evaluation Lab",
  "AI Infrastructure Architectures"
];

export default function ProjectsPage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">Projects</p>
        <h1>AI Systems Portfolio</h1>
        <p className="lead">These projects are being built as production-style demos.</p>
      </section>
      <section className="track-grid">
        {projectSeeds.map((name) => (
          <article className="card" key={name}>
            <h2>{name}</h2>
            <p>Status: planned/in-progress. Detailed case study coming soon.</p>
          </article>
        ))}
      </section>
    </main>
  );
}
