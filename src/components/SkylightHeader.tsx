
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MapPin, Phone, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SkylightHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCall = () => {
    window.location.href = 'tel:+919997731372';
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/80 border-b border-amber-500/20 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar with contact info */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm border-b border-amber-500/10">
          <div className="flex items-center gap-4 text-gray-400">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>NH 72, Majri Grant, Near Jolly Grant Airport</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4 text-amber-500" />
              <span>+91 9997731372</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span className="ml-2 text-gray-300">3-Star Comfort • 5-Star Experience</span>
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-slate-900 font-bold text-xl">S</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Skylight Suites</h1>
              <p className="text-sm text-amber-400 font-medium">Premium Highway Hotel</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button onClick={() => scrollToSection('rooms')} className="text-gray-300 hover:text-amber-400 font-medium transition-colors">Rooms</button>
            <button onClick={() => scrollToSection('amenities')} className="text-gray-300 hover:text-amber-400 font-medium transition-colors">Amenities</button>
            <button onClick={() => scrollToSection('gallery')} className="text-gray-300 hover:text-amber-400 font-medium transition-colors">Gallery</button>
            <button onClick={() => scrollToSection('location')} className="text-gray-300 hover:text-amber-400 font-medium transition-colors">Location</button>
            <Link to="/" className="text-gray-400 hover:text-amber-400 font-medium transition-colors text-sm">Food Plaza</Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold shadow-lg"
              onClick={() => scrollToSection('booking-enquiry')}
            >
              Book Direct
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-amber-500/20">
            <nav className="flex flex-col gap-4">
              <button onClick={() => scrollToSection('rooms')} className="text-gray-300 font-medium py-2 text-left">Rooms</button>
              <button onClick={() => scrollToSection('amenities')} className="text-gray-300 font-medium py-2 text-left">Amenities</button>
              <button onClick={() => scrollToSection('gallery')} className="text-gray-300 font-medium py-2 text-left">Gallery</button>
              <button onClick={() => scrollToSection('location')} className="text-gray-300 font-medium py-2 text-left">Location</button>
              <Link to="/" className="text-gray-400 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Food Plaza</Link>
              <div className="flex flex-col gap-2 pt-4">
                <Button 
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
                  onClick={() => scrollToSection('booking-enquiry')}
                >
                  Book Direct
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default SkylightHeader;
