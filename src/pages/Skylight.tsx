
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  MapPin, Plane, Clock, Users, ChevronDown, ExternalLink
} from 'lucide-react';
import SkylightHeader from '@/components/SkylightHeader';
import SecureExternalLink from '@/components/SecureExternalLink';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const Skylight = () => {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    roomType: '',
    guests: ''
  });

  const rooms = [
    {
      id: 'classic',
      name: 'Classic Room',
      tagline: 'Timeless comfort, thoughtfully designed.',
      price: '₹2,199',
      originalPrice: '₹2,499',
      description: 'A well-appointed room offering modern comforts and a calming atmosphere—ideal for short stays and effortless stopovers.',
      features: ['Double bed', 'Private bathroom', 'Modern interiors', 'Ideal for 2 guests'],
      image: '/lovable-uploads/classic-bed1.jpg'
    },
    {
      id: 'premium',
      name: 'Premium Room',
      tagline: 'More space. Elevated comfort.',
      price: '₹2,499',
      originalPrice: '₹2,999',
      description: 'Designed for guests who appreciate extra room to unwind, the Premium Room features refined interiors and enhanced comfort for a relaxed stay.',
      features: ['Spacious layout', 'Elegant finishes', 'Private bathroom', 'Ideal for 2 guests'],
      image: '/lovable-uploads/premium-bed1.jpg'
    },
    {
      id: 'grand-suite',
      name: 'Skylight Grand Suite',
      tagline: 'A refined residence-style experience.',
      price: '₹3,999',
      originalPrice: '₹4,999',
      description: 'An expansive one-bedroom suite with a separate living area and private kitchenette. Perfect for extended stays, families, or travellers seeking a home-like luxury experience.',
      features: ['Separate living room', 'Kitchenette', 'Generous space', 'Ideal for longer stays'],
      image: '/lovable-uploads/grand-suite-livingroom.jpg'
    }
  ];

  const foodBrands = [
    { name: 'Burger Singh', logo: '/lovable-uploads/burger-singh.png' },
    { name: 'Chicago Pizza', logo: '/lovable-uploads/chicago-pizza.png' },
    { name: 'Baskin Robbins', logo: '/lovable-uploads/baskin-robbins.svg' },
    { name: 'The Nukkad Tapri', logo: '/lovable-uploads/nukkad-tapri.png' }
  ];

  const handleWhatsAppBooking = () => {
    const checkIn = checkInDate ? format(checkInDate, 'dd MMM yyyy') : 'Not selected';
    const checkOut = checkOutDate ? format(checkOutDate, 'dd MMM yyyy') : 'Not selected';
    
    const message = `Hi, I'd like to book a room at Skylight Suites.

Name: ${formData.name || 'Not provided'}
Phone: ${formData.phone || 'Not provided'}
Check-in: ${checkIn}
Check-out: ${checkOut}
Room Type: ${formData.roomType || 'Not selected'}
Guests: ${formData.guests || 'Not selected'}`;

    const whatsappUrl = `https://wa.me/919997731372?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <SkylightHeader />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/lovable-uploads/hero-room.jpg')` }}
        />
        <div className="absolute inset-0 bg-[#3d3429]/50" />
        
        <div className="container mx-auto px-4 relative z-10 text-center pt-20">
          <p className="text-[#e8ddd0] uppercase tracking-[0.3em] text-sm mb-6 font-sans">
            Culinary Central 72 • Dehradun–Haridwar Highway
          </p>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-[#f5efe8] leading-tight mb-8 max-w-4xl mx-auto">
            An Elevated Boutique Stay Near Dehradun, Rishikesh & Haridwar
          </h1>
          
          <p className="text-lg md:text-xl text-[#e8ddd0] max-w-2xl mx-auto mb-12 font-sans font-light">
            Skylight Suites offers thoughtfully designed rooms, refined comfort, and a prime location just minutes from Dehradun Airport—set within the vibrant Culinary Central 72.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg"
              className="bg-[#c9b896] hover:bg-[#d4c6a8] text-[#3d3429] font-sans font-medium px-8 py-6 text-base"
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Book Your Stay
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-[#c9b896]/50 text-[#f5efe8] bg-transparent hover:bg-[#c9b896]/10 px-8 py-6 text-base font-sans"
              onClick={() => document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Rooms & Suites
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-[#c9b896]/40 flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-[#c9b896]/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground uppercase tracking-[0.2em] text-sm mb-4 text-center font-sans">About Skylight Suites</p>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-foreground text-center mb-8">
            A Modern Retreat in the Heart of Uttarakhand
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-16 leading-relaxed font-sans">
            Skylight Suites is a newly built boutique hotel designed for travellers who value comfort, space, and thoughtful details. Ideally located between Dehradun, Rishikesh, and Haridwar, the property offers seamless access to the region while providing a serene, modern retreat.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto text-center mb-16 font-sans">
            Whether you're visiting for leisure, family travel, or an extended stay, Skylight Suites blends contemporary design with warm hospitality.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Plane className="w-6 h-6" />, title: '18 mins from Dehradun Airport', subtitle: '(Jolly Grant)' },
              { icon: <MapPin className="w-6 h-6" />, title: 'Easy access to Rishikesh & Haridwar', subtitle: '' },
              { icon: <Clock className="w-6 h-6" />, title: 'Newly Built', subtitle: 'Boutique Property' },
              { icon: <Users className="w-6 h-6" />, title: 'Located on', subtitle: 'Culinary Central 72' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent text-foreground mb-4">
                  {item.icon}
                </div>
                <h3 className="font-sans font-medium text-foreground">{item.title}</h3>
                {item.subtitle && <p className="text-muted-foreground text-sm font-sans">{item.subtitle}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground uppercase tracking-[0.2em] text-sm mb-4 text-center font-sans">Rooms & Suites</p>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-foreground text-center mb-16">
            A Collection of Refined Spaces
          </h2>

          <div className="space-y-20">
            {rooms.map((room, index) => (
              <div key={room.id} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="relative overflow-hidden rounded-2xl">
                    <img 
                      src={room.image} 
                      alt={room.name}
                      className="w-full h-80 lg:h-[500px] object-cover"
                    />
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <p className="text-muted-foreground italic mb-4 font-serif">{room.tagline}</p>
                  <h3 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-4">{room.name}</h3>
                  
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-3xl font-sans font-medium text-foreground">{room.price}</span>
                    <span className="text-lg text-muted-foreground line-through font-sans">{room.originalPrice}</span>
                    <span className="text-sm text-muted-foreground font-sans">incl. tax</span>
                  </div>

                  <p className="text-muted-foreground mb-8 leading-relaxed font-sans">{room.description}</p>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {room.features.map((feature, idx) => (
                      <span key={idx} className="px-4 py-2 bg-accent text-foreground rounded-full text-sm font-sans">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <Button 
                    className="bg-[#8b7355] hover:bg-[#7a6549] text-[#f5efe8] px-8 font-sans"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, roomType: room.name }));
                      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Book {room.name}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culinary Central Section */}
      <section id="dining" className="py-24 bg-accent">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground uppercase tracking-[0.2em] text-sm mb-4 text-center font-sans">Culinary Central 72</p>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-foreground text-center mb-8">
            Stay Above a Curated Culinary Destination
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-16 font-sans">
            Skylight Suites is located within Culinary Central 72, home to some of India's most loved food brands—making dining effortless and family-friendly.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {foodBrands.map((brand, index) => (
              <div key={index} className="bg-card rounded-2xl p-8 flex flex-col items-center justify-center shadow-sm">
                <img 
                  src={brand.logo} 
                  alt={`${brand.name} logo`}
                  className="h-16 object-contain mb-4"
                />
                <span className="text-muted-foreground text-sm font-sans font-medium">{brand.name}</span>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground text-center italic font-serif">
            Perfect for relaxed family meals, quick bites, or late-evening desserts—just steps away.
          </p>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground uppercase tracking-[0.2em] text-sm mb-4 text-center font-sans">Location</p>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-foreground text-center mb-16">
            Perfectly Positioned
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              '18 mins from Dehradun Airport (Jolly Grant)',
              'Convenient for Rishikesh, Haridwar & Dehradun City Center',
              'Easy highway access',
              'Ideal stopover or base for exploration'
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-background rounded-2xl">
                <p className="text-foreground font-sans">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Find Us Section */}
      <section className="py-24 bg-accent">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground uppercase tracking-[0.2em] text-sm mb-4 text-center font-sans">Find Us</p>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-foreground text-center mb-8">
            Our Location
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16 font-sans">
            Conveniently located on the Dehradun–Haridwar Highway, Skylight Suites offers easy access to major destinations.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div className="text-center">
              <h3 className="font-sans font-medium text-foreground mb-4">Address</h3>
              <p className="text-muted-foreground font-sans">Skylight Suites</p>
              <p className="text-muted-foreground font-sans">Culinary Central 72</p>
              <p className="text-muted-foreground font-sans">Dehradun–Haridwar Highway</p>
              <p className="text-muted-foreground font-sans">Uttarakhand, India</p>
            </div>
            <div className="text-center">
              <h3 className="font-sans font-medium text-foreground mb-4">From Airport</h3>
              <p className="text-muted-foreground font-sans">18 minutes from Jolly Grant Airport (Dehradun)</p>
            </div>
            <div className="text-center">
              <h3 className="font-sans font-medium text-foreground mb-4">Nearby</h3>
              <p className="text-muted-foreground font-sans">Rishikesh • Haridwar • Dehradun City</p>
            </div>
          </div>

          <div className="text-center">
            <SecureExternalLink href="https://maps.app.goo.gl/KmRfYVRifoKECFJ4A">
              <Button className="bg-[#8b7355] hover:bg-[#7a6549] text-[#f5efe8] px-8 font-sans">
                <MapPin className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
            </SecureExternalLink>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-24 bg-[#5c4d3c]">
        <div className="container mx-auto px-4">
          <p className="text-[#c9b896] uppercase tracking-[0.2em] text-sm mb-4 text-center font-sans">Book Direct</p>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-[#f5efe8] text-center mb-8">
            Reserve Your Stay
          </h2>
          <p className="text-[#d4c6a8] text-center max-w-2xl mx-auto mb-12 font-sans">
            Send your booking request directly via WhatsApp for the fastest response and best available rates.
          </p>

          <Card className="max-w-2xl mx-auto bg-background border-0 shadow-2xl">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-sans font-medium text-foreground mb-2">Full Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Your full name"
                    className="bg-card border-border font-sans"
                  />
                </div>

                <div>
                  <label className="block text-sm font-sans font-medium text-foreground mb-2">Phone Number</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+91 XXXXX XXXXX"
                    className="bg-card border-border font-sans"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-sans font-medium text-foreground mb-2">Check-in Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-sans font-normal bg-card border-border"
                        >
                          {checkInDate ? format(checkInDate, 'PPP') : 'Select date'}
                          <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkInDate}
                          onSelect={setCheckInDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label className="block text-sm font-sans font-medium text-foreground mb-2">Check-out Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-sans font-normal bg-card border-border"
                        >
                          {checkOutDate ? format(checkOutDate, 'PPP') : 'Select date'}
                          <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkOutDate}
                          onSelect={setCheckOutDate}
                          disabled={(date) => date < (checkInDate || new Date())}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-sans font-medium text-foreground mb-2">Room Type</label>
                    <Select value={formData.roomType} onValueChange={(value) => setFormData(prev => ({ ...prev, roomType: value }))}>
                      <SelectTrigger className="bg-card border-border font-sans">
                        <SelectValue placeholder="Select room type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Classic Room">Classic Room</SelectItem>
                        <SelectItem value="Premium Room">Premium Room</SelectItem>
                        <SelectItem value="Skylight Grand Suite">Skylight Grand Suite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-sans font-medium text-foreground mb-2">Number of Guests</label>
                    <Select value={formData.guests} onValueChange={(value) => setFormData(prev => ({ ...prev, guests: value }))}>
                      <SelectTrigger className="bg-card border-border font-sans">
                        <SelectValue placeholder="Select guests" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 Guest">1 Guest</SelectItem>
                        <SelectItem value="2 Guests">2 Guests</SelectItem>
                        <SelectItem value="3 Guests">3 Guests</SelectItem>
                        <SelectItem value="4 Guests">4 Guests</SelectItem>
                        <SelectItem value="5+ Guests">5+ Guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  className="w-full bg-[#4a7c59] hover:bg-[#3d6a4a] text-[#f5efe8] py-6 text-lg font-sans font-medium"
                  onClick={handleWhatsAppBooking}
                >
                  Send Booking Request on WhatsApp
                </Button>

                <div className="pt-6 border-t border-border">
                  <p className="text-muted-foreground text-sm text-center mb-4 font-sans">Prefer booking through your favourite platform?</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <SecureExternalLink href="https://www.airbnb.co.in/rooms/1389016749522622097?check_in=2025-12-27&check_out=2025-12-28&guests=1&adults=1&s=67&unique_share_id=46581a5a-46a0-46bf-b795-a151972ff97f">
                      <Button variant="outline" size="sm" className="border-border text-foreground font-sans">
                        <ExternalLink className="w-3 h-3 mr-2" />
                        Airbnb
                      </Button>
                    </SecureExternalLink>
                    <SecureExternalLink href="https://www.makemytrip.com/hotels/skylight_suites-details-rishikesh.html">
                      <Button variant="outline" size="sm" className="border-border text-foreground font-sans">
                        <ExternalLink className="w-3 h-3 mr-2" />
                        MakeMyTrip
                      </Button>
                    </SecureExternalLink>
                    <SecureExternalLink href="https://www.booking.com/Share-0BaGCuG">
                      <Button variant="outline" size="sm" className="border-border text-foreground font-sans">
                        <ExternalLink className="w-3 h-3 mr-2" />
                        Booking.com
                      </Button>
                    </SecureExternalLink>
                    <SecureExternalLink href="https://www.agoda.com/skylight-suites/hotel/dehradun-in.html?cid=1844104&ds=vMRpdd3cEDhVQ7KH">
                      <Button variant="outline" size="sm" className="border-border text-foreground font-sans">
                        <ExternalLink className="w-3 h-3 mr-2" />
                        Agoda
                      </Button>
                    </SecureExternalLink>
                  </div>
                  <p className="text-muted-foreground text-xs text-center mt-4 font-sans">
                    Skylight Suites is available across leading travel platforms for your convenience.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#3d3429] text-center">
        <p className="text-[#c9b896] text-sm font-sans">
          © {new Date().getFullYear()} Skylight Suites. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Skylight;
