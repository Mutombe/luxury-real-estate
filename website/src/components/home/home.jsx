import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, Building2, Award, Shield, ArrowRight, MapPin, ChevronRight, Heart, Share2, Calendar, Compass, Maximize, Users, ChevronDown, Check } from 'lucide-react';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('buy');
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const featuredProperties = [
    {
      id: 1,
      title: "Luxury Penthouse",
      location: "Downtown Manhattan",
      price: "$5,200,000",
      beds: 4,
      baths: 3,
      sqft: "3,500",
      featured: true,
      new: false,
      image: "/api/placeholder/800/600"
    },
    {
      id: 2,
      title: "Beachfront Villa",
      location: "Malibu, California",
      price: "$8,900,000",
      beds: 5,
      baths: 6,
      sqft: "6,200",
      featured: true,
      new: true,
      image: "/api/placeholder/800/600"
    },
    {
      id: 3,
      title: "Modern Hillside Estate",
      location: "Beverly Hills",
      price: "$12,500,000",
      beds: 7,
      baths: 9,
      sqft: "10,800",
      featured: false,
      new: false,
      image: "/api/placeholder/800/600"
    }
  ];

  const testimonials = [
    {
      name: "Jonathan Parker",
      role: "CEO, Parker Industries",
      text: "The team at LuxuryEstate provided exceptional service throughout our property search. Their attention to detail and market knowledge is unmatched.",
      avatar: "/api/placeholder/60/60"
    },
    {
      name: "Sophia Reynolds",
      role: "Interior Designer",
      text: "Working with LuxuryEstate has been a seamless experience. They understand the luxury market and consistently deliver above expectations.",
      avatar: "/api/placeholder/60/60"
    },
    {
      name: "Michael Zhang",
      role: "Tech Entrepreneur",
      text: "Their personalized approach to finding our dream home was remarkable. Every property shown matched our criteria perfectly.",
      avatar: "/api/placeholder/60/60"
    }
  ];

  const categories = [
    { name: "Waterfront", icon: <Compass size={20} />, count: 24 },
    { name: "Penthouses", icon: <Building2 size={20} />, count: 18 },
    { name: "Estates", icon: <Maximize size={20} />, count: 32 },
    { name: "Family Homes", icon: <Users size={20} />, count: 47 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          
className="w-full h-full bg-[url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c')] bg-cover bg-center opacity-50"

          />
        </div>            {/*style={{ 
              backgroundImage: `url('/api/placeholder/1920/1080')`,
              opacity: 0.7 - (scrollPosition * 0.0005) // Fade based on scroll
            }}*/}
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            {...fadeIn}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-serif"
          >
            Discover Your <span className="text-red-500">Dream</span> Home
          </motion.h1>
          
          <motion.p 
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto"
          >
            Luxury Real Estate Solutions for Discerning Clients
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            {...fadeIn}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-3 md:p-4"
          >
            {/* Search Tabs */}
            <div className="flex mb-4 border-b">
              {['buy', 'rent', 'sell', 'estimate'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 capitalize py-2 text-sm md:text-base font-medium transition-colors ${
                    activeTab === tab 
                      ? 'text-red-600 border-b-2 border-red-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="flex flex-col md:flex-row items-stretch gap-3">
              <div className="flex-1 relative">
                <MapPin size={18} className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex flex-col md:flex-row items-stretch gap-3">
                <div className="relative md:w-48">
                  <select className="appearance-none w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white">
                    <option>Any Price</option>
                    <option>$1M - $3M</option>
                    <option>$3M - $5M</option>
                    <option>$5M - $10M</option>
                    <option>$10M+</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                </div>
                
                <div className="relative md:w-48">
                  <select className="appearance-none w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white">
                    <option>Property Type</option>
                    <option>Penthouse</option>
                    <option>Villa</option>
                    <option>Mansion</option>
                    <option>Estate</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 md:px-8 py-3 bg-gradient-to-r from-red-700 to-red-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Search size={20} />
                <span className="hidden md:inline">Search Properties</span>
                <span className="inline md:hidden">Search</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Statistics Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md py-4 shadow-md hidden md:block"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-12 lg:space-x-24">
              {[
                { label: "Properties", value: "2,500+" },
                { label: "Happy Clients", value: "1,200+" },
                { label: "Cities", value: "120+" },
                { label: "Awards", value: "35+" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-xl lg:text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Categories Section - Mobile Optimized */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold font-serif"
            >
              Explore by Category
            </motion.h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {categories.map((category, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url('/api/placeholder/400/300')` }} />
                <div className="p-4 flex flex-col items-center">
                  <div className="rounded-full bg-red-100 p-3 text-red-600 -mt-8 shadow-md mb-2">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} Properties</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div className="md:max-w-lg mb-8 md:mb-0">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold font-serif mb-4"
              >
                Why Choose <span className="text-red-600">LuxuryEstate</span>
              </motion.h2>
              <p className="text-gray-600 mb-6">
                We go beyond the traditional real estate experience, offering personalized service and unparalleled expertise in luxury properties.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center text-red-600 font-medium"
              >
                Learn More <ChevronRight size={16} className="ml-1" />
              </motion.button>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {[
                { icon: <Star size={28} />, title: "Premium Properties", description: "Access to exclusive luxury real estate" },
                { icon: <Shield size={28} />, title: "Trusted Security", description: "Safe and secure property transactions" },
                { icon: <Award size={28} />, title: "Expert Agents", description: "Professional guidance throughout your journey" },
                { icon: <Calendar size={28} />, title: "24/7 Support", description: "Always available to assist with your needs" }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-red-600 mb-4">{feature.icon}</div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold font-serif"
              >
                Featured Properties
              </motion.h2>
              <p className="text-gray-600 mt-2">Exclusive listings selected for you</p>
            </div>
            <motion.button 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors mt-4 md:mt-0"
            >
              View All <ArrowRight size={18} />
            </motion.button>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProperties.map((property) => (
              <motion.div
                key={property.id}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="relative">
                  <div 
                    className="h-56 md:h-64 bg-cover bg-center"
                    style={{ backgroundImage: `url('${property.image}')` }}
                  />
                  <div className="absolute top-0 left-0 right-0 flex justify-between p-4">
                    {property.featured && (
                      <span className="bg-red-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">Featured</span>
                    )}
                    {property.new && (
                      <span className="bg-green-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">New</span>
                    )}
                    {!property.featured && !property.new && <span></span>}
                    <div className="flex space-x-2">
                      <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-700 hover:text-red-600 transition-colors">
                        <Heart size={18} />
                      </button>
                      <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-700 hover:text-blue-600 transition-colors">
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold">{property.title}</h3>
                    <span className="text-lg font-bold text-red-600">{property.price}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={16} className="mr-1" />
                    <p className="text-sm">{property.location}</p>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t border-gray-100">
                    <div className="flex space-x-4 text-gray-600 text-sm">
                      <span>{property.beds} beds</span>
                      <span>{property.baths} baths</span>
                      <span>{property.sqft} sqft</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sm text-red-600 font-medium flex items-center"
                    >
                      Details <ChevronRight size={14} className="ml-1" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-12 md:py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif">What Our Clients Say</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <img src={testimonial.avatar} alt={testimonial.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300">{testimonial.text}</p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('/api/placeholder/1920/1080')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-900/70"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-lg mb-8 md:mb-0"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif">
                Ready to Find Your Dream Home?
              </h2>
              <p className="text-gray-300 mb-6">
                Let us help you find the perfect property that matches your lifestyle and preferences.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "Personalized property recommendations",
                  "Exclusive access to off-market listings",
                  "Dedicated luxury real estate specialists"
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <Check size={18} className="mr-2 text-red-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-red-700 to-red-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Schedule Consultation
              </motion.button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl md:w-96"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h3>
              <form className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option>Interested in...</option>
                    <option>Buying a Property</option>
                    <option>Selling a Property</option>
                    <option>Property Management</option>
                    <option>Investment Consultation</option>
                  </select>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;