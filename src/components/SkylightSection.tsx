
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MapPin, User, Clock, Expand, Shield, Car, Utensils } from 'lucide-react';
import ImageModal from './ImageModal';

const SkylightSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

  const galleryImages = [
    { src: "/lovable-uploads/46ef2d41-016f-4d30-9310-dd90e54f1048.png", alt: "Living Room with Elegant Furnishing" },
    { src: "/lovable-uploads/1e01c1b7-d31f-4eee-82bb-fe5bb8353705.png", alt: "Spacious Living Area with Kitchen View" },
    { src: "/lovable-uploads/0235182c-5032-4e24-a894-aa5a0feb3247.png", alt: "Master Bedroom with Modern Amenities" },
    { src: "/lovable-uploads/09df96a5-9b71-4181-9b40-543cdbde181e.png", alt: "Premium Bedroom with Wooden Finishes" },
    { src: "/lovable-uploads/a3a7906d-a429-4239-9f6d-82741c364afe.png", alt: "Modern Kitchen with Full Appliances" },
    { src: "/lovable-uploads/5250ea72-8e53-4304-a9bc-de5a3931166e.png", alt: "Kitchen Counter and Storage" },
    { src: "/lovable-uploads/b30aa02b-bc6a-4c6f-bede-b06ea3826228.png", alt: "Utility Area with Washing Machine" },
    { src: "/lovable-uploads/f74d4562-a23c-47e3-abb8-0a9beb09d160.png", alt: "Modern Bathroom with Shower" },
    { src: "/lovable-uploads/2cdc1956-d129-4b72-acac-52b323ffdd82.png", alt: "Bathroom with Premium Fixtures" },
    { src: "/lovable-uploads/225f9cc7-87ab-4ab7-861d-c31696443978.png", alt: "Rooftop Terrace with City View" }
  ];

  const handleAirbnbClick = () => {
    window.open('https://www.airbnb.co.in/rooms/1389016749522622097?check_in=2025-07-15&check_out=2025-07-17&guests=2&adults=2&s=67&unique_share_id=340567d8-4842-46ce-8670-bab1be651367', '_blank');
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  return (
    <section id="skylight" className="py-16 md:py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Content */}
          <div className="space-y-8">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium">
                🏨 Premium Accommodation
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                <span className="text-amber-600">Skylight</span>
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
                <div className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-lg mb-2 mx-auto">
                  <User className="w-6 h-6 text-amber-600" />
                </div>
                <div className="text-lg font-bold text-gray-900">1BHK</div>
                <div className="text-sm text-gray-600">Family Suite</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-lg mb-2 mx-auto">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
                <div className="text-lg font-bold text-gray-900">15hrs</div>
                <div className="text-sm text-gray-600">Food Access</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-lg mb-2 mx-auto">
                  <MapPin className="w-6 h-6 text-amber-600" />
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
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Perfect for Highway Travellers Module */}
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Car className="w-6 h-6" />
                Perfect for Highway Travellers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 opacity-80" />
                  <span className="text-sm">Safe & Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 opacity-80" />
                  <span className="text-sm">Food Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 opacity-80" />
                  <span className="text-sm">Highway Location</span>
                </div>
              </div>
              <p className="mb-4 opacity-90 text-sm leading-relaxed">
                Strategically located on NH 72 for easy access. Clean, comfortable accommodation 
                with direct access to premium food options. Perfect for overnight stays during long journeys.
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">₹2,499</div>
                  <div className="text-sm opacity-75">per night</div>
                </div>
                <Button 
                  className="bg-white text-amber-600 hover:bg-gray-100"
                  onClick={handleAirbnbClick}
                >
                  Book Now
                </Button>
              </div>
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

            {/* Gallery Carousel with enhanced navigation */}
            <div className="relative px-12">
              <Carousel className="w-full">
                <CarouselContent>
                  {galleryImages.map((image, index) => (
                    <CarouselItem key={index} className="md:basis-1/2">
                      <Card className="overflow-hidden group cursor-pointer" onClick={() => handleImageClick(index)}>
                        <div className="relative">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <Expand className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="bg-white/90 hover:bg-white border-amber-200 text-amber-600 hover:text-amber-700 shadow-lg" />
                <CarouselNext className="bg-white/90 hover:bg-white border-amber-200 text-amber-600 hover:text-amber-700 shadow-lg" />
              </Carousel>
            </div>
          </div>
        </div>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={galleryImages}
        initialIndex={selectedImageIndex}
      />
    </section>
  );
};

export default SkylightSection;
