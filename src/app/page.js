import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import Reveal from "@/components/Reveal";
import ProjectDiagram from "@/components/ProjectDiagram";
import TimelineProgress from "@/components/TimelineProgress";
import ContactForm from "@/components/ContactForm";
import { getProjects, getExperience } from "@/lib/content";

const socials = [
  { label: "GitHub", href: "https://github.com/hassanhashmi16", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hassansaeedhashmi", icon: Linkedin },
];

const exampleNotes = [
  { num: "01", kicker: "Build note", title: "Why citations still need checking", meta: "Nov 2026 · 6 min" },
  { num: "02", kicker: "Milestone", title: "A bounded queue for long investigations", meta: "Oct 2026 · 4 min" },
  { num: "03", kicker: "Draft", title: "Notes on evaluating retrieval", meta: "Draft" },
];

function SectionLabel({ number, children }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span className="section-label-line" />
      <span>{children}</span>
    </div>
  );
}

function Media({ item }) {
  if (item.kind === "diagram") {
    return (
      <div className="gallery-item is-diagram">
        <ProjectDiagram type={item.type} />
      </div>
    );
  }
  if (item.kind === "stat") {
    return (
      <div className="gallery-item is-stat">
        <span className="stat-value">{item.value}</span>
        <span className="stat-body">
          <span className="stat-label">{item.label}</span>
          {item.note && <span className="stat-note">{item.note}</span>}
        </span>
      </div>
    );
  }
  return null;
}

function ProjectBlock({ project, index }) {
  return (
    <Reveal className={`work-block${index % 2 === 1 ? " is-flipped" : ""}`} delay={index * 80}>
      <div className="work-gallery">
        {project.media.map((item, i) => <Media key={i} item={item} />)}
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
          <span className="work-links">
            {project.live && (
              <a className="text-link" href={project.live} target="_blank" rel="noreferrer">
                Live site <ArrowUpRight size={15} />
              </a>
            )}
            <a className="text-link" href={project.href} target="_blank" rel="noreferrer">
              View source <ArrowUpRight size={15} />
            </a>
          </span>
          <span className="work-status">{project.status}</span>
        </div>
      </div>
    </Reveal>
  );
}

export default async function Home() {
  const projects = await getProjects();
  const experience = await getExperience();
  return (
    <main>
      <SiteHeader />

      {/* 1 — HERO: portrait in a framed panel, space on the side */}
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <Reveal><p className="eyebrow"><span className="status-dot" /> AI engineer · full-stack developer</p></Reveal>
          <Reveal delay={90}><h1>I build thoughtful<br /><em>AI experiences.</em></h1></Reveal>
          <Reveal delay={180}><p className="hero-summary">I’m Hassan — an AI engineer and full-stack developer interested in making complex systems feel <strong className="mark">clear, useful, and human</strong>.</p></Reveal>
          <Reveal delay={260} className="hero-actions">
            <a className="text-link" href="#work">Explore selected work <ArrowDown size={15} /></a>
            <a className="text-link" href="/resume.pdf" download>Résumé <Download size={15} /></a>
            <span className="hero-note">Based in Lahore, Pakistan</span>
          </Reveal>
        </div>
        <Reveal className="portrait-frame" delay={120}>
          <Image src="/images/hassan-portrait.webp" alt="Portrait of Hassan Hashmi" fill priority sizes="(max-width: 760px) 88vw, 42vw" className="portrait-image" />
          <div className="portrait-caption"><span>HASSAN HASHMI</span><span>AI · ENGINEERING · SYSTEMS</span></div>
          <span className="portrait-mark" aria-hidden="true">H.</span>
        </Reveal>
        <div className="hero-footer"><span>Independent thinking, carefully built.</span><span>Scroll to explore ↓</span></div>
      </section>

      {/* 2 — ABOUT: editorial manifesto spread */}
      <section className="about">
        <div className="section-wrap" id="about">
          <SectionLabel number="01">A little about me</SectionLabel>
          <div className="about-spread">
            <Reveal className="about-quote-wrap">
              <h2 className="about-quote">Curiosity is where the work <em>begins.</em></h2>
            </Reveal>
            <Reveal delay={120} className="about-rail">
              <p className="about-lede">I’m a computer science student at <strong>FAST NUCES Lahore</strong>, drawn to the space where software engineering meets <span className="mark">applied AI</span>. I like understanding how a system works all the way through, then shaping it into something people can actually use.</p>
              <p className="about-lede">My work moves between <strong>retrieval, agents, and evaluation</strong>, and the full-stack product details that make those ideas useful outside a notebook.</p>
              <dl className="about-facts">
                <div><dt>Education</dt><dd>B.Sc. Computer Science<br /><strong>FAST NUCES, Lahore</strong></dd></div>
                <div><dt>Expected</dt><dd>June 2028</dd></div>
                <div><dt>Focus</dt><dd>Retrieval · agents · evaluation</dd></div>
                <div><dt>Based in</dt><dd>Lahore, Pakistan</dd></div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3 — EXPERIENCE: scroll-drawn timeline */}
      <section className="experience">
        <div className="section-wrap" id="experience">
          <SectionLabel number="02">Experience</SectionLabel>
          <div className="exp-head">
            <Reveal><h2>Where I’ve<br /><em>been building.</em></h2></Reveal>
            <Reveal delay={100}><p>Different teams and contexts, one steady curiosity about how useful software gets made.</p></Reveal>
          </div>
          <TimelineProgress>
            {experience.map((item, index) => (
              <Reveal className="tl-entry" key={item.id} delay={index * 100}>
                <span className="tl-dot" aria-hidden="true" />
                <div className="tl-meta">
                  <div className="tl-year">{item.year}</div>
                  <span className="tl-date">{item.date}</span>
                </div>
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

      {/* 4 — WORK: alternating case-study blocks with multiple media */}
      <section className="work">
        <div className="section-wrap" id="work">
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

      {/* 5 — WRITING: magazine table of contents with example entries */}
      <section className="writing">
        <div className="section-wrap" id="writing">
          <SectionLabel number="04">Writing & notes</SectionLabel>
          <div className="writing-head">
            <Reveal><h2>Notes &<br /><em>marginalia.</em></h2></Reveal>
            <Reveal delay={100}><p>Notes from the work: useful ideas, turning points, and the occasional lesson that took longer than expected.</p></Reveal>
          </div>
          <Reveal delay={140} className="toc">
            {exampleNotes.map((note) => (
              <article className="toc-row" key={note.num}>
                <span className="toc-num">{note.num}</span>
                <span className="toc-title-wrap">
                  <span className="toc-kicker">{note.kicker}</span>
                  <span className="toc-title">{note.title}</span>
                </span>
                <span className="toc-meta">{note.meta}</span>
              </article>
            ))}
            <p className="toc-note">Example entries shown above — these are placeholders. Real articles, milestones, and build notes will replace them.</p>
          </Reveal>
        </div>
      </section>

      {/* 6 — CONTACT: inverted poster with form */}
      <section className="contact">
        <div className="section-wrap contact-inner" id="contact">
          <p className="eyebrow">Have a thoughtful problem in mind?</p>
          <h2>Let’s make<br /><em>something matter.</em></h2>
          <div className="contact-grid">
            <div className="contact-info">
              <p className="contact-blurb">I’m always interested in good questions, ambitious ideas, and conversations about building useful things with AI.</p>
              <a className="contact-email" href="mailto:hassansaeed0050@gmail.com">hassansaeed0050@gmail.com</a>
              <a className="text-link contact-resume" href="/resume.pdf" download>Download résumé <Download size={15} /></a>
              <div className="contact-socials">
                {socials.map(({ label, href, icon: Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"><Icon size={16} strokeWidth={1.5} />{label}<ArrowUpRight size={14} /></a>
                ))}
              </div>
            </div>
            <Reveal delay={100} className="contact-form-wrap">
              <ContactForm />
            </Reveal>
          </div>
        </div>
        <footer className="site-footer section-wrap"><Link className="wordmark" href="#home">HH<span>.</span></Link><span>Designed with intention. Built with curiosity.</span><a href="#home">Back to top ↑</a></footer>
      </section>
    </main>
  );
}
