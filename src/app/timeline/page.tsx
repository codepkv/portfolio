/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
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
  const [navbarHeight, setNavbarHeight] = useState(80); // Default height estimate
  const [activeItem, setActiveItem] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Detect navbar height on mount and resize
  useEffect(() => {
    const updateNavHeight = () => {
      const navbar = document.querySelector("nav") || document.querySelector("header");
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };

    // Run once on mount
    updateNavHeight();

    // Set up resize listener
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

  // Background animation variants
  const backgroundVariants = {
    animate: {
      backgroundPosition: ["0% 0%", "100% 100%"],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
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
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-orange-500 blur-3xl"
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
          className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-yellow-300 blur-3xl"
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
              variants={backgroundVariants}
              animate="animate"
            >
              MY STORY
            </motion.span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            My <span className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">Journey</span>
          </motion.h2>
          
          <motion.div 
            className="w-20 h-1 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full mx-auto mt-4"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 w-full">
          {/* Left Side - Image with interactive animations */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
              hidden: { opacity: 0, x: -50 }
            }}
            className="w-full lg:w-1/2 flex justify-center relative order-2 lg:order-1"
          >
            <motion.div
              className="absolute -z-10 inset-0 bg-gradient-to-br from-orange-500/30 to-yellow-400/20 rounded-full blur-3xl opacity-70"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="relative w-[70%] sm:w-[50%] lg:w-[85%] max-w-lg"
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <img
                src="https://res.cloudinary.com/du5hd5zaq/image/upload/v1743667499/pankaj2-removebg-preview_mu4xcw.png"
                alt="Pankaj"
                className="w-full drop-shadow-2xl"
              />
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute top-10 -left-12 w-24 h-24 rounded-full border border-orange-500/30 flex items-center justify-center"
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 5, repeat: Infinity, repeatType: "reverse" }
                }}
              >
                <div className="w-16 h-16 rounded-full border border-yellow-400/40" />
              </motion.div>
              
              <motion.div 
                className="absolute bottom-10 -right-8 w-16 h-16 rounded-full bg-orange-500/10 backdrop-blur-sm flex items-center justify-center"
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <FaCode className="text-orange-400" size={24} />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } },
              hidden: { opacity: 0, x: 50 }
            }}
            className="w-full lg:w-1/2 flex flex-col gap-8 order-1 lg:order-2"
          >            
            <div className="relative border-l-4 border-orange-400/70 pl-6 sm:pl-8 space-y-12">
              {timeline.map((item, index) => {
                const [itemRef, itemInView] = useInView({
                  threshold: 0.2,
                  triggerOnce: false,
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
                        transition: { 
                          duration: 0.7, 
                          ease: "easeOut", 
                          delay: index * 0.15 
                        }
                      },
                      hidden: { opacity: 0, y: 30 }
                    }}
                    className="relative"
                    onMouseEnter={() => setActiveItem(index)}
                    onMouseLeave={() => setActiveItem(null)}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Timeline connecting line highlight effect */}
                    {itemInView && (
                      <motion.div 
                        className="absolute left-[-28px] top-0 bottom-0 w-4 bg-orange-400/60"
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        transition={{ duration: 0.7, delay: index * 0.15 }}
                      />
                    )}
                    
                    {/* Timeline Dot with pulsing effect */}
                    <motion.div 
                      className="absolute left-[-42px] sm:left-[-40px] top-2 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-full flex items-center justify-center text-white shadow-lg z-10"
                      initial={{ scale: 0.9, opacity: 0.8 }}
                      animate={itemInView ? { 
                        scale: activeItem === index ? 1.2 : [1, 1.1, 1],
                        opacity: 1,
                        boxShadow: [
                          "0 0 0 0 rgba(249, 115, 22, 0.7)",
                          "0 0 0 10px rgba(249, 115, 22, 0)",
                          "0 0 0 0 rgba(249, 115, 22, 0)"
                        ]
                      } : {}}
                      transition={{
                        duration: 2,
                        ease: "easeInOut",
                        times: [0, 0.5, 1],
                        repeat: Infinity,
                        repeatDelay: activeItem === index ? 0.5 : 3
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    
                    {/* Content with hover effect */}
                    <motion.div
                      whileHover={{ 
                        x: 5,
                        boxShadow: "0 10px 30px -10px rgba(249, 115, 22, 0.3)"
                      }}
                      animate={activeItem === index ? {
                        x: 5,
                        backgroundColor: "rgba(31, 41, 55, 0.7)"
                      } : {
                        x: 0,
                        backgroundColor: "rgba(17, 24, 39, 0.5)"
                      }}
                      className="bg-gray-900/50 backdrop-blur-sm p-5 sm:p-6 rounded-lg border border-orange-500/10 hover:border-orange-500/40 transition-all duration-300"
                    >
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <motion.span 
                          className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {item.year}
                        </motion.span>
                        <motion.h3 
                          className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                          animate={activeItem === index ? {
                            backgroundImage: "linear-gradient(to right, #f97316, #facc15)"
                          } : {
                            backgroundImage: "linear-gradient(to right, #ffffff, #d1d5db)"
                          }}
                        >
                          {item.title}
                        </motion.h3>
                      </div>
                      <motion.p 
                        className="text-gray-300 text-base sm:text-lg"
                        animate={activeItem === index ? { opacity: 1 } : { opacity: 0.9 }}
                      >
                        {item.description}
                      </motion.p>
                      
                      {/* Animated line at the bottom */}
                      <motion.div 
                        className="w-0 h-0.5 bg-gradient-to-r from-orange-500 to-transparent mt-4 rounded-full"
                        animate={activeItem === index ? { width: "100%" } : { width: "0%" }}
                        transition={{ duration: 0.4 }}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Call to action at the end of timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.9 } },
                hidden: { opacity: 0, y: 20 }
              }}
              className="mt-8 flex justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(249, 115, 22, 1)" }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold shadow-lg transition duration-300"
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