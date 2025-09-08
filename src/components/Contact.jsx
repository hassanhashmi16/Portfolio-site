'use client';

import { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, AlertCircle, User, Mail, MessageSquare } from 'lucide-react';

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error' | null
  const [errorMsg, setErrorMsg] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    // Prefer reading from env vars (NEXT_PUBLIC_...) — fall back to placeholders for dev
    const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_xxx';
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_xxx';
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'public_key_xxx';

    try {
      // sendForm collects inputs from the form element automatically
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setStatus('success');
      formRef.current.reset();
    } catch (err) {
      console.error('EmailJS send error:', err);
      setErrorMsg(err?.text || 'Failed to send message. Try again later.');
      setStatus('error');
    } finally {
      // optional: allow next send after a tiny delay or immediately
      setTimeout(() => setStatus(null), 4000);
    }
  };

  return (
    <section className="relative min-h-screen bg-black py-16 px-8 md:px-16 lg:px-24 overflow-hidden">
      {/* Dynamic background elements matching hero */}
      <div className="absolute inset-0">
        {/* Moving gradient orbs */}
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: 'transform 0.8s ease-out',
            left: '60%',
            top: '10%'
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-zinc-600/5 to-slate-600/5 blur-2xl"
          style={{
            transform: `translate(${-mousePosition.x * 0.03}px, ${-mousePosition.y * 0.03}px)`,
            transition: 'transform 0.6s ease-out',
            left: '10%',
            bottom: '20%'
          }}
        />
        
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <p className="text-emerald-400 font-mono text-sm mb-4 tracking-wider">GET IN TOUCH</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Let's Work 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 ml-4">
              Together
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can bring your ideas to life.
          </p>
        </div>

        {/* Content Container */}
        <div className="flex flex-col lg:flex-row gap-16 items-start justify-center">
          
          {/* Left side - Contact info */}
          <div className={`lg:w-1/3 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
            <div className="space-y-8">
              <div className="group">
                <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                  Let's Connect
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  I'm always interested in new opportunities and exciting projects. 
                  Whether you have a question or just want to say hi, feel free to reach out!
                </p>
              </div>
              
              <div className="space-y-4">
                {/* <div className="flex items-center gap-4 p-4 bg-gray-900/30 border border-gray-800 rounded-lg hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-300">
                  <Mail className="text-emerald-400" size={20} />
                  <span className="text-gray-300">hassan@example.com</span>
                </div> */}
                <div className="flex items-center gap-4 p-4 bg-gray-900/30 border border-gray-800 rounded-lg hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-300">
                  <MessageSquare className="text-emerald-400" size={20} />
                  <span className="text-gray-300">Response within 24 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form (EXACT ORIGINAL FUNCTIONALITY) */}
          <div className={`lg:w-1/2 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
            <form ref={formRef} onSubmit={handleSubmit} className="max-w-2xl space-y-6">
              
              <label className="block">
                <span className="flex items-center gap-3 text-gray-300 font-medium mb-3 text-lg">
                  <User size={18} className="text-emerald-400" />
                  Your name
                </span>
                <input 
                  name="name" 
                  required 
                  className="w-full px-6 py-4 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-emerald-400 focus:bg-gray-900/70 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </label>

              <label className="block">
                <span className="flex items-center gap-3 text-gray-300 font-medium mb-3 text-lg">
                  <Mail size={18} className="text-emerald-400" />
                  Your email
                </span>
                <input 
                  name="email" 
                  type="email" 
                  required 
                  className="w-full px-6 py-4 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-emerald-400 focus:bg-gray-900/70 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </label>

              <label className="block">
                <span className="flex items-center gap-3 text-gray-300 font-medium mb-3 text-lg">
                  <MessageSquare size={18} className="text-emerald-400" />
                  Message
                </span>
                <textarea 
                  name="message" 
                  rows="6" 
                  required 
                  className="w-full px-6 py-4 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-emerald-400 focus:bg-gray-900/70 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project or just say hello..."
                />
              </label>

              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="group relative w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-3 hover:gap-4 shadow-lg hover:shadow-emerald-500/25 disabled:shadow-none"
              >
                {status === 'sending' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <Send size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>

              {status === 'success' && (
                <p role="status" className="flex items-center gap-3 p-4 bg-emerald-900/20 border border-emerald-700 rounded-lg text-emerald-400">
                  <CheckCircle size={20} />
                  Message sent — thank you! ✅
                </p>
              )}
              
              {status === 'error' && (
                <p role="alert" className="flex items-center gap-3 p-4 bg-red-900/20 border border-red-700 rounded-lg text-red-400">
                  <AlertCircle size={20} />
                  Error: {errorMsg}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
      
      {/* Corner accents */}
      <div className="absolute top-8 left-8">
        <div className="w-8 h-8 border-l-2 border-t-2 border-emerald-400/30" />
      </div>
      <div className="absolute bottom-8 right-8">
        <div className="w-8 h-8 border-r-2 border-b-2 border-emerald-400/30" />
      </div>
    </section>
  );
}