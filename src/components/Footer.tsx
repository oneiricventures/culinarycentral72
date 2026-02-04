
import React from 'react';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import SecureExternalLink from './SecureExternalLink';

const Footer = () => {
  const handleCall = () => {
    window.location.href = 'tel:+919773511297';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919773511297?text=hi', '_blank');
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
                <span className="text-gray-300">+91 9773511297</span>
              </div>
              <button 
                onClick={handleWhatsApp}
                className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </button>
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
