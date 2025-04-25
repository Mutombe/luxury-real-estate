import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Users,
  Home,
  Trophy,
  Star,
  CheckCircle,
    CalendarIcon,
  Linkedin,
  Mail,
  Twitter,
  ChevronDown,
  MapPin,
  PhoneCall,
  Camera,
  ArrowRight,
  Menu,
  X,
  Award,
  Clock,
  Share2,
  MessageCircle,
  Heart,
  Calendar,
  ScrollText,
  BookOpen,
  Briefcase,
  Building,
  CheckCheck,
  Sparkles
} from 'lucide-react';

const AboutPage = () => {
  // State hooks
  const [activeTab, setActiveTab] = useState('story');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({
    properties: 0,
    clients: 0,
    years: 0,
    satisfaction: 0
  });
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [showContactForm, setShowContactForm] = useState(false);
  
  // Refs
  const statsRef = useRef(null);
  const teamRef = useRef(null);
  const headerRef = useRef(null);
  
  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };
  
  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.1 }
  };
  
  const itemFade = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.3 }
  };

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  // Stats animation when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Animate stats counters
          const duration = 2000; // ms
          const steps = 50;
          const stepTime = duration / steps;
          
          let currentStep = 0;
          
          const interval = setInterval(() => {
            const progress = currentStep / steps;
            setAnimatedStats({
              properties: Math.round(1000 * progress),
              clients: Math.round(500 * progress),
              years: Math.round(15 * progress),
              satisfaction: Math.round(98 * progress)
            });
            
            currentStep++;
            if (currentStep > steps) clearInterval(interval);
          }, stepTime);
        }
      },
      { threshold: 0.5 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);
  
  // Mock data
  const stats = [
    { icon: <Home className="w-6 h-6" />, value: animatedStats.properties, label: "Properties Sold", suffix: "+" },
    { icon: <Users className="w-6 h-6" />, value: animatedStats.clients, label: "Happy Clients", suffix: "+" },
    { icon: <Trophy className="w-6 h-6" />, value: animatedStats.years, label: "Years Experience", suffix: "+" },
    { icon: <Star className="w-6 h-6" />, value: animatedStats.satisfaction, label: "Client Satisfaction", suffix: "%" }
  ];

  const team = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/api/placeholder/500/600')",
      bio: "15+ years of luxury real estate experience",
      expertise: ["Waterfront Properties", "Luxury Estates", "Market Analysis"],
      achievements: ["Top 1% of Agents Nationwide", "Over $1B in Sales"],
      quote: "Every home tells a unique story. Our job is to help you find the one that speaks to you.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sarah@luxuryestates.com"
      }
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Head of Sales",
      image: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/api/placeholder/500/600')",
      bio: "Top-performing agent for 5 consecutive years",
      expertise: ["Urban Properties", "Investment Opportunities", "Negotiation"],
      achievements: ["$500M+ Career Sales", "Broker of the Year 2024"],
      quote: "The right property isn't just an asset—it's a foundation for your future.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "michael@luxuryestates.com"
      }
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Property Consultant",
      image: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/api/placeholder/500/600')",
      bio: "Specialist in luxury waterfront properties",
      expertise: ["Beachfront Homes", "Vacation Properties", "Client Relations"],
      achievements: ["Featured in Luxury Home Magazine", "Most Dedicated Agent Award"],
      quote: "Finding your dream home is a journey, and I'm honored to be your guide.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "emily@luxuryestates.com"
      }
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Marketing Director",
      image: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/api/placeholder/500/600')",
      bio: "Former tech executive with creative vision",
      expertise: ["Digital Marketing", "Property Showcase", "Brand Development"],
      achievements: ["Increased lead generation by 200%", "Innovator of the Year 2023"],
      quote: "In a crowded market, exceptional properties deserve exceptional visibility.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "david@luxuryestates.com"
      }
    }
  ];

  const milestones = [
    {
      year: 2008,
      title: "Founded in Miami",
      description: "Started with a team of 3 agents specializing in waterfront properties."
    },
    {
      year: 2012,
      title: "Expansion to New York",
      description: "Opened our second office in Manhattan's Upper East Side."
    },
    {
      year: 2015,
      title: "$500M Sales Milestone",
      description: "Reached half a billion in total sales within our first 7 years."
    },
    {
      year: 2018,
      title: "International Partnerships",
      description: "Established exclusive partnerships with luxury brokerages in Europe."
    },
    {
      year: 2021,
      title: "Digital Transformation",
      description: "Launched our virtual reality property tours during the pandemic."
    },
    {
      year: 2024,
      title: "Today",
      description: "Operating in 5 major cities with a team of over 50 elite agents."
    }
  ];

  const values = [
    {
      title: "Excellence",
      description: "We maintain the highest standards in every aspect of our service",
      icon: <Award className="w-6 h-6" />
    },
    {
      title: "Integrity",
      description: "Trust and transparency are the foundations of our business",
      icon: <CheckCheck className="w-6 h-6" />
    },
    {
      title: "Innovation",
      description: "Embracing new technologies to provide better service",
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      title: "Client-Focused",
      description: "Your success and satisfaction are our top priorities",
      icon: <Heart className="w-6 h-6" />
    }
  ];

  const faqs = [
    {
      question: "What areas do you specialize in?",
      answer: "We specialize in luxury properties in major metropolitan areas, with particular expertise in waterfront properties, penthouses, and historic estates. Our primary markets include Miami, New York, Los Angeles, and San Francisco, but we work with select properties nationwide."
    },
    {
      question: "How do you determine property valuation?",
      answer: "Our valuation process combines comprehensive market analysis, proprietary data on luxury trends, and our intimate knowledge of each neighborhood. We consider factors like comparable sales, unique features, market conditions, and potential for appreciation."
    },
    {
      question: "What makes your agency different?",
      answer: "Unlike traditional brokerages, we provide a fully integrated luxury experience. Each client works with a dedicated team of specialists, receives personalized marketing plans, and gains access to our exclusive network of high-net-worth buyers and investors."
    },
    {
      question: "Do you work with international clients?",
      answer: "Absolutely. We have a dedicated international division with multilingual agents and partnerships with premier brokerages worldwide. We offer virtual tours, secure digital transactions, and assistance with immigration and investment considerations."
    }
  ];

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const handleTeamMemberClick = (member) => {
    setSelectedTeamMember(member);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-x-hidden">
      {/* Mobile Sticky Header - conditionally shown based on scroll */}


      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowMobileMenu(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-xs bg-white z-50 overflow-y-auto"
            >
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-red-600">Luxury Estates</h3>
                  <button onClick={() => setShowMobileMenu(false)}>
                    <X size={24} className="text-gray-500" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <nav>
                  <ul className="space-y-1">
                    {[
                      { name: 'Home', icon: <Home size={20} /> },
                      { name: 'About Us', icon: <Users size={20} /> },
                      { name: 'Properties', icon: <Building size={20} /> },
                      { name: 'Services', icon: <Briefcase size={20} /> },
                      { name: 'Testimonials', icon: <MessageCircle size={20} /> },
                      { name: 'Blog', icon: <ScrollText size={20} /> },
                      { name: 'Contact', icon: <PhoneCall size={20} /> },
                    ].map((item, index) => (
                      <li key={index}>
                        <button className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 ${
                          item.name === 'About Us' ? 'bg-red-50 text-red-600' : ''
                        }`}>
                          {item.icon}
                          <span>{item.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <button className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    <PhoneCall size={18} />
                    <span>Schedule a Consultation</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Contact Popup */}
      <AnimatePresence>
        {showContactForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowContactForm(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">Contact Us</h3>
                <button onClick={() => setShowContactForm(false)}>
                  <X size={24} className="text-gray-500" />
                </button>
              </div>
              
              <div className="p-6">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Send Message</span>
                    <ArrowRight size={18} />
                  </motion.button>
                </form>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-100 rounded-full text-red-600">
                      <PhoneCall size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Call us directly</p>
                      <p className="font-medium">(800) 555-1234</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-full text-red-600">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Main Office</p>
                      <p className="font-medium">123 Luxury Ave, Miami, FL</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Team Member Detail Popup */}
      <AnimatePresence>
        {selectedTeamMember && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setSelectedTeamMember(null)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl z-50 max-h-[90vh] max-w-[90vw] w-full overflow-hidden"
              style={{ maxWidth: '400px' }}
            >
              <div 
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: selectedTeamMember.image }}
              >
                <button 
                  onClick={() => setSelectedTeamMember(null)}
                  className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold">{selectedTeamMember.name}</h3>
                <p className="text-red-600">{selectedTeamMember.role}</p>
                
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <p className="text-gray-700">{selectedTeamMember.bio}</p>
                  
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTeamMember.expertise.map((item, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Achievements</h4>
                    <ul className="space-y-1">
                      {selectedTeamMember.achievements.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <Trophy size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 italic">"{selectedTeamMember.quote}"</p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between border-t border-gray-100 pt-4">
                  <div className="flex gap-3">
                    <a href={selectedTeamMember.social.linkedin} className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200">
                      <Linkedin size={18} />
                    </a>
                    <a href={selectedTeamMember.social.twitter} className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200">
                      <Twitter size={18} />
                    </a>
                    <a href={`mailto:${selectedTeamMember.social.email}`} className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200">
                      <Mail size={18} />
                    </a>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedTeamMember(null);
                      setShowContactForm(true);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2 hover:bg-red-700"
                  >
                    <PhoneCall size={16} />
                    <span>Contact</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Parallax Section */}
      <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/api/placeholder/1600/900')] bg-cover bg-center opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        </div>
        
        <div className="max-w-md mx-auto px-4 relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
              className="w-16 h-16 bg-red-600 rounded-full mx-auto mb-6 flex items-center justify-center"
            >
              <Building size={32} className="text-white" />
            </motion.div>
            
            <h1 className="text-3xl font-bold mb-3">
              Redefining Luxury Real Estate
            </h1>
            <p className="text-base text-gray-300 mb-8">
              With over 15 years of excellence, we've helped thousands find their dream homes
            </p>
            
            <div className="flex gap-2 justify-center">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-red-600 text-white rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors"
              >
                <Users size={18} />
                <span>Our Team</span>
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg flex items-center gap-2 hover:bg-white/30 transition-colors"
              >
                <CalendarIcon size={18} />
                <span>Our Story</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Card Carousel */}
      <section ref={statsRef} className="py-10 -mt-10">
        <div className="max-w-md mx-auto px-4">
          <div className="relative overflow-hidden">
            <div className="overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
              <div className="flex gap-3 min-w-max">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="flex-shrink-0 w-36 bg-white rounded-xl shadow-lg p-4 text-center"
                    variants={itemFade}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="bg-red-100 text-red-600 rounded-full w-12 h-12 flex justify-center items-center mx-auto mb-3">
                      {stat.icon}
                    </div>
                    <h3 className="text-2xl font-bold flex items-center justify-center">
                      {stat.value}
                      <span className="text-red-600">{stat.suffix}</span>
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Fade gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="sticky top-0 bg-white z-30 shadow-sm">
        <div className="max-w-md mx-auto overflow-x-auto scrollbar-hide">
          <div className="flex px-4 py-3 space-x-4 min-w-max">
            <button
              onClick={() => setActiveTab('story')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'story' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Our Story
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'team' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Our Team
            </button>
            <button
              onClick={() => setActiveTab('values')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'values' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Our Values
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'faq' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              FAQs
              </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <section className="py-8">
        <div className="max-w-md mx-auto px-4">
          <AnimatePresence mode="wait">
            {activeTab === 'story' && (
              <motion.div
                key="story"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold mb-4">Our Story</h2>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-4">
                    <p className="text-gray-700 mb-6">
                      Founded in 2008, Luxury Estates has grown from a small local agency to one of the most prestigious real estate firms in the country. Our journey has been defined by unwavering commitment to excellence and our passion for connecting people with extraordinary homes.
                    </p>
                    
                    <div className="space-y-6">
                      {milestones.map((milestone, index) => (
                        <motion.div 
                          key={index}
                          className="flex gap-4"
                          variants={itemFade}
                          initial="initial"
                          whileInView="whileInView"
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="relative">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold">
                              {milestone.year}
                            </div>
                            {index < milestones.length - 1 && (
                              <div className="absolute top-12 bottom-0 left-1/2 w-0.5 -ml-px bg-red-100" />
                            )}
                          </div>
                          <div className="pt-2 pb-6">
                            <h3 className="font-bold text-gray-900">{milestone.title}</h3>
                            <p className="text-gray-600 text-sm mt-1">{milestone.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'team' && (
              <motion.div
                key="team"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                ref={teamRef}
              >
                <h2 className="text-xl font-bold mb-4">Our Team</h2>
                <div className="grid grid-cols-2 gap-3">
                  {team.map((member, index) => (
                    <motion.div 
                      key={index}
                      className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer"
                      variants={itemFade}
                      initial="initial"
                      whileInView="whileInView"
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleTeamMemberClick(member)}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div 
                        className="h-32 bg-cover bg-center"
                        style={{ backgroundImage: member.image }}
                      />
                      <div className="p-3">
                        <h3 className="font-bold text-gray-900 leading-tight">{member.name}</h3>
                        <p className="text-red-600 text-sm">{member.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {activeTab === 'values' && (
              <motion.div
                key="values"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold mb-4">Our Values</h2>
                <div className="space-y-3">
                  {values.map((value, index) => (
                    <motion.div 
                      key={index}
                      className="bg-white rounded-2xl shadow-sm p-4 flex gap-4"
                      variants={itemFade}
                      initial="initial"
                      whileInView="whileInView"
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="bg-red-100 text-red-600 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                        {value.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{value.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{value.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {activeTab === 'faq' && (
              <motion.div
                key="faq"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {faqs.map((faq, index) => (
                    <motion.div 
                      key={index}
                      className="bg-white rounded-2xl shadow-sm overflow-hidden"
                      variants={itemFade}
                      initial="initial"
                      whileInView="whileInView"
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <button
                        className="flex items-center justify-between w-full p-4 text-left"
                        onClick={() => toggleFAQ(index)}
                      >
                        <h3 className="font-medium text-gray-900">{faq.question}</h3>
                        <ChevronDown 
                          className={`text-gray-500 transition-transform ${expandedFAQ === index ? 'rotate-180' : ''}`} 
                          size={20} 
                        />
                      </button>
                      
                      <AnimatePresence>
                        {expandedFAQ === index && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 border-t border-gray-100">
                              <p className="text-gray-600 text-sm">{faq.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4">
        <div className="max-w-md mx-auto">
          <motion.div
            className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6 relative overflow-hidden"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 opacity-10">
              <Building size={120} />
            </div>
            
            <h2 className="text-xl font-bold mb-2">Ready to Work With Us?</h2>
            <p className="text-gray-300 mb-6">
              Let our team of experts help you find your perfect property or sell your current one.
            </p>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowContactForm(true)}
              className="w-full py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <PhoneCall size={18} />
              <span>Contact Us Today</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-100">
        <div className="max-w-md mx-auto px-4">
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="text-gray-600 hover:text-red-600">
              <Twitter size={22} />
            </a>
            <a href="#" className="text-gray-600 hover:text-red-600">
              <Linkedin size={22} />
            </a>
            <a href="#" className="text-gray-600 hover:text-red-600">
              <Mail size={22} />
            </a>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Luxury Estates. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;