/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight, FaLinkedin } from "react-icons/fa";

// Sample testimonial data
const testimonialsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CTO at TechVision",
    company: "TechVision",
    image: "/images/testimonials/sarah.jpg", // Replace with actual path
    content: "Working with this developer was an absolute pleasure. They delivered our e-commerce platform ahead of schedule and exceeded all our expectations. Their attention to detail and problem-solving skills are exceptional.",
    rating: 5,
    linkedIn: "https://linkedin.com/in/sarahjohnson"
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Founder",
    company: "DesignHub",
    image: "/images/testimonials/michael.jpg", // Replace with actual path
    content: "I hired this developer to create a custom UI component library for our startup. Their code was clean, well-documented, and the components were highly reusable. The project has saved us countless development hours.",
    rating: 5,
    linkedIn: "https://linkedin.com/in/michaelchen"
  },
  {
    id: 3,
    name: "Alex Rodriguez",
    position: "Product Manager",
    company: "FitTech",
    image: "/images/testimonials/alex.jpg", // Replace with actual path
    content: "Our fitness tracking app needed a complete overhaul, and this developer delivered beyond our expectations. Users love the new interface, and our engagement metrics have increased by 40% since launch.",
    rating: 4,
    linkedIn: "https://linkedin.com/in/alexrodriguez"
  },
  {
    id: 4,
    name: "Priya Patel",
    position: "CEO",
    company: "CloudServe",
    image: "/images/testimonials/priya.jpg", // Replace with actual path
    content: "The backend API service developed for our cloud platform is robust, secure, and extremely well-architected. Documentation was thorough and the implementation was flawless. Would definitely work with them again!",
    rating: 5,
    linkedIn: "https://linkedin.com/in/priyapatel"
  },
  {
    id: 5,
    name: "David Williams",
    position: "Marketing Director",
    company: "WeatherNow",
    image: "/images/testimonials/david.jpg", // Replace with actual path
    content: "Our weather dashboard project had complex data visualization requirements, but this developer made it look easy. The final product is both beautiful and functional, with intuitive controls our users love.",
    rating: 5,
    linkedIn: "https://linkedin.com/in/davidwilliams"
  }
];

const TestimonialsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  // Handle testimonial navigation
  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  // Auto advance testimonials
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(nextTestimonial, 6000);
    }
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay]);

  // Pause autoplay on hover
  const pauseAutoplay = () => setAutoplay(false);
  const resumeAutoplay = () => setAutoplay(true);

  // Create array of visible testimonials (current, previous, next)
  const getVisibleTestimonials = () => {
    const prevIndex = currentIndex === 0 ? testimonialsData.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === testimonialsData.length - 1 ? 0 : currentIndex + 1;
    
    return [
      { ...testimonialsData[prevIndex], position: "prev" },
      { ...testimonialsData[currentIndex], position: "current" },
      { ...testimonialsData[nextIndex], position: "next" }
    ];
  };

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
      transition: {
        duration: 0.5
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      zIndex: 0,
      transition: {
        duration: 0.5
      }
    })
  };

  // Render star ratings
  const renderStars = (rating:number) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar key={i} className={`${i < rating ? "text-yellow-400" : "text-gray-600"}`} />
    ));
  };

  // Calculate visible indicators
  const renderIndicators = () => {
    return testimonialsData.map((_, index) => (
      <button
        key={index}
        onClick={() => {
          setDirection(index > currentIndex ? 1 : -1);
          setCurrentIndex(index);
        }}
        className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
          index === currentIndex ? "bg-indigo-500 w-6" : "bg-gray-600 hover:bg-gray-500"
        }`}
        aria-label={`Go to testimonial ${index + 1}`}
      />
    ));
  };

  return (
    <section 
      className="w-full py-16 bg-gradient-to-b from-gray-900 to-black min-h-screen flex flex-col items-center justify-center"
      ref={ref}
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 px-4"
      >
        <motion.span 
          className="inline-block text-lg font-medium mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400"
        >
          CLIENT TESTIMONIALS
        </motion.span>
        
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          What People <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">Say</span>
        </h2>
        
        <motion.div 
          className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto mt-4"
          initial={{ width: 0 }}
          animate={inView ? { width: 64 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
        
        <p className="text-gray-300 max-w-xl mx-auto mt-6">
          Don&apos;t just take my word for it. Here&apos;s what clients and colleagues have to say about working with me on various projects.
        </p>
      </motion.div>

      {/* Carousel container */}
      <div className="w-full max-w-6xl mx-auto px-4 relative">
        <div 
          className="relative h-96 md:h-80 overflow-hidden my-8"
          style={{ perspective: '1000px' }}
        >
          {/* Main testimonial cards */}
          <motion.div 
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute w-full max-w-3xl left-1/2 -translate-x-1/2 h-full"
          >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-700 h-full flex flex-col relative overflow-hidden">
              {/* Quote icon */}
              <FaQuoteLeft className="text-indigo-500/20 text-6xl absolute top-4 left-4" />
              
              {/* Testimonial content */}
              <div className="flex flex-col md:flex-row gap-6 h-full z-10 relative">
                {/* Avatar */}
                <div className="flex flex-col items-center justify-center md:w-1/4">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-700 overflow-hidden border-2 border-indigo-500 mb-3" />
                  <div className="flex my-2">
                    {renderStars(testimonialsData[currentIndex].rating)}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 flex flex-col justify-between md:pl-4 md:border-l border-gray-700">
                  <p className="text-gray-300 italic mb-6">
                  &apos;{testimonialsData[currentIndex].content}&apos;
                  </p>
                  
                  <div>
                    <h4 className="text-white font-bold text-lg">
                      {testimonialsData[currentIndex].name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <p className="text-indigo-400">
                        {testimonialsData[currentIndex].position}
                      </p>
                      <span className="text-gray-500">•</span>
                      <p className="text-gray-400">
                        {testimonialsData[currentIndex].company}
                      </p>
                    </div>
                    <a 
                      href={testimonialsData[currentIndex].linkedIn} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 mt-2"
                    >
                      <FaLinkedin /> Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Glare effect */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30" />
            </div>
          </motion.div>
        </div>
        
        {/* Navigation arrows */}
        <div className="flex justify-between items-center absolute top-1/2 -translate-y-1/2 left-0 right-0 px-4 md:px-8">
          <motion.button
            onClick={prevTestimonial}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-800/80 text-white flex items-center justify-center border border-gray-700 hover:bg-indigo-500 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaChevronLeft />
          </motion.button>
          
          <motion.button
            onClick={nextTestimonial}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-800/80 text-white flex items-center justify-center border border-gray-700 hover:bg-indigo-500 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaChevronRight />
          </motion.button>
        </div>
        
        {/* Indicators */}
        <div className="flex justify-center items-center mt-8">
          {renderIndicators()}
        </div>
      </div>
      
      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-16 w-full max-w-4xl mx-auto px-4"
      >
        <div className="relative overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
          {/* Background glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl" />
          
          <div className="relative z-10 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to start your project?</h3>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Join these satisfied clients and let&apos;s create something amazing together. Whether you need a website, app, or custom solution, I&apos;m here to help.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-md"
            >
              Let&apos;s Work Together
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialsPage;