
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SkylightHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#3d3429]/90 backdrop-blur-md border-b border-[#5c4d3c]/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-serif font-light tracking-wide text-[#f5efe8]">Skylight Suites</span>
            <span className="text-xs uppercase tracking-[0.2em] text-[#c9b896] font-sans">Boutique Hotel</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button onClick={() => scrollToSection('about')} className="text-[#d4c6a8] hover:text-[#f5efe8] text-sm font-sans font-medium transition-colors">About</button>
            <button onClick={() => scrollToSection('rooms')} className="text-[#d4c6a8] hover:text-[#f5efe8] text-sm font-sans font-medium transition-colors">Rooms</button>
            <button onClick={() => scrollToSection('dining')} className="text-[#d4c6a8] hover:text-[#f5efe8] text-sm font-sans font-medium transition-colors">Dining</button>
            <button onClick={() => scrollToSection('location')} className="text-[#d4c6a8] hover:text-[#f5efe8] text-sm font-sans font-medium transition-colors">Location</button>
            <button onClick={() => scrollToSection('booking')} className="text-[#d4c6a8] hover:text-[#f5efe8] text-sm font-sans font-medium transition-colors">Book</button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              className="bg-[#c9b896] hover:bg-[#d4c6a8] text-[#3d3429] font-sans font-medium px-6"
              onClick={() => scrollToSection('booking')}
            >
              Book Your Stay
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-[#f5efe8]"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#5c4d3c]/50">
            <nav className="flex flex-col gap-3">
              <button onClick={() => scrollToSection('about')} className="text-[#d4c6a8] font-sans font-medium py-2 text-left">About</button>
              <button onClick={() => scrollToSection('rooms')} className="text-[#d4c6a8] font-sans font-medium py-2 text-left">Rooms</button>
              <button onClick={() => scrollToSection('dining')} className="text-[#d4c6a8] font-sans font-medium py-2 text-left">Dining</button>
              <button onClick={() => scrollToSection('location')} className="text-[#d4c6a8] font-sans font-medium py-2 text-left">Location</button>
              <button onClick={() => scrollToSection('booking')} className="text-[#d4c6a8] font-sans font-medium py-2 text-left">Book</button>
              <Button 
                className="w-full mt-2 bg-[#c9b896] hover:bg-[#d4c6a8] text-[#3d3429] font-sans font-medium"
                onClick={() => scrollToSection('booking')}
              >
                Book Your Stay
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default SkylightHeader;
