import { engagementTypes, faqs, services } from "../../content/site";
import ContactForm from "../../components/ContactForm";

const workTypeOptions = [
  { value: "consulting", label: "Consulting" },
  { value: "contract", label: "Contract engineering" },
  { value: "advisory", label: "Architecture advisory" },
  { value: "build", label: "Project build" },
];

export default function WorkWithMePage() {
  return (
    <main className="page-shell">
      <section className="hero section">
        <p className="eyebrow">Work With Me</p>
        <h1>Collaboration for software architecture and practical AI engineering</h1>
        <p className="lead">
          This page is for teams that may want to collaborate. My primary focus remains showcasing
          hands-on engineering and architecture capability through real project work.
        </p>
      </section>

      <section className="section">
        <p className="eyebrow">Services</p>
        <h2>What I can help you build</h2>
        <div className="grid three" style={{ marginTop: "1rem" }}>
          {services.map((service) => (
            <article className="card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.outcome}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Engagement Types</p>
        <h2>Ways we can work together when there is a strong technical fit</h2>
        <div className="grid two" style={{ marginTop: "1rem" }}>
          <article className="card">
            <ul className="list-clean">
              {engagementTypes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h3>Best fit</h3>
            <ul className="list-clean">
              <li>Startups building AI products</li>
              <li>Founders needing technical architecture direction</li>
              <li>Teams shipping AWS-backed AI APIs</li>
              <li>Organizations improving reliability and observability</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Process</p>
        <h2>How engagements usually run</h2>
        <div className="grid two" style={{ marginTop: "1rem" }}>
          <article className="card">
            <h3>1. Discovery</h3>
            <p>Clarify goals, constraints, and measurable outcomes.</p>
          </article>
          <article className="card">
            <h3>2. Architecture and Design</h3>
            <p>Define the delivery plan, service topology, and risk controls.</p>
          </article>
          <article className="card">
            <h3>3. Build and Prototype</h3>
            <p>Implement a production-minded baseline with clear milestones.</p>
          </article>
          <article className="card">
            <h3>4. Iterate and Handoff</h3>
            <p>Improve quality, document tradeoffs, and transfer knowledge.</p>
          </article>
        </div>
      </section>

      <section className="section hero">
        <p className="eyebrow">Contact</p>
        <h2>Open to selective consulting and contract collaboration</h2>
        <ContactForm
          projectTypeOptions={workTypeOptions}
          budgetLabel="Budget and timeline (optional)"
        />
      </section>

      <section className="section">
        <p className="eyebrow">FAQ</p>
        <h2>Common questions</h2>
        <div className="grid two" style={{ marginTop: "1rem" }}>
          {faqs.map((item) => (
            <article className="card" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
