import ContactForm from "../../components/ContactForm";

const projectTypeOptions = [
  { value: "architecture", label: "Architecture and advisory" },
  { value: "prototype", label: "AI prototype build" },
  { value: "backend", label: "API and backend engineering" },
  { value: "other", label: "Other" },
];

export default function ContactPage() {
  return (
    <main className="page-shell">
      <section className="hero section">
        <p className="eyebrow">Contact</p>
        <h1>Let&apos;s talk about your system, roadmap, or architecture challenge</h1>
        <p className="lead">
          Reach out if you are building AI-enabled products, evolving backend systems, or need
          architecture support for AWS delivery. Include goals, timeline, and constraints so I can
          respond with a focused plan.
        </p>
      </section>

      <section className="section">
        <div className="grid two">
          <article className="card">
            <h2>Who should reach out</h2>
            <ul className="list-clean">
              <li>Founders planning AI-enabled product launches</li>
              <li>Teams modernizing APIs and backend architecture</li>
              <li>Engineering leaders needing architecture review support</li>
              <li>Clients looking for contract or consulting execution</li>
            </ul>
          </article>
          <article className="card">
            <h2>Direct channels</h2>
            <p>Email: hello@jordanamman.ai</p>
            <p style={{ marginTop: "0.5rem" }}>GitHub: github.com/jordan-amman</p>
            <p style={{ marginTop: "0.5rem" }}>LinkedIn: linkedin.com/in/jordan-amman</p>
          </article>
        </div>
      </section>

      <section className="section hero">
        <h2>Project inquiry form</h2>
        <ContactForm
          projectTypeOptions={projectTypeOptions}
          budgetLabel="Timeline and budget (optional)"
        />
      </section>
    </main>
  );
}
