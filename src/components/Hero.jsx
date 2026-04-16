'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from 'framer-motion';

// ── Split text reveal ─────────────────────────────────────────────────────────
const SplitReveal = ({ text, delay = 0, className = '' }) => (
  <span aria-label={text} className={`inline-flex ${className}`}>
    {text.split('').map((char, i) => (
      <motion.span
        key={i}
        className="inline-block"
        initial={{ y: '110%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ delay: delay + i * 0.04, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </span>
);

// ── Magnetic button ───────────────────────────────────────────────────────────
const Magnetic = ({ children, strength = 0.3 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 20 });
  const sy = useSpring(y, { stiffness: 180, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
};

// ── Floating orb ──────────────────────────────────────────────────────────────
const Orb = ({ className, dur, delay }) => (
  <motion.div
    className={`absolute rounded-full pointer-events-none ${className}`}
    animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
    transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 50, damping: 18 });
  const glowY = useSpring(mouseY, { stiffness: 50, damping: 18 });
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 500], [0, -60]);
  const heroOpacity = useTransform(scrollY, [0, 350], [1, 0]);

  useEffect(() => {
    const onMove = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const techStack = [
    { label: 'Next.js',    pct: 92 },
    { label: 'MongoDB',    pct: 85 },
    { label: 'React',      pct: 95 },
    { label: 'Node.js',    pct: 80 },
    { label: 'Tailwind',   pct: 90 },
  ];

  return (
    <section className="relative min-h-screen bg-zinc-950 flex items-center overflow-hidden">

      {/* ── subtle dot grid ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

      {/* ── moving scanline ── */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      {/* ── cursor glow ── */}
      <motion.div
        className="fixed pointer-events-none z-30 w-[500px] h-[500px] rounded-full mix-blend-screen"
        style={{
          x: glowX, y: glowY,
          translateX: '-50%', translateY: '-50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 65%)',
        }}
      />

      {/* ── ambient orbs ── */}
      <Orb className="w-[600px] h-[600px] bg-white/3 blur-[140px] -top-1/4 -left-1/4" dur={16} delay={0} />
      <Orb className="w-[400px] h-[400px] bg-white/2 blur-[100px] -bottom-1/4 -right-1/4" dur={20} delay={3} />

      {/* ── Content ── */}
      <motion.div
        style={{ y: contentY, opacity: heroOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row lg:items-center gap-16 pt-24 pb-16"
      >
        {/* LEFT: Text ─────────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">

          {/* Status chip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.55 }}
            className="inline-flex items-center gap-2 mb-10 px-3 py-1.5 border border-white/10 bg-white/5"
          >
            <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <span className="font-mono text-[11px] text-white/50 tracking-[0.2em] uppercase">Full Stack Developer · Available</span>
          </motion.div>

          {/* HASSAN — overflow hidden clip */}
          <div className="overflow-hidden leading-none mb-1">
            <h1 className="text-[clamp(3.5rem,11vw,9.5rem)] font-black text-white tracking-tighter leading-none">
              <SplitReveal text="HASSAN" delay={0.2} />
            </h1>
          </div>

          {/* HASHMI — each letter individually colored */}
          <div className="overflow-hidden leading-none mb-10">
            <h1 className="text-[clamp(3.5rem,11vw,9.5rem)] font-black tracking-tighter leading-none">
              {[
                { char: 'H', color: '#e4e4e7' },
                { char: 'A', color: '#d4d4d8' },
                { char: 'S', color: '#c4c4cc' },
                { char: 'H', color: '#b4b4c0' },
                { char: 'M', color: '#a4a4b4' },
                { char: 'I', color: '#9494a8' },
              ].map(({ char, color }, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.046, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                  style={{ color, willChange: 'transform, opacity' }}
                >
                  {char}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.65 }}
            className="text-white/40 text-lg max-w-md mb-12 leading-relaxed font-light"
          >
            Crafting high-performance web experiences with{' '}
            <span className="text-white/70">Next.js</span> and{' '}
            <span className="text-white/70">MongoDB</span>. Precision engineering meets considered design.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.18, duration: 0.6 }}
            className="flex flex-wrap items-center gap-4 mb-16 relative z-20"
          >
            <Link href="/projects">
              <Magnetic>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  className="group relative flex items-center gap-3 px-7 py-3.5 bg-white text-zinc-900 font-mono font-bold text-sm tracking-widest uppercase overflow-hidden"
                >
                  <motion.span
                    className="absolute inset-0 bg-zinc-200 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    View Work
                    <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </span>
                </motion.button>
              </Magnetic>
            </Link>

            {[
              { href: 'https://github.com/hassanhashmi16', Icon: Github, label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/hassansaeedhashmi/', Icon: Linkedin, label: 'LinkedIn' },
            ].map(({ href, Icon, label }) => (
              <Link key={label} href={href} target="_blank">
                <Magnetic>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    className="group flex items-center gap-2.5 px-6 py-3.5 border border-white/15 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white font-mono text-sm tracking-wider transition-all duration-300"
                  >
                    <Icon size={15} className="group-hover:scale-110 transition-transform" />
                    {label}
                  </motion.button>
                </Magnetic>
              </Link>
            ))}
          </motion.div>

          {/* Tech pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="flex flex-wrap gap-2"
          >
            {['Next.js', 'React', 'MongoDB', 'Node.js', 'Tailwind'].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 8, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.45 + i * 0.07, type: 'spring', stiffness: 220 }}
                whileHover={{ y: -2, borderColor: 'rgba(255,255,255,0.25)' }}
                className="px-3 py-1 border border-white/8 text-white/30 text-xs font-mono uppercase tracking-widest hover:text-white/60 transition-colors duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: Skills panel ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block w-72 shrink-0"
        >
          <div className="relative border border-white/10 bg-white/3 backdrop-blur-xl p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-t-white/70 border-r-white/70 border-b-transparent border-l-transparent rounded-full"
              />
              <span className="text-white/30 font-mono text-[10px] tracking-[0.25em] uppercase">Core Stack</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="ml-auto text-white/30 font-mono text-[10px]"
              >
                LIVE
              </motion.span>
            </div>

            {/* Skill bars */}
            <div className="space-y-5">
              {techStack.map(({ label, pct }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 + i * 0.1, duration: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs text-white/50">{label}</span>
                    <motion.span
                      className="font-mono text-[10px] text-white/30"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 + i * 0.1 }}
                    >
                      {pct}%
                    </motion.span>
                  </div>
                  <div className="h-px bg-white/8 overflow-hidden">
                    <motion.div
                      className="h-full bg-white/40"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: pct / 100 }}
                      transition={{ delay: 0.9 + i * 0.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9 }}
              className="mt-8 flex items-center gap-3 pt-4 border-t border-white/8"
            >
              <motion.div
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-white/40 shadow-[0_0_8px_rgba(255,255,255,0.3)]"
              />
              <span className="text-white/30 font-mono text-[10px] uppercase tracking-widest">Open to Work</span>
            </motion.div>

            {/* Corner brackets */}
            {['top-0 left-0 border-t border-l', 'top-0 right-0 border-t border-r', 'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'].map((c, i) => (
              <div key={i} className={`absolute w-3 h-3 border-white/20 ${c}`} />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/20 font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-white/10 overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 bg-white/30"
            animate={{ y: ['0%', '200%'] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-zinc-50 to-transparent pointer-events-none" />
    </section>
  );
}