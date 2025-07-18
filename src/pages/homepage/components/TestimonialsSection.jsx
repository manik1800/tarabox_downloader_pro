import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Content Creator',
      company: 'Digital Media Studio',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: `TaraBox has completely transformed my workflow. I used to spend hours waiting for large video files to download from client shared folders. Now I can download 4K footage in minutes instead of hours. The batch processing feature alone has saved me 10+ hours per week.`,
      rating: 5,
      timeSaved: '10 hours/week',
      useCase: 'Video Production'
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      role: 'Digital Marketing Manager',
      company: 'Growth Agency',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: `The speed difference is incredible. What used to take 30 minutes now takes 3 minutes. Our team collaborates with clients worldwide, and TaraBox makes sharing large campaign assets effortless. The reliability is what impressed me most - never had a failed download.`,
      rating: 5,
      timeSaved: '25 hours/month',
      useCase: 'Team Collaboration'
    },
    {
      id: 3,
      name: 'Emily Watson',
      role: 'Freelance Designer',
      company: 'Independent',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      content: `As a freelancer, time is money. TaraBox's premium features pay for themselves within the first week. The ability to download entire project folders with one click, plus the mobile app for on-the-go access, has made my business so much more efficient.`,
      rating: 5,
      timeSaved: '15 hours/month',useCase: 'Freelance Work'
    },
    {
      id: 4,
      name: 'David Kim',role: 'Software Developer',company: 'Tech Startup',avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',content: `The API integration capabilities are fantastic. We've integrated TaraBox into our deployment pipeline for downloading large datasets and assets. The documentation is clear, and the support team is incredibly responsive. It's become an essential part of our infrastructure.`,rating: 5,timeSaved: '40 hours/month',useCase: 'Development Workflow'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentData = testimonials[currentTestimonial];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Trusted by{' '}
            <span className="text-gradient-brand">Digital Professionals</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Join thousands of content creators, developers, and businesses who have transformed their workflow with TaraBox.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 rounded-2xl p-8 lg:p-12 mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Avatar and Info */}
              <div className="flex-shrink-0 text-center lg:text-left">
                <div className="relative inline-block">
                  <Image
                    src={currentData.avatar}
                    alt={currentData.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-elevation-2"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center border-2 border-white">
                    <Icon name="Check" size={16} color="white" />
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-bold text-foreground">{currentData.name}</h4>
                  <p className="text-sm text-muted-foreground">{currentData.role}</p>
                  <p className="text-sm text-brand-primary font-medium">{currentData.company}</p>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  {[...Array(currentData.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={20} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-lg text-foreground leading-relaxed mb-6">
                  "{currentData.content}"
                </blockquote>

                <div className="flex flex-wrap gap-4">
                  <div className="bg-white rounded-lg px-4 py-2 border border-border">
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={16} className="text-brand-primary" />
                      <span className="text-sm font-medium text-foreground">{currentData.timeSaved}</span>
                      <span className="text-sm text-muted-foreground">saved</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg px-4 py-2 border border-border">
                    <div className="flex items-center space-x-2">
                      <Icon name="Briefcase" size={16} className="text-brand-secondary" />
                      <span className="text-sm font-medium text-foreground">{currentData.useCase}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-border hover:border-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-200"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentTestimonial ? 'bg-brand-primary' : 'bg-border hover:bg-muted-foreground'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-border hover:border-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-200"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="text-3xl font-bold text-brand-primary mb-2">50K+</div>
            <div className="text-sm text-muted-foreground">Happy Users</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <div className="text-3xl font-bold text-success mb-2">2.3M+</div>
            <div className="text-sm text-muted-foreground">Files Downloaded</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
            <div className="text-3xl font-bold text-brand-accent mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;