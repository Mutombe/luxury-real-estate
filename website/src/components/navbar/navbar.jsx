import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Building2,
  Info,
  Phone,
  Search,
  User,
  Bell,
  ChevronDown,
  MapPin,
  Calendar,
  Star,
} from "lucide-react";

export function LuxuryRealEstateLogo() {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Handle image loading error by showing text backup
  const handleImageError = () => {
    setImageLoaded(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex-shrink-0 flex items-center gap-3"
    >
      {/* Logo Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-26 w-26 flex-shrink-0"
      >
        <img
          src="/logo.png"
          alt="Luxury Real Estate Logo"
          className="h-full w-full object-contain"
          onError={handleImageError}
        />
      </motion.div>
    </motion.div>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const navLinks = [
    {
      name: "Home",
      icon: <Home size={18} />,
      path: "/",
    },
    {
      name: "Properties",
      icon: <Building2 size={18} />,
      path: "/properties",
      dropdown: true,
      items: ["Homes", "Flats", "Villas", "Estates"],
    },
    {
      name: "About",
      icon: <Info size={18} />,
      path: "/about",
    },
    {
      name: "Contact",
      icon: <Phone size={18} />,
      path: "/contact",
    },
  ];

  const featuredLocations = ["Harare", "Mutare", "Bulawayo", "Kwekwe"];

  return (
    <>
      {/* Top Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled ? "bg-gray-900 border-b border-gray-800" : "bg-gray-900"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-xs md:text-sm">
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center text-gray-300">
                <MapPin size={14} className="mr-1" />
                <span>Luxury Real Estate</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone size={14} className="mr-1" />
                <span className="hidden md:inline">Call Us:</span>
                <span className="ml-1 text-white">+263 77 260 6495 LUXURY</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/contact")}
                className="text-gray-300 hover:text-white transition-colors duration-200 hidden md:flex items-center"
              >
                <Calendar size={14} className="mr-1" />
                <span>Schedule Tour</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/contact")}
                whileTap={{ scale: 0.95 }}
                className="text-gray-300 hover:text-white transition-colors duration-200 hidden md:flex items-center"
              >
                <User size={14} className="mr-1" />
                <span>Login</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/contact")}
                whileTap={{ scale: 0.95 }}
                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
              >
                <Bell size={14} />
                <span className="hidden md:inline ml-1">Alerts</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white/80 backdrop-blur-sm"
        }`}
        style={{ top: scrolled ? "0" : "2.5rem" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <LuxuryRealEstateLogo />

            {/* Search button (mobile) */}
            <div className="md:hidden flex items-center space-x-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full bg-gray-100 text-gray-700"
              >
                <Search size={18} />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full bg-gray-100 text-gray-700"
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
              {navLinks.map((link) => (
                <div key={link.name} className="relative">
                  {link.dropdown ? (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleDropdown(link.name)}
                        className={`flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors duration-200`}
                      >
                        {link.icon}
                        <span className="ml-1">{link.name}</span>
                        <ChevronDown
                          size={16}
                          className={`ml-1 transition-transform ${
                            activeDropdown === link.name ? "rotate-180" : ""
                          }`}
                        />
                      </motion.button>

                      <AnimatePresence>
                        {activeDropdown === link.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute left-0 w-48 mt-2 py-2 bg-white rounded-md shadow-lg z-50"
                          >
                            {link.items.map((item) => (
                              <motion.a
                                key={item}
                                whileHover={{ x: 5 }}
                                href={`${link.path}/${item
                                  .toLowerCase()
                                  .replace(" ", "-")}`}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                              >
                                {item}
                              </motion.a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={link.path}
                      className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      {link.icon}
                      <span className="ml-1">{link.name}</span>
                    </motion.a>
                  )}
                </div>
              ))}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/contact")}
                className="ml-2 px-4 py-2 bg-gradient-to-r from-red-700 to-red-500 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300"
              >
                Schedule Viewing
              </motion.button>
            </div>

            {/* Search area (desktop) */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-40 lg:w-64 text-sm"
                />
                <Search
                  size={16}
                  className="absolute left-3 top-2.5 text-gray-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Search overlay (mobile) */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200 p-4"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search luxury properties..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <Search
                  size={18}
                  className="absolute left-3 top-3.5 text-gray-400"
                />
              </div>

              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-2">
                  Featured Locations:
                </p>
                <div className="flex flex-wrap gap-2">
                  {featuredLocations.map((location) => (
                    <motion.button
                      key={location}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 bg-gray-100 text-xs rounded-full text-gray-700 hover:bg-red-50 hover:text-red-600"
                    >
                      {location}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="px-2 py-3 space-y-1 divide-y divide-gray-100">
                {navLinks.map((link) => (
                  <div key={link.name} className="py-2">
                    {link.dropdown ? (
                      <>
                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleDropdown(link.name)}
                          className="w-full flex items-center justify-between px-3 py-3 rounded-md text-gray-800"
                        >
                          <div className="flex items-center">
                            <span className="bg-red-50 p-2 rounded-full text-red-600 mr-3">
                              {link.icon}
                            </span>
                            <span>{link.name}</span>
                          </div>
                          <ChevronDown
                            size={16}
                            className={`transition-transform ${
                              activeDropdown === link.name ? "rotate-180" : ""
                            }`}
                          />
                        </motion.button>

                        <AnimatePresence>
                          {activeDropdown === link.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-12 pr-3 py-2 space-y-1"
                            >
                              {link.items.map((item) => (
                                <motion.a
                                  key={item}
                                  whileHover={{ x: 5 }}
                                  whileTap={{ scale: 0.98 }}
                                  href={`${link.path}/${item
                                    .toLowerCase()
                                    .replace(" ", "-")}`}
                                  className="block py-2 text-sm text-gray-600 border-l-2 border-gray-200 pl-3 hover:border-red-500 hover:text-red-600"
                                >
                                  {item}
                                </motion.a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <motion.a
                        whileTap={{ scale: 0.98 }}
                        href={link.path}
                        className="flex items-center px-3 py-3 rounded-md text-gray-800"
                      >
                        <span className="bg-red-50 p-2 rounded-full text-red-600 mr-3">
                          {link.icon}
                        </span>
                        <span>{link.name}</span>
                      </motion.a>
                    )}
                  </div>
                ))}

                <div className="pt-4 pb-2">
                  <motion.a
                    whileTap={{ scale: 0.95 }}
                    href="/contact"
                    className="block mx-3 px-4 py-3 bg-gradient-to-r from-red-700 to-red-500 text-white text-center rounded-md shadow-md"
                  >
                    Schedule Viewing
                  </motion.a>
                </div>

                <div className="py-4">
                  <div className="flex items-center justify-between px-3">
                    <motion.a
                      whileTap={{ scale: 0.95 }}
                      href="/contact"
                      className="flex items-center text-gray-700"
                    >
                      <User size={16} className="mr-1" />
                      <span>Login</span>
                    </motion.a>

                    <motion.a
                      whileTap={{ scale: 0.95 }}
                      href="/contact"
                      className="flex items-center text-gray-700"
                    >
                      <Calendar size={16} className="mr-1" />
                      <span>Schedule Tour</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
