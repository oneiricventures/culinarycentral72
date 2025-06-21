
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const BrandsSection = () => {
  const brands = [
    {
      name: "Burger Singh",
      tagline: "Indian Fusion Burgers",
      description: "Gourmet burgers with authentic Indian spices and flavors",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&q=80",
      color: "from-red-500 to-orange-500",
      specialty: "Paneer Tikka Burger"
    },
    {
      name: "Chicago Pizza",
      tagline: "Customizable Slices",
      description: "Fresh, made-to-order pizzas with premium toppings",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80",
      color: "from-yellow-500 to-red-500",
      specialty: "Butter Chicken Pizza"
    },
    {
      name: "Baskin Robbins",
      tagline: "Premium Ice Cream",
      description: "31 flavors of happiness, perfect for highway treats",
      image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?auto=format&fit=crop&w=400&q=80",
      color: "from-pink-500 to-purple-500",
      specialty: "Kulfi Fusion"
    },
    {
      name: "Waggle Station",
      tagline: "Waffles & Beverages",
      description: "Crispy waffles, fresh juices, and artisan coffee",
      image: "https://images.unsplash.com/photo-1562376552-0d160147709b?auto=format&fit=crop&w=400&q=80",
      color: "from-amber-500 to-orange-500",
      specialty: "Belgian Waffles"
    },
    {
      name: "The Nukkad Tapri",
      tagline: "Chai & Desi Snacks",
      description: "Authentic chai, maggi, and street-style snacks",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=400&q=80",
      color: "from-green-500 to-teal-500",
      specialty: "Masala Chai & Pakoras"
    }
  ];

  return (
    <section id="brands" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            5 Premium Brands Under One Roof
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Culinary Universe
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From fusion burgers to traditional chai, we've curated the perfect mix of 
            global cuisine and authentic Indian flavors for every craving.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {brands.map((brand, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50">
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${brand.color} opacity-90`}></div>
                <img 
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <h3 className="text-lg font-bold text-gray-900">{brand.name}</h3>
                    <p className="text-sm text-orange-600 font-medium">{brand.tagline}</p>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">{brand.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500">Specialty</div>
                    <div className="text-sm font-medium text-gray-900">{brand.specialty}</div>
                  </div>
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                    View Menu
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Lease Space Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-dashed border-orange-300 bg-gradient-to-br from-orange-50 to-yellow-50">
            <CardContent className="p-8 text-center h-full flex flex-col justify-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏪</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Your Brand Here</h3>
              <p className="text-gray-600 mb-6">Prime highway location with high footfall. Perfect for food brands looking to expand.</p>
              <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                Lease Space
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Multi-Brand Ordering</h3>
            <p className="mb-6 opacity-90">Order from multiple brands in a single cart. Mix and match your favorites!</p>
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              Start Ordering
            </Button>
          </div>
          
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Reserve Your Table</h3>
            <p className="mb-6 opacity-90">Guarantee your spot during peak hours. Choose your preferred brand area.</p>
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              Book Table
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
