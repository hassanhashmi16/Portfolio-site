'use client'
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from 'framer-motion';

import ProjectsData from '@/data/projects.json';

// ── Tilt Card ─────────────────────────────────────────────────────────────────
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
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', perspective: '1000px' }}
      whileHover={{ scale: 1.02, z: 10 }}
      transition={{ type: 'spring', stiffness: 220, damping: 30 }}
      className={`relative cursor-crosshair ${className}`}
    >
      <motion.div className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: `radial-gradient(circle at ${gx} ${gy}, rgba(0,0,0,0.05), transparent 55%)` }} />
      {children}
    </motion.div>
  );
};

// ── Marquee ───────────────────────────────────────────────────────────────────
const Marquee = ({ items, rtl }) => (
  <div className="overflow-hidden">
    <motion.div
      animate={{ x: rtl ? ['-50%', '0%'] : ['0%', '-50%'] }}
      transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      className="flex gap-12 whitespace-nowrap"
    >
      {[...items, ...items].map((item, i) => (
        <span key={i} className="text-zinc-300 font-mono text-[10px] uppercase tracking-[0.35em] flex items-center gap-5">
          <span className="text-zinc-400">◆</span>{item}
        </span>
      ))}
    </motion.div>
  </div>
);

// ── Card ──────────────────────────────────────────────────────────────────────
const Card = ({ project, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [imgError, setImgError] = useState(false);
  const colDelay = (index % 3) * 0.1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 45 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: colDelay, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard className="group h-full flex flex-col border border-zinc-200 bg-white hover:border-zinc-400 hover:shadow-xl transition-all duration-500 overflow-hidden">
        {/* Image area */}
        <div className="relative h-52 overflow-hidden bg-zinc-100">
          <motion.div
            animate={{ top: ['-20%', '120%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
            className="absolute inset-x-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ height: 30, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.06), transparent)' }}
          />
          {project.image && !imgError ? (
            <>
              <motion.img
                src={project.image}
                alt={project.title}
                onError={() => setImgError(true)}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1.04 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/30 to-transparent group-hover:from-transparent transition-all duration-500" />
            </>

          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-zinc-200 font-black text-5xl">{project.title[0]}</div>
          )}
          <div className="absolute top-3 left-3 z-20 font-mono text-[10px] text-white tracking-[0.25em] bg-black/60 backdrop-blur-sm border border-white/20 px-2 py-0.5">
            [{String(project.id).padStart(2, '0')}]
          </div>
          {/* Hover corner accents */}
          {[['top-2 left-2 border-t border-l'], ['top-2 right-2 border-t border-r'], ['bottom-2 left-2 border-b border-l'], ['bottom-2 right-2 border-b border-r']].map(([c], i) => (
            <div key={i} className={`absolute w-4 h-4 z-30 border-zinc-900 opacity-0 group-hover:opacity-30 transition-all duration-300 ${c}`} style={{ transitionDelay: `${i * 40}ms` }} />
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col p-6 gap-4">
          <div className="w-0 h-px bg-zinc-900 group-hover:w-10 transition-all duration-500" />
          <h3 className="text-lg font-black text-zinc-900 uppercase tracking-wide group-hover:text-zinc-500 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-zinc-500 text-sm leading-relaxed font-light flex-1">{project.description}</p>

          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech, ti) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: colDelay + 0.3 + ti * 0.06, type: 'spring', stiffness: 240 }}
                whileHover={{ backgroundColor: '#18181b', color: '#fff', borderColor: '#18181b' }}
                className="px-2 py-0.5 border border-zinc-200 text-zinc-400 text-[10px] font-mono uppercase tracking-wider cursor-default transition-all duration-250"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <div className="flex gap-5 pt-3 border-t border-zinc-100">
            <a href={project.githubUrl} target="_blank" rel="noreferrer"
              className="group/l flex items-center gap-1.5 text-zinc-400 hover:text-zinc-900 font-mono text-xs uppercase tracking-widest transition-colors duration-300">
              <Github size={13} />
              <span className="relative">Source<span className="absolute -bottom-px left-0 w-0 h-px bg-zinc-900 group-hover/l:w-full transition-all duration-300" /></span>
            </a>
            {project.projectUrl && (
              <a href={project.projectUrl} target="_blank" rel="noreferrer"
                className="group/l flex items-center gap-1.5 text-zinc-400 hover:text-zinc-900 font-mono text-xs uppercase tracking-widest transition-colors duration-300">
                <ExternalLink size={13} />
                <span className="relative">Live<span className="absolute -bottom-px left-0 w-0 h-px bg-zinc-900 group-hover/l:w-full transition-all duration-300" /></span>
              </a>
            )}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });
  const tags = ['Next.js', 'React', 'MongoDB', 'Node.js', 'Full Stack', 'AI Integration', 'Tailwind CSS', 'REST APIs'];

  return (
    <section className="relative min-h-screen bg-white pt-28 pb-28 overflow-hidden">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      {/* Marquee strips */}
      <div className="relative z-10 flex flex-col gap-3 mb-16 border-y border-zinc-100 py-3">
        <Marquee items={tags} rtl={false} />
        <Marquee items={[...tags].reverse()} rtl={true} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div ref={headerRef} className="mb-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-zinc-100 pb-10">
          <div>
            <div className="overflow-hidden mb-1">
              <motion.span
                initial={{ y: 22 }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.55 }}
                className="block font-mono text-[10px] text-zinc-400 tracking-[0.3em] uppercase"
              >
                Portfolio archive
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 80 }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                className="text-7xl md:text-9xl font-black tracking-tighter text-zinc-900 leading-none"
              >
                Work
              </motion.h1>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35 }}
            className="text-zinc-400 max-w-xs font-mono text-xs leading-relaxed text-right"
          >
            {ProjectsData.length} projects deployed.<br />Each built to production standards.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ProjectsData.map((p, i) => <Card key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}