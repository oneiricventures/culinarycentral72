
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Users, MapPin, Clock, TrendingUp } from 'lucide-react';

const LeaseSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    brandName: '',
    businessType: '',
    message: ''
  });

  const stats = [
    {
      icon: Users,
      value: "1000+",
      label: "Daily Footfall",
      description: "High-traffic location with consistent customer flow"
    },
    {
      icon: MapPin,
      value: "5km",
      label: "Highway Visibility",
      description: "Visible from kilometers away on busy highway"
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Operating Hours",
      description: "Round-the-clock business opportunities"
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
    "Established customer base of 1000+ daily visitors",
    "Shared utilities and maintenance costs",
    "24/7 security and operational support",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Lease inquiry submitted:', formData);
    // Handle form submission here
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

            {/* Success Stories */}
            <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Current Success Stories</h3>
                <div className="space-y-3">
                  <div>
                    <div className="font-medium">Burger Singh</div>
                    <div className="text-sm opacity-90">₹15L+ monthly revenue</div>
                  </div>
                  <div>
                    <div className="font-medium">Chicago Pizza</div>
                    <div className="text-sm opacity-90">₹12L+ monthly revenue</div>
                  </div>
                  <div>
                    <div className="font-medium">The Nukkad Tapri</div>
                    <div className="text-sm opacity-90">₹8L+ monthly revenue</div>
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
                      placeholder="+91 98765 43210"
                      required
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
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Submit Inquiry
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600 text-center">
                  <p className="mb-2">Or reach out directly:</p>
                  <p className="font-medium text-gray-900">📞 +91 98765 43210</p>
                  <p className="font-medium text-gray-900">📧 leasing@culinarycentral72.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LeaseSection;
