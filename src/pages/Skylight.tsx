
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { 
  MapPin, User, Clock, Expand, Shield, Car, Utensils, Phone, Mail, Calendar, 
  Users, Loader2, Wifi, Wind, Tv, Coffee, Bath, Mountain, Star, Plane, Navigation,
  CheckCircle2, Building2, Bed, Home, Maximize, ExternalLink
} from 'lucide-react';
import ImageModal from '@/components/ImageModal';
import SkylightHeader from '@/components/SkylightHeader';
import Footer from '@/components/Footer';
import SubmissionSuccessDialog from '@/components/SubmissionSuccessDialog';
import { useToast } from '@/hooks/use-toast';
import { skylightBookingSchema, SkylightBookingFormData, sanitizeFormData, createRateLimiter } from '@/utils/validation';
import SecureExternalLink from '@/components/SecureExternalLink';

const bookingRateLimiter = createRateLimiter(3, 5 * 60 * 1000);

const Skylight = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const { toast } = useToast();

  const [formData, setFormData] = useState<SkylightBookingFormData>({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    message: ''
  });

  const rooms = [
    {
      id: 'classic',
      name: 'Classic Room',
      otaTitle: 'Classic Room with Private Bathroom',
      size: '180 sq ft',
      occupancy: '2 Guests',
      price: '₹1,999',
      description: 'Designed for comfort and convenience, the Classic Room offers a well-appointed space ideal for short stays and transit travellers. Featuring modern interiors, a comfortable double bed, and a private bathroom, it\'s perfect for guests looking for a relaxed stay near Dehradun, Haridwar, and Rishikesh.',
      bestFor: 'Short stays, couples, business travellers',
      highlights: ['Comfortable double bed', 'Private bathroom', 'Air conditioning', 'Free Wi‑Fi', 'Ideal for short stays'],
      hasLivingArea: false,
      hasKitchenette: false,
      bedType: 'Double Bed',
      maxGuests: 2,
      image: '/lovable-uploads/Classic_Room.png'
    },
    {
      id: 'premium',
      name: 'Premium Room',
      otaTitle: 'Premium Room with Enhanced Space & Comfort',
      size: '220 sq ft',
      occupancy: '2+1 Guests',
      price: '₹2,499',
      description: 'The Premium Room offers added space and enhanced comfort with refined interiors and thoughtful amenities. Ideal for guests who appreciate extra room to unwind, this category strikes the perfect balance between style and functionality.',
      bestFor: 'Leisure travellers, extended short stays, couples',
      highlights: ['Larger room size', 'Comfortable double bed', 'Modern interiors', 'Private bathroom', 'Air conditioning & free Wi‑Fi'],
      hasLivingArea: false,
      hasKitchenette: false,
      bedType: 'Double Bed',
      maxGuests: 3,
      image: '/lovable-uploads/Premium_Room.png'
    },
    {
      id: 'grand-suite',
      name: 'Skylight Grand Suite',
      otaTitle: 'Skylight Grand Suite with Living Area & Kitchenette',
      size: '550 sq ft',
      occupancy: '2+2 Guests',
      price: '₹3,999',
      description: 'The Skylight Grand Suite is a spacious one-bedroom suite featuring a separate living area and a private kitchenette. Designed for guests seeking a refined, home-like experience, the suite is ideal for longer stays, families, or travellers who value space and privacy.',
      bestFor: 'Extended stays, families, premium travellers',
      highlights: ['Separate bedroom & living room', 'Private kitchenette', 'Spacious layout', 'Ideal for extended stays', 'Air conditioning & free Wi‑Fi'],
      hasLivingArea: true,
      hasKitchenette: true,
      bedType: 'Double Bed',
      maxGuests: 4,
      image: '/lovable-uploads/87a8e661-e5dd-4095-a7ef-100c715b8e04.png'
    }
  ];

  const highlights = [
    { icon: <Star className="w-5 h-5" />, label: "3-Star Hotel", desc: "5-Star Experience" },
    { icon: <Plane className="w-5 h-5" />, label: "Near Airport", desc: "15 min from Jolly Grant" },
    { icon: <Navigation className="w-5 h-5" />, label: "Highway Access", desc: "Right on NH 72" },
    { icon: <Utensils className="w-5 h-5" />, label: "Food Plaza", desc: "15 hrs food access" },
  ];

  const amenitiesDetailed = [
    { icon: <Wifi className="w-5 h-5" />, name: "High-Speed WiFi", desc: "Free unlimited internet" },
    { icon: <Wind className="w-5 h-5" />, name: "Heavy Duty AC", desc: "Climate controlled rooms" },
    { icon: <Tv className="w-5 h-5" />, name: "Smart TV", desc: "Entertainment on demand" },
    { icon: <Bath className="w-5 h-5" />, name: "Modern Bathroom", desc: "Premium fixtures & hot water" },
    { icon: <Car className="w-5 h-5" />, name: "Secure Parking", desc: "Free covered parking" },
    { icon: <Mountain className="w-5 h-5" />, name: "Mountain View", desc: "Scenic terrace views" },
    { icon: <Shield className="w-5 h-5" />, name: "24/7 Security", desc: "Safe & secure premises" },
    { icon: <Utensils className="w-5 h-5" />, name: "Food Plaza Access", desc: "5 premium brands" },
  ];

  const tags = [
    "Great for Couples",
    "Ideal for Transit Stay",
    "Extended Stay Friendly",
    "Near Jolly Grant Dehradun Airport",
    "Close to Rishikesh & Haridwar"
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

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const result = skylightBookingSchema.safeParse(formData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      setValidationErrors(errors);
      return false;
    }
    setValidationErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookingRateLimiter('skylight-booking')) {
      toast({
        title: "Too Many Requests",
        description: "Please wait a few minutes before submitting another enquiry.",
        variant: "destructive",
      });
      return;
    }

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxfiGMGyqJIam0llwa8CYlFHJBXXwm8joPJrTAVBywwA5Y4YAuj7kFEBH9n-DGQTYny/exec';
      
      const sanitizedData = sanitizeFormData(formData);
      
      const submissionData = {
        ...sanitizedData,
        roomType: selectedRoomType,
        timestamp: new Date().toISOString(),
        type: 'Skylight Booking Enquiry'
      };

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(submissionData),
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: '',
        message: ''
      });
      setSelectedRoomType('');
      
      setShowSuccessDialog(true);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your enquiry. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookRoom = (roomName: string) => {
    setSelectedRoomType(roomName);
    document.getElementById('booking-enquiry')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <SkylightHeader />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-stone-900 via-stone-800 to-stone-700">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('/lovable-uploads/87a8e661-e5dd-4095-a7ef-100c715b8e04.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/70 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1 bg-amber-600/20 text-amber-300 px-4 py-2 rounded-full text-sm font-medium border border-amber-600/30">
                <Star className="w-4 h-4 fill-amber-300" />
                <Star className="w-4 h-4 fill-amber-300" />
                <Star className="w-4 h-4 fill-amber-300" />
                <span className="ml-2">Premium Hotel</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              <span className="text-amber-300">Skylight</span>
              <span className="block text-white/90">Suites</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-4 max-w-2xl">
              3-Star Comfort. 5-Star Experience.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-2xl">
              Premium highway hotel on the Dehradun-Haridwar Highway (NH 72), just 15 minutes from Jolly Grant Airport. 
              Experience refined hospitality with modern rooms, exceptional amenities, and direct access to our multi-brand food plaza.
            </p>

            {/* Location Tags */}
            <div className="flex flex-wrap gap-3 mb-10">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm border border-white/20">
                <MapPin className="w-4 h-4 text-amber-300" />
                NH 72, Majri Grant, Doiwala
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm border border-white/20">
                <Plane className="w-4 h-4 text-amber-300" />
                15 min from Jolly Grant Airport
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Button 
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold text-lg px-10 py-6"
                onClick={() => document.getElementById('booking-enquiry')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Book Direct & Save
              </Button>
              <SecureExternalLink href="https://www.airbnb.co.in/rooms/1389016749522622097">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-amber-300/50 text-amber-200 bg-amber-900/30 hover:bg-amber-800/50 text-lg px-6"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Read Reviews on Airbnb
                </Button>
              </SecureExternalLink>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-amber-300 rounded-full" />
          </div>
        </div>
      </section>

      {/* Quick Highlights */}
      <section className="py-8 bg-stone-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <div key={index} className="flex items-center gap-4 text-white">
                <div className="flex items-center justify-center w-12 h-12 bg-amber-500/20 rounded-xl text-amber-300">
                  {item.icon}
                </div>
                <div>
                  <div className="font-bold">{item.label}</div>
                  <div className="text-sm text-white/80">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-stone-100 text-stone-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Bed className="w-4 h-4" />
              Our Rooms
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your <span className="text-stone-600">Perfect Stay</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From comfortable classic rooms for transit travellers to spacious suites for extended stays - 
              we have the perfect accommodation for every guest.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <Card key={room.id} className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={room.image} 
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-stone-700 text-white px-4 py-2 rounded-full font-bold text-lg">
                    {room.price}<span className="text-sm font-normal">/night</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{room.name}</h3>
                  <p className="text-sm text-stone-600 font-medium mb-4">{room.otaTitle}</p>
                  
                  <div className="flex items-center gap-4 mb-4 text-gray-600 text-sm">
                    <div className="flex items-center gap-1">
                      <Maximize className="w-4 h-4" />
                      {room.size}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {room.occupancy}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{room.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.highlights.slice(0, 3).map((highlight, idx) => (
                      <span key={idx} className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded">
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="text-sm text-gray-500 mb-4">
                    <span className="font-medium text-gray-700">Best for: </span>{room.bestFor}
                  </div>

                  <Button 
                    className="w-full bg-stone-700 hover:bg-stone-800 text-white font-semibold"
                    onClick={() => handleBookRoom(room.name)}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Room Comparison Table */}
          <div className="mt-16 bg-stone-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Room Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-700">Classic Room</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-700">Premium Room</th>
                    <th className="text-center py-4 px-4 font-semibold text-stone-700">Skylight Grand Suite</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 text-gray-600">Room Size</td>
                    <td className="py-4 px-4 text-center">180 sq ft</td>
                    <td className="py-4 px-4 text-center">220 sq ft</td>
                    <td className="py-4 px-4 text-center font-medium text-stone-700">550 sq ft</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-stone-50/50">
                    <td className="py-4 px-4 text-gray-600">Bed Type</td>
                    <td className="py-4 px-4 text-center">Double Bed</td>
                    <td className="py-4 px-4 text-center">Double Bed</td>
                    <td className="py-4 px-4 text-center">Double Bed</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 text-gray-600">Private Bath</td>
                    <td className="py-4 px-4 text-center text-green-600">✓</td>
                    <td className="py-4 px-4 text-center text-green-600">✓</td>
                    <td className="py-4 px-4 text-center text-green-600">✓</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-stone-50/50">
                    <td className="py-4 px-4 text-gray-600">Living Area</td>
                    <td className="py-4 px-4 text-center text-gray-400">—</td>
                    <td className="py-4 px-4 text-center text-gray-400">—</td>
                    <td className="py-4 px-4 text-center text-green-600">✓</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 text-gray-600">Kitchenette</td>
                    <td className="py-4 px-4 text-center text-gray-400">—</td>
                    <td className="py-4 px-4 text-center text-gray-400">—</td>
                    <td className="py-4 px-4 text-center text-green-600">✓</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-stone-50/50">
                    <td className="py-4 px-4 text-gray-600">Ideal For</td>
                    <td className="py-4 px-4 text-center text-sm">Short stays</td>
                    <td className="py-4 px-4 text-center text-sm">Comfort stays</td>
                    <td className="py-4 px-4 text-center text-sm font-medium text-stone-700">Extended stays</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-600">Max Guests</td>
                    <td className="py-4 px-4 text-center">2</td>
                    <td className="py-4 px-4 text-center">3</td>
                    <td className="py-4 px-4 text-center font-medium text-stone-700">4</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {tags.map((tag, index) => (
              <span key={index} className="bg-stone-100 text-stone-700 px-4 py-2 rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-20 bg-gradient-to-br from-stone-50 to-stone-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-stone-200 text-stone-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Premium Amenities
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You <span className="text-stone-600">Need</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              All rooms come equipped with modern amenities to make your stay comfortable and memorable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {amenitiesDetailed.map((amenity, index) => (
              <Card key={index} className="bg-white hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center w-14 h-14 bg-stone-100 rounded-2xl mb-4 mx-auto text-stone-600">
                    {amenity.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{amenity.name}</h3>
                  <p className="text-sm text-gray-600">{amenity.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-stone-100 text-stone-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Photo Gallery
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Take a <span className="text-stone-600">Virtual Tour</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our beautifully designed rooms and common areas
            </p>
          </div>
          
          <div className="relative px-12">
            <Carousel className="w-full">
              <CarouselContent>
                {galleryImages.map((image, index) => (
                  <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                    <Card className="overflow-hidden group cursor-pointer rounded-xl border-0 shadow-lg" onClick={() => handleImageClick(index)}>
                      <div className="relative">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                          <Expand className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                      <CardContent className="p-4 bg-white">
                        <p className="text-sm text-gray-600 truncate font-medium">{image.alt}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-white hover:bg-stone-50 border-stone-200 text-stone-600 hover:text-stone-700 shadow-lg" />
              <CarouselNext className="bg-white hover:bg-stone-50 border-stone-200 text-stone-600 hover:text-stone-700 shadow-lg" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-20 bg-stone-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <MapPin className="w-4 h-4" />
                Prime Location
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Strategically Located on <span className="text-amber-300">NH 72</span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Skylight Suites is perfectly positioned on the Dehradun-Haridwar Highway, making it an ideal 
                stopover for travelers. Our location offers easy access to major destinations while 
                providing a peaceful retreat from the journey.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-amber-500/20 rounded-xl flex-shrink-0">
                    <Plane className="w-6 h-6 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Jolly Grant Airport</h3>
                    <p className="text-gray-400">Just 15 minutes drive - perfect for early flights or late arrivals</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-amber-500/20 rounded-xl flex-shrink-0">
                    <MapPin className="w-6 h-6 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Gateway to Uttarakhand</h3>
                    <p className="text-gray-400">En route to Mussoorie, Rishikesh, Haridwar & the Himalayas</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-amber-500/20 rounded-xl flex-shrink-0">
                    <Car className="w-6 h-6 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Easy Highway Access</h3>
                    <p className="text-gray-400">Direct access from NH 72 with ample secure parking</p>
                  </div>
                </div>
              </div>

              <SecureExternalLink href="https://maps.app.goo.gl/rTw9h2WEYNhr7G2e7">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-stone-900 font-semibold">
                  <MapPin className="w-5 h-5 mr-2" />
                  Get Directions
                </Button>
              </SecureExternalLink>
            </div>

            <div className="bg-stone-700 rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-6 text-amber-300">Distance from Skylight Suites</h3>
              <div className="space-y-4">
                {[
                  { place: "Jolly Grant Airport", distance: "12 km", time: "15 min" },
                  { place: "Dehradun City Center", distance: "18 km", time: "25 min" },
                  { place: "Rishikesh", distance: "28 km", time: "35 min" },
                  { place: "Haridwar", distance: "42 km", time: "50 min" },
                  { place: "Mussoorie", distance: "50 km", time: "1.5 hrs" },
                  { place: "Doiwala Railway Station", distance: "3 km", time: "5 min" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-stone-600 last:border-0">
                    <span className="text-gray-300">{item.place}</span>
                    <div className="text-right">
                      <span className="text-white font-semibold">{item.distance}</span>
                      <span className="text-gray-500 text-sm ml-2">({item.time})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Food Plaza Access */}
      <section className="py-20 bg-gradient-to-br from-stone-600 to-stone-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Utensils className="w-4 h-4" />
                Exclusive Benefit
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                15 Hours Access to Premium Food Plaza
              </h2>
              <p className="text-xl text-white/90 leading-relaxed mb-8">
                As a Skylight guest, enjoy direct access to Culinary Central 72 - our multi-brand 
                food plaza featuring 5 premium food brands. From breakfast to late-night snacks, 
                you're covered.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {["Burger Singh", "Chicago Pizza", "Baskin Robbins", "Waffle Station", "The Nukkad Tapri"].map((brand, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3">
                    <div className="w-2 h-2 bg-amber-300 rounded-full" />
                    <span>{brand}</span>
                  </div>
                ))}
              </div>

              <Link to="/#brands">
                <Button size="lg" className="bg-white text-stone-700 hover:bg-gray-100 font-semibold">
                  Explore Food Brands
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="text-center mb-8">
                  <Clock className="w-16 h-16 mx-auto mb-4 text-white/80" />
                  <h3 className="text-3xl font-bold mb-2">Food Plaza Hours</h3>
                  <p className="text-white/80">9:00 AM - 12:00 AM Daily</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-white/20">
                    <span>Breakfast</span>
                    <span className="font-semibold">9:00 AM onwards</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-white/20">
                    <span>Lunch</span>
                    <span className="font-semibold">12:00 PM - 3:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-white/20">
                    <span>Dinner</span>
                    <span className="font-semibold">7:00 PM - 11:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span>Late Night</span>
                    <span className="font-semibold">Until 12:00 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Enquiry Section */}
      <section id="booking-enquiry" className="py-20 bg-gradient-to-br from-stone-50 to-stone-100">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-stone-700 text-white px-6 py-2 rounded-full text-sm font-bold mb-4">
                Book Direct & Save
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Reserve Your <span className="text-stone-600">Room</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Book directly with us for the best rates. We'll confirm your booking within 24 hours.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8">
              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-gradient-to-br from-stone-800 to-stone-700 text-white border-0 shadow-xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6">Contact Us Directly</h3>
                    
                    <div className="space-y-6">
                      <a href="tel:+919997731372" className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                        <div className="flex items-center justify-center w-12 h-12 bg-amber-500/80 rounded-xl">
                          <Phone className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Call us</div>
                          <div className="font-semibold">+91 9997731372</div>
                        </div>
                      </a>
                      
                      <a href="mailto:culinarycentral72@gmail.com" className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                        <div className="flex items-center justify-center w-12 h-12 bg-amber-500/80 rounded-xl">
                          <Mail className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Email us</div>
                          <div className="font-semibold text-sm">culinarycentral72@gmail.com</div>
                        </div>
                      </a>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/20">
                      <p className="text-sm text-gray-400 mb-4 text-center">Also available on</p>
                      <SecureExternalLink href="https://www.airbnb.co.in/rooms/1389016749522622097">
                        <Button 
                          variant="outline"
                          className="w-full border-amber-300/50 text-amber-200 bg-amber-900/30 hover:bg-amber-800/50"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View on Airbnb (Read Reviews)
                        </Button>
                      </SecureExternalLink>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-xl">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Room Rates (per night)</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Classic Room</span>
                        <span className="font-bold text-gray-900">₹1,999</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Premium Room</span>
                        <span className="font-bold text-gray-900">₹2,499</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Grand Suite</span>
                        <span className="font-bold text-stone-700">₹3,999</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-4">
                      * Prices may vary based on season and availability
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Booking Form */}
              <Card className="lg:col-span-3 shadow-2xl rounded-2xl overflow-hidden border-0">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Room Type Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Bed className="w-4 h-4 inline mr-2" />
                        Room Type *
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {rooms.map((room) => (
                          <button
                            key={room.id}
                            type="button"
                            onClick={() => setSelectedRoomType(room.name)}
                            className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                              selectedRoomType === room.name
                                ? 'border-stone-600 bg-stone-50 text-stone-700'
                                : 'border-gray-200 hover:border-stone-400'
                            }`}
                          >
                            {room.name.replace('Skylight ', '')}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <User className="w-4 h-4 inline mr-2" />
                          Full Name *
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          className={validationErrors.name ? 'border-red-500' : ''}
                        />
                        {validationErrors.name && (
                          <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email Address *
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          className={validationErrors.email ? 'border-red-500' : ''}
                        />
                        {validationErrors.email && (
                          <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Phone className="w-4 h-4 inline mr-2" />
                          Phone Number *
                        </label>
                        <Input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 XXXXX XXXXX"
                          className={validationErrors.phone ? 'border-red-500' : ''}
                        />
                        {validationErrors.phone && (
                          <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Users className="w-4 h-4 inline mr-2" />
                          Number of Guests *
                        </label>
                        <Input
                          name="guests"
                          type="number"
                          min="1"
                          max="4"
                          value={formData.guests}
                          onChange={handleInputChange}
                          placeholder="1-4 guests"
                          className={validationErrors.guests ? 'border-red-500' : ''}
                        />
                        {validationErrors.guests && (
                          <p className="text-red-500 text-sm mt-1">{validationErrors.guests}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="w-4 h-4 inline mr-2" />
                          Check-in Date *
                        </label>
                        <Input
                          name="checkIn"
                          type="date"
                          value={formData.checkIn}
                          onChange={handleInputChange}
                          className={validationErrors.checkIn ? 'border-red-500' : ''}
                        />
                        {validationErrors.checkIn && (
                          <p className="text-red-500 text-sm mt-1">{validationErrors.checkIn}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="w-4 h-4 inline mr-2" />
                          Check-out Date *
                        </label>
                        <Input
                          name="checkOut"
                          type="date"
                          value={formData.checkOut}
                          onChange={handleInputChange}
                          className={validationErrors.checkOut ? 'border-red-500' : ''}
                        />
                        {validationErrors.checkOut && (
                          <p className="text-red-500 text-sm mt-1">{validationErrors.checkOut}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requests (Optional)
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Any special requirements or questions?"
                        rows={3}
                        className={validationErrors.message ? 'border-red-500' : ''}
                      />
                      {validationErrors.message && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.message}</p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-stone-700 hover:bg-stone-800 text-white py-6 text-lg font-bold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Booking Request'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={galleryImages}
        initialIndex={selectedImageIndex}
      />

      <SubmissionSuccessDialog 
        isOpen={showSuccessDialog} 
        onClose={() => setShowSuccessDialog(false)}
        title="Booking Request Received!"
        message="Thank you for choosing Skylight Suites. We'll review your request and confirm your booking within 24 hours."
      />
    </div>
  );
};

export default Skylight;
