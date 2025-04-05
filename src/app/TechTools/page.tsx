"use client";
import React, {  useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt,FaGithub, FaDocker, FaAws, FaFigma } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiFirebase, SiTypescript } from "react-icons/si";

// Simplified tech categories with essential tools only
const techCategories = [
  {
    title: "Frontend",
    color: "from-blue-500 to-blue-400",
    tools: [
      { name: "React", icon: <FaReact size={28} />, level: 90 },
      { name: "Next.js", icon: <SiNextdotjs size={28} />, level: 85 },
      { name: "TypeScript", icon: <SiTypescript size={28} />, level: 80 },
      { name: "Tailwind", icon: <SiTailwindcss size={28} />, level: 88 },
    ]
  },
  {
    title: "Backend",
    color: "from-emerald-500 to-green-400",
    tools: [
      { name: "Node.js", icon: <FaNodeJs size={28} />, level: 88 },
      { name: "MongoDB", icon: <SiMongodb size={28} />, level: 85 },
      { name: "Firebase", icon: <SiFirebase size={28} />, level: 84 },
    ]
  },
  {
    title: "DevOps",
    color: "from-purple-500 to-purple-400",
    tools: [
      { name: "GitHub", icon: <FaGithub size={28} />, level: 92 },
      { name: "Docker", icon: <FaDocker size={28} />, level: 78 },
      { name: "AWS", icon: <FaAws size={28} />, level: 75 },
    ]
  },
  {
    title: "Design",
    color: "from-rose-500 to-pink-400",
    tools: [
      { name: "HTML5", icon: <FaHtml5 size={28} />, level: 95 },
      { name: "CSS3", icon: <FaCss3Alt size={28} />, level: 90 },
      { name: "Figma", icon: <FaFigma size={28} />, level: 80 },
    ]
  }
];

const TechToolsPage = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="w-full py-16 " ref={ref}>
      {/* Premium Background - Subtle gradient with accent line */}
      <div className="absolute inset-0 "></div>
      <div className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Animated title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.span className="inline-block text-lg font-medium mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            MY EXPERTISE
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Tools & <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Technologies</span>
          </h2>
          
          <motion.div 
            className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4"
            initial={{ width: 0 }}
            animate={inView ? { width: 64 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </motion.div>

        {/* Category tabs - Simplified */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {techCategories.map((category, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                activeCategory === index 
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg` 
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {category.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Tool cards grid - Optimized */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {techCategories[activeCategory].tools.map((tool, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                onMouseEnter={() => setHoveredTool(`${activeCategory}-${index}`)}
                onMouseLeave={() => setHoveredTool(null)}
                className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden group"
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="p-6 flex flex-col items-center">
                  <div className={`p-4 rounded-full bg-gray-700 mb-4 text-white group-hover:text-${techCategories[activeCategory].color.split(' ')[1].replace('to-', '')}`}>
                    {tool.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4">{tool.name}</h3>
                  
                  {/* Simplified skill level bar */}
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${techCategories[activeCategory].color}`}
                      initial={{ width: "0%" }}
                      animate={{ width: `${tool.level}%` }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                    />
                  </div>
                  
                  <p className="text-gray-400 mt-2 text-sm font-medium">
                    {tool.level}% Proficiency
                  </p>
                </div>
                
                {/* Simple accent line */}
                <motion.div 
                  className={`h-1 w-full bg-gradient-to-r ${techCategories[activeCategory].color} transform origin-left`}
                  initial={{ scaleX: 0 }}
                  animate={hoveredTool === `${activeCategory}-${index}` ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* Call to action button - Simplified */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-md"
          >
            Let&apos;s Build Together
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TechToolsPage;