import React from "react";
import {FaFacebookF,FaInstagram,FaLinkedinIn,FaTwitter,FaLeaf,FaPaperPlane,FaPhoneAlt,FaEnvelope,FaMapMarkerAlt,} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">SkillHub</h2>
          <p className="text-sm leading-relaxed">
            Empowering individuals to transform their skills into successful business ideas.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-white transition">About</a></li>
            <li><a href="/categories" className="hover:text-white transition">Categories</a></li>
            <li><a href="/roadmaps" className="hover:text-white transition">Roadmaps</a></li>
            <li><a href="/mentors" className="hover:text-white transition">Mentors</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition text-3xl"><FaFacebookF/></a>
            <a href="#" className="hover:text-white transition text-3xl"><FaInstagram/></a>
            <a href="#" className="hover:text-white transition text-3xl"><FaTwitter/></a>
            <a href="#" className="hover:text-white transition text-3xl"><FaLinkedinIn/></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-6 text-sm">
        <p>© {new Date().getFullYear()} SkillHub. All rights reserved.</p>
        <p className="mt-2">
          <a href="/privacy" className="hover:text-white transition">Privacy Policy</a> | 
          <a href="/terms" className="hover:text-white transition ml-2">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
