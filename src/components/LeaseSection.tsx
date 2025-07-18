import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Users, MapPin, Clock, TrendingUp, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SubmissionSuccessDialog from './SubmissionSuccessDialog';
import { 
  leaseInquirySchema, 
  sanitizeFormData, 
  createRateLimiter, 
  type LeaseInquiryFormData 
} from '@/utils/validation';

// Create rate limiter: max 3 submissions per 5 minutes
const rateLimiter = createRateLimiter(3, 5 * 60 * 1000);

const LeaseSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    brandName: '',
    businessType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Daily Footfall",
      description: "High-traffic location with consistent customer flow"
    },
    {
      icon: MapPin,
      value: "13km",
      label: "Highway Visibility",
      description: "Visible from kilometers away on busy highway"
    },
    {
      icon: Clock,
      value: "9am-12am",
      label: "Operating Hours",
      description: "15-hour business opportunities daily"
    },
    {
      icon: TrendingUp,
      value: "₹50L+",
      label: "Monthly Revenue",
      description: "Proven revenue potential for established brands"
    }
  ];

  const advantages = [
    "Prime highway location with maximum visibility",
    "Established customer base of 500+ daily visitors",
    "Shared utilities and maintenance costs",
    "Security and operational support during business hours",
    "Proven business model and foot traffic",
    "Flexible lease terms and space configurations",
    "Marketing support and brand collaboration",
    "Easy highway access and ample parking"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: ''
      });
    }
  };

  const validateForm = (): boolean => {
    try {
      // Sanitize form data before validation
      const sanitizedData = sanitizeFormData(formData);
      leaseInquirySchema.parse(sanitizedData);
      setValidationErrors({});
      return true;
    } catch (error: any) {
      const errors: Record<string, string> = {};
      
      if (error.errors) {
        error.errors.forEach((err: any) => {
          if (err.path && err.path.length > 0) {
            errors[err.path[0]] = err.message;
          }
        });
      }
      
      setValidationErrors(errors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side rate limiting
    const userIdentifier = `${formData.email}-${Date.now()}`;
    if (!rateLimiter(userIdentifier)) {
      toast({
        title: "Too Many Attempts",
        description: "Please wait a few minutes before submitting another inquiry.",
        variant: "destructive",
      });
      return;
    }

    // Validate form
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    console.log('Submitting lease inquiry:', formData);

    try {
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxfiGMGyqJIam0llwa8CYlFHJBXXwm8joPJrTAVBywwA5Y4YAuj7kFEBH9n-DGQTYny/exec';
      
      // Sanitize data before submission
      const sanitizedData = sanitizeFormData(formData);
      
      const submissionData = {
        ...sanitizedData,
        timestamp: new Date().toISOString(),
        type: 'Lease Inquiry'
      };

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(submissionData),
      });
      
      console.log('Form submitted successfully');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        brandName: '',
        businessType: '',
        message: ''
      });
      
      // Show success dialog
      setShowSuccessDialog(true);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your inquiry. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="lease" className="py-8 md:py-16 lg:py-24 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium mb-4">
            🏪 Business Opportunity
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 px-2">
            Lease Premium Space at
            <span className="block text-purple-600">Culinary Central 72</span>
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Join India's premier highway food plaza. Benefit from high footfall, 
            proven business model, and strategic location advantage.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-3 md:p-6">
                <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full mb-2 md:mb-4 mx-auto">
                  <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
                </div>
                <div className="text-xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">{stat.value}</div>
                <div className="text-sm md:text-lg font-medium text-gray-900 mb-1 md:mb-2">{stat.label}</div>
                <p className="text-xs md:text-sm text-gray-600 hidden md:block">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-6 md:space-y-8">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Why Partner with CC72?</h3>
              <div className="space-y-3 md:space-y-4">
                {advantages.map((advantage, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-600 rounded-full"></div>
                    </div>
                    <span className="text-sm md:text-base text-gray-700">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white">
              <CardContent className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Prime Location Benefits</h3>
                <div className="space-y-2 md:space-y-3">
                  <div>
                    <div className="font-medium text-sm md:text-base">Strategic Highway Position</div>
                    <div className="text-xs md:text-sm opacity-90">NH 72 Dehradun-Haridwar Highway</div>
                  </div>
                  <div>
                    <div className="font-medium text-sm md:text-base">High Visibility</div>
                    <div className="text-xs md:text-sm opacity-90">Visible from 13km distance</div>
                  </div>
                  <div>
                    <div className="font-medium text-sm md:text-base">Proven Footfall</div>
                    <div className="text-xs md:text-sm opacity-90">500+ daily visitors</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Inquiry Form with Validation */}
          <Card className="bg-white shadow-2xl">
            <CardContent className="p-4 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Get in Touch</h3>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                      disabled={isSubmitting}
                      className={`text-sm md:text-base ${validationErrors.name ? 'border-red-500' : ''}`}
                    />
                    {validationErrors.name && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                      disabled={isSubmitting}
                      className={`text-sm md:text-base ${validationErrors.email ? 'border-red-500' : ''}`}
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 88026 89684"
                      required
                      disabled={isSubmitting}
                      className={`text-sm md:text-base ${validationErrors.phone ? 'border-red-500' : ''}`}
                    />
                    {validationErrors.phone && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brand Name
                    </label>
                    <Input
                      name="brandName"
                      value={formData.brandName}
                      onChange={handleInputChange}
                      placeholder="Your brand name"
                      disabled={isSubmitting}
                      className={`text-sm md:text-base ${validationErrors.brandName ? 'border-red-500' : ''}`}
                    />
                    {validationErrors.brandName && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.brandName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Type *
                  </label>
                  <Input
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    placeholder="e.g., Quick Service Restaurant, Cafe, Desserts"
                    required
                    disabled={isSubmitting}
                    className={`text-sm md:text-base ${validationErrors.businessType ? 'border-red-500' : ''}`}
                  />
                  {validationErrors.businessType && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.businessType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tell us about your requirements
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Space requirements, investment capacity, timeline, etc."
                    rows={4}
                    disabled={isSubmitting}
                    className={`text-sm md:text-base resize-none ${validationErrors.message ? 'border-red-500' : ''}`}
                  />
                  {validationErrors.message && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm md:text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Inquiry'
                  )}
                </Button>
              </form>

              <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600 text-center">
                  <p className="mb-2">Or reach out directly:</p>
                  <p className="font-medium text-gray-900 text-xs md:text-sm">📞 +91 88026 89684</p>
                  <p className="font-medium text-gray-900 text-xs md:text-sm">📧 culinarycentral72@gmail.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <SubmissionSuccessDialog 
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
      />
    </section>
  );
};

export default LeaseSection;
