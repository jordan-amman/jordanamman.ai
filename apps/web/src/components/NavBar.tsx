"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "../content/site";

export function NavBar() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand">
          jordanamman.ai
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link key={link.href} href={link.href} className={`nav-link${isActive ? " is-active" : ""}`}>
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Link href="/work-with-me" className="button primary nav-cta">
          Collaborate
        </Link>
      </div>
    </header>
  );
}
