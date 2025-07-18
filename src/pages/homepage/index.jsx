import React from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import SupportedPlatforms from './components/SupportedPlatforms';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import ComparisonSection from './components/ComparisonSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <HeroSection />
        <SupportedPlatforms />
        <FeaturesSection />
        <TestimonialsSection />
        <ComparisonSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Homepage;