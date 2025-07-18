
import React from 'react';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import SecureExternalLink from './SecureExternalLink';

const Footer = () => {
  const handleCall = () => {
    window.location.href = 'tel:+919997731372';
  };

  const handleLocationClick = () => {
    window.open('https://maps.app.goo.gl/HHqRcraoMTSwyqMN6', '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">CC</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Culinary Central 72</h3>
                <p className="text-orange-400 text-sm">Highway NH 72</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              India's premier highway food plaza offering five distinct culinary experiences 
              under one roof, plus luxury accommodation at Skylight Suite.
            </p>
          </div>

          {/* Our Brands */}
          <div>
            <h4 className="text-lg font-bold mb-4">Our Brands</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <SecureExternalLink 
                  href="https://www.burgersinghonline.com/" 
                  className="text-gray-300 hover:text-orange-400 transition-colors"
                >
                  Burger Singh
                </SecureExternalLink>
              </li>
              <li>
                <SecureExternalLink 
                  href="https://chicagopizza.in/" 
                  className="text-gray-300 hover:text-orange-400 transition-colors"
                >
                  Chicago Pizza
                </SecureExternalLink>
              </li>
              <li>
                <SecureExternalLink 
                  href="https://baskinrobbinsindia.com/" 
                  className="text-gray-300 hover:text-orange-400 transition-colors"
                >
                  Baskin Robbins
                </SecureExternalLink>
              </li>
              <li>
                <SecureExternalLink 
                  href="https://maps.app.goo.gl/HHqRcraoMTSwyqMN6" 
                  className="text-gray-300 hover:text-orange-400 transition-colors"
                >
                  Waffle Station
                </SecureExternalLink>
              </li>
              <li>
                <SecureExternalLink 
                  href="https://maps.app.goo.gl/2gc1zXXMy571UoQq5" 
                  className="text-gray-300 hover:text-orange-400 transition-colors"
                >
                  The Nukkad Tapri
                </SecureExternalLink>
              </li>
              <li>
                <SecureExternalLink 
                  href="https://www.airbnb.co.in/rooms/1389016749522622097?check_in=2025-07-15&check_out=2025-07-17&guests=2&adults=2&s=67&unique_share_id=5c10203a-0100-4651-8f20-492a894db481" 
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Skylight Suite
                </SecureExternalLink>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={handleCall} className="text-gray-300 hover:text-orange-400 transition-colors text-left">Online Ordering</button></li>
              <li><button onClick={handleCall} className="text-gray-300 hover:text-orange-400 transition-colors text-left">Party Order</button></li>
              <li><button onClick={handleCall} className="text-gray-300 hover:text-orange-400 transition-colors text-left">Home Delivery</button></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Catering Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Space Leasing</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                <button 
                  onClick={handleLocationClick}
                  className="text-gray-300 hover:text-orange-400 transition-colors text-left"
                >
                  Culinary Central 72, Dehradun - Haridwar Highway, Majri Grant, Doiwala, Dehradun, Uttarakhand
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300">+91 9997731372</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300">culinarycentral72@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300">Open 9am to 12am</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 Culinary Central 72. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">FSSAI License</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
