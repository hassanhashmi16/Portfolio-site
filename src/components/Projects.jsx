'use client'
import React, { useRef } from 'react';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from 'framer-motion';

// ── 3-D tilt card ─────────────────────────────────────────────────────────────
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const sx = useSpring(x, { stiffness: 220, damping: 30 });
  const sy = useSpring(y, { stiffness: 220, damping: 30 });
  const rx = useTransform(sy, [0, 1], ['6deg', '-6deg']);
  const ry = useTransform(sx, [0, 1], ['-6deg', '6deg']);
  const gx = useTransform(sx, [0, 1], ['0%', '100%']);
  const gy = useTransform(sy, [0, 1], ['0%', '100%']);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - r.left) / r.width);
        y.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => { x.set(0.5); y.set(0.5); }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', perspective: '900px' }}
      whileHover={{ scale: 1.015, z: 8 }}
      transition={{ type: 'spring', stiffness: 240, damping: 28 }}
      className={`relative cursor-crosshair ${className}`}
    >
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: `radial-gradient(circle at ${gx} ${gy}, rgba(0,0,0,0.04), transparent 55%)` }}
      />
      {children}
    </motion.div>
  );
};

// ── Marquee strip ─────────────────────────────────────────────────────────────
const Marquee = ({ items }) => (
  <div className="overflow-hidden py-4 border-y border-zinc-200">
    <motion.div
      animate={{ x: ['0%', '-50%'] }}
      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      className="flex gap-12 whitespace-nowrap"
    >
      {[...items, ...items].map((item, i) => (
        <span key={i} className="text-zinc-300 font-mono text-xs uppercase tracking-[0.35em] flex items-center gap-5">
          <span className="text-zinc-400">◆</span>
          {item}
        </span>
      ))}
    </motion.div>
  </div>
);

// ── Project row ───────────────────────────────────────────────────────────────
const ProjectRow = ({ project, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const flipped = index % 2 === 1;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4 }}
      className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
    >
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: flipped ? 60 : -60, y: 30 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        className={flipped ? 'lg:order-2' : ''}
      >
        <TiltCard className="relative aspect-video overflow-hidden bg-zinc-100 border border-zinc-200 group shadow-sm hover:shadow-xl transition-shadow duration-500">
          {/* Scan beam */}
          <motion.div
            animate={{ top: ['-15%', '115%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
            className="absolute inset-x-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ height: 30, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.08), transparent)' }}
          />
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            initial={{ filter: 'grayscale(100%) scale(1.03)' }}
            whileHover={{ filter: 'grayscale(0%) scale(1.1)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 via-zinc-900/10 to-transparent group-hover:from-zinc-900/20 transition-all duration-500" />
          <div className="absolute top-4 left-4 z-20 font-mono text-[10px] text-white tracking-[0.25em] border border-white/30 bg-black/50 backdrop-blur-sm px-2 py-0.5">
            [{String(project.id).padStart(2, '0')}]
          </div>
        </TiltCard>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: flipped ? -60 : 60, y: 20 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className={`space-y-6 ${flipped ? 'lg:order-1' : ''}`}
      >
        <div className="overflow-hidden">
          <motion.h3
            initial={{ y: 60 }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight leading-tight hover:text-zinc-500 transition-colors duration-500 cursor-default"
          >
            {project.title}
          </motion.h3>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-zinc-500 leading-relaxed text-lg font-light border-l-2 border-zinc-200 pl-5"
        >
          {project.description}
        </motion.p>

        <motion.div className="flex flex-wrap gap-2 pt-2" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>
          {project.technologies.map((tech, ti) => (
            <motion.span
              key={tech}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.55 + ti * 0.06, type: 'spring', stiffness: 250 }}
              whileHover={{ backgroundColor: 'rgb(39,39,42)', color: '#fff', borderColor: 'rgb(39,39,42)' }}
              className="px-3 py-1 border border-zinc-200 text-zinc-400 text-xs font-mono uppercase tracking-wider cursor-default transition-all duration-300"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        <motion.div className="flex gap-6 pt-4" initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.65 }}>
          <a href={project.githubUrl} target="_blank" rel="noreferrer"
            className="group flex items-center gap-2 text-zinc-400 hover:text-zinc-900 font-mono text-sm uppercase tracking-widest transition-colors duration-300">
            <Github size={15} />
            <span className="relative">Source<span className="absolute -bottom-0.5 left-0 w-0 h-px bg-zinc-900 group-hover:w-full transition-all duration-300" /></span>
          </a>
          {project.projectUrl && (
            <a href={project.projectUrl} target="_blank" rel="noreferrer"
              className="group flex items-center gap-2 text-zinc-400 hover:text-zinc-900 font-mono text-sm uppercase tracking-widest transition-colors duration-300">
              <ExternalLink size={15} />
              <span className="relative">Live Demo<span className="absolute -bottom-0.5 left-0 w-0 h-px bg-zinc-900 group-hover:w-full transition-all duration-300" /></span>
            </a>
          )}
        </motion.div>
      </motion.div>
    </motion.article>
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
const Projects = () => {
  const router = useRouter();
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  const projects = [
    { id: 1, title: 'Roti & Reps', description: 'An AI-powered web app that generates personalized Desi meal plans with recipes, helping users balance fitness goals with traditional South Asian cuisine.', githubUrl: 'https://github.com/hassanhashmi16/Roti-Reps.git', projectUrl: 'https://roti-reps.vercel.app/MealMaker', image: '/assets/rotireps.png', technologies: ['Next.js', 'Tailwind CSS', 'GeminiAI'] },
    { id: 2, title: 'AnonyMessage', description: 'A web app that lets users send anonymous messages to registered users, built to encourage fun, private, and open communication.', githubUrl: 'https://github.com/hassan/task-manager', projectUrl: '', image: '/assets/anonymessage.png', technologies: ['Next.js', 'MongoDB', 'React.js', 'Tailwind CSS'] },
    { id: 3, title: 'Music Academy', description: 'A responsive front-end website designed for a music academy, showcasing courses, instructors, and contact details with a clean, user-friendly UI.', githubUrl: 'https://github.com/hassan/weather-dashboard', projectUrl: '', image: '/assets/musicacademy.png', technologies: ['Next.js', 'Tailwind CSS', 'Accertainity UI'] },
  ];

  const tags = ['Full-Stack', 'Next.js', 'MongoDB', 'React', 'Node.js', 'UI Engineering', 'API Design', 'AI Integration'];

  return (
    <section id="projects-section" className="relative bg-zinc-50 py-36 overflow-hidden">
      {/* Marquee */}
      <Marquee items={tags} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mt-24">
        {/* Header */}
        <div ref={headerRef} className="mb-28">
          <div className="overflow-hidden mb-2">
            <motion.span
              initial={{ y: 24 }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.55 }}
              className="block font-mono text-xs text-zinc-400 tracking-[0.3em] uppercase"
            >
              Selected Work
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 70 }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="text-6xl md:text-8xl font-black tracking-tighter text-zinc-900"
            >
              Featured Projects
            </motion.h2>
          </div>
        </div>

        <div className="space-y-36">
          {projects.map((p, i) => <ProjectRow key={p.id} project={p} index={i} />)}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-36 flex justify-center"
        >
          <motion.button
            onClick={() => router.push('/projects')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-3 px-10 py-4 border border-zinc-300 hover:border-zinc-900 text-zinc-500 hover:text-zinc-900 font-mono text-sm tracking-widest uppercase transition-all duration-300 bg-white hover:bg-zinc-50 shadow-sm hover:shadow-md"
          >
            View All Projects
            <ArrowUpRight size={15} className="group-hover:rotate-45 transition-transform duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;