import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import Reveal from "@/components/Reveal";
import RichText from "@/components/RichText";
import ProjectDiagram from "@/components/ProjectDiagram";
import TimelineProgress from "@/components/TimelineProgress";
import ContactForm from "@/components/ContactForm";
import { getProjects, getExperience, getSiteContent } from "@/lib/content";

const socialIcons = { GitHub: Github, LinkedIn: Linkedin };

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
  const [site, projects, experience] = await Promise.all([
    getSiteContent(),
    getProjects(),
    getExperience(),
  ]);

  return (
    <main>
      <SiteHeader />

      {/* 1 — HERO: portrait in a framed panel, space on the side */}
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <Reveal><p className="eyebrow"><span className="status-dot" /> {site.intro.eyebrow}</p></Reveal>
          <Reveal delay={90}><RichText as="h1" text={site.intro.headline} /></Reveal>
          <Reveal delay={180}><RichText as="p" className="hero-summary" text={site.intro.summary} /></Reveal>
          <Reveal delay={260} className="hero-actions">
            <a className="text-link" href="#work">Explore selected work <ArrowDown size={15} /></a>
            <a className="text-link" href={site.intro.resumeUrl} download>Résumé <Download size={15} /></a>
            <span className="hero-note">{site.intro.location}</span>
          </Reveal>
        </div>
        <Reveal className="portrait-frame" delay={120}>
          <Image src="/images/hassan-portrait.webp" alt={site.intro.portraitAlt} fill priority sizes="(max-width: 760px) 88vw, 42vw" className="portrait-image" />
          <div className="portrait-caption"><span>{site.intro.captionLeft}</span><span>{site.intro.captionRight}</span></div>
          <span className="portrait-mark" aria-hidden="true">H.</span>
        </Reveal>
        <div className="hero-footer"><span>Independent thinking, carefully built.</span><span>Scroll to explore ↓</span></div>
      </section>

      {/* 2 — ABOUT: editorial manifesto spread */}
      <section className="about">
        <div className="section-wrap" id="about">
          <SectionLabel number="01">{site.about.label}</SectionLabel>
          <div className="about-spread">
            <Reveal className="about-quote-wrap">
              <RichText as="h2" className="about-quote" text={site.about.quote} />
            </Reveal>
            <Reveal delay={120} className="about-rail">
              {site.about.paragraphs.map((paragraph, i) => (
                <RichText key={i} as="p" className="about-lede" text={paragraph} />
              ))}
              <dl className="about-facts">
                {site.about.facts.map((fact, i) => (
                  <div key={i}>
                    <dt>{fact.label}</dt>
                    <dd><RichText text={fact.value} /></dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3 — EXPERIENCE: scroll-drawn timeline */}
      <section className="experience">
        <div className="section-wrap" id="experience">
          <SectionLabel number="02">{site.experience.label}</SectionLabel>
          <div className="exp-head">
            <Reveal><RichText as="h2" text={site.experience.heading} /></Reveal>
            <Reveal delay={100}><p>{site.experience.intro}</p></Reveal>
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
          <SectionLabel number="03">{site.work.label}</SectionLabel>
          <div className="work-head">
            <Reveal><RichText as="h2" text={site.work.heading} /></Reveal>
            <Reveal delay={100}><p>{site.work.intro}</p></Reveal>
          </div>
          <div className="work-blocks">
            {projects.map((project, index) => <ProjectBlock key={project.id} project={project} index={index} />)}
          </div>
          <a className="text-link work-more" href={site.work.browseUrl} target="_blank" rel="noreferrer">{site.work.browseLabel} <ArrowUpRight size={15} /></a>
        </div>
      </section>

      {/* 5 — WRITING: magazine table of contents (placeholder entries until Phase 3) */}
      <section className="writing">
        <div className="section-wrap" id="writing">
          <SectionLabel number="04">{site.writing.label}</SectionLabel>
          <div className="writing-head">
            <Reveal><RichText as="h2" text={site.writing.heading} /></Reveal>
            <Reveal delay={100}><p>{site.writing.intro}</p></Reveal>
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
          <p className="eyebrow">{site.contact.eyebrow}</p>
          <RichText as="h2" text={site.contact.heading} />
          <div className="contact-grid">
            <div className="contact-info">
              <p className="contact-blurb">{site.contact.blurb}</p>
              <a className="contact-email" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              <a className="text-link contact-resume" href={site.contact.resumeUrl} download>{site.contact.resumeLabel} <Download size={15} /></a>
              <div className="contact-socials">
                {site.contact.socials.map((social) => {
                  const Icon = socialIcons[social.label];
                  return (
                    <a key={social.label} href={social.url} target="_blank" rel="noreferrer">
                      {Icon ? <Icon size={16} strokeWidth={1.5} /> : null}
                      {social.label}
                      <ArrowUpRight size={14} />
                    </a>
                  );
                })}
              </div>
            </div>
            <Reveal delay={100} className="contact-form-wrap">
              <ContactForm />
            </Reveal>
          </div>
        </div>
        <footer className="site-footer section-wrap"><Link className="wordmark" href="#home">HH<span>.</span></Link><span>{site.footer.note}</span><a href="#home">{site.footer.backToTop}</a></footer>
      </section>
    </main>
  );
}
