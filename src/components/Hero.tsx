"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [navbarHeight, setNavbarHeight] = useState(80); // Default height estimate

  // Effect to detect navbar height on mount and resize
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

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  // Background gradient animation
  const gradientVariants = {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 15,
        ease: "linear",
        repeat: Infinity
      }
    }
  };

  return (
    <section 
      className="relative w-full min-h-screen flex items-center justify-center bg-transparent overflow-hidden"
      style={{ paddingTop: `${navbarHeight}px` }}
    >
      {/* Background animated elements */}
      <motion.div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
      >
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-orange-500 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-yellow-300 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left content section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center md:text-left w-full md:w-1/2 z-10"
        >
          <motion.div
            variants={gradientVariants}
            animate="animate"
            className="mb-6 inline-block px-4 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-400/20 backdrop-blur-sm"
          >
            <span className="text-sm font-medium text-orange-300">Full Stack Developer</span>
          </motion.div>
          
          <motion.h1 
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight"
          >
            Hi, I&apos;m{" "}
            <motion.span 
              className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              Pankaj
            </motion.span>
          </motion.h1>
          
          <motion.p 
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="mt-4 text-base sm:text-lg text-gray-300 max-w-xl"
          >
            A passionate full-stack developer, crafting elegant and efficient solutions with the latest technologies.
          </motion.p>
          
          <motion.div
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold shadow-lg transition duration-300"
            >
              Let&apos;s Connect
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl border border-orange-500/30 text-orange-300 font-semibold transition duration-300 hover:bg-orange-500/10"
            >
              View Projects
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Right Side - Image with floating animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="w-full md:w-1/2 flex justify-center mt-12 md:mt-0"
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="relative w-[80%] sm:w-[70%] md:w-[90%] max-w-lg"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-yellow-400/20 rounded-full blur-3xl -z-10"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <img
              src="https://res.cloudinary.com/du5hd5zaq/image/upload/v1743666001/pankaj__1_-removebg-preview_bhh5dq.png"
              alt="Pankaj"
              className="w-full drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;