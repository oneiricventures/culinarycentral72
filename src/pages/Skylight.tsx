
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { 
  MapPin, User, Clock, Expand, Shield, Car, Utensils, ArrowLeft, Phone, Mail, Calendar, 
  Users, Loader2, Wifi, Wind, Tv, Coffee, Bath, Mountain, Star, Plane, Navigation,
  CheckCircle2, Building2
} from 'lucide-react';
import ImageModal from '@/components/ImageModal';
import Header from '@/components/Header';
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

  const highlights = [
    { icon: <Star className="w-5 h-5" />, label: "3-Star Comfort", desc: "Premium quality stay" },
    { icon: <Plane className="w-5 h-5" />, label: "Near Airport", desc: "15 min from Jolly Grant" },
    { icon: <Navigation className="w-5 h-5" />, label: "Highway Access", desc: "Right on NH 72" },
    { icon: <Utensils className="w-5 h-5" />, label: "Food Plaza", desc: "15 hrs food access" },
  ];

  const amenitiesDetailed = [
    { icon: <Wifi className="w-5 h-5" />, name: "High-Speed WiFi", desc: "Free unlimited internet" },
    { icon: <Wind className="w-5 h-5" />, name: "Heavy Duty AC", desc: "Climate controlled rooms" },
    { icon: <Tv className="w-5 h-5" />, name: "Smart TV", desc: "Entertainment on demand" },
    { icon: <Coffee className="w-5 h-5" />, name: "Kitchenette", desc: "Basic cooking appliances" },
    { icon: <Bath className="w-5 h-5" />, name: "Modern Bathroom", desc: "Premium fixtures & hot water" },
    { icon: <Car className="w-5 h-5" />, name: "Secure Parking", desc: "Free covered parking" },
    { icon: <Mountain className="w-5 h-5" />, name: "Mountain View", desc: "Scenic terrace views" },
    { icon: <Shield className="w-5 h-5" />, name: "24/7 Security", desc: "Safe & secure premises" },
  ];

  const whyChooseUs = [
    "Fully furnished 1BHK suite with premium bedding & linens",
    "Strategic location on Dehradun-Haridwar Highway (NH 72)",
    "Just 15 minutes from Jolly Grant Airport, Dehradun",
    "15 hours access to 5 premium food brands in-house",
    "Perfect stopover for travelers heading to Mussoorie, Rishikesh & Haridwar",
    "Mountain view rooftop terrace for relaxation",
    "Ideal for families, couples & business travelers",
    "Affordable luxury at competitive rates"
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

  const handleAirbnbClick = () => {
    window.open('https://www.airbnb.co.in/rooms/1389016749522622097?check_in=2025-07-15&check_out=2025-07-17&guests=2&adults=2&s=67&unique_share_id=340567d8-4842-46ce-8670-bab1be651367', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('/lovable-uploads/87a8e661-e5dd-4095-a7ef-100c715b8e04.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Culinary Central 72
          </Link>
          
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full text-sm font-medium border border-amber-500/30">
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="ml-2">Premium Suite</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              <span className="text-amber-400">Skylight</span>
              <span className="block text-white/90">Premium Suite</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
              Experience 3-star comfort on the Dehradun-Haridwar Highway. A luxurious 1BHK suite 
              at Culinary Central 72, just 15 minutes from Jolly Grant Airport.
            </p>

            {/* Location Tags */}
            <div className="flex flex-wrap gap-3 mb-10">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm border border-white/20">
                <MapPin className="w-4 h-4 text-amber-400" />
                NH 72, Majri Grant, Doiwala
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm border border-white/20">
                <Plane className="w-4 h-4 text-amber-400" />
                15 min from Jolly Grant Airport
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm border border-white/20">
                <Building2 className="w-4 h-4 text-amber-400" />
                Above Culinary Central 72 Food Plaza
              </div>
            </div>

            {/* Price & CTAs */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="text-white">
                <div className="text-4xl font-bold text-amber-400">₹2,499</div>
                <div className="text-gray-400">per night</div>
              </div>
              <div className="flex gap-4">
                <Button 
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-8"
                  onClick={() => document.getElementById('booking-enquiry')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Book Now
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 text-lg px-8"
                  onClick={handleAirbnbClick}
                >
                  View on Airbnb
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-amber-400 rounded-full" />
          </div>
        </div>
      </section>

      {/* Quick Highlights */}
      <section className="py-8 bg-amber-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <div key={index} className="flex items-center gap-4 text-white">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
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

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                About Skylight Suite
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Your Perfect <span className="text-amber-600">Highway Retreat</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Skylight is a premium 1BHK family suite located above Culinary Central 72, a multi-brand 
                food plaza on the Dehradun-Haridwar Highway (NH 72). Designed for travelers seeking 
                comfort without compromise, our suite offers the perfect blend of convenience and luxury.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Whether you're on a road trip to Mussoorie, visiting the holy cities of Rishikesh and 
                Haridwar, or need a comfortable stay near Jolly Grant Airport - Skylight provides an 
                oasis of calm with easy highway access and direct entry to our food plaza featuring 
                5 premium food brands.
              </p>

              {/* Why Choose Us */}
              <div className="space-y-3">
                {whyChooseUs.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src="/lovable-uploads/87a8e661-e5dd-4095-a7ef-100c715b8e04.png"
                  alt="Skylight Living Room"
                  className="w-full h-64 object-cover rounded-2xl shadow-lg"
                />
                <img 
                  src="/lovable-uploads/a3a7906d-a429-4239-9f6d-82741c364afe.png"
                  alt="Skylight Kitchen"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img 
                  src="/lovable-uploads/0235182c-5032-4e24-a894-aa5a0feb3247.png"
                  alt="Skylight Bedroom"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg"
                />
                <img 
                  src="/lovable-uploads/225f9cc7-87ab-4ab7-861d-c31696443978.png"
                  alt="Skylight Terrace"
                  className="w-full h-64 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Premium Amenities
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You <span className="text-amber-600">Need</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our suite comes fully equipped with modern amenities to make your stay comfortable and memorable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {amenitiesDetailed.map((amenity, index) => (
              <Card key={index} className="bg-white hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center w-14 h-14 bg-amber-100 rounded-2xl mb-4 mx-auto text-amber-600">
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

      {/* Location Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <MapPin className="w-4 h-4" />
                Prime Location
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Strategically Located on <span className="text-amber-400">NH 72</span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Skylight is perfectly positioned on the Dehradun-Haridwar Highway, making it an ideal 
                stopover for travelers. Our location offers easy access to major destinations while 
                providing a peaceful retreat from the journey.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-amber-500/20 rounded-xl flex-shrink-0">
                    <Plane className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Jolly Grant Airport</h3>
                    <p className="text-gray-400">Just 15 minutes drive - perfect for early flights or late arrivals</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-amber-500/20 rounded-xl flex-shrink-0">
                    <MapPin className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Gateway to Uttarakhand</h3>
                    <p className="text-gray-400">En route to Mussoorie, Rishikesh, Haridwar & the Himalayas</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-amber-500/20 rounded-xl flex-shrink-0">
                    <Car className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Easy Highway Access</h3>
                    <p className="text-gray-400">Direct access from NH 72 with ample secure parking</p>
                  </div>
                </div>
              </div>

              <SecureExternalLink href="https://maps.app.goo.gl/rTw9h2WEYNhr7G2e7">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
                  <MapPin className="w-5 h-5 mr-2" />
                  Get Directions
                </Button>
              </SecureExternalLink>
            </div>

            <div className="bg-slate-800 rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-6 text-amber-400">Distance from Skylight</h3>
              <div className="space-y-4">
                {[
                  { place: "Jolly Grant Airport", distance: "12 km", time: "15 min" },
                  { place: "Dehradun City Center", distance: "18 km", time: "25 min" },
                  { place: "Rishikesh", distance: "28 km", time: "35 min" },
                  { place: "Haridwar", distance: "42 km", time: "50 min" },
                  { place: "Mussoorie", distance: "50 km", time: "1.5 hrs" },
                  { place: "Doiwala Railway Station", distance: "3 km", time: "5 min" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-slate-700 last:border-0">
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

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Suite Gallery
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Take a <span className="text-amber-600">Virtual Tour</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore every corner of our beautifully designed suite
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
              <CarouselPrevious className="bg-white hover:bg-amber-50 border-amber-200 text-amber-600 hover:text-amber-700 shadow-lg" />
              <CarouselNext className="bg-white hover:bg-amber-50 border-amber-200 text-amber-600 hover:text-amber-700 shadow-lg" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Food Plaza Access */}
      <section className="py-20 bg-gradient-to-br from-amber-500 to-orange-600 text-white">
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
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span>{brand}</span>
                  </div>
                ))}
              </div>

              <Link to="/#brands">
                <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100">
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
      <section id="booking-enquiry" className="py-20 bg-gradient-to-br from-slate-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                📞 Direct Booking
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Book Your <span className="text-amber-600">Stay</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Fill out the form below and we'll get back to you within 24 hours to confirm your booking. 
                You can also book instantly on Airbnb.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8">
              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 shadow-xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6">Contact Us Directly</h3>
                    
                    <div className="space-y-6">
                      <a href="tel:+919997731372" className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                        <div className="flex items-center justify-center w-12 h-12 bg-amber-500 rounded-xl">
                          <Phone className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Call us</div>
                          <div className="font-semibold">+91 9997731372</div>
                        </div>
                      </a>
                      
                      <a href="mailto:culinarycentral72@gmail.com" className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                        <div className="flex items-center justify-center w-12 h-12 bg-amber-500 rounded-xl">
                          <Mail className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Email us</div>
                          <div className="font-semibold text-sm">culinarycentral72@gmail.com</div>
                        </div>
                      </a>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/20">
                      <Button 
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white py-6 text-lg"
                        onClick={handleAirbnbClick}
                      >
                        Book Instantly on Airbnb
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl font-bold text-amber-600">₹2,499</div>
                      <div className="text-gray-600">per night</div>
                    </div>
                    <div className="text-sm text-gray-500">
                      * Prices may vary based on season and availability. Contact us for best rates.
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Booking Form */}
              <Card className="lg:col-span-3 shadow-2xl rounded-2xl overflow-hidden border-0">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
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
                        rows={4}
                        className={validationErrors.message ? 'border-red-500' : ''}
                      />
                      {validationErrors.message && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.message}</p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white py-6 text-lg font-semibold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Booking Enquiry'
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
        title="Booking Enquiry Received!"
        message="Thank you for your interest in Skylight Suite. We'll review your enquiry and get back to you within 24 hours to confirm availability and complete your booking."
      />
    </div>
  );
};

export default Skylight;
