
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Users, Star, Zap } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 via-yellow-400/10 to-pink-400/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-300/20 to-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-300/20 to-orange-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-yellow-300/15 to-orange-300/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700 px-6 py-3 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm border border-orange-200/50">
                <MapPin className="w-4 h-4" />
                <span>NH 72, Dehradun-Haridwar Highway</span>
                <Star className="w-4 h-4 text-yellow-500" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                India's Premier
                <span className="block bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
                  Highway Food Plaza
                </span>
              </h1>
              
              <p className="text-xl text-gray-700 leading-relaxed">
                Where authentic Indian flavors meet global cuisine. Five premium brands, 
                one unforgettable stopover experience. Plus luxury accommodation at Skylight Suite.
              </p>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center group">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl mb-3 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">5</div>
                <div className="text-sm text-gray-600">Premium Brands</div>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl mb-3 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">15Hr</div>
                <div className="text-sm text-gray-600">9am to 12am</div>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-400 to-orange-500 rounded-xl mb-3 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">7km</div>
                <div className="text-sm text-gray-600">Delivery Range</div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                Order Online Now
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-orange-500 text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Explore Our Brands
              </Button>
            </div>
          </div>

          {/* Enhanced Hero Image */}
          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-orange-200 via-yellow-200 to-pink-200 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
              <img 
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80"
                alt="Culinary Central 72 Food Plaza"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
              {/* Enhanced Floating Cards */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-green-200">
                <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  Live Kitchen
                </div>
                <div className="text-xs text-green-600 font-medium">• Hygiene Certified</div>
              </div>
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-orange-200">
                <div className="text-sm font-medium text-gray-900">Highway Travelers</div>
                <div className="text-xs text-orange-600 font-medium flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  Trusted Stopover
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
