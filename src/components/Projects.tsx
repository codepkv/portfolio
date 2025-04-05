"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt, FaCode, FaMobile, FaServer, FaPalette } from "react-icons/fa";

// Sample project data
const projectsData = [
  {
    id: "e-commerce-platform",
    title: "E-Commerce Platform",
    category: "fullstack",
    tags: ["Next.js", "Stripe", "MongoDB", "Tailwind CSS"],
    description: "A modern e-commerce platform with payment processing, user authentication, and admin dashboard.",
    github: "https://github.com/yourusername/ecommerce",
    liveUrl: "https://ecommerce-demo.com",
    featured: true
  },
  {
    id: "fitness-tracker-app",
    title: "Fitness Tracker App",
    category: "mobile",
    tags: ["React Native", "Firebase", "Redux", "Chart.js"],
    description: "Mobile application for tracking workouts, nutrition, and progress with data visualization.",
    github: "https://github.com/yourusername/fitness-app",
    liveUrl: "https://fitness-app-demo.com",
    featured: true
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    category: "frontend",
    tags: ["React", "Framer Motion", "Tailwind CSS"],
    description: "Personal portfolio website with smooth animations and responsive design.",
    github: "https://github.com/yourusername/portfolio",
    liveUrl: "https://your-portfolio.com",
    featured: false
  },
  {
    id: "weather-dashboard",
    title: "Weather Dashboard",
    category: "frontend",
    tags: ["React", "OpenWeather API", "Chart.js"],
    description: "Interactive weather dashboard with 7-day forecasts and historical data visualization.",
    github: "https://github.com/yourusername/weather-app",
    liveUrl: "https://weather-demo.com",
    featured: false
  },
  {
    id: "rest-api-service",
    title: "REST API Service",
    category: "backend",
    tags: ["Node.js", "Express", "MongoDB", "JWT"],
    description: "Secure RESTful API service with authentication, rate limiting, and comprehensive documentation.",
    github: "https://github.com/yourusername/rest-api",
    liveUrl: "https://api-docs-demo.com",
    featured: true
  },
  {
    id: "ui-component-library",
    title: "UI Component Library",
    category: "design",
    tags: ["React", "Storybook", "CSS Modules"],
    description: "Reusable UI component library with comprehensive documentation and examples.",
    github: "https://github.com/yourusername/ui-library",
    liveUrl: "https://ui-library-demo.com",
    featured: false
  }
];

// Project categories
const categories = [
  { id: "all", label: "All Projects", icon: <FaCode /> },
  { id: "frontend", label: "Frontend", icon: <FaPalette /> },
  { id: "backend", label: "Backend", icon: <FaServer /> },
  { id: "fullstack", label: "Full Stack", icon: <FaCode /> },
  { id: "mobile", label: "Mobile Apps", icon: <FaMobile /> },
  { id: "design", label: "UI/UX Design", icon: <FaPalette /> }
];

const ProjectsPage = () => {
  const [filter, setFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  // Apply filters when category or search changes
  useEffect(() => {
    setFilteredProjects(
      projectsData.filter((project) => {
        const matchesCategory = filter === "all" || project.category === filter;
        const matchesSearch = 
          !searchQuery || 
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
        return matchesCategory && matchesSearch;
      })
    );
  }, [filter, searchQuery]);

  return (
    <section className="w-full py-12 bg-gray-900 min-h-screen" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="text-lg font-medium mb-2 text-indigo-400">MY PORTFOLIO</span>
          <h2 className="text-4xl font-bold text-white">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-indigo-500 mx-auto mt-4"></div>
          <p className="text-gray-300 max-w-2xl mx-auto mt-4">
            Explore my recent work across different technologies and domains. Each project represents unique challenges and innovative solutions.
          </p>
        </motion.div>

        {/* Search and filter section */}
        <div className="mb-8">
          {/* Search bar */}
          <div className="relative max-w-md mx-auto mb-6">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
            />
            <div className="absolute right-3 top-2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* Category filter buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-3 py-1 rounded flex items-center gap-1 ${
                  filter === category.id
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="group"
              >
                <Link href={`/projects/${project.id}`}>
                  <div className="rounded bg-gray-800 h-full flex flex-col border border-gray-700 hover:border-indigo-500 transition">
                    {/* Project image */}
                    <div className="relative h-48 bg-gray-700">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
                      {project.featured && (
                        <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">
                          Featured
                        </div>
                      )}
                    </div>
                    
                    {/* Project content */}
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-3 flex-grow">
                        {project.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.tags.map((tag, idx) => (
                          <span 
                            key={idx} 
                            className="px-2 py-1 bg-gray-700 text-xs text-gray-300 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Links */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaGithub size={18} />
                        </a>
                        
                        <span className="text-indigo-400 flex items-center gap-1 text-sm">
                          View Project <FaExternalLinkAlt size={10} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
              <h3 className="text-xl text-white">No projects found</h3>
              <p className="text-gray-400 mt-2">Try adjusting your search or filter criteria</p>
              <button 
                onClick={() => {setFilter("all"); setSearchQuery("");}} 
                className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
        
        {/* Call to action */}
        <div className="mt-12 text-center">
          <div className="bg-gray-800 p-6 rounded border border-gray-700 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-3">Interested in working together?</h3>
            <p className="text-gray-300 mb-4">Let&apos;s discuss how we can collaborate on your next project.</p>
            <button className="px-6 py-2 rounded bg-indigo-500 text-white">
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;