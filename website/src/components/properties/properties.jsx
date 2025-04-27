import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  Bath,
  Bed,
  Square,
  MapPin,
  Heart,
  X,
  Home,
  Filter,
  ArrowUpDown,
  Clock,
  DollarSign,
  Menu,
  Grid3x3,
  List,
  Share2,
  Phone,
  Star,
  ChevronRight,
  Info,
  Bookmark
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const PropertiesPage = () => {
  // State hooks
  const [filters, setFilters] = useState({
    priceRange: [0, 10000000],
    propertyType: 'all',
    beds: 'any',
    baths: 'any',
    sortBy: 'newest',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [expandedPropertyId, setExpandedPropertyId] = useState(null);
  const [drawer, setDrawer] = useState(null);
  const navigate = useNavigate();
  
  // Refs
  const headerRef = useRef(null);
  const stickyFilterRef = useRef(null);
  
  // Properties data
  const properties = [
    {
      id: 1,
      title: "Waterfront Villa",
      type: "House",
      location: "Borrowdale, Harare",
      price: 4500000,
      beds: 5,
      baths: 4,
      sqft: 4200,
      image: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/villa2.webp')",
      tags: ["Waterfront", "Pool", "Smart Home"],
      isNew: true,
      rating: 4.9,
      reviews: 12
    },
    {
      id: 2,
      title: "Apartment",
      type: "Apartment",
      location: "Hillside, Harare",
      price: 3200000,
      beds: 3,
      baths: 3.5,
      sqft: 2800,
      image: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/apart2.webp')",
      tags: ["Penthouse", "Views", "Concierge"],
      isNew: false,
      rating: 4.7,
      reviews: 8
    },
    {
      id: 3,
      title: "Villa",
      type: "House",
      location: "Avondale, Harare",
      price: 6700000,
      beds: 6,
      baths: 5,
      sqft: 5600,
      image: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/villa2.webp')",
      tags: ["Historic", "Garden", "Renovated"],
      isNew: true,
      rating: 4.8,
      reviews: 15
    },
    {
      id: 4,
      title: "Modern Apartment",
      type: "Apartment",
      location: "Avondale, Harare",
      price: 2900000,
      beds: 2,
      baths: 2,
      sqft: 1800,
      image: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/apart2.webp')",
      tags: ["Beachfront", "Ocean View", "Gym"],
      isNew: false,
      rating: 4.5,
      reviews: 7
    },
    {
      id: 5,
      title: "Mountain Estate",
      type: "Villa",
      location: "Mutare",
      price: 8500000,
      beds: 7,
      baths: 8,
      sqft: 6900,
      image: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/estate2.jpg')",
      tags: ["Mountain View", "Private", "Luxury"],
      isNew: true,
      rating: 5.0,
      reviews: 21
    },
    {
      id: 6,
      title: "Elegant Urban Townhouse",
      type: "House",
      location: "Strathaven, Avondale, Harare",
      price: 3800000,
      beds: 4,
      baths: 3.5,
      sqft: 3200,
      image: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/house.webp')",
      tags: ["Historic", "Renovated", "Garden"],
      isNew: false,
      rating: 4.6,
      reviews: 9
    }
  ];

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
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
  
  // Toggle functions
  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };
  
  const togglePropertyExpansion = (id) => {
    setExpandedPropertyId(expandedPropertyId === id ? null : id);
  };
  
  const toggleDrawer = (drawerName) => {
    setDrawer(drawer === drawerName ? null : drawerName);
  };
  
  // Format price function
  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price.toLocaleString()}`;
  };
  
  // Filter properties by active tab
  const filteredProperties = activeTab === 'all' 
    ? properties 
    : activeTab === 'new' 
      ? properties.filter(p => p.isNew) 
      : activeTab === 'favorite' 
        ? properties.filter(p => favorites.has(p.id))
        : properties;

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Mobile Sticky Header - conditionally shown based on scroll */}
      <motion.header 
        ref={headerRef}
        className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 transition-all pt-10"
        initial={{ y: 0 }}
        animate={{ y: scrollDirection === 'down' ? -100 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => toggleDrawer('menu')}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Menu size={24} className="text-gray-700" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Search size={22} className="text-gray-700" />
            </button>
            <button 
              onClick={() => toggleDrawer('filters')}
              className="p-2 rounded-full hover:bg-gray-100 relative"
            >
              <Filter size={22} className="text-gray-700" />
              {(filters.propertyType !== 'all' || filters.beds !== 'any' || filters.baths !== 'any') && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              )}
            </button>
            <button 
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => toggleDrawer('sort')}
            >
              <ArrowUpDown size={22} className="text-gray-700" />
            </button>
            <button 
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode === 'grid' ? 
                <List size={22} className="text-gray-700" /> : 
                <Grid3x3 size={22} className="text-gray-700" />
              }
            </button>
          </div>
        </div>
        
        {/* Mobile Search Dropdown */}
        <AnimatePresence>
          {showMobileSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-100 overflow-hidden"
            >
              <div className="p-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search location, property..."
                    className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    autoFocus
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-24 pb-16">
        <div className="max-w-md mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold mb-3">
              Redefining Luxury Real Estate
            </h1>
            <p className="text-base text-gray-300 mb-6">
              With over 15 years of excellence, we've helped thousands find their dream homes
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <p className="text-sm text-gray-200 mb-3">Find your dream property</p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Location, property name..."
                  className="w-full pl-9 pr-4 py-3 rounded-lg bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  onClick={() => toggleDrawer('filters')}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  <Filter size={16} />
                  <span>Filters</span>
                </button>
                <button
                  onClick={() => toggleDrawer('sort')}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  <ArrowUpDown size={16} />
                  <span>Sort</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <div 
        ref={stickyFilterRef}
        className="sticky top-0 bg-white z-40 shadow-sm border-b border-gray-100"
      >
        <div className="max-w-full overflow-x-auto scrollbar-hide">
          <div className="flex px-4 py-3 space-x-4 min-w-max">
            <button
              onClick={() => setActiveTab('all')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'all' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Properties
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                activeTab === 'new' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Clock size={16} />
              New Listings
            </button>
            <button
              onClick={() => setActiveTab('favorite')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                activeTab === 'favorite' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Heart size={16} />
              Favorites {favorites.size > 0 && `(${favorites.size})`}
            </button>
            <button
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 
                bg-gray-100 text-gray-700 hover:bg-gray-200`}
            >
              <Home size={16} />
              Houses
            </button>
            <button
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 
                bg-gray-100 text-gray-700 hover:bg-gray-200`}
            >
              <DollarSign size={16} />
              Premium
            </button>
          </div>
        </div>
      </div>

      {/* Properties Grid/List */}
      <div className="px-4 py-6 mb-16">
        {filteredProperties.length === 0 ? (
          <div className="text-center py-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center"
            >
              <Info size={48} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700">No properties found</h3>
              <p className="text-gray-500 mt-2">Try changing your filters or search criteria</p>
              <button 
                className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                onClick={() => {
                  setActiveTab('all');
                  setFilters({
                    priceRange: [0, 10000000],
                    propertyType: 'all',
                    beds: 'any',
                    baths: 'any',
                    sortBy: 'newest',
                  });
                }}
              >
                Reset Filters
              </button>
            </motion.div>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "flex flex-col gap-4"}>
            {filteredProperties.map((property) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`bg-white rounded-xl shadow-md overflow-hidden ${
                  viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
                }`}
              >
                <div 
                  className={`relative ${
                    viewMode === 'list' 
                      ? 'sm:w-40 sm:h-auto' 
                      : 'h-52'
                  }`}
                >
                  <div 
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: property.image }}
                  />
                  
                  {/* Special Tags */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {property.isNew && (
                      <span className="px-2 py-1 bg-red-600 text-white rounded-md text-xs font-semibold">
                        NEW
                      </span>
                    )}
                    <div className="flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-semibold">{property.rating}</span>
                    </div>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                  >
                    <Heart
                      size={18}
                      className={favorites.has(property.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                    />
                  </button>
                  
                  {/* Bottom Tags */}
                  <div className="absolute bottom-3 left-3 flex gap-1 flex-wrap">
                    {property.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-md text-xs bg-black/70 text-white backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                    {property.tags.length > 2 && (
                      <span className="px-2 py-1 rounded-md text-xs bg-black/70 text-white backdrop-blur-sm">
                        +{property.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                <div className={`p-4 flex-1 ${viewMode === 'list' ? 'flex flex-col justify-between' : ''}`}>
                  <div>
                    <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                      <MapPin size={14} />
                      {property.location}
                    </div>
                    <h3 className="text-base font-semibold mb-1 line-clamp-1">{property.title}</h3>
                    <p className="text-red-600 font-bold text-lg mb-2">
                      {formatPrice(property.price)}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs mt-2">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Bed size={14} />
                      <span>{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Bath size={14} />
                      <span>{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Square size={14} />
                      <span>{property.sqft.toLocaleString()} ft²</span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <button 
                      onClick={() => togglePropertyExpansion(property.id)}
                      className="text-xs text-red-600 font-medium flex items-center gap-1"
                    >
                      View Details
                      <ChevronRight size={14} className={`transition-transform ${
                        expandedPropertyId === property.id ? 'rotate-90' : ''
                      }`} />
                    </button>
                    <div className="flex gap-2">
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <Share2 size={16} className="text-gray-600" />
                      </motion.button>
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <Bookmark size={16} className="text-gray-600" />
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedPropertyId === property.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <p className="text-sm text-gray-600 mb-3">
                            This stunning {property.type.toLowerCase()} features {property.beds} bedrooms and {property.baths} bathrooms spread across {property.sqft.toLocaleString()} square feet of luxurious living space.
                          </p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-1">
                              <Star size={16} className="text-yellow-500 fill-yellow-500" />
                              <span className="text-sm font-medium">{property.rating}</span>
                              <span className="text-gray-500 text-sm">({property.reviews} reviews)</span>
                            </div>
                            <motion.button 
                              whileTap={{ scale: 0.95 }}
                              onClick={() => navigate(`/contact`)}
                              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                              <Phone size={16} />
                              <span className="text-sm">Contact</span>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* Mobile Bottom Navigation */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="grid grid-cols-5 h-16">
          <button className="flex flex-col items-center justify-center text-red-600" onClick={() => navigate('/')}>
            <Home size={22} className="mb-1" />
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center justify-center text-gray-500">
            <Search size={22} className="mb-1" />
            <span className="text-xs">Search</span>
          </button>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleDrawer('map')}
            className="flex flex-col items-center justify-center"
          >
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center -mt-4">
              <MapPin size={22} className="text-white" />
            </div>
            <span className="text-xs mt-1">Map</span>
          </motion.button>
          <button className="flex flex-col items-center justify-center text-gray-500" onClick={() => toggleDrawer('favorites')}>
            <Heart size={22} className="mb-1" />
            <span className="text-xs">Saved</span>
          </button>
          <button className="flex flex-col items-center justify-center text-gray-500">
            <Menu size={22} className="mb-1" />
            <span className="text-xs">Menu</span>
          </button>
        </div>
      </motion.div>
      
      {/* Filter Drawer */}
      <AnimatePresence>
        {drawer === 'filters' && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setDrawer(null)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button onClick={() => setDrawer(null)}>
                  <X size={24} className="text-gray-500" />
                </button>
              </div>
              
              <div className="p-4">
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Property Type</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {['All', 'House', 'Apartment', 'Villa'].map((type) => (
                      <button
                        key={type}
                        className={`py-2 px-3 text-sm rounded-lg border ${
                          filters.propertyType === type.toLowerCase() || (filters.propertyType === 'all' && type === 'All')
                            ? 'border-red-500 bg-red-50 text-red-600'
                            : 'border-gray-200 bg-white text-gray-700'
                        }`}
                        onClick={() => setFilters({...filters, propertyType: type === 'All' ? 'all' : type.toLowerCase()})}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Price Range</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Min Price</label>
                      <select
                        className="w-full p-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={filters.priceRange[0]}
                        onChange={(e) => setFilters({...filters, priceRange: [parseInt(e.target.value), filters.priceRange[1]]})}
                      >
                        <option value="0">Any</option>
                        <option value="1000000">$1M</option>
                        <option value="2000000">$2M</option>
                        <option value="5000000">$5M</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Max Price</label>
                      <select
                        className="w-full p-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={filters.priceRange[1]}
                        onChange={(e) => setFilters({...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value)]})}
                      >
                        <option value="10000000">Any</option>
                        <option value="3000000">$3M</option>
                        <option value="5000000">$5M</option>
                        <option value="10000000">$10M</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Bedrooms</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {['Any', '1+', '2+', '3+', '4+'].map((option) => (
                      <button
                        key={option}
                        className={`py-2 px-3 text-sm rounded-lg border ${
                          filters.beds === option.toLowerCase() || (filters.beds === 'any' && option === 'Any')
                            ? 'border-red-500 bg-red-50 text-red-600'
                            : 'border-gray-200 bg-white text-gray-700'
                        }`}
                        onClick={() => setFilters({...filters, beds: option === 'Any' ? 'any' : option.toLowerCase()})}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Bathrooms</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {['Any', '1+', '2+', '3+', '4+'].map((option) => (
                      <button
                        key={option}
                        className={`py-2 px-3 text-sm rounded-lg border ${
                          filters.baths === option.toLowerCase() || (filters.baths === 'any' && option === 'Any')
                            ? 'border-red-500 bg-red-50 text-red-600'
                            : 'border-gray-200 bg-white text-gray-700'
                        }`}
                        onClick={() => setFilters({...filters, baths: option === 'Any' ? 'any' : option.toLowerCase()})}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between pt-4 border-t border-gray-100">
                  <button
                    className="px-4 py-2 text-gray-600 text-sm font-medium"
                    onClick={() => {
                      setFilters({
                        priceRange: [0, 10000000],
                        propertyType: 'all',
                        beds: 'any',
                        baths: 'any',
                        sortBy: 'newest',
                      });
                    }}
                  >
                    Reset All
                  </button>
                  <button
                    className="px-6 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                    onClick={() => setDrawer(null)}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Sort Drawer */}
      <AnimatePresence>
        {drawer === 'sort' && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setDrawer(null)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">Sort By</h3>
                <button onClick={() => setDrawer(null)}>
                  <X size={24} className="text-gray-500" />
                </button>
              </div>
              
              <div className="p-4">
                {['Newest First', 'Price: Low to High', 'Price: High to Low', 'Most Popular', 'Top Rated'].map((option, index) => (
                  <button
                    key={index}
                    className={`w-full text-left px-4 py-3 rounded-lg mb-2 ${
                      (option === 'Newest First' && filters.sortBy === 'newest') ||
                      (option === 'Price: Low to High' && filters.sortBy === 'price-asc') ||
                      (option === 'Price: High to Low' && filters.sortBy === 'price-desc') ||
                      (option === 'Most Popular' && filters.sortBy === 'popular') ||
                      (option === 'Top Rated' && filters.sortBy === 'rated')
                        ? 'bg-red-50 text-red-600'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      let sortValue = 'newest';
                      if (option === 'Price: Low to High') sortValue = 'price-asc';
                      if (option === 'Price: High to Low') sortValue = 'price-desc';
                      if (option === 'Most Popular') sortValue = 'popular';
                      if (option === 'Top Rated') sortValue = 'rated';
                      
                      setFilters({...filters, sortBy: sortValue});
                      setDrawer(null);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Menu Drawer */}
      <AnimatePresence>
        {drawer === 'menu' && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setDrawer(null)}
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
                  <button onClick={() => setDrawer(null)}>
                    <X size={24} className="text-gray-500" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <nav>
                  <ul className="space-y-1">
                    {[
                      { name: 'Home', icon: <Home size={20} />, link: '/' },
                      { name: 'Properties', icon: <MapPin size={20} />,  link: '/' },
                      { name: 'Saved Searches', icon: <Bookmark size={20} />,  link: '/' },
                      { name: 'History', icon: <Clock size={20} />,  link: '/' },
                      { name: 'Contact Us', icon: <Phone size={20} />,  link: '/contact' },
                      { name: 'About', icon: <Info size={20} />,  link: '/about' },
                    ].map((item, index) => (
                      <li key={index}>
                        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700" onClick={() => navigate(item.link)}>
                          {item.icon}
                          <span>{item.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <button className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    <Phone size={18} />
                    <span>Contact an Agent</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertiesPage;