'use client';

import { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, AlertCircle, Lock } from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// ── Typewriter ────────────────────────────────────────────────────────────────
const Typewriter = ({ lines, started }) => {
  const [done, setDone] = useState([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (!started || lineIdx >= lines.length) return;
    const line = lines[lineIdx];
    const t = setTimeout(() => {
      if (charIdx <= line.length) {
        setDone((prev) => { const u = [...prev]; u[lineIdx] = line.slice(0, charIdx); return u; });
        setCharIdx((c) => c + 1);
      } else {
        setTimeout(() => { setLineIdx((l) => l + 1); setCharIdx(0); }, 450);
      }
    }, charIdx === line.length ? 0 : 28);
    return () => clearTimeout(t);
  }, [started, lineIdx, charIdx, lines]);

  return (
    <div className="font-mono text-xs leading-6 text-zinc-500">
      {lines.map((line, i) => (
        <div key={i} className={`flex gap-2 ${i > lineIdx ? 'invisible' : ''}`}>
          <span className="text-zinc-300 shrink-0">$</span>
          <span className="text-zinc-600">
            {done[i] ?? ''}
            {i === lineIdx && (
              <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.55, repeat: Infinity }}
                className="inline-block w-1.5 h-3.5 bg-zinc-400 ml-0.5 align-middle" />
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

// ── Animated field ─────────────────────────────────────────────────────────────
const Field = ({ label, code, name, as = 'input', delay = 0, ...props }) => {
  const [focused, setFocused] = useState(false);
  const Tag = as;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
      <motion.label animate={{ color: focused ? '#27272a' : '#a1a1aa' }} transition={{ duration: 0.2 }}
        className="block font-mono text-[10px] tracking-[0.25em] uppercase mb-2">
        <span className="text-zinc-300 mr-1">{code}</span>{label}
      </motion.label>
      <div className="relative">
        <Tag
          name={name}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent border-0 border-b text-zinc-900 text-sm placeholder-zinc-300 py-3 px-0 focus:outline-none resize-none transition-colors font-sans"
          style={{ borderColor: focused ? '#27272a' : '#e4e4e7' }}
          {...props}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-px bg-zinc-900"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{ transformOrigin: 'left', right: 0 }}
        />
      </div>
    </motion.div>
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Contact() {
  const formRef = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const terminalLines = [
    'ssh hassan@portfolio.dev',
    'Connection established.',
    'Encryption: AES-256-GCM',
    'Awaiting your message...',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_xxx',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_xxx',
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'public_key_xxx',
      );
      setStatus('success');
      formRef.current.reset();
    } catch (err) {
      setErrorMsg(err?.text || 'Failed. Try again.');
      setStatus('error');
    } finally {
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="relative bg-white py-36 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-zinc-100">

      {/* Large background number */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[20rem] font-black text-zinc-50 leading-none pointer-events-none select-none hidden lg:block">03</div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <div className="overflow-hidden mb-2">
            <motion.span
              initial={{ y: 24 }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.55 }}
              className="flex items-center gap-2 font-mono text-xs text-zinc-400 tracking-[0.3em] uppercase"
            >
              <Lock size={10} />
              Get in touch
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 80 }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="text-6xl md:text-8xl font-black text-zinc-900 tracking-tighter"
            >
              Let's Talk
            </motion.h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-14 lg:gap-20">
          {/* Left: Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            <div className="border border-zinc-200 bg-zinc-950 overflow-hidden shadow-sm">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="ml-3 font-mono text-[10px] text-zinc-600 tracking-wider">terminal — zsh</span>
              </div>
              <div className="p-5 min-h-[160px] relative">
                <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 1px, transparent 1px, transparent 3px)', backgroundSize: '100% 3px' }} />
                <Typewriter lines={terminalLines} started={inView} />
              </div>
            </div>

            <div className="border border-zinc-200 p-6 bg-zinc-50 space-y-5">
              <div>
                <p className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase mb-1">Status</p>
                <div className="flex items-center gap-2">
                  <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-zinc-900" />
                  <span className="text-zinc-700 text-sm font-light">Available for new projects</span>
                </div>
              </div>
              <div>
                <p className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase mb-1">Response</p>
                <p className="text-zinc-700 text-sm font-light">Within 24 hours</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
            className="lg:col-span-3"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">
              <Field label="Your Name" code="01." name="name" required delay={0.35} placeholder="Full name" />
              <Field label="Email Address" code="02." name="email" type="email" required delay={0.45} placeholder="your@email.com" />
              <Field label="Message" code="03." name="message" as="textarea" required rows={5} delay={0.55} placeholder="Tell me about your project..." />

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                whileHover={status !== 'sending' ? { scale: 1.015 } : {}}
                whileTap={{ scale: 0.97 }}
                className="group relative overflow-hidden w-full py-4 bg-zinc-900 text-white font-mono font-black text-sm tracking-[0.15em] uppercase disabled:bg-zinc-200 disabled:text-zinc-400 transition-all duration-300"
              >
                <motion.span
                  className="absolute inset-0 bg-zinc-700 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {status === 'sending' ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                      Sending...
                    </>
                  ) : (
                    <>Send Message<Send size={15} className="group-hover:translate-x-1.5 transition-transform duration-300" /></>
                  )}
                </span>
              </motion.button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div key="ok" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-3 text-zinc-700 font-mono text-sm border border-zinc-200 bg-zinc-50 p-4">
                    <CheckCircle size={16} className="text-zinc-900" />
                    Message sent — I'll get back to you soon.
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div key="err" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-3 text-red-700 font-mono text-sm border border-red-200 bg-red-50 p-4">
                    <AlertCircle size={16} />
                    {errorMsg}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}