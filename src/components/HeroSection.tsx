
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Users } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-orange-50 to-yellow-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
                <MapPin className="w-4 h-4" />
                NH 72, Dehradun-Haridwar Highway
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                India's Premier
                <span className="block text-orange-600">Highway Food Plaza</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Where authentic Indian flavors meet global cuisine. Five premium brands, 
                one unforgettable stopover experience. Plus luxury accommodation at Skylight Suite.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-2 mx-auto">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">5</div>
                <div className="text-sm text-gray-600">Premium Brands</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-2 mx-auto">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">15Hr</div>
                <div className="text-sm text-gray-600">9am to 12am</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-2 mx-auto">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">7km</div>
                <div className="text-sm text-gray-600">Delivery Range</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4">
                Order Online Now
              </Button>
              <Button size="lg" variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-4">
                Explore Our Brands
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-orange-200 to-yellow-200 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80"
                alt="Culinary Central 72 Food Plaza"
                className="w-full h-full object-cover"
              />
              {/* Floating Cards */}
              <div className="absolute top-6 right-6 bg-white rounded-lg p-4 shadow-lg">
                <div className="text-sm font-medium text-gray-900">Live Kitchen</div>
                <div className="text-xs text-green-600">• Hygiene Certified</div>
              </div>
              <div className="absolute bottom-6 left-6 bg-white rounded-lg p-4 shadow-lg">
                <div className="text-sm font-medium text-gray-900">Highway Travelers</div>
                <div className="text-xs text-orange-600">Trusted Stopover</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
