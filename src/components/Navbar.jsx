'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll } from 'framer-motion';

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 40));
    return unsub;
  }, [scrollY]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-zinc-200/80 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.span
              whileHover={{ letterSpacing: '0.08em' }}
              transition={{ duration: 0.3 }}
              className={`font-mono font-black text-base tracking-tight transition-colors duration-300 ${scrolled ? 'text-zinc-900' : 'text-white'}`}
            >
              H<span className={scrolled ? 'text-zinc-400' : 'text-zinc-400'}>.</span>HASHMI
            </motion.span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href} className="relative px-5 py-2 group">
                  <span className={`font-mono text-sm tracking-wide transition-colors duration-300 ${
                    active
                      ? (scrolled ? 'text-zinc-900' : 'text-white')
                      : (scrolled ? 'text-zinc-500 group-hover:text-zinc-900' : 'text-white/60 group-hover:text-white')
                  }`}>
                    {label}
                  </span>
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className={`absolute bottom-1 left-5 right-5 h-px ${scrolled ? 'bg-zinc-900' : 'bg-white'}`}
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                </Link>
              );
            })}

            <a href="#contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`ml-3 px-5 py-2 text-sm font-mono font-bold tracking-wide border transition-all duration-300 ${
                  scrolled
                    ? 'border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white'
                    : 'border-white text-white hover:bg-white hover:text-zinc-900'
                }`}
              >
                Hire Me
              </motion.button>
            </a>
          </nav>

          {/* Mobile burger */}
          <button onClick={() => setMobileOpen((v) => !v)} className="md:hidden p-2 flex flex-col gap-1.5" aria-label="Toggle menu">
            <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }} className={`block w-6 h-px origin-center transition-colors ${scrolled ? 'bg-zinc-900' : 'bg-white'}`} />
            <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }} className={`block w-6 h-px transition-colors ${scrolled ? 'bg-zinc-900' : 'bg-white'}`} />
            <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }} className={`block w-6 h-px origin-center transition-colors ${scrolled ? 'bg-zinc-900' : 'bg-white'}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8"
          >
            <motion.button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-6 text-zinc-400 font-mono text-sm tracking-widest"
            >
              CLOSE
            </motion.button>
            {links.map(({ href, label }, i) => (
              <motion.div key={href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Link href={href} onClick={() => setMobileOpen(false)} className="text-5xl font-black text-zinc-900 hover:text-zinc-400 transition-colors tracking-tighter">
                  {label}
                </Link>
              </motion.div>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 px-8 py-3 border border-zinc-900 text-zinc-900 font-mono font-bold text-sm tracking-widest hover:bg-zinc-900 hover:text-white transition-colors"
            >
              Hire Me
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
