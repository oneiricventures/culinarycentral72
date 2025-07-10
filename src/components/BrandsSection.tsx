
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const BrandsSection = () => {
  const handleCall = () => {
    window.location.href = 'tel:+919997731372';
  };

  const handleLeaseSpaceClick = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLScq95yA_rpaVKRt4ADZGKKgrX3F2P-WtlY2dA4CBLIPWx8dKQ/viewform?usp=header', '_blank');
  };

  const brands = [
    {
      name: "Burger Singh",
      tagline: "Indian Fusion Burgers",
      description: "Gourmet burgers with authentic Indian spices and flavors",
      image: "/lovable-uploads/86473656-30e8-43f9-8348-d8bdd305fddb.png",
      color: "from-red-500 via-orange-500 to-yellow-500",
      hoverColor: "from-red-600 via-orange-600 to-yellow-600",
      specialty: "Paneer Tikka Burger",
      menuLink: "https://burgersingh.dotpe.in/store/192/delivery"
    },
    {
      name: "Chicago Pizza",
      tagline: "Customizable Slices",
      description: "Fresh, made-to-order pizzas with premium toppings",
      image: "/lovable-uploads/cc1a7d21-d1a5-409c-bf3b-28844aefe7cf.png",
      color: "from-yellow-500 via-red-500 to-pink-500",
      hoverColor: "from-yellow-600 via-red-600 to-pink-600",
      specialty: "Butter Chicken Pizza",
      menuLink: "https://maps.app.goo.gl/GBgfpwBLgxKzw3EZ7"
    },
    {
      name: "Baskin Robbins",
      tagline: "Premium Ice Cream",
      description: "31 flavors of happiness, perfect for highway treats",
      image: "/lovable-uploads/79937188-a345-4e6f-a91d-2947b1668a0a.png",
      color: "from-pink-500 via-purple-500 to-blue-500",
      hoverColor: "from-pink-600 via-purple-600 to-blue-600",
      specialty: "Kulfi Fusion",
      menuLink: "https://www.google.com/maps/place/Baskin+Robbins/@30.1413388,78.1533874,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipPwx739ftq16rR-D5Cpo7yw3fpb72VU5QBZqUe2!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fp%2FAF1QipPwx739ftq16rR-D5Cpo7yw3fpb72VU5QBZqUe2%3Dw195-h195-k-no!7i5400!8i5400!4m7!3m6!1s0x39093b120597d40f:0x1c05ada47338954e!8m2!3d30.1414354!4d78.1536677!10e9!16s%2Fg%2F11mcrs00ry?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D"
    },
    {
      name: "Waffle Station",
      tagline: "Waffles & Beverages",
      description: "Crispy waffles, fresh juices, and artisan coffee",
      image: "/lovable-uploads/2e37bec9-6bb5-477f-8b33-8828d5fd6be7.png",
      color: "from-amber-500 via-orange-500 to-red-500",
      hoverColor: "from-amber-600 via-orange-600 to-red-600",
      specialty: "Belgian Waffles",
      menuLink: "https://www.google.com/maps/place/%23Waffle+Station/@30.141414,78.1533527,3a,90.3y,90t/data=!3m8!1e2!3m6!1sAF1QipPc1TfU1osWM5Siw6zJUC1CFqAZ96HehciCoVU!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fp%2FAF1QipPc1TfU1osWM5Siw6zJUC1CFqAZ96HehciCoVU%3Dw195-h133-k-no!7i916!8i626!4m16!1m8!3m7!1s0x39093b120597d40f:0x1c05ada47338954e!2sBaskin+Robbins!8m2!3d30.1414354!4d78.1536677!10e9!16s%2Fg%2F11mcrs00ry!3m6!1s0x39093b467f20c1e7:0x7b4891f91e39b07c!8m2!3d30.1414895!4d78.1535717!10e9!16s%2Fg%2F11x6fk264m?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D"
    },
    {
      name: "The Nukkad Tapri",
      tagline: "Chai & Desi Snacks",
      description: "Authentic chai, maggi, and street-style snacks",
      image: "/lovable-uploads/02b367e1-12f4-47ff-a41a-133b8584798b.png",
      color: "from-green-500 via-teal-500 to-blue-500",
      hoverColor: "from-green-600 via-teal-600 to-blue-600",
      specialty: "Masala Chai & Pakoras"
      // No menuLink for this brand
    }
  ];

  return (
    <section id="brands" className="py-16 md:py-24 bg-gradient-to-br from-white via-orange-50/30 to-yellow-50/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg border border-orange-200/50">
            🍽️ 5 Premium Brands Under One Roof
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent">Culinary Universe</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From fusion burgers to traditional chai, we've curated the perfect mix of 
            global cuisine and authentic Indian flavors for every craving.
          </p>
        </div>

        {/* Enhanced Brands Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {brands.map((brand, index) => (
            <Card key={index} className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden border-0 bg-white/80 backdrop-blur-sm">
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${brand.color} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}></div>
                <img 
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/50">
                    <h3 className="text-lg font-bold text-gray-900">{brand.name}</h3>
                    <p className="text-sm text-orange-600 font-medium">{brand.tagline}</p>
                  </div>
                </div>
                {/* Floating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-800 shadow-lg">
                  ⭐ Popular
                </div>
              </div>
              
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">{brand.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500">Specialty</div>
                    <div className="text-sm font-medium text-gray-900">{brand.specialty}</div>
                  </div>
                  {brand.menuLink && (
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      onClick={() => window.open(brand.menuLink, '_blank')}
                    >
                      View Menu
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Enhanced Lease Space Card */}
          <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden border-2 border-dashed border-orange-300 bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-yellow-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardContent className="p-8 text-center h-full flex flex-col justify-center relative">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🏪</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Your Brand Here</h3>
              <p className="text-gray-600 mb-6">Prime highway location with high footfall. Perfect for food brands looking to expand.</p>
              <Button 
                variant="outline" 
                className="border-2 border-orange-500 text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={handleLeaseSpaceClick}
              >
                Lease Space
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-2xl p-8 text-white shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <h3 className="text-2xl font-bold mb-4 relative">Multi-Brand Ordering</h3>
            <p className="mb-6 opacity-90 relative">Order from multiple brands in a single cart. Mix and match your favorites!</p>
            <Button 
              size="lg" 
              className="bg-white text-orange-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative"
              onClick={handleCall}
            >
              Start Ordering
            </Button>
          </div>
          
          <div className="bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 rounded-2xl p-8 text-white shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <h3 className="text-2xl font-bold mb-4 relative">Outdoor Catering</h3>
            <p className="mb-6 opacity-90 relative">Planning a party? Let us handle the food, while you enjoy the celebration.</p>
            <Button 
              size="lg" 
              className="bg-white text-green-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative"
              onClick={handleCall}
            >
              Enquire Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
