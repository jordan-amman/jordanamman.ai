export default function WorkWithMePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">Work With Me</p>
        <h1>Hire For AI Systems Work</h1>
        <p className="lead">
          Available for contract and consulting across RAG systems, agents, and AWS AI
          architecture.
        </p>
      </section>

      <section className="card" style={{ maxWidth: "680px" }}>
        <h2>Contact Endpoint</h2>
        <p>POST request target: `/contact` via API Gateway HTTP API.</p>
        <p>
          Next step: connect this page to a form that posts to the Lambda handler in
          `apps/api/src/handlers/contact.ts`.
        </p>
      </section>
    </main>
  );
}
