import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { Typography, Grid, TextField, Button } from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle,
  X
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Implement your newsletter subscription logic here
    setSubscriptionStatus('success');
    setTimeout(() => setSubscriptionStatus(null), 3000);
    setEmail('');
  };

  const footerLinks = {
    properties: [
      { name: 'Buy', href: '/properties/estates' },
      { name: 'Rent', href: '/properties/estates' },
      { name: 'Sell', href: '/properties/estates' },
      { name: 'New Developments', href: '/' },
      { name: 'Featured Listings', href: '/properties/estates' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/about' },
      { name: 'Careers', href: '/contact' },
      { name: 'Press', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
    resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'Market Reports', href: '/market-reports' },
      { name: 'Guides', href: '/guides' },
      { name: 'FAQs', href: '/faqs' },
      { name: 'Privacy Policy', href: '/privacy' },
    ],
    locations: [
      { name: 'Harare', href: '/contact' },
    ]
  };

  const socialLinks = [
    { icon: <Facebook size={20} />, href: 'https://www.facebook.com/profile.php?id=61575502449647', label: 'Facebook' },
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
    { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/company/luxury-real-estate-zimbabwe/ ', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-gray-400">
                Stay updated with the latest luxury properties and market insights
              </p>
            </div>
            <div className="w-full md:w-auto">
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 flex-1 min-w-[240px] focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  Subscribe
                  <ArrowRight size={16} />
                </button>
              </form>
              {/* Subscription Status Message */}
              <AnimatePresence>
                {subscriptionStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-2 flex items-center gap-2 text-sm"
                  >
                    <CheckCircle size={16} className="text-green-500" />
                    <span className="text-green-500">
                      Successfully subscribed to newsletter!
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-red-600">Luxury Real Estate</h2>
              <p className="text-gray-400 max-w-md">
                Your trusted partner in luxury real estate, providing exceptional properties 
                and unparalleled service to discerning clients worldwide.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone size={18} />
                  <span>+263 77 562 5292</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail size={18} />
                  <span>info@luxuryrealestate.co.zw</span>
                </div>
                <div className="flex items-start gap-3 text-gray-400">
                  <MapPin size={18} className="flex-shrink-0 mt-1" />
                  <span>Suite 7, 1st Floor, G.T Bain Centre, 55 King George Rd, Avondale, Harare</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4 capitalize">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Luxury Real Estate. All rights reserved.
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center pb-10">
            <Typography variant="body2" className="!text-blue-100">
              Developed by <a href="https://zettabyte.co.zw" className="!text-red-300 hover:!text-white !transition-colors" target="_blank" rel="noopener noreferrer">Zettabyte</a>
            </Typography>
          </div>
    </footer>
  );
};

export default Footer;