
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, User, Clock } from 'lucide-react';

const SkylightSection = () => {
  const amenities = [
    "Fully Furnished 1BHK Suite",
    "Premium Bedding & Linens",
    "Kitchenette with Basic Appliances",
    "High-Speed WiFi",
    "AC & Room Heater",
    "Attached Bathroom",
    "24/7 Food Plaza Access",
    "Secure Parking",
    "Mountain View Balcony"
  ];

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
                our food plaza - perfect for travelers seeking comfort, privacy, and 24/7 access to great food.
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
                <div className="text-lg font-bold text-gray-900">24/7</div>
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
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
                Book on Airbnb
              </Button>
              <Button size="lg" variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50 px-8 py-4">
                View Gallery
              </Button>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-6">
            <Card className="overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=600&q=80"
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
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=300&q=80"
                  alt="Skylight Suite Bedroom"
                  className="w-full h-32 object-cover"
                />
                <CardContent className="p-3">
                  <h4 className="font-medium text-gray-900 text-sm">Premium Bedroom</h4>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80"
                  alt="Skylight Suite Workspace"
                  className="w-full h-32 object-cover"
                />
                <CardContent className="p-3">
                  <h4 className="font-medium text-gray-900 text-sm">Work Space</h4>
                </CardContent>
              </Card>
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
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
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
