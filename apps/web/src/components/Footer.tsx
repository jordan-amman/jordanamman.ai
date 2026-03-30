import Link from "next/link";
import { navLinks } from "../content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-grid">
        <div>
          <p className="footer-title">Jordan Amman</p>
          <p className="footer-copy">
            AI systems engineer and software architect building AWS-first products from architecture to deployment.
          </p>
          <p className="footer-note">Built with Next.js, TypeScript, and Terraform.</p>
        </div>

        <div>
          <p className="footer-heading">Navigation</p>
          <ul className="footer-links">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="footer-heading">Connect</p>
          <ul className="footer-links">
            <li>
              <a href="https://github.com/jordan-amman" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="mailto:hello@jordanamman.ai">hello@jordanamman.ai</a>
            </li>
          </ul>
        </div>
      </div>
      <p className="footer-copyright">{year} Jordan Amman. All rights reserved.</p>
    </footer>
  );
}
