
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Shield, Users, Clock } from 'lucide-react';
import SecureExternalLink from './SecureExternalLink';

const AboutSection = () => {
  const highlights = [
    {
      icon: MapPin,
      title: "Strategic Highway Location",
      description: "NH 72 on the busy Dehradun-Haridwar route, serving hundreds of travelers daily"
    },
    {
      icon: Shield,
      title: "Hygiene Certified",
      description: "FSSAI certified kitchens with live monitoring and highest safety standards"
    },
    {
      icon: Users,
      title: "Community Hub",
      description: "Serving highway travelers, local families, students, and institutions"
    },
    {
      icon: Clock,
      title: "Open 9am to 12am",
      description: "15-hour operations ensuring you never go hungry during our operating hours"
    }
  ];

  const handleLocationClick = () => {
    window.open('https://maps.app.goo.gl/rTw9h2WEYNhr7G2e7', '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                🛣️ Highway Legacy Since Launch
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                Where Highway Meets
                <span className="block text-orange-600">Hospitality</span>
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Born from the vision to transform the highway dining experience, Culinary Central 72 
                represents the perfect blend of authentic Indian hospitality and modern convenience.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Our Story</h3>
                <p className="text-gray-600">
                  What started as a dream to create India's first premium highway food plaza has evolved 
                  into a destination that serves over 500 travelers daily. We've carefully curated 
                  five distinct food brands under one roof, each maintaining its unique identity while 
                  contributing to a unified experience.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">The CC72 Promise</h3>
                <p className="text-gray-600">
                  Every dish served, every smile shared, and every moment spent at CC72 is crafted 
                  with the warmth of Indian hospitality and the precision of international standards. 
                  We're not just a stopover; we're a destination.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-3xl font-bold text-orange-600">500+</div>
                <div className="text-sm text-gray-600">Daily Visitors</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">13km</div>
                <div className="text-sm text-gray-600">Visibility Range</div>
              </div>
            </div>
          </div>

          {/* Map/Location Visual */}
          <div className="relative">
            <Card className="overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-br from-green-100 to-blue-100 p-8">
                <div className="aspect-video bg-white rounded-lg shadow-inner flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow duration-300"
                     onClick={handleLocationClick}>
                  <div className="text-center space-y-4">
                    <MapPin className="w-16 h-16 text-orange-500 mx-auto" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Prime Highway Location</h3>
                      <p className="text-gray-600">NH 72, Dehradun-Haridwar Highway</p>
                      <p className="text-sm text-gray-500 mt-2">Visible from 13km away • Easy highway access</p>
                      <p className="text-sm text-blue-600 font-medium mt-2">📍 Click to view on map</p>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">Strategic Advantage</h3>
                <p className="text-gray-600 text-sm">
                  Located at the midpoint between Dehradun and Haridwar, making us the natural 
                  choice for travelers, pilgrims, and adventure seekers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Highlights Grid */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            Why Travelers Choose CC72
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full mb-4 mx-auto">
                    <highlight.icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{highlight.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-16 bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Visit Us Today</h3>
          <p className="mb-6 opacity-90 max-w-2xl mx-auto">
            Experience the perfect blend of authentic Indian hospitality and modern convenience. 
            We're open from 9am to 12am to serve you better.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-300"
                 onClick={handleLocationClick}>
              <MapPin className="w-4 h-4" />
              <span>Culinary Central 72, Dehradun - Haridwar Highway, Majri Grant, Doiwala, Dehradun, Uttarakhand</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Open 9am to 12am</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
