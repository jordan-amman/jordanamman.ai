"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

interface ProjectTypeOption {
  value: string;
  label: string;
}

interface ContactFormProps {
  projectTypeOptions: ProjectTypeOption[];
  budgetLabel?: string;
}

export default function ContactForm({
  projectTypeOptions,
  budgetLabel = "Timeline and budget (optional)",
}: ContactFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setError(null);

    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("https://api.jordanamman.ai/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await res.json();

      if (!res.ok) {
        setError(body.error ?? "Something went wrong. Please try again.");
        setState("error");
      } else {
        setState("success");
      }
    } catch {
      setError("Could not reach the server. Please try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="card" style={{ marginTop: "1rem" }}>
        <h3>Message received</h3>
        <p>Thanks — I&apos;ll review your request and be in touch soon.</p>
      </div>
    );
  }

  return (
    <form className="form-grid" style={{ marginTop: "1rem" }} onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" placeholder="Your name" required />
      </label>
      <label>
        Email
        <input name="email" type="email" placeholder="you@company.com" required />
      </label>
      <label>
        Company
        <input name="company" placeholder="Company" />
      </label>
      <label>
        Project type
        <select name="projectType" defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          {projectTypeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        {budgetLabel}
        <input name="budget" placeholder="Ex: 8 weeks, 20k budget" />
      </label>
      <label style={{ gridColumn: "1 / -1" }}>
        Message
        <textarea
          name="message"
          placeholder="Project context, desired outcome, and constraints"
          required
        />
      </label>
      {state === "error" && error && (
        <p style={{ gridColumn: "1 / -1", color: "#c0392b", margin: 0 }}>{error}</p>
      )}
      <button
        type="submit"
        disabled={state === "submitting"}
        className="button primary"
        style={{ gridColumn: "1 / -1", justifySelf: "start" }}
      >
        {state === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
