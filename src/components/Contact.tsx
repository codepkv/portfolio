"use client";
import React, { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();

  // Handle viewport size detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    
    // Trigger entrance animation
    controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    });
    
    return () => window.removeEventListener("resize", handleResize);
  }, [controls]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // Add subtle animation when typing
    const element = e.target;
    element.style.transform = "scale(1.02)";
    setTimeout(() => {
      if (element) {
        element.style.transform = "scale(1)";
      }
    }, 200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Show success animation instead of alert
    setSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  // Background particles
  const Particles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-orange-400 opacity-20"
            animate={{
              x: [Math.random() * 100, Math.random() * window.innerWidth],
              y: [Math.random() * 100, Math.random() * window.innerHeight],
              scale: [0.2, Math.random() * 2],
              opacity: [0.1, 0.6, 0.1]
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    );
  };

  // Form field animation variants
  const formFieldVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (custom) => ({
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut", 
        delay: 0.2 * custom 
      }
    })
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 to-gray-900 overflow-hidden py-12 px-4">
      <Particles />
      
      {/* Main content container */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={controls}
        className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 relative z-10"
      >
        {/* Left Side - Image with parallax effect */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex justify-center"
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotateZ: [0, 2, 0]
            }}
            transition={{ 
              duration: 6, 
              ease: "easeInOut", 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          >
            <img
              src="https://res.cloudinary.com/du5hd5zaq/image/upload/v1743667499/pankaj2-removebg-preview_mu4xcw.png"
              alt="Pankaj"
              className="w-full max-w-md xl:max-w-lg drop-shadow-[0_10px_25px_rgba(249,115,22,0.2)]"
            />
          </motion.div>
        </motion.div>

        {/* Right Side - Contact Form with glass effect */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="w-full lg:w-1/2"
        >
          <motion.div 
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-gray-900/80 backdrop-blur-lg p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-800 relative overflow-hidden"
          >
            {/* Animated gradient border effect */}
            <div className="absolute -inset-px rounded-2xl z-0 opacity-30 bg-gradient-to-r from-orange-500 via-yellow-300 to-orange-500 blur-md animate-gradient"></div>
            
            <div className="relative z-10">
              <motion.h2 
                className="text-4xl sm:text-5xl font-extrabold text-white text-center"
                animate={{ 
                  textShadow: ["0 0 8px rgba(249,115,22,0)", "0 0 12px rgba(249,115,22,0.5)", "0 0 8px rgba(249,115,22,0)"] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Get in <span className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">Touch</span>
              </motion.h2>
              
              <AnimatePresence>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center rounded-2xl z-20"
                  >
                    <motion.div
                      className="text-center p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 5, 0, -5, 0] 
                        }}
                        transition={{ duration: 0.6 }}
                        className="text-6xl mb-4 inline-block"
                      >
                        🚀
                      </motion.div>
                      <h3 className="text-3xl font-bold text-white mb-2">Message Sent!</h3>
                      <p className="text-gray-300">Thank you for reaching out.</p>
                    </motion.div>
                  </motion.div>
                ) : (
                  <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <motion.div
                      variants={formFieldVariants}
                      initial="hidden"
                      animate="visible"
                      custom={1}
                    >
                      <div className="group relative">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          className="w-full p-4 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:border-orange-400 focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-orange-400/30"
                          required
                        />
                        <motion.span 
                          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-400 w-0 group-focus-within:w-full transition-all duration-500"
                          animate={{ x: formData.name ? ["-100%", "0%"] : "0%" }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>

                    {/* Email Field */}
                    <motion.div
                      variants={formFieldVariants}
                      initial="hidden"
                      animate="visible"
                      custom={2}
                    >
                      <div className="group relative">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your Email"
                          className="w-full p-4 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:border-orange-400 focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-orange-400/30"
                          required
                        />
                        <motion.span 
                          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-400 w-0 group-focus-within:w-full transition-all duration-500"
                          animate={{ x: formData.email ? ["-100%", "0%"] : "0%" }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>

                    {/* Message Field */}
                    <motion.div
                      variants={formFieldVariants}
                      initial="hidden"
                      animate="visible"
                      custom={3}
                    >
                      <div className="group relative">
                        <textarea
                          name="message"
                          id="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          placeholder="Your Message"
                          className="w-full p-4 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:border-orange-400 focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-orange-400/30 resize-none"
                          required
                        ></textarea>
                        <motion.span 
                          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-400 w-0 group-focus-within:w-full transition-all duration-500"
                          animate={{ x: formData.message ? ["-100%", "0%"] : "0%" }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                      variants={formFieldVariants}
                      initial="hidden"
                      animate="visible"
                      custom={4}
                      className="text-center pt-2"
                    >
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold text-lg shadow-lg relative overflow-hidden group"
                      >
                        <span className="relative z-10">Send Message</span>
                        <motion.span 
                          className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        {/* Animated particles on hover */}
                        <motion.span 
                          className="absolute -inset-px opacity-0 group-hover:opacity-100 overflow-hidden rounded-xl"
                          animate={{ scale: [1, 1.05] }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                        >
                          {[...Array(5)].map((_, i) => (
                            <motion.span
                              key={i}
                              className="absolute w-1 h-6 bg-white/20"
                              style={{ 
                                left: `${20 * i}%`, 
                                top: '-100%',
                                transform: 'rotate(20deg)',
                              }}
                              animate={{
                                top: ['120%', '-20%'],
                              }}
                              transition={{
                                duration: 1 + i * 0.2,
                                repeat: Infinity,
                                delay: i * 0.1,
                              }}
                            />
                          ))}
                        </motion.span>
                      </motion.button>
                    </motion.div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Add CSS animation for the gradient border */}
      <style jsx global>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientMove 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default ContactPage;