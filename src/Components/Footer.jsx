import React from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">

        {/* Logo & Site Name */}
        <div className="flex items-center gap-3 justify-center md:justify-start">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <span className="text-xl font-bold text-primary">Cholo Bangladesh</span>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 text-2xl">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaTwitter />
          </a>
        </div>

        {/* Quick Links (Optional) */}
        <div className="text-center md:text-right">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Cholo Bangladesh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
