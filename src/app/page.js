import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Github, Linkedin } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import Reveal from "@/components/Reveal";
import ProjectDiagram from "@/components/ProjectDiagram";
import TimelineProgress from "@/components/TimelineProgress";
import projects from "@/data/portfolio-projects.json";
import experience from "@/data/experience.json";

const socials = [
  { label: "GitHub", href: "https://github.com/hassanhashmi16", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hassansaeedhashmi", icon: Linkedin },
];

const marqueeWords = ["retrieval", "agents", "evaluation", "systems", "evidence", "full-stack", "research", "craft"];

function SectionLabel({ number, children }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span className="section-label-line" />
      <span>{children}</span>
    </div>
  );
}

function ProjectBlock({ project, index }) {
  return (
    <Reveal className={`work-block${index % 2 === 1 ? " is-flipped" : ""}`} delay={index * 80}>
      <div className="work-media">
        <ProjectDiagram type={project.diagram} />
      </div>
      <div className="work-copy">
        <span className="work-num">{String(index + 1).padStart(2, "0")}</span>
        <p className="eyebrow">{project.type}</p>
        <h3>{project.title}</h3>
        <p className="work-lede">{project.lede}</p>
        <p className="work-desc">{project.summary}</p>
        <ul className="work-highlights">
          {project.highlights.map((point) => <li key={point}>{point}</li>)}
        </ul>
        <div className="tag-list">
          {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </div>
        <div className="work-actions">
          <a className="text-link" href={project.href} target="_blank" rel="noreferrer">
            View source <ArrowUpRight size={15} />
          </a>
          <span className="work-status">{project.status}</span>
        </div>
      </div>
    </Reveal>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <Link className="wordmark" href="#home" aria-label="Hassan Hashmi, home">HH<span>.</span></Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#about">About</a><a href="#experience">Experience</a><a href="#work">Work</a><a href="#writing">Writing</a>
        </nav>
        <div className="header-actions">
          <a className="contact-link" href="#contact">Let’s talk <ArrowUpRight size={14} /></a>
          <ThemeToggle />
        </div>
      </header>
      <nav className="mobile-nav" aria-label="Mobile navigation"><a href="#about">About</a><a href="#experience">Experience</a><a href="#work">Work</a><a href="#writing">Writing</a></nav>

      {/* 1 — HERO: full-bleed portrait scene */}
      <section className="hero" id="home">
        <Reveal className="hero-portrait" delay={140}>
          <Image src="/images/hassan-portrait.webp" alt="Portrait of Hassan Hashmi" fill priority sizes="(max-width: 760px) 100vw, 46vw" className="portrait-image" />
          <span className="portrait-mark" aria-hidden="true">H.</span>
          <div className="portrait-caption"><span>HASSAN HASHMI</span><span>AI · ENGINEERING · SYSTEMS</span></div>
        </Reveal>
        <div className="hero-copy">
          <Reveal><p className="eyebrow"><span className="status-dot" /> AI engineer · full-stack developer</p></Reveal>
          <Reveal delay={90}><h1>I build thoughtful<br /><em>AI experiences.</em></h1></Reveal>
          <Reveal delay={180}><p className="hero-summary">I’m Hassan — an AI engineer and full-stack developer interested in making complex systems feel clear, useful, and human.</p></Reveal>
          <Reveal delay={260} className="hero-actions">
            <a className="text-link" href="#work">Explore selected work <ArrowDown size={15} /></a>
            <span className="hero-note">Based in Lahore, Pakistan</span>
          </Reveal>
        </div>
        <div className="hero-footer"><span>Independent thinking, carefully built.</span><span>Scroll to explore ↓</span></div>
      </section>

      {/* chapter break */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <span className="marquee-group" key={copy}>
              {marqueeWords.map((word) => <span className="marquee-item" key={word + copy}>{word}<i>·</i></span>)}
            </span>
          ))}
        </div>
      </div>

      {/* 2 — ABOUT: editorial manifesto spread */}
      <section className="about" id="about">
        <div className="section-wrap">
          <SectionLabel number="01">A little about me</SectionLabel>
          <div className="about-spread">
            <Reveal className="about-quote-wrap">
              <h2 className="about-quote">Curiosity is where the work <em>begins.</em></h2>
            </Reveal>
            <Reveal delay={120} className="about-rail">
              <p className="about-lede">I’m a computer science student at FAST NUCES Lahore, drawn to the space where software engineering meets applied AI. I like understanding how a system works all the way through, then shaping it into something people can actually use.</p>
              <p className="about-lede">My work moves between retrieval, agents, evaluation, and the full-stack product details that make those ideas useful outside a notebook.</p>
              <dl className="about-facts">
                <div><dt>Education</dt><dd>B.Sc. Computer Science<br />FAST NUCES, Lahore</dd></div>
                <div><dt>Expected</dt><dd>June 2028</dd></div>
                <div><dt>Focus</dt><dd>Retrieval · agents · evaluation</dd></div>
                <div><dt>Based in</dt><dd>Lahore, Pakistan</dd></div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3 — EXPERIENCE: scroll-drawn timeline */}
      <section className="experience" id="experience">
        <div className="section-wrap">
          <SectionLabel number="02">Experience</SectionLabel>
          <div className="exp-head">
            <Reveal><h2>Where I’ve<br /><em>been building.</em></h2></Reveal>
            <Reveal delay={100}><p>Different teams and contexts, one steady curiosity about how useful software gets made.</p></Reveal>
          </div>
          <TimelineProgress>
            {experience.map((item, index) => (
              <Reveal className="tl-entry" key={item.id} delay={index * 100}>
                <span className="tl-dot" aria-hidden="true" />
                <div className="tl-year">{item.year}</div>
                <div className="tl-body">
                  <h3>{item.role}</h3>
                  <p className="tl-org">{item.organization}</p>
                  <p className="tl-desc">{item.description}</p>
                  <span className="tl-type">{item.type}</span>
                </div>
              </Reveal>
            ))}
          </TimelineProgress>
        </div>
      </section>

      {/* 4 — WORK: alternating case-study blocks with media */}
      <section className="work" id="work">
        <div className="section-wrap">
          <SectionLabel number="03">Selected work</SectionLabel>
          <div className="work-head">
            <Reveal><h2>Ideas, made<br /><em>inspectable.</em></h2></Reveal>
            <Reveal delay={100}><p>A few ongoing explorations in AI engineering, research workflows, and the systems around them.</p></Reveal>
          </div>
          <div className="work-blocks">
            {projects.map((project, index) => <ProjectBlock key={project.id} project={project} index={index} />)}
          </div>
          <a className="text-link work-more" href="https://github.com/hassanhashmi16" target="_blank" rel="noreferrer">Browse all repositories <ArrowUpRight size={15} /></a>
        </div>
      </section>

      {/* 5 — WRITING: magazine table of contents */}
      <section className="writing" id="writing">
        <div className="section-wrap">
          <SectionLabel number="04">Writing & notes</SectionLabel>
          <div className="writing-head">
            <Reveal><h2>Notes &<br /><em>marginalia.</em></h2></Reveal>
            <Reveal delay={100}><p>Notes from the work: useful ideas, turning points, and the occasional lesson that took longer than expected.</p></Reveal>
          </div>
          <Reveal delay={140} className="toc">
            <div className="toc-row is-empty">
              <span className="toc-num">01</span>
              <span className="toc-title">Issue 01 — forthcoming</span>
              <span className="toc-meta">In progress</span>
            </div>
            <p className="toc-note">The first notes are taking shape. Articles, milestones, and build notes will appear here as they’re ready.</p>
          </Reveal>
        </div>
      </section>

      {/* 6 — CONTACT: inverted closing poster */}
      <section className="contact" id="contact">
        <div className="section-wrap contact-inner">
          <p className="eyebrow">Have a thoughtful problem in mind?</p>
          <h2>Let’s make<br /><em>something matter.</em></h2>
          <a className="contact-email" href="mailto:hassansaeed0050@gmail.com">hassansaeed0050@gmail.com</a>
          <div className="contact-socials">
            {socials.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"><Icon size={16} strokeWidth={1.5} />{label}<ArrowUpRight size={14} /></a>
            ))}
          </div>
        </div>
        <footer className="site-footer section-wrap"><Link className="wordmark" href="#home">HH<span>.</span></Link><span>Designed with intention. Built with curiosity.</span><a href="#home">Back to top ↑</a></footer>
      </section>
    </main>
  );
}
