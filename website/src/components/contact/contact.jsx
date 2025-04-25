import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Building2,
  CheckCircle,
  Menu,
  X,
  ArrowUp,
  Camera,
  Calendar,
  UserCircle,
  MapPinned
} from 'lucide-react';

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeOffice, setActiveOffice] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  // Office locations with coordinates for the map
  const offices = [
    {
      city: "Harare",
      address: "123 Avenue Avondale, Harare, Zimbabwe",
      phone: "+263 77 562 5292",
      email: "admin@luxuryrealestate.com",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM",
      coordinates: [-17.8252, 31.0335] // Latitude, Longitude for Harare
    },
    {
      city: "Masvingo",
      address: "789 Robert Mugabe Way, Masvingo, Zimbabwe",
      phone: "+263 77 562 5292",
      email: "admin@luxuryrealestate.com",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM",
      coordinates: [-20.0637, 30.8277] // Latitude, Longitude for Masvingo
    },
    {
      city: "Mutare",
      address: "456 Main Street, Mutare, Zimbabwe",
      phone: "+263 77 562 5292",
      email: "admin@luxuryrealestate.com",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM",
      coordinates: [-18.9765, 32.6505] // Latitude, Longitude for Mutare
    }
  ];

  // Initialize the map when component mounts
  useEffect(() => {
    // Initialize Leaflet map
    const initMap = () => {
      if (typeof window !== 'undefined' && !mapLoaded) {
        // Check if Leaflet is available (it would be loaded via CDN)
        if (window.L) {
          // Create map instance
          const mapInstance = window.L.map('map-container').setView([-19.0154, 29.1549], 6); // Center view on Zimbabwe

          // Add OSM tile layer
          window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(mapInstance);

          // Create a custom icon
          const customIcon = window.L.icon({
            iconUrl: '/api/placeholder/30/40',
            iconSize: [30, 40],
            iconAnchor: [15, 40],
            popupAnchor: [0, -40]
          });

          // Add markers for each office
          const markerList = offices.map((office, index) => {
            const marker = window.L.marker(office.coordinates, { icon: customIcon })
              .addTo(mapInstance)
              .bindPopup(`<b>${office.city} Office</b><br>${office.address}<br>Phone: ${office.phone}`);
            
            return marker;
          });

          setMap(mapInstance);
          setMarkers(markerList);
          setMapLoaded(true);
        }
      }
    };

    // Initialize map after a delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initMap();
    }, 1000);

    return () => {
      clearTimeout(timer);
      if (map) {
        map.remove();
      }
    };
  }, []);

  // Update map focus when active office changes
  useEffect(() => {
    if (map && offices[activeOffice] && markers[activeOffice]) {
      map.setView(offices[activeOffice].coordinates, 13);
      markers[activeOffice].openPopup();
    }
  }, [activeOffice, map, markers]);

  // Handle scroll to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormState({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header with Mobile Menu */}
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-gray-900 bg-opacity-90 pt-16"
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center">
                <Camera size={28} className="text-white mr-2" />
                <span className="font-bold text-xl text-white">Luxury Real Estate</span>
              </div>
              <button 
                className="text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex-1">
              <ul className="space-y-6 text-center">
                <li><a href="#" className="text-white text-xl block py-2">Home</a></li>
                <li><a href="#" className="text-white text-xl block py-2">Properties</a></li>
                <li><a href="#" className="text-white text-xl block py-2">Agents</a></li>
                <li><a href="#" className="text-red-400 text-xl font-medium block py-2">Contact</a></li>
              </ul>
            </nav>
            
            <div className="space-y-4 mt-auto">
              <div className="flex items-center justify-center gap-2 text-white">
                <Phone size={18} />
                <span>+263 77 562 5292</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-white">
                <Mail size={18} />
                <span>contact@luxuryrealestate.com</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-red-900 text-white py-16 pt-24 md:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <div className="bg-red-600 text-white px-4 py-1 rounded-full inline-flex items-center">
                <MapPinned size={16} className="mr-1" />
                <span className="text-sm font-medium">Visit Us Today</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We're here to help you with all your luxury real estate needs. Reach out to us today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Floating CTA Button */}
      <div className="fixed bottom-20 right-4 z-40 md:right-8">
        <motion.a 
          href="#contact-form"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
        >
          <MessageSquare size={24} />
        </motion.a>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 z-40 bg-gray-800 text-white rounded-full p-3 shadow-lg md:right-8"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}

      {/* Contact Form Section */}
      <section className="py-12 md:py-16" id="contact-form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-6 md:p-8 order-2 lg:order-1"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <MessageSquare size={24} className="text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Send Us a Message</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserCircle size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                        placeholder="Your full name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                        placeholder="Your email address"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                      placeholder="What is this regarding?"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                    placeholder="How can we help you today?"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <Send size={20} />
                  Send Message
                </motion.button>
              </form>

              {/* Success Message */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: isSubmitted ? 1 : 0,
                  height: isSubmitted ? 'auto' : 0
                }}
                className="mt-4 overflow-hidden"
              >
                {isSubmitted && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2 text-green-700">
                    <CheckCircle size={20} />
                    <span>Message sent successfully! We'll get back to you soon.</span>
                  </div>
                )}
              </motion.div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6 order-1 lg:order-2"
            >
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                    <Phone size={24} className="text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold">Quick Contact</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="bg-red-100 rounded-full p-2">
                      <Phone className="text-red-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-gray-600">+263 77 562 5292</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="bg-red-100 rounded-full p-2">
                      <Mail className="text-red-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-gray-600">contact@luxuryrealestate.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="bg-red-100 rounded-full p-2">
                      <MessageSquare className="text-red-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Live Chat</h3>
                      <p className="text-gray-600">Available 24/7</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations with Interactive Tabs */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold mb-4">Our Offices</h2>
            <p className="text-gray-600">
              Find us at any of our convenient locations across Zimbabwe
            </p>
          </motion.div>

          {/* Office Tabs - Mobile Optimized */}
          <div className="mb-8">
            <div className="flex overflow-x-auto pb-2 hide-scrollbar space-x-2">
              {offices.map((office, index) => (
                <motion.button
                  key={index}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-3 rounded-lg flex-shrink-0 ${
                    activeOffice === index 
                      ? 'bg-red-600 text-white font-medium shadow-md' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveOffice(index)}
                >
                  <div className="flex items-center whitespace-nowrap">
                    <MapPin size={16} className="mr-2" />
                    {office.city}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Active Office Details */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={activeOffice}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 md:p-8">
                <h3 className="font-bold text-xl mb-4">{offices[activeOffice].city} Office</h3>
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-start gap-3">
                    <div className="bg-red-100 rounded-full p-2 mt-1">
                      <MapPin size={18} className="text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Address</h4>
                      <p>{offices[activeOffice].address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-red-100 rounded-full p-2 mt-1">
                      <Phone size={18} className="text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Phone</h4>
                      <p>{offices[activeOffice].phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-red-100 rounded-full p-2 mt-1">
                      <Mail size={18} className="text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Email</h4>
                      <p>{offices[activeOffice].email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-red-100 rounded-full p-2 mt-1">
                      <Clock size={18} className="text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Working Hours</h4>
                      <p>{offices[activeOffice].hours}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Small Map Preview */}
              <div className="bg-gray-100 min-h-64 flex items-center justify-center cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-0 transition-opacity z-10 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-lg px-4 py-2 shadow-lg flex items-center"
                  >
                    <MapPin size={16} className="text-red-600 mr-2" />
                    <span className="font-medium">View on Map</span>
                  </motion.div>
                </div>
                <img 
                  src={`/api/placeholder/800/600`}
                  alt={`${offices[activeOffice].city} Office`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold mb-4">Visit Our Offices</h2>
            <p className="text-gray-600">
              Find us at any of our convenient locations across Zimbabwe
            </p>
          </motion.div>

          {/* Leaflet Map */}
          <div className="h-96 bg-gray-100 rounded-xl overflow-hidden shadow-lg relative">
            <div id="map-container" className="w-full h-full"></div>
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="flex flex-col items-center">
                  <Building2 size={48} className="text-gray-400 animate-pulse" />
                  <p className="mt-4 text-gray-500">Loading map...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Book a Viewing CTA */}
      <section className="py-12 md:py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-700 to-red-900 rounded-xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Dream Home?</h2>
                  <p className="text-red-100 mb-8">
                    Book a viewing with one of our expert real estate agents and start your journey to luxury living.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-red-600 px-6 py-3 rounded-lg font-medium shadow-lg flex items-center gap-2"
                  >
                    <Calendar size={20} />
                    Book a Viewing
                  </motion.button>
                </motion.div>
              </div>
              <div className="hidden md:block relative min-h-64">
                <img 
                  src="/api/placeholder/800/600"
                  alt="Luxury Property"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default ContactPage;