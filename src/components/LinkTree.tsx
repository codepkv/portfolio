"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaEnvelope,
  FaGlobe,
  FaCopy,
  FaCheck,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineContactless } from "react-icons/md";

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/yourusername",
    icon: <FaGithub />,
    color: "text-white",
    bgColor: "from-gray-700 to-gray-900",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    icon: <FaLinkedin />,
    color: "text-blue-500",
    bgColor: "from-blue-900 to-blue-700",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/yourusername",
    icon: <FaTwitter />,
    color: "text-sky-400",
    bgColor: "from-sky-900 to-sky-700",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/yourusername",
    icon: <FaInstagram />,
    color: "text-pink-500",
    bgColor: "from-purple-700 to-pink-600",
  },
  {
    name: "Facebook",
    url: "https://facebook.com/yourusername",
    icon: <FaFacebook />,
    color: "text-blue-600",
    bgColor: "from-blue-800 to-blue-600",
  },
  {
    name: "Email",
    url: "mailto:your@email.com",
    icon: <FaEnvelope />,
    color: "text-red-400",
    bgColor: "from-red-800 to-red-600",
  },
  {
    name: "Portfolio",
    url: "https://yourportfolio.com",
    icon: <FaGlobe />,
    color: "text-green-400",
    bgColor: "from-green-800 to-green-600",
  },
];

const SocialCard = ({ social, index }: { social: typeof socials[number]; index: number }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (e: React.MouseEvent<HTMLButtonElement>, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success(`${social.name} URL copied!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="absolute -inset-0.5  group-hover:opacity-100 transition duration-300"></div>
      <motion.div
        whileHover={{ 
          scale: 1.05,
          rotateY: 5,
          rotateX: 5,
          z: 10 
        }}
        className="relative flex flex-col bg-gradient-to-br overflow-hidden border border-white/10 p-6 rounded-xl shadow-xl transform perspective-1000"
      >
        <div className="flex justify-between items-center mb-4">
          <div className={`text-4xl ${social.color}`}>{social.icon}</div>
          <button
            onClick={(e) => copyToClipboard(e, social.url)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            aria-label={`Copy ${social.name} URL`}
          >
            {copied ? (
              <FaCheck className="text-green-400" />
            ) : (
              <FaCopy className="text-gray-300 hover:text-white" />
            )}
          </button>
        </div>
        
        <h2 className="text-xl font-bold text-white mb-2">{social.name}</h2>
        
        <div className="flex-grow">
          <p className="text-gray-300 text-sm truncate mb-4">
            {social.url.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, '')}
          </p>
        </div>
        
        <a
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-auto w-full py-2 px-4 rounded-lg bg-gradient-to-r ${social.bgColor} text-white font-medium text-center transform transition-all hover:translate-y-1 flex items-center justify-center gap-2`}
        >
          <span>Connect</span>
          <MdOutlineContactless className="text-lg" />
        </a>
      </motion.div>
    </motion.div>
  );
};

const ProfileSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12 text-center"
    >
    
  


    </motion.div>
  );
};

const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full "
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const SocialLinksPage = () => {
  return (
    <section className="min-h-screen relative py-16 bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      <FloatingShapes />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-center text-4xl md:text-6xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600">
            Connect with Me
          </h1>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Find me across the digital universe and let&apos;s create something amazing together
          </p>
        </motion.div>
        
        <ProfileSection />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {socials.map((social, index) => (
            <SocialCard key={index} social={social} index={index} />
          ))}
        </div>
        
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-20 pt-8 border-t border-white/10 text-center text-gray-400"
        >
          <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
          <p className="mt-2 text-sm">Made with ❤️ and React</p>
        </motion.footer>
      </div>
      
      <ToastContainer theme="dark" />
    </section>
  );
};

export default SocialLinksPage;