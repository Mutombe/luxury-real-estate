import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom'

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState(new Set());
  const navigate = useNavigate()

  const faqData = {
    buying: [
      {
        id: 'buy1',
        question: "What's the first step in buying a luxury property?",
        answer: "The first step is to get pre-approved for financing and determine your budget. This helps you understand your price range and shows sellers you're a serious buyer. We also recommend meeting with our luxury real estate specialists to discuss your specific needs and preferences."
      },
      {
        id: 'buy2',
        question: "How long does the buying process typically take?",
        answer: "The luxury property buying process typically takes 45-60 days from offer acceptance to closing. However, this timeline can vary depending on factors such as financing, property inspections, and negotiations."
      },
      {
        id: 'buy3',
        question: "What additional costs should I consider beyond the purchase price?",
        answer: "Beyond the purchase price, consider property taxes, insurance, maintenance costs, utilities, and potentially HOA fees. For luxury properties, you may also need to budget for staff, security systems, and high-end appliance maintenance."
      }
    ],
    selling: [
      {
        id: 'sell1',
        question: "How do you determine the listing price for my luxury property?",
        answer: "We conduct a comprehensive market analysis, considering recent sales of comparable properties, unique features of your home, current market conditions, and location-specific factors. We also factor in any custom or high-end amenities that add value to your property."
      },
      {
        id: 'sell2',
        question: "What marketing strategies do you use for luxury properties?",
        answer: "We employ a multi-faceted marketing approach including professional photography and videography, virtual tours, targeted social media campaigns, luxury real estate publications, and exclusive private showings. We also leverage our network of high-net-worth buyers and international investors."
      }
    ],
    financing: [
      {
        id: 'fin1',
        question: "What financing options are available for luxury properties?",
        answer: "Options include traditional mortgages, jumbo loans, portfolio loans, and cash purchases. We work with specialized lenders who understand the unique aspects of luxury property financing and can offer competitive rates and terms."
      },
      {
        id: 'fin2',
        question: "How much down payment is typically required?",
        answer: "For luxury properties, lenders typically require a down payment of 20-30%. However, this can vary based on the property value, your financial profile, and the type of financing chosen."
      }
    ],
    process: [
      {
        id: 'proc1',
        question: "What makes your luxury real estate service different?",
        answer: "We offer personalized, white-glove service with dedicated luxury specialists, exclusive access to off-market properties, comprehensive market intelligence, and a global network of luxury real estate connections. Our team handles every detail with discretion and professionalism."
      },
      {
        id: 'proc2',
        question: "How do you ensure privacy during the buying/selling process?",
        answer: "We implement strict confidentiality protocols, including private showings, NDAs when required, and careful control of property information. We also have experience working with high-profile clients and understand the importance of discretion."
      }
    ]
  };

  const toggleItem = (id) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const categories = {
    all: 'All Questions',
    buying: 'Buying',
    selling: 'Selling',
    financing: 'Financing',
    process: 'Our Process'
  };

  const filteredQuestions = useMemo(() => {
    const allQuestions = Object.entries(faqData).flatMap(([category, questions]) => 
      activeCategory === 'all' || activeCategory === category
        ? questions.filter(q => 
            q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : []
    );
    return allQuestions;
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Find answers to common questions about luxury real estate
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Categories */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(categories).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    activeCategory === key
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4"
          >
            {filteredQuestions.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-gray-900">{item.question}</span>
                  {expandedItems.has(item.id) ? (
                    <Minus size={20} className="text-red-600 flex-shrink-0" />
                  ) : (
                    <Plus size={20} className="text-gray-400 flex-shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedItems.has(item.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-gray-600">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {filteredQuestions.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-gray-500"
              >
                No questions found matching your search.
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">Still have questions?</h2>
            <p className="text-gray-600">
              Our luxury real estate specialists are here to help you with any questions you may have.
            </p>
            <button className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" onClick={()=>navigate("/contact")}>
              Contact Us
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;