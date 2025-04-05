/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaDatabase, 
  FaGithub, FaDocker, FaAws, FaFigma, FaCode, FaCogs, 
  FaPalette, FaTerminal, FaTools, FaCloudUploadAlt
} from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiFirebase, 
  SiTypescript, SiRedux, SiPostgresql, SiGraphql, SiVite, 
  SiVercel, SiNetlify, SiJest, SiGit
} from "react-icons/si";

// Tech stack categories with icons
const techCategories = [
  {
    title: "Frontend",
    icon: <FaCode size={24} />,
    color: "from-blue-500 to-cyan-400",
    tools: [
      { name: "React", icon: <FaReact size={32} />, level: 90 },
      { name: "Next.js", icon: <SiNextdotjs size={32} />, level: 85 },
      { name: "HTML5", icon: <FaHtml5 size={32} />, level: 95 },
      { name: "CSS3", icon: <FaCss3Alt size={32} />, level: 90 },
      { name: "JavaScript", icon: <FaJs size={32} />, level: 92 },
      { name: "TypeScript", icon: <SiTypescript size={32} />, level: 80 },
      { name: "Tailwind CSS", icon: <SiTailwindcss size={32} />, level: 88 },
      { name: "Redux", icon: <SiRedux size={32} />, level: 85 },
      { name: "Vite", icon: <SiVite size={32} />, level: 82 },
    ]
  },
  {
    title: "Backend",
    icon: <FaCogs size={24} />,
    color: "from-emerald-500 to-green-400",
    tools: [
      { name: "Node.js", icon: <FaNodeJs size={32} />, level: 88 },
      { name: "Express.js", icon: <FaJs size={32} />, level: 86 },
      { name: "MongoDB", icon: <SiMongodb size={32} />, level: 85 },
      { name: "PostgreSQL", icon: <SiPostgresql size={32} />, level: 78 },
      { name: "Firebase", icon: <SiFirebase size={32} />, level: 84 },
      { name: "GraphQL", icon: <SiGraphql size={32} />, level: 76 },
    ]
  },
  {
    title: "UI/UX",
    icon: <FaPalette size={24} />,
    color: "from-pink-500 to-purple-400",
    tools: [
      { name: "Figma", icon: <FaFigma size={32} />, level: 80 },
      { name: "Responsive Design", icon: <FaCss3Alt size={32} />, level: 92 },
      { name: "Framer Motion", icon: <FaReact size={32} />, level: 85 },
    ]
  },
  {
    title: "DevOps",
    icon: <FaCloudUploadAlt size={24} />,
    color: "from-orange-500 to-yellow-400",
    tools: [
      { name: "Git", icon: <SiGit size={32} />, level: 90 },
      { name: "GitHub", icon: <FaGithub size={32} />, level: 92 },
      { name: "Docker", icon: <FaDocker size={32} />, level: 78 },
      { name: "AWS", icon: <FaAws size={32} />, level: 75 },
      { name: "Vercel", icon: <SiVercel size={32} />, level: 88 },
      { name: "Netlify", icon: <SiNetlify size={32} />, level: 85 },
    ]
  },
  {
    title: "Tools",
    icon: <FaTools size={24} />,
    color: "from-red-500 to-rose-400",
    tools: [
      { name: "VS Code", icon: <FaCode size={32} />, level: 95 },
      { name: "Terminal", icon: <FaTerminal size={32} />, level: 88 },
      { name: "Jest", icon: <SiJest size={32} />, level: 78 },
      { name: "Postman", icon: <FaTools size={32} />, level: 85 },
    ]
  }
];

const TechToolsPage = () => {
  const [navbarHeight, setNavbarHeight] = useState(80);
  const [activeCategory, setActiveCategory] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoveredTool, setHoveredTool] = useState(null);

  // Detect navbar height
  useEffect(() => {
    const updateNavHeight = () => {
      const navbar = document.querySelector("nav") || document.querySelector("header");
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };

    updateNavHeight();
    window.addEventListener("resize", updateNavHeight);
    return () => window.removeEventListener("resize", updateNavHeight);
  }, []);

  // Mouse follower effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center bg-transparent overflow-hidden"
      style={{ paddingTop: `${navbarHeight + 20}px`, paddingBottom: "3rem" }}
      ref={ref}
    >
      {/* Dynamic background elements */}
      <motion.div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div 
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-blue-500 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-orange-300 blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute top-2/3 right-1/3 w-56 h-56 rounded-full bg-green-400 blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.div>

      {/* Mouse follower glow */}
      <motion.div
        className="hidden lg:block fixed w-60 h-60 rounded-full bg-orange-500/20 blur-3xl pointer-events-none z-0"
        animate={{
          x: cursorPosition.x - 120,
          y: cursorPosition.y - 120,
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 100,
          mass: 0.8
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-center z-10">
        {/* Animated title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full text-center mb-16"
        >
          <motion.div 
            className="inline-block"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span 
              className="inline-block bg-gradient-to-r from-orange-400 to-yellow-300 text-transparent bg-clip-text text-xl font-medium mb-2"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 10,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              MY TECH STACK
            </motion.span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Tools & <span className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">Technologies</span>
          </motion.h2>
          
          <motion.div 
            className="w-20 h-1 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full mx-auto mt-4"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto mt-6 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Leveraging modern technologies to build robust, scalable, and user-friendly applications
          </motion.p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {techCategories.map((category, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`px-4 py-2 rounded-full flex items-center gap-2 font-medium transition-all duration-300 ${
                activeCategory === index 
                  ? "bg-gradient-to-r " + category.color + " text-white shadow-lg" 
                  : "bg-gray-800/60 text-gray-300 hover:bg-gray-700/70"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{category.icon}</span>
              <span>{category.title}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Tool cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
            className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {techCategories[activeCategory].tools.map((tool, index) => {
              const isHovered = hoveredTool === `${activeCategory}-${index}`;
              
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredTool(`${activeCategory}-${index}`)}
                  onMouseLeave={() => setHoveredTool(null)}
                  className="relative bg-gray-900/50 backdrop-blur-md rounded-xl border border-gray-800 hover:border-orange-500/30 overflow-hidden group"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 30px -10px rgba(249, 115, 22, 0.3)",
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${techCategories[activeCategory].color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    animate={isHovered ? { opacity: 0.15 } : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Tool content */}
                  <div className="p-6 flex flex-col items-center">
                    <motion.div
                      className="p-4 rounded-full bg-gray-800/80 mb-4 text-white"
                      animate={isHovered ? { 
                        y: [0, -5, 0],
                        scale: 1.1,
                        color: `var(--${techCategories[activeCategory].color.split(' ')[1].replace('to-', '')})`,
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {tool.icon}
                    </motion.div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">{tool.name}</h3>
                    
                    {/* Skill level bar */}
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mt-2">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${techCategories[activeCategory].color}`}
                        initial={{ width: "0%" }}
                        animate={{ width: `${tool.level}%` }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      />
                    </div>
                    
                    <motion.p 
                      className="text-gray-400 mt-2 text-sm font-medium"
                      animate={isHovered ? { color: "#f97316" } : {}}
                    >
                      {tool.level}% Proficiency
                    </motion.p>
                  </div>
                  
                  {/* Decorative corner accent */}
                  <motion.div
                    className={`absolute top-0 right-0 w-12 h-12 bg-gradient-to-br ${techCategories[activeCategory].color} rounded-bl-xl opacity-0 group-hover:opacity-80`}
                    animate={isHovered ? { opacity: 0.8, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute top-2 right-2 text-white">
                      {techCategories[activeCategory].icon}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
        
        {/* Bottom button */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 20px rgba(249, 115, 22, 0.5)" 
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold shadow-lg transition duration-300"
          >
            Let&apos;s Build Together
          </motion.button>
          
          <motion.p
            className="text-gray-400 mt-4"
            animate={{ 
              opacity: [0.7, 1, 0.7] 
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            Always learning and expanding my toolkit
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default TechToolsPage;