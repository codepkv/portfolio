"use client";
import React, { useState, } from "react";
import { motion } from "framer-motion";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  // Simplified background particles
  const Particles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-orange-400 opacity-20"
            animate={{
              x: [0, Math.random() * 100],
              y: [0, Math.random() * 100],
              opacity: [0.1, 0.5, 0.1]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse"
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

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-950 py-12 px-4 overflow-hidden">
      <Particles />
      
      <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 relative z-10">
        {/* 3D Image Animation */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 flex justify-center"
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotateZ: [0, 2, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          >
            <img
              src="https://res.cloudinary.com/du5hd5zaq/image/upload/v1743667499/pankaj2-removebg-preview_mu4xcw.png"
              alt="Pankaj"
              className="w-full max-w-md drop-shadow-lg"
            />
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2"
        >
          <div className="bg-gray-900/80 backdrop-blur p-8 rounded-xl border border-gray-800 relative">
            {/* Subtle gradient border */}
            <div className="absolute -inset-px rounded-xl z-0 opacity-30  blur-sm animate-pulse"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-8">
                Get in <span className="text-orange-400">Touch</span>
              </h2>
              
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl mb-4"
                  >
                    🚀
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                  <p className="text-gray-300">Thank you for reaching out.</p>
                </motion.div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-orange-400 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-orange-400 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Your Message"
                      className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-orange-400 focus:outline-none resize-none"
                      required
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold text-lg"
                    >
                      Send Message
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactPage;