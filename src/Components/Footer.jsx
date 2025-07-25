import React from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">

        {/* Logo & Site Name */}
        <div className="flex items-center gap-3 justify-center md:justify-start">
          <img src="https://i.ibb.co/LD39PLby/Chat-GPT-Image-Jul-22-2025-05-32-22-PM-removebg-preview.png" alt="Logo" className="w-25 h-15" />
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 text-2xl">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
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
