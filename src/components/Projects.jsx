'use client'
import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const router = useRouter()

  const pushtoprojects = () => {
    router.push('/projects')
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('projects-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Mock projects data - replace with your actual data
  const projects = [
  {
    "id": 1,
    "title": "Roti & Reps",
    "description": "An AI-powered web app that generates personalized Desi meal plans with recipes, helping users balance fitness goals with traditional South Asian cuisine.",
    "githubUrl": "https://github.com/hassanhashmi16/Roti-Reps.git",
    "projectUrl":"https://roti-reps.vercel.app/MealMaker",
    "image": "/assets/rotireps.png",
    "technologies": ["Next.js", "Tailwind CSS", "GeminiAI"]
  },
  {
    "id": 2,
    "title": "AnonyMessage",
    "description": "A web app that lets users send anonymous messages to registered users, built to encourage fun, private, and open communication.",
    "githubUrl": "https://github.com/hassan/task-manager",
    "projectUrl":"",
    "image": "/assets/anonymessage.png",
    "technologies": ["Next.js", "MongoDB", "React.js" , "Tailwind CSS"]
  },
  {
    "id": 3,
    "title": "Music Academy",
    "description": "A responsive front-end website designed for a music academy, showcasing courses, instructors, and contact details with a clean, user-friendly UI.",
    "githubUrl": "https://github.com/hassan/weather-dashboard",
    "image": "/assets/musicacademy.png",
    "technologies": ["Next.js", "Tailwind CSS", "Accertainity UI"]
  }
]

  return (
    <section id="projects-section" className="min-h-screen bg-black text-white py-20 px-8 md:px-16 lg:px-24">
      
      {/* Header - offset layout */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="flex items-end gap-6 mb-8">
            <div className="flex flex-col">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-400">Featured</h2>
            </div>
            <div className="pb-2">
              <h2 className="text-4xl md:text-6xl font-bold text-white">Projects</h2>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-emerald-400 to-transparent" />
            <p className="text-gray-400 text-lg max-w-2xl">
              Here are some of my recent projects that showcase my skills in fullstack development
            </p>
          </div>
        </div>
      </div>

      {/* Projects grid - staggered layout */}
      <div className="max-w-7xl mx-auto">
        <div className="space-y-32">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
              style={{ transitionDelay: `${600 + index * 200}ms` }}
            >
              {/* Alternating layout */}
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                
                {/* Project image */}
                <div className={`relative group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-4">
                        <a 
                          href={project.githubUrl}
                          className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 group/btn"
                        >
                          <Github size={24} className="text-white group-hover/btn:scale-110 transition-transform duration-300" />
                        </a>
                        <a 
                          href={project.liveUrl}
                          className="p-3 bg-emerald-500/80 backdrop-blur-sm rounded-full border border-emerald-400/50 hover:bg-emerald-500 transition-all duration-300 group/btn"
                        >
                          <ExternalLink size={24} className="text-white group-hover/btn:scale-110 transition-transform duration-300" />
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Project number */}
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-black font-bold text-lg shadow-lg">
                    {String(project.id).padStart(2, '0')}
                  </div>
                </div>

                {/* Project content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:text-right' : ''}`}>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack */}
                  <div className={`flex flex-wrap gap-3 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-full text-emerald-400 text-sm font-medium hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  {/* <div className={`flex gap-4 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
                    <a
                      href={project.githubUrl}
                      className="group inline-flex items-center gap-2 px-6 py-3 border border-gray-600 hover:border-gray-400 rounded-lg text-gray-300 hover:text-white transition-all duration-300 hover:bg-gray-800/30"
                    >
                      <Github size={18} />
                      <span>Code</span>
                      <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </a>
                    
                    <a
                      href={project.liveUrl}
                      className="group inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 rounded-lg text-black font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </a>
                  </div> */}
                </div>
              </div>

              {/* Separator line for non-last items */}
              {index < projects.length - 1 && (
                <div className="mt-32 flex justify-center">
                  <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* View all projects link */}
      <div className="max-w-7xl mx-auto mt-20 text-center">
        <div className={`transform transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <button
          onClick={pushtoprojects}
          className="group inline-flex items-center gap-3 px-8 py-4 border border-gray-600 hover:border-emerald-500 rounded-lg text-gray-300 hover:text-emerald-400 transition-all duration-300 hover:bg-emerald-500/5">
            <span className="font-medium">View All Projects</span>
            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;