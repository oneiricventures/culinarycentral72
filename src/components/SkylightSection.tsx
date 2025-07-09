
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MapPin, User, Clock } from 'lucide-react';

const SkylightSection = () => {
  const amenities = [
    "Fully Furnished 1BHK Suite",
    "Premium Bedding & Linens",
    "Kitchenette with Basic Appliances",
    "High-Speed WiFi",
    "Heavy Duty ACs",
    "Attached Bathroom",
    "15/7 Food Plaza Access",
    "Secure Parking",
    "Mountain View Terrace"
  ];

  const handleAirbnbClick = () => {
    window.open('https://www.airbnb.co.in/rooms/1389016749522622097?check_in=2025-07-15&check_out=2025-07-17&guests=2&adults=2&s=67&unique_share_id=340567d8-4842-46ce-8670-bab1be651367', '_blank');
  };

  return (
    <section id="skylight" className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                🏨 Premium Accommodation
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                <span className="text-blue-600">Skylight</span>
                <span className="block">Premium Suite</span>
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Your home away from home. A beautifully furnished 1BHK suite right above 
                our food plaza - perfect for travelers seeking comfort, privacy, and 15hrs access to great food.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-2 mx-auto">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-lg font-bold text-gray-900">1BHK</div>
                <div className="text-sm text-gray-600">Family Suite</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-2 mx-auto">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-lg font-bold text-gray-900">15hrs</div>
                <div className="text-sm text-gray-600">Food Access</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-2 mx-auto">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-lg font-bold text-gray-900">Prime</div>
                <div className="text-sm text-gray-600">Location</div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Premium Amenities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4"
                onClick={handleAirbnbClick}
              >
                Book on Airbnb
              </Button>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-6">
            <Card className="overflow-hidden shadow-2xl">
              <img 
                src="/lovable-uploads/87a8e661-e5dd-4095-a7ef-100c715b8e04.png"
                alt="Skylight Suite Living Room"
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Spacious Living Area</h3>
                <p className="text-gray-600">Comfortable seating with mountain views and modern amenities.</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="overflow-hidden">
                <img 
                  src="/lovable-uploads/3611bea2-215b-4b8c-aa04-d0e84291b5de.png"
                  alt="Skylight Suite Bedroom"
                  className="w-full h-32 object-cover"
                />
                <CardContent className="p-3">
                  <h4 className="font-medium text-gray-900 text-sm">Premium Bedroom</h4>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <img 
                  src="/lovable-uploads/e0b5fc35-2499-4cd1-bfa1-34220b54622d.png"
                  alt="Skylight Suite Kitchen"
                  className="w-full h-32 object-cover"
                />
                <CardContent className="p-3">
                  <h4 className="font-medium text-gray-900 text-sm">Working Kitchen</h4>
                </CardContent>
              </Card>
            </div>

            {/* Carousel Placeholder - will be populated when you share the images */}
            <div className="relative">
              <Carousel className="w-full">
                <CarouselContent>
                  <CarouselItem>
                    <Card className="overflow-hidden">
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <p className="text-gray-500">Gallery images coming soon...</p>
                      </div>
                    </Card>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

            {/* Booking Info */}
            <div className="bg-blue-600 text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-2">Perfect for Highway Travelers</h3>
              <p className="mb-4 opacity-90">Safe, comfortable, and convenient. Book directly through our Airbnb listing.</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">₹2,499</div>
                  <div className="text-sm opacity-75">per night</div>
                </div>
                <Button 
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={handleAirbnbClick}
                >
                  Check Availability
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkylightSection;
