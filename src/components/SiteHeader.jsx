"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  ["About", "about"],
  ["Experience", "experience"],
  ["Work", "work"],
  ["Writing", "writing"],
];

export default function SiteHeader({ archive = false }) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const diff = y - lastY.current;
        if (y < 100) setHidden(false);
        else if (diff > 6) setHidden(true);
        else if (diff < -6) setHidden(false);
        lastY.current = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = (id) => (archive ? `/#${id}` : `#${id}`);

  return (
    <header className={`site-header${hidden ? " is-hidden" : ""}`}>
      <a className="wordmark" href={archive ? "/#home" : "#home"} aria-label="Hassan Hashmi, home">HH<span>.</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([label, id]) => <a key={label} href={href(id)}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <a className="contact-link" href={href("contact")}>Let’s talk <ArrowUpRight size={14} /></a>
        <ThemeToggle />
      </div>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {links.map(([label, id]) => <a key={label} href={href(id)}>{label}</a>)}
      </nav>
    </header>
  );
}
