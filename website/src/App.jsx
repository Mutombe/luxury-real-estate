import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import HomePage from './components/home/home';
import AboutPage from './components/about/about';
import ContactPage from './components/contact/contact';
import { useEffect } from 'react';
import PropertiesPage from './components/properties/properties';
import FAQPage from './components/faq/faq';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <ScrollToTop />
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties/penthouses" element={<PropertiesPage />} />
            <Route path="/properties/luxury-homes" element={<PropertiesPage />} />
            <Route path="/properties/waterfront" element={<PropertiesPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/properties/estates" element={<PropertiesPage />} />
            {/* <Route path="/team" element={<TeamPage />} /> */}
            {/* <Route path="/careers" element={<CareersPage />} /> */}
            {/* <Route path="/press" element={<PressPage />} /> */}
            {/* <Route path="/privacy" element={<PrivacyPage />} /> */}
            {/* <Route path="/locations" element={<LocationsPage />} /> */}
            {/* <Route path="/market-reports" element={<MarketReportsPage />} /> */}
            {/* <Route path="/guides" element={<GuidesPage />} /> */}
            <Route path="/contact" element={<ContactPage />} />
            {/* <Route path="/products" element={<ProductsPage />} /> */}
            {/* <Route path="/services" element={<ServicesPage />} /> */}
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  );
}

export default App;