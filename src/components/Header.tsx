
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleCall = () => {
    window.location.href = 'tel:+919773511297';
  };

  return (
    <header className="bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar with contact info */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm border-b border-orange-100">
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>Dehradun Haridwar Highway</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4 text-orange-500" />
              <span>+91 9773511297</span>
            </div>
          </div>
          <div className="text-orange-600 font-medium">
            Open 9am to 12am • Premium Food Plaza & Stay
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">CC</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Culinary Central 72</h1>
              <p className="text-sm text-orange-600 font-medium">Highway Food Plaza</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {isHomePage ? (
              <>
                <a href="#home" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Home</a>
                <a href="#brands" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Our Brands</a>
                <Link to="/skylight" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Skylight Stay</Link>
                <a href="#about" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">About</a>
                <a href="#lease" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Lease Space</a>
              </>
            ) : (
              <>
                <Link to="/" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Home</Link>
                <Link to="/#brands" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Our Brands</Link>
                <Link to="/skylight" className="text-orange-600 font-medium transition-colors">Skylight Stay</Link>
                <Link to="/#about" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">About</Link>
                <Link to="/#lease" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Lease Space</Link>
              </>
            )}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="outline" 
              className="border-orange-500 text-orange-600 hover:bg-orange-50"
              onClick={handleCall}
            >
              Party Orders
            </Button>
            <Button 
              className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg"
              onClick={handleCall}
            >
              Order Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4">
              {isHomePage ? (
                <>
                  <a href="#home" className="text-gray-700 font-medium py-2">Home</a>
                  <a href="#brands" className="text-gray-700 font-medium py-2">Our Brands</a>
                  <Link to="/skylight" className="text-gray-700 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Skylight Stay</Link>
                  <a href="#about" className="text-gray-700 font-medium py-2">About</a>
                  <a href="#lease" className="text-gray-700 font-medium py-2">Lease Space</a>
                </>
              ) : (
                <>
                  <Link to="/" className="text-gray-700 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
                  <Link to="/#brands" className="text-gray-700 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Our Brands</Link>
                  <Link to="/skylight" className="text-orange-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Skylight Stay</Link>
                  <Link to="/#about" className="text-gray-700 font-medium py-2" onClick={() => setIsMenuOpen(false)}>About</Link>
                  <Link to="/#lease" className="text-gray-700 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Lease Space</Link>
                </>
              )}
              <div className="flex flex-col gap-2 pt-4">
                <Button 
                  variant="outline" 
                  className="w-full border-orange-500 text-orange-600"
                  onClick={handleCall}
                >
                  Party Orders
                </Button>
                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  onClick={handleCall}
                >
                  Order Now
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
