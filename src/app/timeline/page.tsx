/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaCode, FaRocket, FaBriefcase, FaStar } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const timeline = [
  {
    year: "2019",
    title: "Started Coding",
    icon: <FaCode size={24} />,
    description: "Began my journey into programming and built my first projects using HTML, CSS, and JavaScript.",
  },
  {
    year: "2021",
    title: "Full-Stack Development",
    icon: <FaRocket size={24} />,
    description: "Dove into full-stack development, learning MERN stack and building real-world applications.",
  },
  {
    year: "2023",
    title: "Professional Experience",
    icon: <FaBriefcase size={24} />,
    description: "Started working as a professional full-stack developer, building scalable and efficient applications.",
  },
  {
    year: "2025",
    title: "Pushing Boundaries",
    icon: <FaStar size={24} />,
    description: "Exploring AI, Web3, and cutting-edge technologies to build innovative solutions for the future.",
  },
];

const TimelinePage = () => {
  const [navbarHeight, setNavbarHeight] = useState(80);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  // Detect navbar height on mount
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

  // Animation for section entrance
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

  return (
    <section 
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ paddingTop: `${navbarHeight + 20}px`, paddingBottom: "3rem" }}
      ref={ref}
    >
      {/* Simplified background gradient */}
      <div className="absolute inset-0  z-0" />
      
      {/* Subtle accent gradients */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full  blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center z-10">
        {/* Simplified animated title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full text-center mb-12"
        >
          <span className="inline-block text-blue-400 font-medium mb-2">
            MY STORY
          </span>
          
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            My <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Journey</span>
          </motion.h2>
          
          <motion.div 
            className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-4"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full">
          {/* Left Side - Simplified image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
              hidden: { opacity: 0, x: -50 }
            }}
            className="w-full lg:w-2/5 flex justify-center relative order-2 lg:order-1"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="relative w-4/5 max-w-md"
            >
              <img
                src="https://res.cloudinary.com/du5hd5zaq/image/upload/v1743667499/pankaj2-removebg-preview_mu4xcw.png"
                alt="Pankaj"
                className="w-full drop-shadow-xl"
              />
              
              {/* Single decorative element */}
              <motion.div 
                className="absolute top-8 -left-8 w-20 h-20 rounded-full border border-purple-500/30 flex items-center justify-center"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="w-12 h-12 rounded-full border border-blue-400/40" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Simplified Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.3 } },
              hidden: { opacity: 0, x: 50 }
            }}
            className="w-full lg:w-3/5 flex flex-col gap-8 order-1 lg:order-2"
          >            
            <div className="relative border-l-2 border-blue-500 pl-6 space-y-8">
              {timeline.map((item, index) => {
                const [itemRef, itemInView] = useInView({
                  threshold: 0.2,
                  triggerOnce: true,
                });

                return (
                  <motion.div
                    ref={itemRef}
                    key={index}
                    initial="hidden"
                    animate={itemInView ? "visible" : "hidden"}
                    variants={{
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: { duration: 0.7, delay: index * 0.15 }
                      },
                      hidden: { opacity: 0, y: 30 }
                    }}
                    className="relative"
                    onMouseEnter={() => setActiveItem(index)}
                    onMouseLeave={() => setActiveItem(null)}
                  >
                    {/* Timeline Dot */}
                    <motion.div 
                      className="absolute left-[-34px] top-2 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg"
                      animate={activeItem === index ? { 
                        scale: 1.1,
                        boxShadow: "0 0 15px rgba(96, 165, 250, 0.6)"
                      } : {}}
                    >
                      {item.icon}
                    </motion.div>
                    
                    {/* Content */}
                    <motion.div
                      whileHover={{ x: 5 }}
                      animate={activeItem === index ? {
                        x: 5,
                        backgroundColor: "rgba(15, 23, 42, 0.8)"
                      } : {}}
                      className="bg-slate-800/80 p-5 rounded-lg border border-slate-700 hover:border-blue-500/40 transition-all duration-300"
                    >
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                          {item.year}
                        </span>
                        <h3 className="text-xl font-bold text-white">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-gray-300">
                        {item.description}
                      </p>
                      
                      {/* Animated indicator line */}
                      <motion.div 
                        className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-transparent mt-4 rounded-full"
                        animate={activeItem === index ? { width: "100%" } : { width: "0%" }}
                        transition={{ duration: 0.4 }}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Call to action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.9 } },
                hidden: { opacity: 0, y: 20 }
              }}
              className="mt-6 flex justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-lg"
              >
                See My Work
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TimelinePage;