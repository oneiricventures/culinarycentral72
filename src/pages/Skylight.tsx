
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MapPin, User, Clock, Expand, Shield, Car, Utensils, ArrowLeft, Phone, Mail, Calendar, Users, Loader2 } from 'lucide-react';
import ImageModal from '@/components/ImageModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SubmissionSuccessDialog from '@/components/SubmissionSuccessDialog';
import { useToast } from '@/hooks/use-toast';
import { skylightBookingSchema, SkylightBookingFormData, sanitizeFormData, createRateLimiter } from '@/utils/validation';

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
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium">
                  🏨 Premium Accommodation
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  <span className="text-amber-600">Skylight</span>
                  <span className="block">Premium Suite</span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Your home away from home. A beautifully furnished 1BHK suite right above 
                  our food plaza - perfect for travelers seeking comfort, privacy, and 15hrs access to great food.
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center w-14 h-14 bg-amber-100 rounded-xl mb-3 mx-auto">
                    <User className="w-7 h-7 text-amber-600" />
                  </div>
                  <div className="text-xl font-bold text-gray-900">1BHK</div>
                  <div className="text-sm text-gray-600">Family Suite</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-14 h-14 bg-amber-100 rounded-xl mb-3 mx-auto">
                    <Clock className="w-7 h-7 text-amber-600" />
                  </div>
                  <div className="text-xl font-bold text-gray-900">15hrs</div>
                  <div className="text-sm text-gray-600">Food Access</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-14 h-14 bg-amber-100 rounded-xl mb-3 mx-auto">
                    <MapPin className="w-7 h-7 text-amber-600" />
                  </div>
                  <div className="text-xl font-bold text-gray-900">Prime</div>
                  <div className="text-sm text-gray-600">Location</div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Premium Amenities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-600 bg-white/60 rounded-lg px-4 py-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highway Travellers Module */}
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <Car className="w-7 h-7" />
                  Perfect for Highway Travellers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3">
                    <Shield className="w-5 h-5" />
                    <span>Safe & Secure</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3">
                    <Utensils className="w-5 h-5" />
                    <span>Food Access</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3">
                    <MapPin className="w-5 h-5" />
                    <span>Highway Location</span>
                  </div>
                </div>
                <p className="mb-6 opacity-90 leading-relaxed">
                  Strategically located on NH 72 for easy access. Clean, comfortable accommodation 
                  with direct access to premium food options. Perfect for overnight stays during long journeys.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">₹2,499</div>
                    <div className="text-sm opacity-75">per night</div>
                  </div>
                  <Button 
                    className="bg-white text-amber-600 hover:bg-gray-100 text-lg px-6 py-3"
                    onClick={handleAirbnbClick}
                  >
                    Book on Airbnb
                  </Button>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="space-y-6">
              <Card className="overflow-hidden shadow-2xl rounded-2xl">
                <img 
                  src="/lovable-uploads/87a8e661-e5dd-4095-a7ef-100c715b8e04.png"
                  alt="Skylight Suite Living Room"
                  className="w-full h-80 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Spacious Living Area</h3>
                  <p className="text-gray-600">Comfortable seating with mountain views and modern amenities.</p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card className="overflow-hidden rounded-xl">
                  <img 
                    src="/lovable-uploads/3611bea2-215b-4b8c-aa04-d0e84291b5de.png"
                    alt="Skylight Suite Bedroom"
                    className="w-full h-40 object-cover"
                  />
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-gray-900">Premium Bedroom</h4>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden rounded-xl">
                  <img 
                    src="/lovable-uploads/e0b5fc35-2499-4cd1-bfa1-34220b54622d.png"
                    alt="Skylight Suite Kitchen"
                    className="w-full h-40 object-cover"
                  />
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-gray-900">Working Kitchen</h4>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Suite Gallery</h2>
          <div className="relative px-12">
            <Carousel className="w-full">
              <CarouselContent>
                {galleryImages.map((image, index) => (
                  <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                    <Card className="overflow-hidden group cursor-pointer rounded-xl" onClick={() => handleImageClick(index)}>
                      <div className="relative">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <Expand className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <p className="text-sm text-gray-600 truncate">{image.alt}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-white/90 hover:bg-white border-amber-200 text-amber-600 hover:text-amber-700 shadow-lg" />
              <CarouselNext className="bg-white/90 hover:bg-white border-amber-200 text-amber-600 hover:text-amber-700 shadow-lg" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Booking Enquiry Section */}
      <section id="booking-enquiry" className="py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                📞 Direct Booking
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Book Your <span className="text-amber-600">Stay</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Fill out the form below and we'll get back to you within 24 hours to confirm your booking.
              </p>
            </div>

            <Card className="shadow-2xl rounded-2xl overflow-hidden">
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
                        placeholder="+91 9876543210"
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
                        type="text"
                        value={formData.guests}
                        onChange={handleInputChange}
                        placeholder="e.g., 2 adults, 1 child"
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
                        min={new Date().toISOString().split('T')[0]}
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
                        min={formData.checkIn || new Date().toISOString().split('T')[0]}
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
                      placeholder="Any special requests or requirements..."
                      rows={4}
                      className={validationErrors.message ? 'border-red-500' : ''}
                    />
                    {validationErrors.message && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white text-lg py-6"
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

                  <p className="text-center text-sm text-gray-500">
                    Or book instantly via{' '}
                    <button 
                      type="button"
                      onClick={handleAirbnbClick}
                      className="text-amber-600 hover:text-amber-700 font-medium underline"
                    >
                      Airbnb
                    </button>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={galleryImages}
        initialIndex={selectedImageIndex}
      />

      <SubmissionSuccessDialog 
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
      />

      <Footer />
    </div>
  );
};

export default Skylight;
