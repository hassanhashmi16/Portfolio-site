'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';

import Projects from '@/data/projects.json'

const ProjectCard = ({ project, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  return (
    <div 
      className={`group relative bg-gray-900/30 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      style={{
        transitionDelay: `${index * 150}ms`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
        {/* Show actual image if available and no error, otherwise show placeholder */}
        {project.image && !imageError ? (
          <>
            <Image 
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent z-10" />
          </>
        ) : (
          // Fallback placeholder design
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-teal-600/20" />
            <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300`} />
            
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
                backgroundSize: '30px 30px',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 0.5s ease-out'
              }} />
            </div>
          </>
        )}
        
        {/* Project number */}
        <div className="absolute top-4 left-4 w-8 h-8 bg-emerald-500/20 border border-emerald-400/30 rounded-full flex items-center justify-center z-20">
          <span className="text-emerald-400 font-mono text-sm font-bold">0{project.id}</span>
        </div>
        
        {/* Hover overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-emerald-600/10 to-transparent transition-opacity duration-300 z-10 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300">
          {project.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-300 mb-4 leading-relaxed">
          {project.description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, techIndex) => (
            <span
              key={tech}
              className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-gray-300 text-sm font-medium hover:border-emerald-400/50 hover:text-emerald-400 transition-all duration-300"
              style={{
                transitionDelay: `${techIndex * 50}ms`
              }}
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`group/btn ${project.projectUrl ? 'flex-1' : 'w-full'} flex items-center justify-center gap-2 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 font-medium hover:border-gray-500 hover:bg-gray-700/50 hover:text-white transition-all duration-300`}
          >
            <Github size={18} className="group-hover/btn:scale-110 transition-transform duration-300" />
            <span>Code</span>
          </a>
          
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500/10 border border-emerald-400/30 rounded-lg text-emerald-400 font-medium hover:bg-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300"
            >
              <ExternalLink size={18} className="group-hover/btn:scale-110 transition-transform duration-300" />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>
      
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-emerald-400/30" />
      </div>
    </div>
  );
};

const ProjectsPage = () => {
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
            right: '10%',
            top: '20%'
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-zinc-600/5 to-slate-600/5 blur-2xl"
          style={{
            transform: `translate(${-mousePosition.x * 0.03}px, ${-mousePosition.y * 0.03}px)`,
            transition: 'transform 0.6s ease-out',
            left: '15%',
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

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <p className="text-emerald-400 font-mono text-sm mb-4 tracking-wider">MY PORTFOLIO</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Featured 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 ml-4">
              Projects
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A collection of projects I have worked on, showcasing my skills in modern web development 
            and full-stack solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {Projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              isVisible={isVisible}
            />
          ))}
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
};

export default ProjectsPage;