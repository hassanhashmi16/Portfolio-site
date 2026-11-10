// Canonical default site copy. The database row (site_content.data) is merged
// over these, so the site renders correctly even before Supabase is populated.
// Inline markup: **bold**, *italic*, ==highlight==, and newlines become <br/>.

export const defaultContent = {
  intro: {
    eyebrow: "AI engineer · full-stack developer",
    headline: "I build thoughtful\n*AI experiences.*",
    summary:
      "I’m Hassan — an AI engineer and full-stack developer interested in making complex systems feel **==clear, useful, and human==**.",
    location: "Based in Lahore, Pakistan",
    resumeUrl: "/resume.pdf",
    portraitAlt: "Portrait of Hassan Hashmi",
    captionLeft: "HASSAN HASHMI",
    captionRight: "AI · ENGINEERING · SYSTEMS",
  },
  about: {
    label: "A little about me",
    quote: "Curiosity is where the work *begins.*",
    paragraphs: [
      "I’m a computer science student at **FAST NUCES Lahore**, drawn to the space where software engineering meets ==applied AI==. I like understanding how a system works all the way through, then shaping it into something people can actually use.",
      "My work moves between **retrieval, agents, and evaluation**, and the full-stack product details that make those ideas useful outside a notebook.",
    ],
    facts: [
      { label: "Education", value: "B.Sc. Computer Science\n**FAST NUCES, Lahore**" },
      { label: "Expected", value: "June 2028" },
      { label: "Focus", value: "Retrieval · agents · evaluation" },
      { label: "Based in", value: "Lahore, Pakistan" },
    ],
  },
  experience: {
    label: "Experience",
    heading: "Where I’ve\n*been building.*",
    intro: "Different teams and contexts, one steady curiosity about how useful software gets made.",
  },
  work: {
    label: "Selected work",
    heading: "Ideas, made\n*inspectable.*",
    intro: "A few ongoing explorations in AI engineering, research workflows, and the systems around them.",
    browseLabel: "Browse all repositories",
    browseUrl: "https://github.com/hassanhashmi16",
  },
  writing: {
    label: "Writing & notes",
    heading: "Notes &\n*marginalia.*",
    intro: "Notes from the work: useful ideas, turning points, and the occasional lesson that took longer than expected.",
  },
  contact: {
    eyebrow: "Have a thoughtful problem in mind?",
    heading: "Let’s make\n*something matter.*",
    blurb: "I’m always interested in good questions, ambitious ideas, and conversations about building useful things with AI.",
    email: "hassansaeed0050@gmail.com",
    resumeLabel: "Download résumé",
    resumeUrl: "/resume.pdf",
    socials: [
      { label: "GitHub", url: "https://github.com/hassanhashmi16" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/hassansaeedhashmi" },
    ],
  },
  footer: {
    note: "Designed with intention. Built with curiosity.",
    backToTop: "Back to top ↑",
  },
};
