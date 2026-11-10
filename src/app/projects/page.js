import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import { getProjects } from "@/lib/content";

export const metadata = {
  title: "Selected Work",
  description: "AI engineering and software projects by Hassan Hashmi.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <main className="archive-page">
      <SiteHeader archive />
      <section className="archive-intro section-wrap">
        <Link className="back-link" href="/#work"><ArrowLeft size={15} /> Back to the home page</Link>
        <p className="eyebrow">A growing archive · {String(projects.length).padStart(2, "0")} entries</p>
        <h1>Selected<br /><em>work &amp; ideas.</em></h1>
        <p className="archive-lede">Projects are ordered by the work I want to share right now. Each one has its own question, constraints, and way of thinking through the details.</p>
      </section>
      <section className="archive-list section-wrap" aria-label="Project archive">
        {projects.map((project, index) => (
          <article className="archive-project" key={project.id}>
            <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
            <div className="archive-project-copy"><p className="eyebrow">{project.type}</p><h2>{project.title}</h2><p>{project.summary}</p><div className="tag-list">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></div>
            <a className="circle-link" href={project.href} target="_blank" rel="noreferrer" aria-label={`View ${project.title} source`}><ArrowUpRight size={18} strokeWidth={1.5} /></a>
          </article>
        ))}
        <p className="archive-endnote">This archive will grow as more work is ready to share.</p>
      </section>
      <footer className="site-footer archive-footer section-wrap"><Link className="wordmark" href="/#home">HH<span>.</span></Link><span>Designed with intention. Built with curiosity.</span><Link href="/#contact">Get in touch ↑</Link></footer>
    </main>
  );
}
