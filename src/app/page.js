import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Github, Linkedin } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import Reveal from "@/components/Reveal";
import projects from "@/data/portfolio-projects.json";
import experience from "@/data/experience.json";

const socials = [
  { label: "GitHub", href: "https://github.com/hassanhashmi16", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hassansaeedhashmi", icon: Linkedin },
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

function ProjectRow({ project, index }) {
  return (
    <Reveal className="project-row" delay={index * 90}>
      <div className="project-index">{String(index + 1).padStart(2, "0")}</div>
      <div className="project-main">
        <p className="eyebrow">{project.type}</p>
        <h3>{project.title}</h3>
        <p className="project-description">{project.summary}</p>
        <div className="tag-list" aria-label="Technologies">
          {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </div>
      </div>
      <a className="circle-link" href={project.href} target="_blank" rel="noreferrer" aria-label={`View ${project.title} on GitHub`}>
        <ArrowUpRight size={18} strokeWidth={1.5} />
      </a>
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

      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <Reveal><p className="eyebrow"><span className="status-dot" /> AI engineer · full-stack developer</p></Reveal>
          <Reveal delay={90}><h1>I build thoughtful<br /><em>AI experiences.</em></h1></Reveal>
          <Reveal delay={180}><p className="hero-summary">I’m Hassan — an AI engineer and full-stack developer interested in making complex systems feel clear, useful, and human.</p></Reveal>
          <Reveal delay={260} className="hero-actions">
            <a className="text-link" href="#work">Explore selected work <ArrowDown size={15} /></a>
            <span className="hero-note">Based in Lahore, Pakistan</span>
          </Reveal>
          <div className="hero-footer"><span>Independent thinking, carefully built.</span><span>Scroll to explore ↓</span></div>
        </div>
        <Reveal className="portrait-frame" delay={120}>
          <Image src="/images/hassan-portrait.webp" alt="Portrait of Hassan Hashmi" fill priority sizes="(max-width: 760px) 88vw, 42vw" className="portrait-image" />
          <div className="portrait-caption"><span>HASSAN HASHMI</span><span>AI · ENGINEERING · SYSTEMS</span></div>
          <span className="portrait-mark" aria-hidden="true">H.</span>
        </Reveal>
        <a className="side-note" href="#about"><span>SCROLL TO EXPLORE</span><span className="side-note-line" /></a>
      </section>

      <section className="about section-wrap" id="about">
        <SectionLabel number="01">A little about me</SectionLabel>
        <div className="about-grid">
          <Reveal><h2>Curiosity is where<br />the work <em>begins.</em></h2></Reveal>
          <Reveal delay={100} className="about-copy">
            <p>I’m a computer science student at FAST NUCES Lahore, drawn to the space where software engineering meets applied AI. I like understanding how a system works all the way through — then shaping it into something people can actually use.</p>
            <p>My work moves between retrieval, agents, evaluation, and the full-stack product details that make those ideas useful outside a notebook.</p>
            <a className="text-link" href="https://github.com/hassanhashmi16" target="_blank" rel="noreferrer">A little more of what I do <ArrowUpRight size={15} /></a>
          </Reveal>
        </div>
        <div className="about-footnote"><span>01 / 06</span><span>Learning by building, building to understand.</span></div>
      </section>

      <section className="experience section-wrap" id="experience">
        <SectionLabel number="02">Experience</SectionLabel>
        <div className="section-heading-row"><h2>Where I’ve<br /><em>been building.</em></h2><p>Different teams and contexts, one steady curiosity about how useful software gets made.</p></div>
        <div className="experience-list">
          {experience.map((item, index) => (
            <Reveal className="experience-row" key={item.id} delay={index * 90}>
              <span className="experience-date">{item.date}</span>
              <div><h3>{item.role}</h3><p className="experience-org">{item.organization}</p><p className="experience-description">{item.description}</p></div>
              <span className="experience-type">{item.type}</span>
            </Reveal>
          ))}
        </div>
        <div className="about-footnote"><span>02 / 06</span><span>Experience is part of the story, not the whole story.</span></div>
      </section>

      <section className="work section-wrap" id="work">
        <SectionLabel number="03">Selected work</SectionLabel>
        <div className="section-heading-row"><h2>Ideas, made<br /><em>inspectable.</em></h2><p>A few ongoing explorations in AI engineering, research workflows, and the systems around them.</p></div>
        <div className="project-list">{projects.map((project, index) => <ProjectRow key={project.id} project={project} index={index} />)}</div>
        <a className="text-link work-more" href="https://github.com/hassanhashmi16" target="_blank" rel="noreferrer">Browse all repositories <ArrowUpRight size={15} /></a>
        <div className="about-footnote"><span>03 / 06</span><span>Each project can grow into a deeper case study.</span></div>
      </section>

      <section className="writing section-wrap" id="writing">
        <SectionLabel number="04">Writing & notes</SectionLabel>
        <div className="writing-grid">
          <Reveal><h2>Things I’m<br /><em>thinking through.</em></h2><p className="writing-intro">Notes from the work: useful ideas, turning points, and the occasional lesson that took longer than expected.</p></Reveal>
          <Reveal delay={100} className="writing-empty">
            <span className="writing-mark" aria-hidden="true">“</span>
            <p>The first notes are taking shape.</p>
            <span>Writing will appear here as it’s ready.</span>
          </Reveal>
        </div>
        <div className="about-footnote"><span>04 / 06</span><span>Ideas worth keeping in one place.</span></div>
      </section>

      <section className="contact section-wrap" id="contact">
        <SectionLabel number="05">Get in touch</SectionLabel>
        <div className="contact-layout">
          <Reveal><p className="eyebrow">Have a thoughtful problem in mind?</p><h2>Let’s make<br /><em>something matter.</em></h2><a className="text-link" href="mailto:hassansaeed0050@gmail.com">Send me an email <ArrowUpRight size={15} /></a></Reveal>
          <Reveal delay={100} className="contact-aside"><p>I’m always interested in good questions, ambitious ideas, and conversations about building useful things with AI.</p><div className="social-list">{socials.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer"><Icon size={16} strokeWidth={1.5} />{label}<ArrowUpRight size={14} /></a>)}</div></Reveal>
        </div>
        <footer className="site-footer"><Link className="wordmark" href="#home">HH<span>.</span></Link><span>Designed with intention. Built with curiosity.</span><a href="#home">Back to top ↑</a></footer>
      </section>
    </main>
  );
}
