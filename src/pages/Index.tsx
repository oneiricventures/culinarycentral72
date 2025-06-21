
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import BrandsSection from '@/components/BrandsSection';
import SkylightSection from '@/components/SkylightSection';
import AboutSection from '@/components/AboutSection';
import LeaseSection from '@/components/LeaseSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <BrandsSection />
      <SkylightSection />
      <AboutSection />
      <LeaseSection />
      <Footer />
    </div>
  );
};

export default Index;
