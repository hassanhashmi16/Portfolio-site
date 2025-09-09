'use client'
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const router = useRouter()

  const pushtolinkedin = () => {
    router.push('https://www.linkedin.com/in/hassansaeedhashmi/')
  }

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

  const techStack = ['Next.js', 'MongoDB', 'React', 'Node.js', 'Tailwind CSS'];

  return (
    <section className="relative h-[121vh] bg-black overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0">
        {/* Moving gradient orbs */}
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: 'transform 0.8s ease-out',
            left: '10%',
            top: '20%'
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-zinc-600/5 to-slate-600/5 blur-2xl"
          style={{
            transform: `translate(${-mousePosition.x * 0.03}px, ${-mousePosition.y * 0.03}px)`,
            transition: 'transform 0.6s ease-out',
            right: '15%',
            bottom: '25%'
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

      {/* Main content - asymmetrical layout */}
      <div className="relative z-10 h-full flex">
        
        {/* Left side - Main content */}
        <div className="flex-1 flex flex-col justify-center pl-8 md:pl-16 lg:pl-24 max-w-4xl">
          
          {/* Small intro text */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
            <p className="text-emerald-400 font-mono text-sm mb-4 tracking-wider">FULL STACK DEVELOPER</p>
          </div>

          {/* Large name */}
          <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-2 leading-tight">
              Hassan Saeed
            </h1>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-8 leading-tight">
              Hashmi
            </h1>
          </div>

          {/* Description */}
          <div className={`transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
            <p className="text-xl text-gray-300 max-w-2xl mb-12 leading-relaxed">
              Passionate about building modern web applications with Next.js and MongoDB. 
              I craft digital experiences that are both beautiful and functional.
            </p>
          </div>

          {/* Buttons */}
          <div className={`transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
            <div className="flex flex-wrap gap-6 mb-16">
              <Link href='/projects'>
              <button  className="group relative px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-all duration-300 flex items-center gap-3 hover:gap-4 shadow-lg hover:shadow-emerald-500/25">
                View My Work
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button></Link>
              
              <Link href='https://github.com/hassanhashmi16' target='blank'><button className="group px-8 py-4 border border-gray-600 hover:border-gray-400 text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-3 hover:bg-gray-800/50">
                <Github size={20} className="group-hover:scale-110 transition-transform duration-300" />
                GitHub
              </button></Link>
              
              <Link href='https://www.linkedin.com/in/hassansaeedhashmi/' target='blank'><button className="group px-8 py-4 border border-gray-600 hover:border-gray-400 text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-3 hover:bg-gray-800/50">
                <Linkedin size={20} className="group-hover:scale-110 transition-transform duration-300" />
                LinkedIn
              </button></Link>
            </div>
          </div>
        </div>

        {/* Right side - Tech stack vertical layout */}
        <div className="hidden lg:flex flex-col justify-center pr-16 xl:pr-24">
          <div className={`transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
            
            {/* Tech stack label */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-emerald-400 to-transparent" />
                <span className="text-emerald-400 font-mono text-sm tracking-wider">TECH STACK</span>
              </div>
            </div>

            {/* Tech items */}
            <div className="space-y-4">
              {techStack.map((tech, index) => (
                <div
                  key={tech}
                  className={`group relative py-3 px-6 bg-gray-900/30 border border-gray-800 hover:border-gray-600 rounded-lg hover:bg-gray-800/50 transition-all duration-300 transform hover:translate-x-2 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                  style={{
                    transitionDelay: `${800 + index * 100}ms`
                  }}
                >
                  <span className="text-gray-300 group-hover:text-white font-medium transition-colors duration-300">
                    {tech}
                  </span>
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>

            {/* Decorative element */}
            <div className="mt-12 relative">
              <div className="w-px h-24 bg-gradient-to-b from-emerald-400/50 to-transparent mx-auto" />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            </div>
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

      {/* Mobile tech stack - horizontal at bottom */}
      <div className="lg:hidden absolute bottom-12 left-0 right-0 px-8">
        <div className={`transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-gradient-to-r from-emerald-400 to-transparent" />
            <span className="text-emerald-400 font-mono text-xs tracking-wider">TECH STACK</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-full text-gray-300 text-sm font-medium hover:border-gray-600 hover:text-white transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;