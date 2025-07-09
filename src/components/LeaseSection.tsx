import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Users, MapPin, Clock, TrendingUp, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SubmissionSuccessDialog from './SubmissionSuccessDialog';

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.businessType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields marked with *",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    console.log('Submitting lease inquiry:', formData);

    try {
      // You'll need to replace this URL with your Google Apps Script web app URL
      // Instructions: 
      // 1. Go to https://script.google.com/
      // 2. Create a new project
      // 3. Replace the default code with the doPost function (see comment below)
      // 4. Deploy as web app with execute permissions for "Anyone"
      // 5. Copy the web app URL here
      const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
      
      const submissionData = {
        ...formData,
        timestamp: new Date().toISOString(),
        type: 'Lease Inquiry'
      };

      // For now, we'll simulate the submission since you need to set up the Google Apps Script
      // Uncomment the fetch code below once you have the Google Apps Script set up
      
      /*
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(submissionData),
      });
      */

      // Simulate successful submission for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
    <section id="lease" className="py-16 md:py-24 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            🏪 Business Opportunity
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Lease Premium Space at
            <span className="block text-purple-600">Culinary Central 72</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join India's premier highway food plaza. Benefit from high footfall, 
            proven business model, and strategic location advantage.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full mb-4 mx-auto">
                  <stat.icon className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-lg font-medium text-gray-900 mb-2">{stat.label}</div>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Advantages */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Partner with CC72?</h3>
              <div className="space-y-4">
                {advantages.map((advantage, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Info */}
            <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Prime Location Benefits</h3>
                <div className="space-y-3">
                  <div>
                    <div className="font-medium">Strategic Highway Position</div>
                    <div className="text-sm opacity-90">NH 72 Dehradun-Haridwar Highway</div>
                  </div>
                  <div>
                    <div className="font-medium">High Visibility</div>
                    <div className="text-sm opacity-90">Visible from 13km distance</div>
                  </div>
                  <div>
                    <div className="font-medium">Proven Footfall</div>
                    <div className="text-sm opacity-90">500+ daily visitors</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Inquiry Form */}
          <Card className="bg-white shadow-2xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
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
                    />
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
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 9997731372"
                      required
                      disabled={isSubmitting}
                    />
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
                    />
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
                  />
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
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
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

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600 text-center">
                  <p className="mb-2">Or reach out directly:</p>
                  <p className="font-medium text-gray-900">📞 +91 9997731372</p>
                  <p className="font-medium text-gray-900">📧 culinarycentral72@gmail.com</p>
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
